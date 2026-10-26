import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { DashboardService } from '../../service/dashboard-service';
import { BeachTent } from '../../../beach-tents/models/beach-tent';
import { ActivatedRoute } from '@angular/router';
import { beachTentStatus } from '../../../beach-tents/enum/beachtent-status';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BeachtentModal } from '../../components/beachtent-modal/beachtent-modal';

@Component({
  selector: 'app-beachtent-panel',
  imports: [CommonModule, NgClass,MatDialogModule, MatButtonModule],
  templateUrl: './beachtent-panel.html',
  styleUrl: './beachtent-panel.css',
})
export class BeachtentPanel implements OnInit {
  private dashboardService = inject(DashboardService);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  beachTents = signal<BeachTent[] | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.loadBeachTents(+idParam);
    }
  }

  openModal(beachtent: BeachTent) {
    const dialogRef = this.dialog.open(BeachtentModal, {
      width: '400px',
      disableClose: false, // Permite o impide cerrar al hacer clic afuera
      data:beachtent
    });

    // Captura el resultado cuando el modal se cierra
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró. Resultado:', result);
    });
  }

  loadBeachTents(id: number) {
    this.dashboardService.getBeachTentsByBalnearioId(id).subscribe({
      next: (data) => {
        this.beachTents.set(data);
      },
      error: (err) => {
        console.log("ERROR: se produjo un error en el servidor: " + err);
      }
    });
  }

  // Agrupa las carpas por Fila para mostrarlas en secciones separadas
  get groupedTents(): { [key: number]: BeachTent[] } {
    const tents = this.beachTents();
    if (!tents) return {};
    return tents.reduce((acc, tent) => {
      if (!acc[tent.rowId]) {
        acc[tent.rowId] = [];
      }
      acc[tent.rowId].push(tent);
      return acc;
    }, {} as { [key: number]: BeachTent[] });
  }

  get rowIds(): number[] {
    return Object.keys(this.groupedTents).map(Number);
  }

  // Colores vivos solicitados
  getTentCardStyle(status: beachTentStatus | string): string {
    const statusStr = String(status).toUpperCase();

    switch (statusStr) {
      case 'LIBRE':
        return 'bg-green-500 text-white border-green-600 hover:bg-green-600';

      case 'RESERVADO':
        return 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700';

      case 'OCUPADO':
        return 'bg-red-500 text-white border-red-600 hover:bg-red-600';

      case 'MANTENIMIENTO':
        return 'bg-yellow-400 text-gray-900 border-yellow-500 hover:bg-yellow-500 font-bold';
      default:
        return 'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300';
    }
  }
}
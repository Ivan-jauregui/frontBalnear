import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SolicitudeResponse } from '../../../solicitude/models/solicitude-response';
import { DashboardService } from '../../service/dashboard-service';
import { SolicitudeCard } from '../../components/solicitude-card/solicitude-card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SolicitudeState } from '../../../solicitude/enum/solicitude-state';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolicitudeService } from '../../../solicitude/services/solicitude-service';

@Component({
  selector: 'app-solicitude-list',
  imports: [SolicitudeCard, RouterLink, FormsModule],
  templateUrl: './solicitude-list.html',
  styleUrl: './solicitude-list.css',
})
export class SolicitudeList implements OnInit {
  private dashboardService = inject(DashboardService)

  private route = inject(ActivatedRoute);

  solicitudes = signal<SolicitudeResponse[]>([]);
  selectedState = signal<SolicitudeState | undefined>(undefined)

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.dashboardService.getAllSolicitude(+idParam).subscribe({
        next: (data) => {
          this.solicitudes.set(data);
          console.log("Solicitudes Cargadas")
        },
        error: (err) => {
          console.log("ERROR: Error en el servidor: " + err)
        }
      })
    }
  }

  filteredSolcitudes = computed(() => {
    const estadoActual = this.selectedState();
    if (!estadoActual) return this.solicitudes();

    return this.solicitudes().filter(s => s.state === estadoActual);
  })

  changeState(event: Event) {
    const state = event.target as HTMLSelectElement;
    this.selectedState.set(state.value as SolicitudeState);
  }

}

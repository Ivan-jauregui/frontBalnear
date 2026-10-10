import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DashboardService } from '../../service/dashboard-service';
import { SolicitudeResponse } from '../../../solicitude/models/solicitude-response';
import { CommonModule } from '@angular/common';
import { SolicitudeState } from '../../../solicitude/enum/solicitude-state';

@Component({
  selector: 'app-solicitude-details', 
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './solitude-details.html',
  styleUrl: './solitude-details.css',
})
export class SolicitudeDetails implements OnInit { 
  private dashboardService = inject(DashboardService);
  private route = inject(ActivatedRoute); 

  protected readonly SolicitudeState = SolicitudeState; 

  idParam = signal<string | null>(null);
  solicitude = signal<SolicitudeResponse | undefined>(undefined);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.idParam.set(id);

    if (id) {
     
      const idNumber = Number(id);

      this.dashboardService.getByIdSolicitude(idNumber).subscribe({
        next: (data) => {
          this.solicitude.set(data);
        },
        error: (err) => {
          console.error("ERROR: Se produjo un error en el sistema:", err);
        }
      });
    }
  }
}

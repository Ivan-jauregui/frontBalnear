import { Component, inject, OnInit, signal } from '@angular/core';
import { SolicitudeResponse } from '../../../solicitude/models/solicitude-response';
import { DashboardService } from '../../service/dashboard-service';
import { SolicitudeCard } from '../../components/solicitude-card/solicitude-card';

@Component({
  selector: 'app-solicitude-list',
  imports: [SolicitudeCard],
  templateUrl: './solicitude-list.html',
  styleUrl: './solicitude-list.css',
})
export class SolicitudeList implements OnInit{
  private dashboardService = inject(DashboardService)
  solicitudes=signal<SolicitudeResponse[]>([]);

  ngOnInit(){
    this.dashboardService.getAllSolicitude().subscribe({
      next:(data)=>{
        this.solicitudes.set(data);
        console.log("Solicitudes Cargadas")
      },
      error:(err)=>{
        console.log("ERROR: Error en el servidor: "+err)
      }
    })
  }

}

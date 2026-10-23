  import { Component, inject, OnInit, signal } from '@angular/core';
  import { Graphic } from "../../components/graphic/graphic";
  import { CommonModule } from '@angular/common';
  import { Router, RouterLink } from '@angular/router';
  import { DashboardService } from '../../service/dashboard-service';
  import { BalnearioResponse } from '../../../balneario/models/balnearioResponse';
  import { AuthService } from '../../../../app/core/service/auth-service';

  @Component({
    selector: 'app-dashboard-owner',
    imports: [Graphic, CommonModule, RouterLink],
    templateUrl: './dashboard-owner.html',
    styleUrl: './dashboard-owner.css',
  })
  export class DashboardOwner implements OnInit{

    private dashbaordService = inject(DashboardService)
    private authService = inject(AuthService)

    private router = inject(Router);

    balneario = signal<BalnearioResponse | null>(null);

    

    ngOnInit(): void {

      console.log(this.authService.currentUser()?.email)
      this.dashbaordService.getSeaSideResortByOwner().subscribe({
        next:(data)=>{
          console.log("BALNEARIO: " + data.id)
          this.balneario.set(data)
          console.log(this.balneario()?.name)
        },
        error:(err)=>{
          console.log("ERROR: se produjo un error en el servidor: " + err)
        }
      })
    }

  public metrics = [
      { label: 'Reservas Totales', value: '148', change: '+12%', isPositive: true },
      { label: 'Carpas Ocupadas', value: '82%', change: '+5%', isPositive: true },
      { label: 'Ingresos Mensuales', value: '$1.250.000', change: '+18%', isPositive: true },
    ];

    goToSolitude() {

      const id = this.balneario()?.id;

      if (!id) {
        console.log("Error en la peticion al servidor, reintentando...");
        return;
      }
      this.router.navigate(["/dashboard/solicitude/balneario", id])
    }
  }

import { Component } from '@angular/core';
import { Graphic } from "../../components/graphic/graphic";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-owner',
  imports: [Graphic,CommonModule],
  templateUrl: './dashboard-owner.html',
  styleUrl: './dashboard-owner.css',
})
export class DashboardOwner {
public metrics = [
    { label: 'Reservas Totales', value: '148', change: '+12%', isPositive: true },
    { label: 'Carpas Ocupadas', value: '82%', change: '+5%', isPositive: true },
    { label: 'Ingresos Mensuales', value: '$1.250.000', change: '+18%', isPositive: true },
  ];
}

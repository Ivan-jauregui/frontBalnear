import { Component } from '@angular/core';
import { NgApexchartsModule, ApexChart, ApexAxisChartSeries, ApexXAxis, ApexTitleSubtitle, ApexTooltip } from 'ng-apexcharts';

@Component({
  selector: 'app-graphic',
  imports: [NgApexchartsModule],
  templateUrl: './graphic.html',
  styleUrl: './graphic.css',
})
export class Graphic {
  public chartOptions: {
    series: ApexAxisChartSeries;  // Agrega el titulo y data
    chart: ApexChart;         // Define que tipo de grafico se usa
    xaxis: ApexXAxis;         // Agrega la categorias
    title: ApexTitleSubtitle; // Agrega la propiedad al tipo
    colors: string[];          // Agrega los colores al tipo
    tooltip: ApexTooltip;      // Agrega el tooltip al tipo
  } = {
      series: [
        {
          name: "Reservas de Carpas",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        width: 500
      },
      xaxis: {
        categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep"]
      },

      // 🆕 1. TÍTULO
      title: {
        text: "Reservas Mensuales",
        style: {
          fontSize: "16px",
          color: "#1e293b"
        }
      },

      // 🆕 2. COLORES (Sustituye a 'misColores')
      colors: ["#10b981"], // Verde emerald

      // 🆕 3. TOOLTIP (Texto al pasar el mouse)
      tooltip: {
        y: {
          formatter: (val: any) => `${val} reservas` // Muestra por ej: "41 reservas"
        }
      }
    };
}

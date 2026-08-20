import { Component, signal, ViewChild } from '@angular/core'; // <-- 1. Importa ViewChild
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDatepickerModule, MatCalendar } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

export interface BookingRequestDTO {
  seaSideResortId: number;
  numberRow: number;
  numberBeachTent: number;
  startDate: string;
  endDate: string;
  payPartial: boolean;
}

@Component({
  selector: 'app-booking-reserve',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatCalendar
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './booking-reserve.html',
  styleUrl: './booking-reserve.css',
})
export class BookingReserve {
  // 2. Obtén la referencia al calendario desde el HTML
  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;

  total = signal<number>(0);

  selectedDate: Date | null = null;
  startDateObj = signal<Date | null>(null);
  endDateObj = signal<Date | null>(null);

  bookingData: BookingRequestDTO = {
    seaSideResortId: 1,
    numberRow: 1,
    numberBeachTent: 1,
    startDate: '',
    endDate: '',
    payPartial: false
  };

  private formatDateLocal(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onDateSelected(date: Date | null): void {
    if (!date) return;

    const formattedDate = this.formatDateLocal(date);

    if (!this.bookingData.startDate || (this.bookingData.startDate && this.bookingData.endDate)) {
      this.startDateObj.set(date);
      this.bookingData.startDate = formattedDate;
      this.endDateObj.set(null);
      this.bookingData.endDate = '';
    } else if (this.bookingData.startDate && !this.bookingData.endDate) {
      const start = this.startDateObj();
      
      if (start && date < start) {
        this.startDateObj.set(date);
        this.bookingData.startDate = formattedDate;
      } else {
        this.endDateObj.set(date);
        this.bookingData.endDate = formattedDate;
      }
    }

    this.calculateTotal();

    // 3. ¡ESTA LÍNEA ES LA CLAVE! Fuerza a Material a volver a ejecutar dateClass y repintar
    if (this.calendar) {
      this.calendar.updateTodaysDate();
    }
  }

  dateClass = (cellDate: Date): string => {
    const start = this.startDateObj();
    const end = this.endDateObj();

    if (start && end) {
      const cellTime = new Date(cellDate).setHours(0, 0, 0, 0);
      const startTime = new Date(start).setHours(0, 0, 0, 0);
      const endTime = new Date(end).setHours(0, 0, 0, 0);

      if (cellTime >= startTime && cellTime <= endTime) {
        return 'selected-range-date';
      }
    }
    return '';
  };

  calculateTotal(): number {
    const baseRate = 100;
    const start = this.startDateObj();
    const end = this.endDateObj();

    if (start && !end) {
      this.total.set(baseRate);
      return baseRate;
    }

    if (!start || !end) {
      this.total.set(0);
      return 0;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const calculatedTotal = baseRate * diffDays;
    this.total.set(calculatedTotal);
    
    return calculatedTotal;
  }

  submitBooking(): void {
    window.alert('Payload listo para enviar: ' + JSON.stringify(this.bookingData, null, 2));
  }
}
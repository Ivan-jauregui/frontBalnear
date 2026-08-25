import { Component, computed, signal, ViewChild } from '@angular/core'; // <-- 1. Importa ViewChild
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
  payPartial = signal<boolean>(false);

  selectedDate: Date | null = null;
  startDateObj = signal<Date | null>(null);
  endDateObj = signal<Date | null>(null);

  bookingData: BookingRequestDTO = {
    seaSideResortId: 1,
    numberRow: 1,
    numberBeachTent: 1,
    startDate: '',
    endDate: '',
    payPartial: this.payPartial()
  };

  //Precio base de prueba
  private readonly BASE_RATE = 100;

  // Total a pagar
  totalToPay = computed(() => {
    const start = this.startDateObj();
    const end = this.endDateObj();

    // 1. Si no hay fechas, el total es 0
    if (!start) return 0;

    // 2. Si hay fecha de inicio pero no de fin, se cobra solo 1 día
    if (start && !end) {
      return this.payPartial() ? this.BASE_RATE * 0.5 : this.BASE_RATE;
    }

    // 3. Si están ambas fechas, calculamos los días de diferencia
    const diffTime = Math.abs(end!.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const fullTotal = this.BASE_RATE * diffDays;

    // 4. Aplicamos el descuento del 50% si payPartial es true
    return this.payPartial() ? fullTotal * 0.5 : fullTotal;
  });


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

  submitBooking(): void {
    window.alert('Payload listo para enviar: ' + JSON.stringify(this.bookingData, null, 2));
  }
}
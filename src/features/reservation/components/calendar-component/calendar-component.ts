import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  CalendarMonthModule, 
  CalendarView, 
  CalendarEvent, 
  CalendarMonthViewDay,
  DateAdapter
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@Component({
  selector: 'calendar-component',
  standalone: true,
  imports: [
    CommonModule, 
    CalendarMonthModule // <--- Impredecindible para <mwl-calendar-month-view>
  ],
  providers: [
    {
      provide: DateAdapter,
      useFactory: adapterFactory,
    },
  ],
  template: `
    <mwl-calendar-month-view
      [viewDate]="viewDate"
      [events]="events"
      (dayClicked)="onDayClicked($event)">
    </mwl-calendar-month-view>
  `
})
export class CalendarComponent {
  @Input() viewDate: Date = new Date();
  @Input() events: CalendarEvent[] = [];
  @Output() dayClicked = new EventEmitter<{ day: CalendarMonthViewDay }>();

  onDayClicked(event: { day: CalendarMonthViewDay }): void {
    this.dayClicked.emit(event);
  }
}
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingReserve } from './booking-reserve';

describe('BookingReserve', () => {
  let component: BookingReserve;
  let fixture: ComponentFixture<BookingReserve>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingReserve]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingReserve);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

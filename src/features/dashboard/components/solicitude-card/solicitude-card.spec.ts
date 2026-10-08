import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudeCard } from './solicitude-card';

describe('SolicitudeCard', () => {
  let component: SolicitudeCard;
  let fixture: ComponentFixture<SolicitudeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudeCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudeCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

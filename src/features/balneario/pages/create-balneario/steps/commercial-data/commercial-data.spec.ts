import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialData } from './commercial-data';

describe('CommercialData', () => {
  let component: CommercialData;
  let fixture: ComponentFixture<CommercialData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

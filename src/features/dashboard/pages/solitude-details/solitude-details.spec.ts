import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolitudeDetails } from './solitude-details';

describe('SolitudeDetails', () => {
  let component: SolitudeDetails;
  let fixture: ComponentFixture<SolitudeDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolitudeDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolitudeDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

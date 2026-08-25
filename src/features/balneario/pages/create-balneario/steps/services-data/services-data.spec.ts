import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesData } from './services-data';

describe('ServicesData', () => {
  let component: ServicesData;
  let fixture: ComponentFixture<ServicesData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

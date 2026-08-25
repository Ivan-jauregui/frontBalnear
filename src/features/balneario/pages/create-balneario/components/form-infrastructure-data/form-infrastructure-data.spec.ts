import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInfrastructureData } from './form-infrastructure-data';

describe('FormInfrastructureData', () => {
  let component: FormInfrastructureData;
  let fixture: ComponentFixture<FormInfrastructureData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInfrastructureData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInfrastructureData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

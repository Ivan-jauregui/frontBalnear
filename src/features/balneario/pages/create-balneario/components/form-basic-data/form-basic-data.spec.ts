import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBasicData } from './form-basic-data';

describe('FormBasicData', () => {
  let component: FormBasicData;
  let fixture: ComponentFixture<FormBasicData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBasicData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBasicData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureData } from './infrastructure-data';

describe('InfrastructureData', () => {
  let component: InfrastructureData;
  let fixture: ComponentFixture<InfrastructureData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfrastructureData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfrastructureData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalnearioDetail } from './balneario-detail';

describe('BalnearioDetail', () => {
  let component: BalnearioDetail;
  let fixture: ComponentFixture<BalnearioDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalnearioDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalnearioDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

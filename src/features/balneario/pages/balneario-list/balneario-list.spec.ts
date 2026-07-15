import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalnearioList } from './balneario-list';

describe('BalnearioList', () => {
  let component: BalnearioList;
  let fixture: ComponentFixture<BalnearioList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalnearioList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalnearioList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

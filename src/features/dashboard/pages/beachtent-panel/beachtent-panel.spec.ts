import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeachtentPanel } from './beachtent-panel';

describe('BeachtentPanel', () => {
  let component: BeachtentPanel;
  let fixture: ComponentFixture<BeachtentPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeachtentPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeachtentPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

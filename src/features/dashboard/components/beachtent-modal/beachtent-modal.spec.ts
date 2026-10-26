import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeachtentModal } from './beachtent-modal';

describe('BeachtentModal', () => {
  let component: BeachtentModal;
  let fixture: ComponentFixture<BeachtentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeachtentModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeachtentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

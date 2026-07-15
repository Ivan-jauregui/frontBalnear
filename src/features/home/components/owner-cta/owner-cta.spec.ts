import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerCta } from './owner-cta';

describe('OwnerCta', () => {
  let component: OwnerCta;
  let fixture: ComponentFixture<OwnerCta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerCta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerCta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickFilters } from './quick-filters';

describe('QuickFilters', () => {
  let component: QuickFilters;
  let fixture: ComponentFixture<QuickFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

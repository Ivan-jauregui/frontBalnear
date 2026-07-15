import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedResortList } from './featured-resort-list';

describe('FeaturedResortList', () => {
  let component: FeaturedResortList;
  let fixture: ComponentFixture<FeaturedResortList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedResortList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedResortList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

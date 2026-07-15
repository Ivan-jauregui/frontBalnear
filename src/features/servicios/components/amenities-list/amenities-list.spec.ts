import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenitiesList } from './amenities-list';

describe('AmenitiesList', () => {
  let component: AmenitiesList;
  let fixture: ComponentFixture<AmenitiesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmenitiesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmenitiesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

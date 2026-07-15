import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResortCard } from './resort-card';

describe('ResortCard', () => {
  let component: ResortCard;
  let fixture: ComponentFixture<ResortCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResortCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResortCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

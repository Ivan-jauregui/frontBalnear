import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudeList } from './solicitude-list';

describe('SolicitudeList', () => {
  let component: SolicitudeList;
  let fixture: ComponentFixture<SolicitudeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBalneario } from './create-balneario';

describe('CreateBalneario', () => {
  let component: CreateBalneario;
  let fixture: ComponentFixture<CreateBalneario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBalneario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBalneario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BalnearioService } from './balneario-service';

describe('BalnearioService', () => {
  let service: BalnearioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalnearioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

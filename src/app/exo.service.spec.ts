import { TestBed } from '@angular/core/testing';

import { ExoService } from './exo.service';

describe('ExoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExoService = TestBed.get(ExoService);
    expect(service).toBeTruthy();
  });
});

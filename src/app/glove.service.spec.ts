import { TestBed } from '@angular/core/testing';

import { GloveService } from './glove.service';

describe('GloveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GloveService = TestBed.get(GloveService);
    expect(service).toBeTruthy();
  });
});

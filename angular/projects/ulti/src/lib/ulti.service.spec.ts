import { TestBed } from '@angular/core/testing';

import { UltiService } from './ulti.service';

describe('UltiService', () => {
  let service: UltiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UltiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

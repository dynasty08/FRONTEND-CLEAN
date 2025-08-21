import { TestBed } from '@angular/core/testing';

import { Retry } from './retry';

describe('Retry', () => {
  let service: Retry;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Retry);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

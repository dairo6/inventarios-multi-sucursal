import { TestBed } from '@angular/core/testing';

import { Guarantee } from './guarantee';

describe('Guarantee', () => {
  let service: Guarantee;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Guarantee);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

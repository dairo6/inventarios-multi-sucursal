import { TestBed } from '@angular/core/testing';

import { StockBranch } from './stock-branch';

describe('StockBranch', () => {
  let service: StockBranch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockBranch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

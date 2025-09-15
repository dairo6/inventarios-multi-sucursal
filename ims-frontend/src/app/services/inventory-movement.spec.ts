import { TestBed } from '@angular/core/testing';

import { InventoryMovement } from './inventory-movement';

describe('InventoryMovement', () => {
  let service: InventoryMovement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryMovement);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInventoryMovement } from './update-inventory-movement';

describe('UpdateInventoryMovement', () => {
  let component: UpdateInventoryMovement;
  let fixture: ComponentFixture<UpdateInventoryMovement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateInventoryMovement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateInventoryMovement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

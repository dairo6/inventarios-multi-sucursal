import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInventoryMovement } from './create-inventory-movement';

describe('CreateInventoryMovement', () => {
  let component: CreateInventoryMovement;
  let fixture: ComponentFixture<CreateInventoryMovement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInventoryMovement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInventoryMovement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

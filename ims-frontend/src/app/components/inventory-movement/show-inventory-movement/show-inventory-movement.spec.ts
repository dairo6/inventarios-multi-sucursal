import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInventoryMovement } from './show-inventory-movement';

describe('ShowInventoryMovement', () => {
  let component: ShowInventoryMovement;
  let fixture: ComponentFixture<ShowInventoryMovement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowInventoryMovement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowInventoryMovement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

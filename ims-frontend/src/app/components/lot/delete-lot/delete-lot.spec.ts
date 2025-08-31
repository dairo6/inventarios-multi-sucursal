import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLot } from './delete-lot';

describe('DeleteLot', () => {
  let component: DeleteLot;
  let fixture: ComponentFixture<DeleteLot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteLot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteLot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

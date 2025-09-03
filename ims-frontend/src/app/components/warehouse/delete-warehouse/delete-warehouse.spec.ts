import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWarehouse } from './delete-warehouse';

describe('DeleteWarehouse', () => {
  let component: DeleteWarehouse;
  let fixture: ComponentFixture<DeleteWarehouse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteWarehouse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteWarehouse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

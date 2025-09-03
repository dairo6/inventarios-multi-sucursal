import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStockBranch } from './delete-stock-branch';

describe('DeleteStockBranch', () => {
  let component: DeleteStockBranch;
  let fixture: ComponentFixture<DeleteStockBranch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteStockBranch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteStockBranch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

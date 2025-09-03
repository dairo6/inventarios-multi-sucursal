import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStockBranch } from './list-stock-branch';

describe('ListStockBranch', () => {
  let component: ListStockBranch;
  let fixture: ComponentFixture<ListStockBranch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListStockBranch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStockBranch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

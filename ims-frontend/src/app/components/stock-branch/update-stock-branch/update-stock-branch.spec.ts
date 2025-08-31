import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStockBranch } from './update-stock-branch';

describe('UpdateStockBranch', () => {
  let component: UpdateStockBranch;
  let fixture: ComponentFixture<UpdateStockBranch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStockBranch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStockBranch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

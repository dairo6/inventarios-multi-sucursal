import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStockBranch } from './create-stock-branch';

describe('CreateStockBranch', () => {
  let component: CreateStockBranch;
  let fixture: ComponentFixture<CreateStockBranch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStockBranch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStockBranch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockGrid } from './stock-grid';

describe('StockGrid', () => {
  let component: StockGrid;
  let fixture: ComponentFixture<StockGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

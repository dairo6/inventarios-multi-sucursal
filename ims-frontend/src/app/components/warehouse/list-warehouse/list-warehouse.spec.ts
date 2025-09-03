import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWarehouse } from './list-warehouse';

describe('ListWarehouse', () => {
  let component: ListWarehouse;
  let fixture: ComponentFixture<ListWarehouse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListWarehouse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWarehouse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

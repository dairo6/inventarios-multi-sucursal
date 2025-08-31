import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSupplier } from './list-supplier';

describe('ListSupplier', () => {
  let component: ListSupplier;
  let fixture: ComponentFixture<ListSupplier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSupplier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSupplier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

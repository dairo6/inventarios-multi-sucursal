import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLot } from './list-lot';

describe('ListLot', () => {
  let component: ListLot;
  let fixture: ComponentFixture<ListLot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

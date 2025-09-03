import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLocation } from './list-location';

describe('ListLocation', () => {
  let component: ListLocation;
  let fixture: ComponentFixture<ListLocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLocation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLocation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

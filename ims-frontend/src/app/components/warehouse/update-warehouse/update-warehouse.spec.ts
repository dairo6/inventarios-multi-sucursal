import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWarehouse } from './update-warehouse';

describe('UpdateWarehouse', () => {
  let component: UpdateWarehouse;
  let fixture: ComponentFixture<UpdateWarehouse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateWarehouse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateWarehouse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

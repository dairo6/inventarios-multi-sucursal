import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLot } from './update-lot';

describe('UpdateLot', () => {
  let component: UpdateLot;
  let fixture: ComponentFixture<UpdateLot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

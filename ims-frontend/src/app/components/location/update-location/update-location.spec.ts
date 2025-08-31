import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLocation } from './update-location';

describe('UpdateLocation', () => {
  let component: UpdateLocation;
  let fixture: ComponentFixture<UpdateLocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLocation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLocation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

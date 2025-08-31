import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLocation } from './create-location';

describe('CreateLocation', () => {
  let component: CreateLocation;
  let fixture: ComponentFixture<CreateLocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLocation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLocation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

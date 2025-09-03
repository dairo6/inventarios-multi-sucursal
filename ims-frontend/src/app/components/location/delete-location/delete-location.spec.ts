import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLocation } from './delete-location';

describe('DeleteLocation', () => {
  let component: DeleteLocation;
  let fixture: ComponentFixture<DeleteLocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteLocation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteLocation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

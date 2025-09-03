import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBranch } from './update-branch';

describe('UpdateBranch', () => {
  let component: UpdateBranch;
  let fixture: ComponentFixture<UpdateBranch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBranch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBranch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

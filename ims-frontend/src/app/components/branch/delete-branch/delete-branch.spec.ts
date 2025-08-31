import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBranch } from './delete-branch';

describe('DeleteBranch', () => {
  let component: DeleteBranch;
  let fixture: ComponentFixture<DeleteBranch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBranch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBranch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

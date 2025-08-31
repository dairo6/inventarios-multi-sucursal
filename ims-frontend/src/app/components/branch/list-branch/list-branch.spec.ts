import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBranch } from './list-branch';

describe('ListBranch', () => {
  let component: ListBranch;
  let fixture: ComponentFixture<ListBranch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBranch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBranch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGuarantee } from './list-guarantee';

describe('ListGuarantee', () => {
  let component: ListGuarantee;
  let fixture: ComponentFixture<ListGuarantee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListGuarantee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGuarantee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGuarantee } from './delete-guarantee';

describe('DeleteGuarantee', () => {
  let component: DeleteGuarantee;
  let fixture: ComponentFixture<DeleteGuarantee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteGuarantee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteGuarantee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

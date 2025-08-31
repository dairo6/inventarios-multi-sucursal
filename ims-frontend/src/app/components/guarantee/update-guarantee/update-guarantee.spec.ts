import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGuarantee } from './update-guarantee';

describe('UpdateGuarantee', () => {
  let component: UpdateGuarantee;
  let fixture: ComponentFixture<UpdateGuarantee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateGuarantee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGuarantee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

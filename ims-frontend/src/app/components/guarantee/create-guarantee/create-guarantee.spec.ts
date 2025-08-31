import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGuarantee } from './create-guarantee';

describe('CreateGuarantee', () => {
  let component: CreateGuarantee;
  let fixture: ComponentFixture<CreateGuarantee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGuarantee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGuarantee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

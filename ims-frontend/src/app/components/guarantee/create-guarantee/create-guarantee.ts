import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';


@Component({
  selector: 'app-create-guarantee',
  templateUrl: './create-guarantee.html',
  styleUrls: ['./create-guarantee.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule, TextareaModule
  ]
})
export class CreateGuarantee {
  guaranteeForm: FormGroup;

  products = [
    { label: 'Laptop HP', value: 'LAPTOP_HP' },
    { label: 'Celular Samsung', value: 'CELULAR_SAMSUNG' },
    { label: 'Televisor LG', value: 'TV_LG' }
  ];

  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.guaranteeForm = this.fb.group({
      product: [null, Validators.required],
      description: ['', Validators.required],
      durationMonths: [null, [Validators.required, Validators.min(1)]],
      terms: ['', Validators.required],
      status: ['ACTIVE', Validators.required],
    });
  }

  onSubmit() {
    if (this.guaranteeForm.valid) {
      console.log('Garantía creada:', this.guaranteeForm.value);
      // Aquí iría la llamada al servicio API
      this.router.navigate(['/guarantees']); // regresar a lista
    }
  }

  onCancel() {
    this.router.navigate(['/guarantees']);
  }
}


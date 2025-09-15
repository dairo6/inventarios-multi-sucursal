import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.html',
  styleUrls: ['./create-supplier.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule
  ]
})
export class CreateSupplier {
  supplierForm: FormGroup;

  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.supplierForm = this.fb.group({
      name: ['', Validators.required],
      taxId: ['', Validators.required],       // NIT / RUT / RFC
      contactName: [''],
      phone: [''],
      email: ['', Validators.email],
      address: [''],
      status: ['ACTIVE', Validators.required],
    });
  }

  onSubmit() {
    if (this.supplierForm.valid) {
      console.log('Proveedor creado:', this.supplierForm.value);
      // Aquí iría el servicio para guardar en la API
      this.router.navigate(['/suppliers']); // regresar a la lista
    }
  }

  onCancel() {
    this.router.navigate(['/suppliers']);
  }
}

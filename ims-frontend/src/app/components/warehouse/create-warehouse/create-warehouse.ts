import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-create-warehouse',
  imports: [CommonModule,
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    TextareaModule,
    ButtonModule],
  templateUrl: './create-warehouse.html',
  styleUrl: './create-warehouse.css'
})
export class CreateWarehouse {
warehouseForm: FormGroup;

  branches = [
    { label: 'Sucursal Norte', value: 'NORTE' },
    { label: 'Sucursal Centro', value: 'CENTRO' },
    { label: 'Sucursal Sur', value: 'SUR' }
  ];

  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.warehouseForm = this.fb.group({
      branch: [null, Validators.required],
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: [''],
      status: ['ACTIVE', Validators.required],
    });
  }

  onSubmit() {
    if (this.warehouseForm.valid) {
      console.log('Almacén creado:', this.warehouseForm.value);
      this.router.navigate(['/warehouses']); // volver a lista
    }
  }

  onCancel() {
    this.router.navigate(['/warehouses']);
  }
}

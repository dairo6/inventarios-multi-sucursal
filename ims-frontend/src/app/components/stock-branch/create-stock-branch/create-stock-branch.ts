import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-create-stock-branch',
  imports: [ CommonModule,
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    ButtonModule],
  templateUrl: './create-stock-branch.html',
  styleUrl: './create-stock-branch.css'
})
export class CreateStockBranch {
stockForm: FormGroup;

  branches = [
    { label: 'Sucursal Norte', value: 'NORTE' },
    { label: 'Sucursal Centro', value: 'CENTRO' },
    { label: 'Sucursal Sur', value: 'SUR' }
  ];

  products = [
    { label: 'Producto A', value: 'PROD_A' },
    { label: 'Producto B', value: 'PROD_B' },
    { label: 'Producto C', value: 'PROD_C' }
  ];

  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.stockForm = this.fb.group({
      branch: [null, Validators.required],
      product: [null, Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      minStock: [0, Validators.required],
      maxStock: [0, Validators.required],
      status: ['ACTIVE', Validators.required],
    });
  }

  onSubmit() {
    if (this.stockForm.valid) {
      console.log('Stock creado:', this.stockForm.value);
      this.router.navigate(['/stock-branches']);
    }
  }

  onCancel() {
    this.router.navigate(['/stock-branches']);
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.html',
  styleUrls: ['./create-product.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    ButtonModule
  ]
})
export class CreateProduct {
  productForm: FormGroup;

  categories = [
    { label: 'Bebidas', value: 'BEBIDAS' },
    { label: 'Comidas', value: 'COMIDAS' },
    { label: 'Aseo', value: 'ASEO' }
  ];

  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: [null, Validators.required],
      code: ['', Validators.required],
      price: [0, Validators.required],
      unit: ['', Validators.required],
      status: ['ACTIVE', Validators.required],
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log('Producto creado:', this.productForm.value);
      // Aquí puedes llamar al servicio para guardar en la API
      this.router.navigate(['/products']); // regresar a lista
    }
  }

  onCancel() {
    this.router.navigate(['/products']);
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.html',
  styleUrls: ['./create-category.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule
  ]
})
export class CreateCategory {
  categoryForm: FormGroup;

  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      status: ['ACTIVE', Validators.required],
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      console.log('Categoría creada:', this.categoryForm.value);
      // Aquí iría el servicio para guardar en la API
      this.router.navigate(['/categories']); // regresar a lista
    }
  }

  onCancel() {
    this.router.navigate(['/categories']);
  }
}


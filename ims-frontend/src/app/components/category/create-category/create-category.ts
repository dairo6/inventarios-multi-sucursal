import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { CategoryService } from '../../../services/category';

@Component({
  selector: 'app-create-category',
  imports: [CommonModule,
      ReactiveFormsModule,
      InputTextModule,
      ButtonModule,
      TagModule,
      SelectModule, ToastModule],
  templateUrl: './create-category.html',
  styleUrls: ['./create-category.css'],
  standalone: true,
  providers: [MessageService]
})
export class CreateCategory {
  form: FormGroup;
    loading: boolean = false;
    statusOptions = [
      { label: 'Activo', value: 'ACTIVE' },
      { label: 'Inactivo', value: 'INACTIVE' }
    ];
  
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private categoryService: CategoryService,
      private messageService: MessageService
    ) {
      this.form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: ['', [Validators.required, Validators.minLength(5)]],
        status: ['ACTIVE', Validators.required]
      });
    }
  
    submit(): void {
      if (this.form.valid) {
        this.loading = true;
        const branchData = this.form.value;
  
        this.categoryService.createCategories(branchData).subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Categoria creada correctamente'
            });
            setTimeout(() => {
              this.router.navigate(['/categories']);
            }, 1000);
          },
          error: (error) => {
            console.error('Error creating category:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al crear la categoria'
            });
            this.loading = false;
          }
        });
      } else {
        this.markFormGroupTouched();
        this.messageService.add({
          severity: 'warn',
          summary: 'Advertencia',
          detail: 'Por favor complete todos los campos requeridos'
        });
      }
    }
  
    cancelar(): void {
      this.router.navigate(['/categories']);
    }
  
    private markFormGroupTouched(): void {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
    }
  
    getFieldError(fieldName: string): string {
      const field = this.form.get(fieldName);
      if (field?.errors && field?.touched) {
        if (field.errors['required']) return `${fieldName} es requerido`;
        if (field.errors['email']) return 'Email no válido';
        if (field.errors['minlength']) return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
        if (field.errors['pattern']) return 'Formato no válido';
      }
      return '';
    }
}


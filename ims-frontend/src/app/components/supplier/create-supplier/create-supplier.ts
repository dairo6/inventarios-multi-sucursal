import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { ToastModule, Toast } from 'primeng/toast';
import { SupplierService } from '../../../services/supplier';

@Component({
  selector: 'app-create-supplier',
  standalone: true,
  imports: [  
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    TagModule,
    SelectModule, ToastModule],
  templateUrl: './create-supplier.html',
  styleUrls: ['./create-supplier.css'],
  providers: [MessageService]
})
export class CreateSupplier {
  form: FormGroup;
    loading: boolean = false;
    statusOptions = [
      { label: 'Activo', value: 'ACTIVE' },
      { label: 'Inactivo', value: 'INACTIVE' }
    ];
  
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private supplierService: SupplierService,
      private messageService: MessageService
    ) {
      this.form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        taxId: ['', [Validators.required, Validators.minLength(9)]],
        contactName: ['', [Validators.required, Validators.minLength(2)]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required, Validators.minLength(5)]],
        status: ['ACTIVE', Validators.required]
      });
    }
  
    submit(): void {
      if (this.form.valid) {
        this.loading = true;
        const supplierData = this.form.value;
  
        this.supplierService.createSupplier(supplierData).subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Proveedor creado correctamente'
            });
            setTimeout(() => {
              this.router.navigate(['/suppliers']);
            }, 1000);
          },
          error: (error) => {
            console.error('Error creating supplier:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al crear el proveedor'
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
      this.router.navigate(['/suppliers']);
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

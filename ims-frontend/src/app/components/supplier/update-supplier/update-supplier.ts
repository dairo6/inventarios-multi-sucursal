import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SupplierI } from '../../../models/supplier';
import { SupplierService } from '../../../services/supplier';

@Component({
  selector: 'app-update-supplier',
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, Select, ToastModule],
  templateUrl: './update-supplier.html',
  providers: [MessageService],
  styleUrl: './update-supplier.css'
})
export class UpdateSupplier implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  supplierId: number = 0;
  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.supplierId = parseInt(id);
      this.loadSupplier();
    }
  }

  loadSupplier(): void {
    this.loading = true;
    this.supplierService.getSupplierById(this.supplierId).subscribe({
      next: (supplier) => {
        this.form.patchValue(supplier);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading supplier:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar el proveedor'
        });
        this.loading = false;
      }
    });
  }

   submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const supplierData = this.form.value;
      this.supplierService.updateSupplier(this.supplierId, supplierData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Proveedor actualizado correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/suppliers']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error updating supplier:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el proveedor'
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

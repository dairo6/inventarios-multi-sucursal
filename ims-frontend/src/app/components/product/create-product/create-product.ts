import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../../services/product';
import { ToastModule, Toast } from 'primeng/toast';
import { ProductI } from '../../../models/product';
import { CategoryService } from '../../../services/category';
import { SupplierService } from '../../../services/supplier';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.html',
  styleUrls: ['./create-product.css'],
  providers: [MessageService],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    TagModule,
    SelectModule, ToastModule
  ]
})
export class CreateProduct implements OnInit {
  form: FormGroup;
    loading: boolean = false;
    statusOptions = [
      { label: 'Activo', value: 'ACTIVE' },
      { label: 'Inactivo', value: 'INACTIVE' }
    ];

    categoryOptions: { label: string; value: number }[] = [];
    supplierOptions: { label: string; value: number }[] = [];
  
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private categoryService: CategoryService,
      private supplierService: SupplierService,
      private productService: ProductService,
      private messageService: MessageService
    ) {
      this.form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        code: ['', [Validators.required, Validators.minLength(2)]],
        description: ['', [Validators.required, Validators.minLength(2)]],
        price: [''],
        quantity: [''],
        unit: [''],
        category_id: [''],
        supplier_id: [''],
        status: ['ACTIVE', Validators.required]
      });
    }
  
    submit(): void {
      if (this.form.valid) {
        this.loading = true;
        const productData = this.form.value;
  
        this.productService.createProduct(productData).subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Producto creada correctamente'
            });
            setTimeout(() => {
              this.router.navigate(['/products']);
            }, 1000);
          },
          error: (error) => {
            console.error('Error creating product:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al crear el producto'
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
      this.router.navigate(['/products']);
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
    ngOnInit(): void {
      this.loadCategories();
      this.loadSuppliers();
    }

    loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categoryOptions = data.map((cat: any) => ({
          label: cat.name,
          value: cat.id
        }));
      },
      error: (err) => console.error("Error loading categories", err)
    });
  }

  loadSuppliers(): void {
    this.supplierService.getAllSuppliers().subscribe({
      next: (data) => {
        this.supplierOptions = data.map((sup: any) => ({
          label: sup.name,
          value: sup.id
        }));
      },
      error: (err) => console.error("Error loading suppliers", err)
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProductI } from '../../../models/product';
import { ProductService } from '../../../services/product';
import { CategoryService} from '../../../services/category';
import { SupplierService } from '../../../services/supplier';

@Component({
  selector: 'app-update-product',
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, Select, ToastModule],
  templateUrl: './update-product.html',
  providers: [MessageService],
  styleUrl: './update-product.css'
})
export class UpdateProduct implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  productId: number = 0;
  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  categoryOptions: { label: string; value: number }[] = [];
  supplierOptions: { label: string; value: number }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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
        stock: [''],
        unit: [''],
        category_id: [''],
        supplier_id: [''],
        status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = parseInt(id);
      this.loadProduct();
    }

    this.loadCategories();
    this.loadSuppliers();
  }

  loadProduct(): void {
    this.loading = true;
    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.form.patchValue(product);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar el producto'
        });
        this.loading = false;
      }
    });
  }

   submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const productData = this.form.value;
      this.productService.updateProduct(this.productId, productData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Producto actualizado correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error updating product:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el producto'
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

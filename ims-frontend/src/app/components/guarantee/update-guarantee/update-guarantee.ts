import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProductService } from '../../../services/product';
import { GuaranteeService } from '../../../services/guarantee';


@Component({
  selector: 'app-update-guarantee',
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, Select, ToastModule, TextareaModule],
  templateUrl: './update-guarantee.html',
  providers: [MessageService],
  styleUrl: './update-guarantee.css'
})
export class UpdateGuarantee implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  guaranteeId: number = 0;
  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  ProductOptions: { label: string; value: number }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guaranteeService: GuaranteeService,
    private productService: ProductService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      product_id: [''],
      durationMonths: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(2)]],
      terms: ['', Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.guaranteeId = parseInt(id);
      this.loadGuarantee();
    }

    this.loadProducts();
  }

  loadGuarantee(): void {
    this.loading = true;
    this.guaranteeService.getGuatanteeById(this.guaranteeId).subscribe({
      next: (guarantee) => {
        this.form.patchValue(guarantee);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading guarantee:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar la garantía'
        });
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const guaranteeData = this.form.value;
      this.guaranteeService.updateGuatantee(this.guaranteeId, guaranteeData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Garantía actualizada correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/guarantees']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error updating guarantee:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar la garantía'
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
    this.router.navigate(['/guarantees']);
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

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.ProductOptions = data.map((cat: any) => ({
          label: cat.name,
          value: cat.id
        }));
      },
      error: (err) => console.error("Error loading products", err)
    });
  }
}

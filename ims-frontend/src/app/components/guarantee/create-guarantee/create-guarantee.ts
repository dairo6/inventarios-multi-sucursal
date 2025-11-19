import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { GuaranteeService } from '../../../services/guarantee';
import { ToastModule, Toast } from 'primeng/toast';
import { ProductService } from '../../../services/product';


@Component({
  selector: 'app-create-guarantee',
  templateUrl: './create-guarantee.html',
  styleUrls: ['./create-guarantee.css'],
  standalone: true,
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule, TextareaModule, 
    TagModule,
    SelectModule, 
    ToastModule
  ]
})
export class CreateGuarantee implements OnInit {
  form: FormGroup;
    loading: boolean = false;
    statusOptions = [
      { label: 'Activo', value: 'ACTIVE' },
      { label: 'Inactivo', value: 'INACTIVE' }
    ];

    ProductOptions: { label: string; value: number }[] = [];
    
  
    constructor(
      private fb: FormBuilder,
      private router: Router,
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
  
    submit(): void {
      if (this.form.valid) {
        this.loading = true;
        const guaranteeData = this.form.value;
  
        this.guaranteeService.createGuarantee(guaranteeData).subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Garantía creada correctamente'
            });
            setTimeout(() => {
              this.router.navigate(['/guarantees']);
            }, 1000);
          },
          error: (error) => {
            console.error('Error creating guarantee:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al crear la garantía'
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
    ngOnInit(): void {
      this.loadProduts();

    }

    loadProduts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.ProductOptions= data.map((cat: any) => ({
          label: cat.name,
          value: cat.id
        }));
      },
      error: (err) => console.error("Error loading products", err)
    });
  }
}


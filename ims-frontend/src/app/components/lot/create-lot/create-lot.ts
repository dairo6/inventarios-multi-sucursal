import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LotService } from '../../../services/lot';
import { ProductService } from '../../../services/product';
import { ToastModule, Toast } from 'primeng/toast';

@Component({
  selector: 'app-create-lot',
  providers: [MessageService],
  imports: [CommonModule,
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    ButtonModule,
    DatePickerModule,
    TagModule,
    SelectModule,
    ToastModule
  ],
    
  templateUrl: './create-lot.html',
  styleUrl: './create-lot.css'
})
export class CreateLot implements OnInit {
  form: FormGroup;
  loading: boolean = false;

  // Opciones de estado
  statusOptions = [
    { label: 'Disponible', value: 'AVAILABLE' },
    { label: 'Expirado', value: 'EXPIRED' },
    { label: 'Inactivo', value: 'BLOCKED' }
  ];


  ProductOptions: { label: string; value: number }[] = [];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private lotService: LotService,
    private productService: ProductService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      product_id: [''],
      code: ['', Validators.required],
      expirationDate: ['', Validators.required],
      quantity: ['', Validators.required],
      status: ['AVAILABLE', Validators.required]
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const lotData = this.form.value;

      this.lotService.createLot(lotData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Lote creado correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/lots']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error creating lot:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al crear el lote'
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
    this.router.navigate(['/locations']);
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

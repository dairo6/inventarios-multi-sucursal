import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { WarehouseService } from '../../../services/warehouse';
import { BranchService } from '../../../services/branch';
import { ToastModule, Toast } from 'primeng/toast';

@Component({
  selector: 'app-create-warehouse',
  providers: [MessageService],
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    TagModule,
    SelectModule,
    ToastModule
  ],
  templateUrl: './create-warehouse.html',
  styleUrl: './create-warehouse.css'
})
export class CreateWarehouse implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  branchesOptions: { label: string; value: number }[] = [];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private branchService: BranchService,
    private warehouseService: WarehouseService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      branch_id: [''],
      code: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      status: ['ACTIVE', Validators.required]
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const warehouseData = this.form.value;

      this.warehouseService.createWarehouse(warehouseData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Almacen creada correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/warehouses']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error creating warehouse:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al crear el almacen'
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
    this.router.navigate(['/warehouses']);
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
    this.loadBranch();

  }

  loadBranch(): void {
    this.branchService.getAllBranches().subscribe({
      next: (data) => {
        this.branchesOptions = data.map((cat: any) => ({
          label: cat.name,
          value: cat.id
        }));
      },
      error: (err) => console.error("Error loading branch", err)
    });
  }
}

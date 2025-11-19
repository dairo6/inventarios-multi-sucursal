import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TextareaModule } from 'primeng/textarea';
import { WarehouseService } from '../../../services/warehouse';
import { BranchService } from '../../../services/branch';


@Component({
  selector: 'app-update-warehouse',
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, Select, ToastModule, TextareaModule],
  templateUrl: './update-warehouse.html',
  providers: [MessageService],
  styleUrl: './update-warehouse.css'
})
export class UpdateWarehouse implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  warehouseId: number = 0;
  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  BranchesOptions: { label: string; value: number }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private warehouseService: WarehouseService,
    private branchService: BranchService,
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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.warehouseId = parseInt(id);
      this.loadWarehouses();
    }

    this.loadBranches();
  }

  loadWarehouses(): void {
    this.loading = true;
    this.warehouseService.getWarehouseById(this.warehouseId).subscribe({
      next: (warehouse) => {
        this.form.patchValue(warehouse);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading warehouse:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar el almacén'
        });
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const warehouseData = this.form.value;
      this.warehouseService.updateWarehouse(this.warehouseId, warehouseData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Almacen actualizado correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/warehouses']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error updating warehouse:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el almacen'
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

  loadBranches(): void {
    this.branchService.getAllBranches().subscribe({
      next: (data) => {
        this.BranchesOptions = data.map((cat: any) => ({
          label: cat.name,
          value: cat.id
        }));
      },
      error: (err) => console.error("Error loading branches", err)
    });
  }
}

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
import { LocationService } from '../../../services/location';
import { WarehouseService } from '../../../services/warehouse';
import { ToastModule, Toast } from 'primeng/toast';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.html',
  styleUrls: ['./create-location.css'],
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
export class CreateLocation implements OnInit {
  form: FormGroup;
  loading: boolean = false;

  // Opciones de estado
  statusOptions = [
    { label: 'Disponible', value: 'AVAILABLE' },
    { label: 'Ocupado', value: 'OCCUPIED' },
    { label: 'Inactivo', value: 'BLOCKED' }
  ];


  WarehouseOptions: { label: string; value: number }[] = [];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private locationService: LocationService,
    private warehouseService: WarehouseService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      warehouse_id: [''],
      code: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(2)]],
      status: ['AVAILABLE', Validators.required]
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const warehouseData = this.form.value;

      this.locationService.createLocation(warehouseData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Ubicación creada correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/locations']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error creating location:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al crear la ubicación'
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
    this.loadWarehouse();

  }

  loadWarehouse(): void {
    this.warehouseService.getAllWarehouses().subscribe({
      next: (data) => {
        this.WarehouseOptions = data.map((cat: any) => ({
          label: cat.name,
          value: cat.id
        }));
      },
      error: (err) => console.error("Error loading warehouses", err)
    });
  }
}

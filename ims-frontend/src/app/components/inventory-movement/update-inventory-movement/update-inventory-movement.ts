import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { Textarea, TextareaModule } from 'primeng/textarea';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { InventoryMovementService } from '../../../services/inventory-movement';
import { ToastModule, Toast } from 'primeng/toast';
import { ProductService } from '../../../services/product';
import { WarehouseService } from '../../../services/warehouse';
import { LotService } from '../../../services/lot';

@Component({
  selector: 'app-create-inventory-movement',
    standalone: true,
    providers: [MessageService],
    imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    InputNumberModule,
    TagModule,
    DatePickerModule,
    ToastModule,
    Textarea,
    TextareaModule
  ],
  templateUrl: './update-inventory-movement.html',
  styleUrl: './update-inventory-movement.css'
})
export class UpdateInventoryMovement implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  movementId: number = 0;
  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  MovementOptions = [
    { label: 'Salida', value: 'IN' },
    { label: 'Entrada', value: 'OUT' },
    { label: 'Transferencia', value: 'TRANSFER' }
  ];

  ProductOptions: { label: string; value: number }[] = [];
  WarehouseOptions: { label: string; value: number }[] = [];
  LotOptions: { label: string; value: number }[] = [];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private inventoryMovementService: InventoryMovementService,
    private productService: ProductService,
    private warehouseService: WarehouseService,
    private lotService: LotService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      product_id: [''],
      warehouse_id: [''],
      lot_id: [''],
      movementType: ['IN', Validators.required],
      quantity: ['', Validators.required],
      reference: [''],
      status: ['ACTIVE', Validators.required]
    });
  }

  loadMovements(): void {
  this.loading = true;
  this.inventoryMovementService.getInventoryMovementById(this.movementId).subscribe({
    next: (movement) => {
      this.form.patchValue(movement);
      this.loading = false;
    },
    error: (error) => {
      console.error('Error loading movements:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al cargar el movimiento de inventario'
      });
      this.loading = false;
    }
  });
}

  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const movementData = this.form.value;
      this.inventoryMovementService.updateInventoryMovement(this.movementId, movementData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Movimiento actualizado correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/inventory-movements']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error updating location:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el movimiento'
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
    this.router.navigate(['/inventory-movements']);
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

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movementId = parseInt(id);
      this.loadMovements();
    }
      this.loadProduts();
      this.loadWarehouses();
      this.loadLots();

  }

  loadProduts(): void {
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

  loadWarehouses(): void {
    this.warehouseService.getAllWarehouses().subscribe({
      next: (data) => {
        this.WarehouseOptions = data.map((cat: any) => ({
          label: cat.name,
          value: cat.id
        }));
      },
      error: (err) => console.error("Error loading warehouse", err)
    });
  }

  loadLots(): void {
    this.lotService.getAllLots().subscribe({
      next: (data) => {
        this.LotOptions = data.map((cat: any) => ({
          label: cat.code,
          value: cat.id
        }));
      },
      error: (err) => console.error("Error loading lots", err)
    });
  }

}

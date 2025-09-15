import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TagModule } from 'primeng/tag';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-create-inventory-movement',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    InputNumberModule,
    TagModule,
    DatePickerModule
  ],
  templateUrl: './create-inventory-movement.html',
  styleUrl: './create-inventory-movement.css'
})
export class CreateInventoryMovement {
movementForm: FormGroup;

  products = [
    { label: 'Producto A', value: 'PRODUCT_A' },
    { label: 'Producto B', value: 'PRODUCT_B' }
  ];

  warehouses = [
    { label: 'Almacén 1', value: 'WAREHOUSE_1' },
    { label: 'Almacén 2', value: 'WAREHOUSE_2' }
  ];

  movementTypes = [
    { label: 'Ingreso', value: 'IN' },
    { label: 'Salida', value: 'OUT' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.movementForm = this.fb.group({
      product: [null, Validators.required],
      warehouse: [null, Validators.required],
      lot: [''],
      movementType: [null, Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      reference: [''],
      createdAt: [new Date(), Validators.required],
      user: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.movementForm.valid) {
      console.log('Movimiento creado:', this.movementForm.value);
      // Aquí puedes llamar al servicio para guardar en la API
      this.router.navigate(['/inventory-movements']); // regresar a la lista
    }
  }

  onCancel() {
    this.router.navigate(['/inventory-movements']);
  }
}

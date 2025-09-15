import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';

import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-lot',
  imports: [CommonModule,
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    ButtonModule,
    DatePickerModule,
    TagModule],
    
  templateUrl: './create-lot.html',
  styleUrl: './create-lot.css'
})
export class CreateLot {
lotForm: FormGroup;

  // Lista de productos simulada
  products = [
    { label: 'DELL Laptop', value: 'BEV' },
    { label: 'Monitor LG 32 PG', value: 'FOOD' },
    { label: 'Teclado Logitecht', value: 'CLEAN' }
  ];

  // Opciones de estado
  statusOptions = [
    { label: 'Disponible', value: 'AVAILABLE' },
    { label: 'Agotado', value: 'UNAVAILABLE' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.lotForm = this.fb.group({
      product: [null, Validators.required],
      code: ['', Validators.required],
      expirationDate: [null, Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      status: ['AVAILABLE', Validators.required]
    });
  }

  onSubmit() {
    if (this.lotForm.valid) {
      console.log('Lote creado:', this.lotForm.value);
      // Aquí puedes llamar al servicio para guardar en la API
      this.router.navigate(['/lots']); // volver a la lista
    }
  }

  onCancel() {
    this.router.navigate(['/lots']);
  }
}

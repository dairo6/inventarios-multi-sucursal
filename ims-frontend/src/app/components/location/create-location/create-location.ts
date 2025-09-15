import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.html',
  styleUrls: ['./create-location.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    TextareaModule,
    ButtonModule
  ]
})
export class CreateLocation {
  locationForm: FormGroup;

  // Lista de almacenes simulada
  warehouses = [
    { id: 1, name: 'Almacén Central' },
    { id: 2, name: 'Almacén Norte' },
    { id: 3, name: 'Almacén Sur' }
  ];

  // Opciones de estado
  statusOptions = [
    { label: 'Disponible', value: 'AVAILABLE' },
    { label: 'Ocupado', value: 'OCCUPIED' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.locationForm = this.fb.group({
      warehouse: [null, Validators.required],
      code: ['', Validators.required],
      description: [''],
      status: ['AVAILABLE', Validators.required]
    });
  }

  onSubmit() {
    if (this.locationForm.valid) {
      console.log('Ubicación creada:', this.locationForm.value);
      // Aquí puedes llamar al servicio para guardar en la API
      this.router.navigate(['/locations']); // volver a la lista
    }
  }

  onCancel() {
    this.router.navigate(['/locations']);
  }
}

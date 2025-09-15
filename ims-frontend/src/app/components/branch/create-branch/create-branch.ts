import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-create-branch',
  imports: [CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    TagModule,
    SelectModule],
  templateUrl: './create-branch.html',
  styleUrl: './create-branch.css'
})
export class CreateBranch {
branchForm: FormGroup;

  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.branchForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      address: [''],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      status: ['ACTIVE', Validators.required]
    });
  }

  onSubmit() {
    if (this.branchForm.valid) {
      console.log('Sucursal creada:', this.branchForm.value);
      // Aquí se llamaría al servicio para guardar en la API
      this.router.navigate(['/branches']); // volver a la lista
    }
  }

  onCancel() {
    this.router.navigate(['/branches']);
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-create-category',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create-category.html',
  styleUrl: './create-category.css'
})
export class CreateCategory {
  
}

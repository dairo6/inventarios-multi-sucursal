import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { ToastModule, Toast } from 'primeng/toast';
import { StockBranchService } from '../../../services/stock-branch';
import { ProductService } from '../../../services/product';
import { BranchService } from '../../../services/branch';

@Component({
  selector: 'app-update-stock-branch',
  standalone: true,
  providers: [MessageService],
  imports: [ CommonModule,
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    ButtonModule,
    TagModule,
    ToastModule,
    RouterModule
  ],
  templateUrl: './update-stock-branch.html',
  styleUrl: './update-stock-branch.css'
})
export class UpdateStockBranch implements OnInit {
    form: FormGroup;
    stockBranchId: number = 0;
    loading: boolean = false;
    statusOptions = [
      { label: 'Activo', value: 'ACTIVE' },
      { label: 'Inactivo', value: 'INACTIVE' }
    ];

  ProductOptions: { label: string; value: number }[] = [];
  BranchesOptions: { label: string; value: number }[] = [];

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private branchService: BranchService,
    private stockBranchService: StockBranchService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      branch_id: [null, Validators.required],
      product_id: [null, Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      minStock: [0, Validators.required],
      maxStock: [0, Validators.required],
      status: ['ACTIVE', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.stockBranchId = parseInt(id);
      this.loadStockBranches();
    }

    this.loadProducts();
    this.loadBranches();
  }

  loadStockBranches(): void {
    this.loading = true;
    this.stockBranchService.getStockBranchById(this.stockBranchId).subscribe({
      next: (stockBranch) => {
        this.form.patchValue(stockBranch);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading stockBranch:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar el stock de sucursal'
        });
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const stockBranchData = this.form.value;
      this.stockBranchService.updateStockBranch(this.stockBranchId, stockBranchData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Stock actualizado correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/stock-branches']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error updating stockBranch:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el stock de sucursal'
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
    this.router.navigate(['/stock-branches']);
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
      error: (err) => console.error("Error loading stock-branch", err)
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.ProductOptions = data.map((cat: any) => ({
          label: cat.name,
          value: cat.id
        }));
      },
      error: (err) => console.error("Error loading stock-branch", err)
    });
  }

}

import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { SupplierI } from '../../../models/supplier';
import { SupplierService } from '../../../services/supplier';
import { RouterLink } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialogModule, ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-list-supplier',
  imports:
    [
      TableModule,
      TagModule,
      RatingModule,
      ButtonModule,
      CommonModule,
      FormsModule,
      InputTextModule,
      InputText,
      Button,
      RouterLink,
      Toast,
      ConfirmDialogModule,
    ],
  templateUrl: './list-supplier.html',
  styleUrl: './list-supplier.css',
  providers: [MessageService, ConfirmationService]
})
export class ListSupplier {
  suppliers: SupplierI[] = [];
  loading: boolean = false;

  constructor(
    private supplierService: SupplierService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.loading = true;
    this.supplierService.getAllSuppliers().subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
        this.supplierService.updateLocalSuppliers(suppliers);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading suppliers:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los proveedores'
        });
        this.loading = false;
      }
    });
  }

  deleteSupplier(supplier: SupplierI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el proveedor ${supplier.name}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (supplier.id) {
          this.supplierService.deleteSulpplier(supplier.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Proveedor eliminado correctamente'
              });
              this.loadSuppliers();
            },
            error: (error) => {
              console.error('Error deleting supplier:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar el proveedor'
              });
            }
          });
        }
      }
    });
  }
}

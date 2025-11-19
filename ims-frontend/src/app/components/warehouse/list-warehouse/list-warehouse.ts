import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';  
import { InputTextModule } from 'primeng/inputtext';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { WarehouseI } from '../../../models/warehouse';
import { WarehouseService } from '../../../services/warehouse';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialogModule, ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-list-warehouse',
  imports: [TableModule, 
    TagModule, 
    RatingModule, 
    ButtonModule, 
    CommonModule, 
    FormsModule, 
    InputTextModule, 
    InputText, 
    Button, 
    RouterModule, 
    Toast,
    ConfirmDialogModule
  ],
  templateUrl: './list-warehouse.html',
  providers: [MessageService, ConfirmationService] ,
  styleUrl: './list-warehouse.css'
})
export class ListWarehouse implements OnInit {
  warehouses: WarehouseI[] = [];
  loading: boolean = false;
  

  constructor(
    private warehouseService: WarehouseService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadWarehouses();
  }

  loadWarehouses(): void {
    this.loading = true;
    this.warehouseService.getAllWarehouses().subscribe({
      next: (warehouses) => {
        this.warehouses = warehouses;
        this.warehouseService.updateLocalWarehouses(warehouses);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading warehouses:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los almacenes'
        });
        this.loading = false;
      }
    });
  }

  deleteWarehouse(warehouse: WarehouseI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el almacen ${warehouse.name}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (warehouse.id) {
          this.warehouseService.deleteWarehouse(warehouse.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Almacen eliminado correctamente'
              });
              this.loadWarehouses();
            },
            error: (error) => {
              console.error('Error deleting warehouse:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar el almacen'
              });
            }
          });
        }
      }
    });
  }
}

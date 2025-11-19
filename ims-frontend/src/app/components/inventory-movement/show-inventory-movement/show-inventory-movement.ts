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
import { InventoryMovementI } from '../../../models/inventoryMovement';
import { InventoryMovementService } from '../../../services/inventory-movement';
import { RouterLink, RouterModule } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialogModule, ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-show-inventory-movement',
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
    ConfirmDialogModule,
  ],
  templateUrl: './show-inventory-movement.html',
  styleUrl: './show-inventory-movement.css',
  standalone: true,
  providers: [MessageService, ConfirmationService] 
})
export class ShowInventoryMovement  implements OnInit {
  movements: InventoryMovementI[] = [];
  loading: boolean = false;
  

  constructor(
    private inventoryMovementService: InventoryMovementService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadMovements();
  }

loadMovements(): void {
    this.loading = true;
    this.inventoryMovementService.getAllInventoryMovements().subscribe({
      next: (movements) => {
        this.movements = movements;
        this.inventoryMovementService.updateLocalInventoryMovements(movements);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading movements:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los movimientos de inventario'
        });
        this.loading = false;
      }
    });
  }

  deleteMovement(movement: InventoryMovementI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar este movimiento?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (movement.id) {
          this.inventoryMovementService.deleteInventoryMovement(movement.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Movimiento eliminado correctamente'
              });
              this.loadMovements();
            },
            error: (error) => {
              console.error('Error deleting movement:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar el movimiento'
              });
            }
          });
        }
      }
    });
  }
}

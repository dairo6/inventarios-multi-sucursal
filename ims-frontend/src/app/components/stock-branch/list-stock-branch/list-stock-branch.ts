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
import { StockBranchI } from '../../../models/stockBranch';
import { StockBranchService } from '../../../services/stock-branch';
import { RouterLink, RouterModule } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialogModule, ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-list-stock-branch',
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
  templateUrl: './list-stock-branch.html',
  styleUrl: './list-stock-branch.css',
  standalone: true,
  providers: [MessageService, ConfirmationService] 
})
export class ListStockBranch implements OnInit {
  stockBranches: StockBranchI[] = [];
  loading: boolean = false;
  

  constructor(
    private stockBranchService: StockBranchService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadstockBranches();
  }

loadstockBranches(): void {
    this.loading = true;
    this.stockBranchService.getAllStockBranches().subscribe({
      next: (stockBranches) => {
        this.stockBranches = stockBranches;
        this.stockBranchService.updateLocalStockBranches(stockBranches);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading stockBranches:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los stock de sucursales'
        });
        this.loading = false;
      }
    });
  }

  deleteStockBranch(stockBranch: StockBranchI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar este stock de sucursal?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (stockBranch.id) {
          this.stockBranchService.deleteStockBranch(stockBranch.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Stock eliminado correctamente'
              });
              this.loadstockBranches();
            },
            error: (error) => {
              console.error('Error deleting stockBranch:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar el stock'
              });
            }
          });
        }
      }
    });
  }
}

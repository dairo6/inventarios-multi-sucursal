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
import { LotI } from '../../../models/lot';
import { LotService } from '../../../services/lot';
import { RouterLink, RouterModule } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialogModule, ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-list-lot',
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
  templateUrl: './list-lot.html',
  styleUrl: './list-lot.css',
  standalone: true,
  providers: [MessageService, ConfirmationService]
})
export class ListLot implements OnInit {
  lots: LotI[] = [];
  loading: boolean = false;
  

  constructor(
    private lotService: LotService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadLots();
  }

loadLots(): void {
    this.loading = true;
    this.lotService.getAllLots().subscribe({
      next: (lots) => {
        this.lots = lots;
        this.lotService.updateLocalLots(lots);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading lots:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar lo s lotes'
        });
        this.loading = false;
      }
    });
  }

  deleteLot(lot: LotI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar este lote?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (lot.id) {
          this.lotService.deleteLot(lot.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'lote eliminado correctamente'
              });
              this.loadLots();
            },
            error: (error) => {
              console.error('Error deleting lot:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar el lote'
              });
            }
          });
        }
      }
    });
  }
}

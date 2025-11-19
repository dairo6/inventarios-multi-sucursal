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
import { GuaranteeI } from '../../../models/guarantee';
import { GuaranteeService } from '../../../services/guarantee';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialogModule, ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-list-guarantee',
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
  templateUrl: './list-guarantee.html',
  styleUrl: './list-guarantee.css',
  standalone: true,
  providers: [MessageService, ConfirmationService] 
})
export class ListGuarantee implements OnInit {
  guarantees: GuaranteeI[] = [];
  loading: boolean = false;
  

  constructor(
    private guaranteeService: GuaranteeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadGuarantees();
  }

loadGuarantees(): void {
    this.loading = true;
    this.guaranteeService.getAllGuatantees().subscribe({
      next: (guarantees) => {
        this.guarantees = guarantees;
        this.guaranteeService.updateLocalGuatantees(guarantees);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading guarantees:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar las garantías'
        });
        this.loading = false;
      }
    });
  }

  deleteGuarantee(guarantee: GuaranteeI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar esta garantía?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (guarantee.id) {
          this.guaranteeService.deleteGuatantee(guarantee.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Garantía eliminado correctamente'
              });
              this.loadGuarantees();
            },
            error: (error) => {
              console.error('Error deleting guarantee:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar la garantía'
              });
            }
          });
        }
      }
    });
  }
}

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
import { BranchI } from '../../../models/branch';
import { BranchService } from '../../../services/branch';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialogModule, ConfirmDialog } from 'primeng/confirmdialog';


@Component({
  selector: 'app-list-branch',
  standalone: true,
  imports: [
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
  templateUrl: './list-branch.html',
  styleUrls: ['./list-branch.css'],
  providers: [MessageService, ConfirmationService] 
})
export class ListBranch implements OnInit {
  branches: BranchI[] = [];
  loading: boolean = false;
  

  constructor(
    private branchService: BranchService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadBranches();
  }

loadBranches(): void {
    this.loading = true;
    this.branchService.getAllBranches().subscribe({
      next: (branches) => {
        this.branches = branches;
        this.branchService.updateLocalBranches(branches);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading clients:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los clientes'
        });
        this.loading = false;
      }
    });
  }

  deleteBranch(branch: BranchI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la sucursal ${branch.name}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (branch.id) {
          this.branchService.deleteBranch(branch.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Sucursal eliminada correctamente'
              });
              this.loadBranches();
            },
            error: (error) => {
              console.error('Error deleting branch:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar la sucursal'
              });
            }
          });
        }
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CategoryI } from '../../../models/category';
import { CategoryService } from '../../../services/category';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialogModule, ConfirmDialog } from 'primeng/confirmdialog';


@Component({
  selector: 'app-list-category',
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
  templateUrl: './list-category.html',
  styleUrl: './list-category.css',
  providers: [MessageService, ConfirmationService]
})
export class ListCategory implements OnInit {
  categories: CategoryI[] = [];
  loading: boolean = false;
  

  constructor(
    private categoryService: CategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

loadCategories(): void {
    this.loading = true;
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.categoryService.updateLocalCategories(categories);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading Categories:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar las categorias'
        });
        this.loading = false;
      }
    });
  }

  deleteCategory(category: CategoryI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la categoria ${category.name}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (category.id) {
          this.categoryService.deleteCategory(category.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Categoria eliminada correctamente'
              });
              this.loadCategories();
            },
            error: (error) => {
              console.error('Error deleting category:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar la categoria'
              });
            }
          });
        }
      }
    });
  }
}

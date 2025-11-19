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
import { LocationI } from '../../../models/location';
import { LocationService } from '../../../services/location';
import { RouterModule } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialogModule, ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-list-location',
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
    RouterModule, 
    Toast,
    ConfirmDialogModule,
  ],
  templateUrl: './list-location.html',
  styleUrl: './list-location.css',
  standalone: true,
  providers: [MessageService, ConfirmationService]
})
export class ListLocation implements OnInit {
  locations: LocationI[] = [];
  loading: boolean = false;
  

  constructor(
    private locationService: LocationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadLocations();
  }

loadLocations(): void {
    this.loading = true;
    this.locationService.getAllLocations().subscribe({
      next: (locations) => {
        this.locations = locations;
        this.locationService.updateLocalLocations(locations);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading locations:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar las unicaciones'
        });
        this.loading = false;
      }
    });
  }

  deleteLocation(guarantee: LocationI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar esta ubicacion?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (guarantee.id) {
          this.locationService.deleteLocation(guarantee.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Ubicacion eliminada correctamente'
              });
              this.loadLocations();
            },
            error: (error) => {
              console.error('Error deleting location:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar la ubicacion'
              });
            }
          });
        }
      }
    });
  }
}

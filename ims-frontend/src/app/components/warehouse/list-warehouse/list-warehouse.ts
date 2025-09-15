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
import { WarehouseI } from '../../../models/warehouse';
import { WarehouseService } from '../../../services/warehouse';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-warehouse',
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule, FormsModule, InputTextModule, InputText, Button, RouterLink],
  templateUrl: './list-warehouse.html',
  styleUrl: './list-warehouse.css'
})
export class ListWarehouse {
  warehouses: WarehouseI[] = [];

  constructor(private warehouseService: WarehouseService) {
    this.warehouseService.warehouses$.subscribe(warehouses => {
      this.warehouses = warehouses;
    });
  }
}

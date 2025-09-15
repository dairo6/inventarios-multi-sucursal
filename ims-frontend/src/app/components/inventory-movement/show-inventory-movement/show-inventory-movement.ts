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
import { InventoryMovementI } from '../../../models/inventoryMovement';
import { InventoryMovementService } from '../../../services/inventory-movement';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-show-inventory-movement',
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule, FormsModule, InputTextModule, InputText, Button, RouterLink],
  templateUrl: './show-inventory-movement.html',
  styleUrl: './show-inventory-movement.css'
})
export class ShowInventoryMovement {
  movements: InventoryMovementI[] = [];

  constructor(private inventoryMovementService: InventoryMovementService) {
    this.inventoryMovementService.movements$.subscribe(movements => {
      this.movements = movements;
    });
  }
}

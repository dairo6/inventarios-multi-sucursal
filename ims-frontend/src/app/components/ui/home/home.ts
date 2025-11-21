import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';
import { InventoryMovementService } from '../../../services/inventory-movement';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ButtonModule, CardModule, TagModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  loading = false;
  recentMovements: any[] = [];

  constructor(
    private inventoryMovementService: InventoryMovementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRecentMovements();
  }

  loadRecentMovements(): void {
    this.loading = true;
    this.inventoryMovementService.getAllInventoryMovements().subscribe({
      next: (data: any[]) => {
        // ordena por createdAt descendente y toma los 6 primeros
        this.recentMovements = (data || [])
          .slice()
          .sort((a,b) => (new Date(b.createdAt).getTime()) - (new Date(a.createdAt).getTime()))
          .slice(0, 6);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading movements', err);
        this.loading = false;
      }
    });
  }

  goToNewMovement(): void {
    this.router.navigate(['/inventory-movements/create']);
  }
}

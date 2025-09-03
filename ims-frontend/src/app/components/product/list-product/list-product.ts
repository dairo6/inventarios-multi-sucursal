import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule, FormsModule],
  templateUrl: './list-product.html',
  styleUrls: ['./list-product.css']
})
export class ListProduct {
  products: any[] = [];

  constructor() {
    this.products = [
      {
        name: 'Bamboo Watch',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        rating: 5,
        inventoryStatus: 'INSTOCK'
      },
      {
        name: 'Black Watch',
        image: 'black-watch.jpg',
        price: 72,
        category: 'Accessories',
        rating: 4,
        inventoryStatus: 'LOWSTOCK'
      },
      {
        name: 'Blue Band',
        image: 'blue-band.jpg',
        price: 79,
        category: 'Fitness',
        rating: 3,
        inventoryStatus: 'OUTOFSTOCK'
      },
      {
        name: 'Blue Band',
        image: 'blue-band.jpg',
        price: 79,
        category: 'Fitness',
        rating: 3,
        inventoryStatus: 'OUTOFSTOCK'
      },
      {
        name: 'Bamboo Watch',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        rating: 5,
        inventoryStatus: 'INSTOCK'
      },
    ];
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }
}

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
import { RouterModule } from '@angular/router';
import { ProductI } from '../../../models/product';
import { ProductService } from '../../../services/product';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [
    TableModule, TagModule, RatingModule, 
    ButtonModule, CommonModule, FormsModule, InputTextModule, InputText, Button, RouterModule ],
  templateUrl: './list-product.html',
  styleUrls: ['./list-product.css']
})
export class ListProduct {
  products: ProductI[] = [];

  constructor(private productService: ProductService) {
    this.productService.products$.subscribe(products => {
      this.products = products;
    });
  }
}

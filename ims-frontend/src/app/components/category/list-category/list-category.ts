import { Component } from '@angular/core';
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


@Component({
  selector: 'app-list-category',
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule, FormsModule, InputTextModule, InputText, Button, RouterLink],
  templateUrl: './list-category.html',
  styleUrl: './list-category.css'
})
export class ListCategory {
  
  categories: CategoryI[] = [];

  constructor(private categoryService: CategoryService) {
    this.categoryService.categories$.subscribe(categories => {
      this.categories = categories;
    });
  }

}

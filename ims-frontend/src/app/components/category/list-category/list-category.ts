import { Component } from '@angular/core';

import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CategoryI } from '../../../models/category';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-list-category',
  imports: [TableModule, CommonModule, ButtonModule, RouterModule],
  templateUrl: './list-category.html',
  styleUrl: './list-category.css'
})
export class ListCategory {
  
  categories: CategoryI[] = [
    {
      id: 1,
      name: "Tecnologia",
      status: "ACTIVE"
    },
    {
      id: 2,
      name: "Electrodomesticos",
      status: "ACTIVE"
    },
    {
      id: 3,
      name: "Accesorios",
      status: "ACTIVE",
    },
    {
      id: 4,
      name: "Fitness",
      status: "ACTIVE",
    },
    {
      id: 5,
      name: "Suplementos",
      status: "ACTIVE",
    },
    {
      id: 6,
      name: "Bebidas",
      status: "ACTIVE",
    },
  ];

}

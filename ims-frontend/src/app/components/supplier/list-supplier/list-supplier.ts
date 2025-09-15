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
import { SupplierI } from '../../../models/supplier';
import { SupplierService } from '../../../services/supplier';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-list-supplier',
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule, FormsModule, InputTextModule, InputText, Button, RouterLink],
  templateUrl: './list-supplier.html',
  styleUrl: './list-supplier.css'
})
export class ListSupplier {
  suppliers: SupplierI[] = [];
  
    constructor(private supplierService: SupplierService) {
      this.supplierService.suppliers$.subscribe(suppliers => {
        this.suppliers = suppliers;
      });
    }
}

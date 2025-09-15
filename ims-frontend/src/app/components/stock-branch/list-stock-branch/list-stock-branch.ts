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
import { StockBranchI } from '../../../models/stockBranch';
import { StockBranchService } from '../../../services/stock-branch';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-stock-branch',
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule, FormsModule, InputTextModule, InputText, Button, RouterLink],
  templateUrl: './list-stock-branch.html',
  styleUrl: './list-stock-branch.css'
})
export class ListStockBranch {
  stockBranches: StockBranchI[] = [];

  constructor(private stockBranchService: StockBranchService) {
    this.stockBranchService.stockBranches$.subscribe(stockBranches => {
      this.stockBranches = stockBranches;
    });
  }
}

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
import { LotI } from '../../../models/lot';
import { LotService } from '../../../services/lot';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-lot',
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule, FormsModule, InputTextModule, InputText, Button, RouterLink],
  templateUrl: './list-lot.html',
  styleUrl: './list-lot.css'
})
export class ListLot {
  lots: LotI[] = [];

  constructor(private lotService: LotService) {
    this.lotService.lots$.subscribe(lots => {
      this.lots = lots;
    });
  }
}

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
import { GuaranteeI } from '../../../models/guarantee';
import { GuaranteeService } from '../../../services/guarantee';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-list-guarantee',
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule, FormsModule, InputTextModule, InputText, Button, RouterLink],
  templateUrl: './list-guarantee.html',
  styleUrl: './list-guarantee.css'
})
export class ListGuarantee {
  guarantees: GuaranteeI[] = [];

  constructor(private guaranteeService: GuaranteeService) {
    this.guaranteeService.guarantees$.subscribe(guarantees => {
      this.guarantees = guarantees;
    });
  }
}

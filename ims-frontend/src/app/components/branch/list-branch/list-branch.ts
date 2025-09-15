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
import { BranchI } from '../../../models/branch';
import { BranchService } from '../../../services/branch';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-branch',
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule, FormsModule, InputTextModule, InputText, Button, RouterLink],
  templateUrl: './list-branch.html',
  styleUrl: './list-branch.css'
})
export class ListBranch {
  branches: BranchI[] = [];

  constructor(private branchService: BranchService) {
    this.branchService.branches$.subscribe(branches => {
      this.branches = branches;
    });
  }
}

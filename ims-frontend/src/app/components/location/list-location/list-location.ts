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
import { LocationI } from '../../../models/location';
import { LocationService } from '../../../services/location';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-location',
  imports: [
    TableModule, TagModule, RatingModule, 
    ButtonModule, CommonModule, FormsModule, 
    InputTextModule, InputText, Button, RouterModule
  ],
  templateUrl: './list-location.html',
  styleUrl: './list-location.css'
})
export class ListLocation {
  locations: LocationI[] = [];

  constructor(private locationService: LocationService) {
    this.locationService.locations$.subscribe(locations => {
      this.locations = locations;
    });
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocationI } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private locationsService = new BehaviorSubject<LocationI[]>([
    {
      id: 1,
      warehouse: 'Central',
      code: 'PAS-A1',
      description: 'Pasillo A, Estante 1',
      status: 'AVAILABLE'
    },
    {
      id: 2,
      warehouse: 'Central',
      code: 'PAS-A2',
      description: 'Pasillo A, Estante 2',
      status: 'OCCUPIED'
    },
    {
      id: 3,
      warehouse: 'Sucursal Norte',
      code: 'PAS-B1',
      description: 'Pasillo B, Estante 1',
      status: 'BLOCKED'
    }
  ]);

  locations$ = this.locationsService.asObservable();

  getLocations() {
    return this.locationsService.value;
  }

  addLocation(location: LocationI) {
    const locations = this.locationsService.value;
    location.id = locations.length ? Math.max(...locations.map(l => l.id ?? 0)) + 1 : 1;
    this.locationsService.next([...locations, location]);
  }

  updateLocation(updatedLocation: LocationI) {
    const locations = this.locationsService.value.map(l =>
      l.id === updatedLocation.id ? { ...l, ...updatedLocation } : l
    );
    this.locationsService.next(locations);
  }

  deleteLocation(id: number) {
    const locations = this.locationsService.value.filter(l => l.id !== id);
    this.locationsService.next(locations);
  }
}

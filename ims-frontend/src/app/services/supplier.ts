import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupplierI } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private suppliersService = new BehaviorSubject<SupplierI[]>([
    {
      id: 1,
      name: 'Proveedor A',
      taxId: '900123456-7',
      contactName: 'Carlos Pérez',
      phone: '3001234567',
      email: 'proveedora@mail.com',
      address: 'Calle 10 #20-30',
      status: 'ACTIVE',
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-01-10')
    },
    {
      id: 2,
      name: 'Proveedor B',
      taxId: '800987654-3',
      contactName: 'María Gómez',
      phone: '3017654321',
      email: 'proveedorb@mail.com',
      address: 'Cra 15 #40-22',
      status: 'INACTIVE',
      createdAt: new Date('2025-02-01'),
      updatedAt: new Date('2025-02-05')
    },
    {
      id: 3,
      name: 'Proveedor C',
      taxId: '900456789-0',
      contactName: 'Luis Torres',
      phone: '3021112233',
      email: 'proveedorc@mail.com',
      address: 'Av. Libertador 100',
      status: 'ACTIVE',
      createdAt: new Date('2025-03-01'),
      updatedAt: new Date('2025-03-10')
    }
  ]);

  suppliers$ = this.suppliersService.asObservable();

  getSuppliers() {
    return this.suppliersService.value;
  }

  addSupplier(supplier: SupplierI) {
    const suppliers = this.suppliersService.value;
    supplier.id = suppliers.length ? Math.max(...suppliers.map(s => s.id ?? 0)) + 1 : 1;
    supplier.createdAt = new Date();
    supplier.updatedAt = new Date();
    this.suppliersService.next([...suppliers, supplier]);
  }
}

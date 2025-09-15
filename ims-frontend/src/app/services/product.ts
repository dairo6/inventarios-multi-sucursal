import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ProductI } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsService = new BehaviorSubject<ProductI[]>([
    {
      id: 1,
      name: 'Laptop Dell XPS 13',
      code: 'PROD-001',
      description: 'Ultrabook con pantalla 13.4" FHD',
      price: 1200,
      unit: 'unidad',
      category: 'tecnologia',
      supplier: 'DELL',
      status: 'ACTIVE',
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-01-10')
    },
    {
      id: 2,
      name: 'Teclado Mecánico Logitech',
      code: 'PROD-002',
      description: 'Teclado gamer con switches rojos',
      price: 150,
      unit: 'unidad',
      category: 'tecnologia',
      supplier: 'Logitech',
      status: 'ACTIVE',
      createdAt: new Date('2025-02-01'),
      updatedAt: new Date('2025-02-15')
    },
    {
      id: 3,
      name: 'Monitor LG 27"',
      code: 'PROD-003',
      description: 'Monitor IPS 4K UHD',
      price: 350,
      unit: 'unidad',
      category: 'tecnologia',
      supplier: 'LG',
      status: 'INACTIVE',
      createdAt: new Date('2025-03-05'),
      updatedAt: new Date('2025-03-10')
    },
    {
      id: 4,
      name: 'Monitor HP 27"',
      code: 'PROD-003',
      description: 'Monitor IPS 4K UHD',
      price: 350,
      unit: 'unidad',
      category: 'tecnologia',
      supplier: 'HP',
      status: 'INACTIVE',
      createdAt: new Date('2025-03-05'),
      updatedAt: new Date('2025-03-10')
    }
  ]);

  products$ = this.productsService.asObservable();

  getProducts() {
    return this.productsService.value;
  }

  addProduct(product: ProductI) {
    const products = this.productsService.value;
    product.id = products.length ? Math.max(...products.map(p => p.id ?? 0)) + 1 : 1;
    product.createdAt = new Date();
    product.updatedAt = new Date();
    this.productsService.next([...products, product]);
  }
}

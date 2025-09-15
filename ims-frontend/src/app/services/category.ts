import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoryI } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // Datos estáticos iniciales
  private categoriesService = new BehaviorSubject<CategoryI[]>([
    {
      id: 1,
      name: 'Tecnologia',
      status: 'ACTIVE'
    },
    {
      id: 2,
      name: 'Snacks',
      status: 'ACTIVE'
    },
    {
      id: 3,
      name: 'Electrodomésticos',
      status: 'INACTIVE'
    }
  ]);

  // Observable al que se pueden suscribir los componentes
  categories$ = this.categoriesService.asObservable();

  // Obtener la lista actual
  getCategories() {
    return this.categoriesService.value;
  }

  // Agregar una nueva categoría
  addCategory(category: CategoryI) {
    const categories = this.categoriesService.value;
    category.id = categories.length
      ? Math.max(...categories.map(c => c.id ?? 0)) + 1
      : 1;
    this.categoriesService.next([...categories, category]);
  }
}

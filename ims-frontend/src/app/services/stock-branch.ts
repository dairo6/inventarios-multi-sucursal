import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StockBranchI } from '../models/stockBranch';

@Injectable({
  providedIn: 'root'
})
export class StockBranchService {

  private stockBranchesService = new BehaviorSubject<StockBranchI[]>([
    {
      id: 1,
      branch: 'Sucursal Principal',
      product: 'Laptop Dell XPS 13',
      quantity: 25,
      minStock: 10,
      maxStock: 50,
      status: "ACTIVE",
      updatedAt: new Date('2025-01-05')
    },
    {
      id: 2,
      branch: 'Sucursal Norte',
      product: 'Teclado Mecánico Logitech',
      quantity: 8,
      minStock: 5,
      maxStock: 20,
      status: "ACTIVE",
      updatedAt: new Date('2025-02-10')
    },
    {
      id: 3,
      branch: 'Sucursal Centro',
      product: 'Monitor LG 27"',
      quantity: 40,
      minStock: 15,
      maxStock: 60,
      status: "INACTIVE",
      updatedAt: new Date('2025-03-12')
    }
  ]);

  stockBranches$ = this.stockBranchesService.asObservable();

  getStockBranches() {
    return this.stockBranchesService.value;
  }

  addStockBranch(stockBranch: StockBranchI) {
    const stockBranches = this.stockBranchesService.value;
    stockBranch.id = stockBranches.length ? Math.max(...stockBranches.map(s => s.id ?? 0)) + 1 : 1;
    stockBranch.updatedAt = new Date();
    this.stockBranchesService.next([...stockBranches, stockBranch]);
  }

  updateStockBranch(updatedStockBranch: StockBranchI) {
    const stockBranches = this.stockBranchesService.value.map(s =>
      s.id === updatedStockBranch.id ? { ...s, ...updatedStockBranch, updatedAt: new Date() } : s
    );
    this.stockBranchesService.next(stockBranches);
  }

  deleteStockBranch(id: number) {
    const stockBranches = this.stockBranchesService.value.filter(s => s.id !== id);
    this.stockBranchesService.next(stockBranches);
  }
}


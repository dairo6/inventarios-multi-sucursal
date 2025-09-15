import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LotI } from '../models/lot';

@Injectable({
  providedIn: 'root'
})
export class LotService {

  private lotsService = new BehaviorSubject<LotI[]>([
    {
      id: 1,
      product: 'Laptop Dell XPS 13',
      code: 'LOT-001',
      expirationDate: new Date('2026-01-01'),
      quantity: 100,
      status: 'AVAILABLE',
      createdAt: new Date('2025-01-01')
    },
    {
      id: 2,
      product: 'Teclado Mecánico Logitech',
      code: 'LOT-002',
      expirationDate: new Date('2025-06-15'),
      quantity: 50,
      status: 'EXPIRED',
      createdAt: new Date('2025-02-10')
    },
    {
      id: 3,
      product: 'Monitor LG 27"',
      code: 'LOT-003',
      expirationDate: new Date('2025-12-20'),
      quantity: 200,
      status: 'BLOCKED',
      createdAt: new Date('2025-03-05')
    },
    {
      id: 4,
      product: 'Monitor LG 32"',
      code: 'LOT-004',
      expirationDate: new Date('2025-12-20'),
      quantity: 250,
      status: 'AVAILABLE',
      createdAt: new Date('2025-03-05')
    }
  ]);

  lots$ = this.lotsService.asObservable();

  getLots() {
    return this.lotsService.value;
  }

  addLot(lot: LotI) {
    const lots = this.lotsService.value;
    lot.id = lots.length ? Math.max(...lots.map(l => l.id ?? 0)) + 1 : 1;
    lot.createdAt = new Date();
    this.lotsService.next([...lots, lot]);
  }

  updateLot(updatedLot: LotI) {
    const lots = this.lotsService.value.map(l =>
      l.id === updatedLot.id ? { ...l, ...updatedLot } : l
    );
    this.lotsService.next(lots);
  }

  deleteLot(id: number) {
    const lots = this.lotsService.value.filter(l => l.id !== id);
    this.lotsService.next(lots);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InventoryMovementI } from '../models/inventoryMovement';

@Injectable({
  providedIn: 'root'
})
export class InventoryMovementService {

  private movementsService = new BehaviorSubject<InventoryMovementI[]>([
    {
      id: 1,
      product: 'Laptop Dell XPS 13',
      warehouse: 'Central',
      lot: 'LOT-001',
      movementType: 'IN',
      quantity: 50,
      reference: 'Compra #1001',
      createdAt: new Date('2025-01-10'),
      user: 'admin'
    },
    {
      id: 2,
      product: 'Teclado Mecánico Logitech',
      warehouse: 'Sucursal Norte',
      movementType: 'OUT',
      quantity: 10,
      reference: 'Factura #2001',
      createdAt: new Date('2025-02-05'),
      user: 'jdoe'
    },
    {
      id: 3,
      product: 'Monitor LG 27"',
      warehouse: 'Central',
      lot: 'LOT-003',
      movementType: 'TRANSFER',
      quantity: 5,
      reference: 'Transferencia a Sucursal Sur',
      createdAt: new Date('2025-03-01'),
      user: 'admin'
    }
  ]);

  movements$ = this.movementsService.asObservable();

  getMovements() {
    return this.movementsService.value;
  }

  addMovement(movement: InventoryMovementI) {
    const movements = this.movementsService.value;
    movement.id = movements.length ? Math.max(...movements.map(m => m.id ?? 0)) + 1 : 1;
    movement.createdAt = new Date();
    this.movementsService.next([...movements, movement]);
  }

  updateMovement(updatedMovement: InventoryMovementI) {
    const movements = this.movementsService.value.map(m =>
      m.id === updatedMovement.id ? { ...m, ...updatedMovement } : m
    );
    this.movementsService.next(movements);
  }

  deleteMovement(id: number) {
    const movements = this.movementsService.value.filter(m => m.id !== id);
    this.movementsService.next(movements);
  }
}

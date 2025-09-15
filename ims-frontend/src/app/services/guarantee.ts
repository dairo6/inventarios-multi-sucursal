import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GuaranteeI } from '../models/guarantee';

@Injectable({
  providedIn: 'root'
})
export class GuaranteeService {

  private guaranteesService = new BehaviorSubject<GuaranteeI[]>([
    {
      id: 1,
      product: 'Laptop Dell XPS 13',
      description: 'Garantía estándar de 12 meses para laptop',
      durationMonths: 12,
      terms: 'Cubre defectos de fabricación únicamente',
      status: 'ACTIVE',
      createdAt: new Date('2025-01-01')
    },
    {
      id: 2,
      product: 'Teclado Mecánico Logitech',
      description: 'Garantía de 6 meses para teclado',
      durationMonths: 6,
      terms: 'No cubre daños por mal uso',
      status: 'EXPIRED',
      createdAt: new Date('2025-02-01')
    },
    {
      id: 3,
      product: 'Monitor LG 27"',
      description: 'Garantía extendida de 24 meses para monitor',
      durationMonths: 24,
      terms: 'Incluye servicio técnico a domicilio',
      status: 'ACTIVE',
      createdAt: new Date('2025-03-05')
    }
  ]);

  guarantees$ = this.guaranteesService.asObservable();

  getGuarantees() {
    return this.guaranteesService.value;
  }

  addGuarantee(guarantee: GuaranteeI) {
    const guarantees = this.guaranteesService.value;
    guarantee.id = guarantees.length ? Math.max(...guarantees.map(g => g.id ?? 0)) + 1 : 1;
    guarantee.createdAt = new Date();
    this.guaranteesService.next([...guarantees, guarantee]);
  }

  updateGuarantee(updatedGuarantee: GuaranteeI) {
    const guarantees = this.guaranteesService.value.map(g =>
      g.id === updatedGuarantee.id ? { ...g, ...updatedGuarantee } : g
    );
    this.guaranteesService.next(guarantees);
  }

  deleteGuarantee(id: number) {
    const guarantees = this.guaranteesService.value.filter(g => g.id !== id);
    this.guaranteesService.next(guarantees);
  }
}

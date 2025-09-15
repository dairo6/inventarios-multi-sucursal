import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BranchI } from '../models/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private branchesService = new BehaviorSubject<BranchI[]>([
    {
      id: 1,
      name: 'Sucursal Central',
      code: 'BR-001',
      address: 'Calle 123 #45-67, Ciudad Central',
      phone: '3001234567',
      email: 'central@empresa.com',
      status: 'ACTIVE',
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-01-10')
    },
    {
      id: 2,
      name: 'Sucursal Norte',
      code: 'BR-002',
      address: 'Av. 10 #20-30, Ciudad Norte',
      phone: '3109876543',
      email: 'norte@empresa.com',
      status: 'ACTIVE',
      createdAt: new Date('2025-02-01'),
      updatedAt: new Date('2025-02-05')
    },
    {
      id: 3,
      name: 'Sucursal Sur',
      code: 'BR-003',
      address: 'Cra. 50 #60-70, Ciudad Sur',
      phone: '3205558899',
      email: 'sur@empresa.com',
      status: 'INACTIVE',
      createdAt: new Date('2025-03-01'),
      updatedAt: new Date('2025-03-10')
    }
  ]);

  branches$ = this.branchesService.asObservable();

  getBranches() {
    return this.branchesService.value;
  }

  addBranch(branch: BranchI) {
    const branches = this.branchesService.value;
    branch.id = branches.length ? Math.max(...branches.map(b => b.id ?? 0)) + 1 : 1;
    branch.createdAt = new Date();
    branch.updatedAt = new Date();
    this.branchesService.next([...branches, branch]);
  }

  updateBranch(updatedBranch: BranchI) {
    const branches = this.branchesService.value.map(b =>
      b.id === updatedBranch.id ? { ...b, ...updatedBranch, updatedAt: new Date() } : b
    );
    this.branchesService.next(branches);
  }

  deleteBranch(id: number) {
    const branches = this.branchesService.value.filter(b => b.id !== id);
    this.branchesService.next(branches);
  }
}

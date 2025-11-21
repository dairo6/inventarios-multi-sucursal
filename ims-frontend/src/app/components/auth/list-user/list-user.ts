import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    SelectModule,
    ButtonModule
  ],
  templateUrl: './list-user.html',
  styleUrl: './list-user.css'
})
export class ListUser implements OnInit {

  users: any[] = [];
  roles: any[] = [];

  selectedUser: any = null;
  selectedRoleId: number | null = null;

  showRoleModal: boolean = false;   // 👈 NECESARIO PARA EL p-dialog
  loading = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe({
      next: res => this.users = res,
      error: err => console.error(err)
    });
  }

  loadRoles() {
    this.authService.getAllRoles().subscribe({
      next: res => this.roles = res,
      error: err => console.error(err)
    });
  }

  openRoleModal(user: any) {
    this.selectedUser = user;
    this.selectedRoleId = user.RoleUsers?.[0]?.Role?.id ?? null;
    this.showRoleModal = true;  // 👈 AHORA SÍ SE ABRE EL MODAL
  }

  assignRole() {
    if (!this.selectedUser || !this.selectedRoleId) return;

    this.loading = true;

    this.authService.assignRoleToUser(this.selectedUser.id, this.selectedRoleId).subscribe({
      next: () => {
        this.loading = false;
        this.loadUsers();
        this.closeModal();
      },
      error: err => {
        this.loading = false;
        console.error(err);
      }
    });
  }

  closeModal() {
    this.showRoleModal = false;
    this.selectedUser = null;
    this.selectedRoleId = null;
  }
}

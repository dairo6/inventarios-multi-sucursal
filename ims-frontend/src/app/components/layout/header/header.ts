import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { Button } from 'primeng/button';
import { Image } from 'primeng/image';
import { Avatar } from 'primeng/avatar';
import { Menu } from 'primeng/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Menubar, Button, Image, Avatar, Menu, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  @Output() asideToggled = new EventEmitter<void>();

  items: MenuItem[] = [];
  userMenuItems: MenuItem[] = [];

 

  ngOnInit() {
    this.userMenuItems = [
      { label: 'Settings', icon: 'pi pi-cog' },
      { label: 'Logout', icon: 'pi pi-sign-out' }
    ];
  }
}


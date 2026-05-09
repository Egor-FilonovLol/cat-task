import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div *ngIf="auth.isAuthenticated()" style="background:#333; padding:10px; display:flex; gap:15px;">
      <a routerLink="/cats" style="color:white; text-decoration:none;">🐱 Мои коты</a>
      <a routerLink="/chat/general" style="color:white; text-decoration:none;">💬 Чат</a>
      <button (click)="logout()" style="background:red; color:white; border:none; padding:5px 10px; cursor:pointer;">Выйти</button>
    </div>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {}
  
  ngOnInit() {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }
  
  logout() { 
    this.auth.logout();
  }
}
// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="max-width:300px; margin:50px auto; padding:20px; border:1px solid #ddd; border-radius:8px;">
      <h2 style="text-align:center;">Вход для заводчика</h2>
      <input 
        type="text" 
        [(ngModel)]="username" 
        placeholder="Имя пользователя" 
        style="width:100%; padding:8px; margin:10px 0; box-sizing:border-box;">
      <input 
        type="password" 
        [(ngModel)]="password" 
        placeholder="Пароль" 
        style="width:100%; padding:8px; margin:10px 0; box-sizing:border-box;">
      <button 
        (click)="login()" 
        style="width:100%; padding:10px; background:#007bff; color:white; border:none; border-radius:4px; cursor:pointer;">
        Войти
      </button>
      <p style="text-align:center; margin-top:15px;">
        <a routerLink="/register">Нет аккаунта? Зарегистрироваться</a>
      </p>
      <p style="color:red; text-align:center;" *ngIf="error">{{error}}</p>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  
  constructor(private auth: AuthService, private router: Router) {}
  
  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/cats']);
      },
      error: (err) => {
        this.error = 'Ошибка входа. Проверьте username и пароль';
        console.error(err);
      }
    });
  }
}
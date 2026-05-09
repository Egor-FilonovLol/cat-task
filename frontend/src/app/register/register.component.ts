import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="max-width:300px; margin:50px auto; padding:20px; border:1px solid #ddd; border-radius:8px;">
      <h2 style="text-align:center;">Регистрация заводчика</h2>
      <input 
        type="text" 
        [(ngModel)]="username" 
        placeholder="Имя пользователя" 
        style="width:100%; padding:8px; margin:10px 0; box-sizing:border-box;">
      <input 
        type="email" 
        [(ngModel)]="email" 
        placeholder="Email" 
        style="width:100%; padding:8px; margin:10px 0; box-sizing:border-box;">
      <input 
        type="password" 
        [(ngModel)]="password" 
        placeholder="Пароль (мин. 8 символов)" 
        style="width:100%; padding:8px; margin:10px 0; box-sizing:border-box;">
      <button 
        (click)="register()" 
        style="width:100%; padding:10px; background:#28a745; color:white; border:none; border-radius:4px; cursor:pointer;">
        Зарегистрироваться
      </button>
      <p style="text-align:center; margin-top:15px;">
        <a routerLink="/login">Уже есть аккаунт? Войти</a>
      </p>
      <div *ngIf="message" [style.color]="messageColor" style="text-align:center; margin-top:10px;">
        {{message}}
      </div>
    </div>
  `
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  message = '';
  messageColor = 'green';
  
  constructor(private auth: AuthService, private router: Router) {}
  
  register() {
    this.message = 'Регистрация...';
    this.messageColor = 'blue';
    
    this.auth.register({
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response: any) => {
        console.log('Registration success:', response);
        this.message = 'Регистрация успешна! Перенаправление...';
        this.messageColor = 'green';
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      },
      error: (err) => {
        console.error('Registration error:', err);
        if (err.status === 400) {
          this.message = 'Пользователь уже существует';
        } else if (err.status === 0) {
          this.message = 'Ошибка соединения с сервером';
        } else {
          this.message = 'Ошибка регистрации: ' + (err.error?.message || 'неизвестная ошибка');
        }
        this.messageColor = 'red';
      }
    });
  }
}
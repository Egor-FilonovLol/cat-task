import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

const API = 'http://localhost/api';

@Component({
  selector: 'app-cats',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width:800px; margin:20px auto;">
      <h2>Мои коты</h2>
      
      <div style="border:1px solid #ccc; padding:15px; margin-bottom:20px; border-radius:8px;">
        <h3>{{editingId ? 'Редактировать кота' : 'Добавить кота'}}</h3>
        <input [(ngModel)]="form.name" placeholder="Имя" style="width:100%; padding:8px; margin-bottom:10px; box-sizing:border-box;">
        <input type="number" [(ngModel)]="form.age" placeholder="Возраст (1-50)" style="width:100%; padding:8px; margin-bottom:10px; box-sizing:border-box;">
        <input type="number" [(ngModel)]="form.weight" placeholder="Вес (1-21)" style="width:100%; padding:8px; margin-bottom:10px; box-sizing:border-box;">
        <input [(ngModel)]="form.breed" placeholder="Порода" style="width:100%; padding:8px; margin-bottom:10px; box-sizing:border-box;">
        <button (click)="save()" style="margin-right:10px; padding:8px 20px; background:#28a745; color:white; border:none; border-radius:4px; cursor:pointer;">
          {{editingId ? 'Сохранить' : 'Добавить'}}
        </button>
        <button *ngIf="editingId" (click)="cancelEdit()" style="padding:8px 20px; background:#6c757d; color:white; border:none; border-radius:4px; cursor:pointer;">
          Отмена
        </button>
      </div>

      <div *ngFor="let cat of cats" style="border:1px solid #ddd; padding:15px; margin-bottom:10px; border-radius:8px;">
        <h3 style="margin:0 0 10px 0;">{{cat.name}}</h3>
        <p style="margin:5px 0;">Возраст: {{cat.age}} лет | Вес: {{cat.weight}} кг | Порода: {{cat.breed}}</p>
        <button (click)="edit(cat)" style="margin-right:10px; padding:5px 15px; background:#ffc107; border:none; border-radius:4px; cursor:pointer;">
          ✏️ Редактировать
        </button>
        <button (click)="deleteCat(cat.id)" style="padding:5px 15px; background:#dc3545; color:white; border:none; border-radius:4px; cursor:pointer;">
          🗑️ Удалить
        </button>
      </div>
      <div *ngIf="cats.length === 0" style="text-align:center; padding:40px; color:#666;">
        Нет котов. Добавьте первого!
      </div>
    </div>
  `
})
export class CatsComponent implements OnInit {
  cats: any[] = [];
  form = { name: '', age: 1, weight: 1, breed: '' };
  editingId: number | null = null;

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit() {
    this.loadCats();
  }

  loadCats() {
    const token = this.auth.getToken();
    this.http.get<any[]>(`${API}/cats/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(data => this.cats = data);
  }

  save() {
    const token = this.auth.getToken();
    if (this.editingId) {
      this.http.put(`${API}/cats/${this.editingId}/`, this.form, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe(() => {
        this.loadCats();
        this.cancelEdit();
      });
    } else {
      this.http.post(`${API}/cats/`, this.form, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe(() => {
        this.loadCats();
        this.form = { name: '', age: 1, weight: 1, breed: '' };
      });
    }
  }

  edit(cat: any) {
    this.editingId = cat.id;
    this.form = { name: cat.name, age: cat.age, weight: cat.weight, breed: cat.breed };
  }

  cancelEdit() {
    this.editingId = null;
    this.form = { name: '', age: 1, weight: 1, breed: '' };
  }

  deleteCat(id: number) {
    if (confirm('Удалить кота?')) {
      const token = this.auth.getToken();
      this.http.delete(`${API}/cats/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe(() => this.loadCats());
    }
  }
}
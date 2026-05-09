import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

const API_URL = 'https://testtask-vtyd.onrender.com/api';

@Injectable({ providedIn: 'root' })
export class CatService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getCats() {
    const token = this.authService.getToken();
    return this.http.get(`${API_URL}/cats/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  createCat(cat: any) {
    const token = this.authService.getToken();
    return this.http.post(`${API_URL}/cats/`, cat, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateCat(id: number, cat: any) {
    const token = this.authService.getToken();
    return this.http.put(`${API_URL}/cats/${id}/`, cat, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deleteCat(id: number) {
    const token = this.authService.getToken();
    return this.http.delete(`${API_URL}/cats/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
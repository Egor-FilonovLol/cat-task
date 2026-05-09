import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

// ИЗМЕНИ ЭТУ СТРОКУ:
const API_URL = 'http://checkcheckcheck.duckdns.org/api';

@Injectable({ providedIn: 'root' })
export class CatService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getCats(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/cats/`, { headers: this.getHeaders() });
  }

  createCat(cat: any): Observable<any> {
    return this.http.post(`${API_URL}/cats/`, cat, { headers: this.getHeaders() });
  }

  updateCat(id: number, cat: any): Observable<any> {
    return this.http.put(`${API_URL}/cats/${id}/`, cat, { headers: this.getHeaders() });
  }

  deleteCat(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/cats/${id}/`, { headers: this.getHeaders() });
  }
}
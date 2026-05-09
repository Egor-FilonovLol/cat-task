import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

// ИЗМЕНИ ЭТУ СТРОКУ:
const API_URL = 'http://checkcheckcheck.duckdns.org/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  register(data: any): Observable<any> {
    const url = `${API_URL}/register/`;
    console.log('Register URL:', url);
    return this.http.post(url, data);
  }
  
  login(username: string, password: string): Observable<any> {
    const url = `${API_URL}/auth/jwt/create/`;
    return this.http.post<{access: string}>(url, {username, password})
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.access);
          this.router.navigate(['/cats']);
        })
      );
  }
  
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private logoutTimer: any;
  private loginUrl = '/auth/login';
  private userUrl = '/auth/me';
  private refreshUrl = '/auth/refresh';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    
    return this.http.post<any>(this.loginUrl, { username, password }).pipe(
      tap(response => localStorage.setItem('token', response.accessToken))
    );
    this.setLogoutTimer();
  }

  getCurrentUser(): Observable<any> {
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    // Make the GET request with credentials included
    return this.http.get(this.userUrl, { headers, withCredentials: true });
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(this.refreshUrl, {}).pipe(
      tap(response => localStorage.setItem('token', response.token))
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  setLogoutTimer() {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const expirationDate = decodedToken.exp * 1000;
      const timeout = expirationDate - Date.now();
      if (timeout > 0) {
        this.logoutTimer = setTimeout(() => this.logout(), timeout);
      } else {
        this.logout(); // Token already expired
      }
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

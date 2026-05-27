import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { API_BASE_URL } from '../config/api-endpoints';
import { AuthUser, LoginRequest, RegisterRequest } from '../models/auth-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly storageTokenKey = 'feproject-token';
  private readonly storageUserKey = 'feproject-user';

  login(payload: LoginRequest): Observable<AuthUser> {
    return this.http.post<any>(`${API_BASE_URL}/auth/login`, payload).pipe(
      map(response => response.data),
      tap((user) => this.saveSession(user))
    );
  }

  register(payload: RegisterRequest): Observable<AuthUser> {
    return this.http.post<any>(`${API_BASE_URL}/auth/register`, payload).pipe(
      map(response => response.data),
      tap((user) => this.saveSession(user))
    );
  }

  logout(): void {
    localStorage.removeItem(this.storageTokenKey);
    localStorage.removeItem(this.storageUserKey);
  }

  isLoggedIn(): boolean {
    return Boolean(localStorage.getItem(this.storageTokenKey));
  }

  getRole(): 'user' | 'admin' | null {
    const user = this.getUser();
    return user?.role ?? null;
  }

  getUser(): AuthUser | null {
    const rawUser = localStorage.getItem(this.storageUserKey);
    return rawUser ? (JSON.parse(rawUser) as AuthUser) : null;
  }

  private saveSession(user: AuthUser): void {
    if (user.accessToken) {
      localStorage.setItem(this.storageTokenKey, user.accessToken);
    }
    localStorage.setItem(this.storageUserKey, JSON.stringify(user));
  }
}

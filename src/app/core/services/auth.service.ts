import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { API_BASE_URL } from '../config/api-endpoints';
import {
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from '../models/auth-user.model';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
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

  getUser(): any | null {
  const rawUser = localStorage.getItem(this.storageUserKey);
  if (!rawUser) return null;
  
  const parsed = JSON.parse(rawUser);
  // If the parsed object has a nested .user property, return that instead!
  return parsed.user ? parsed.user : parsed;
}

getRole(): string | null {
  const user = this.getUser();
  console.log('AuthService extracted user:', user); // Debug log to see what it finds
  return user?.role ?? null;
}

  private saveSession(user: any): void {
  // 1. Check for 'accessToken' (Your API's primary response key)
  if (user?.accessToken) {
    localStorage.setItem(this.storageTokenKey, user.accessToken);
  } 
  // 2. Fallback check for plain 'token' just in case
  else if (user?.token) {
    localStorage.setItem(this.storageTokenKey, user.token);
  }

  // 3. Save the entire user object information as a string
  localStorage.setItem(this.storageUserKey, JSON.stringify(user));
}
}

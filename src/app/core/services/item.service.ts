import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api-endpoints';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private readonly http = inject(HttpClient);

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${API_BASE_URL}/items`);
  }

  getItemById(id: number): Observable<Item> {
    return this.http.get<Item>(`${API_BASE_URL}/items/${id}`);
  }

  createItem(payload: Omit<Item, 'id'>): Observable<Item> {
    return this.http.post<Item>(`${API_BASE_URL}/items`, payload);
  }

  updateItem(id: number, payload: Partial<Item>): Observable<Item> {
    return this.http.patch<Item>(`${API_BASE_URL}/items/${id}`, payload);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/items/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api-endpoints';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly http = inject(HttpClient);

  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${API_BASE_URL}/orders/me`);
  }

  getAdminOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${API_BASE_URL}/orders`);
  }

  createOrder(payload: Omit<Order, 'id' | 'createdAt'>): Observable<Order> {
    return this.http.post<Order>(`${API_BASE_URL}/orders`, payload);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api-endpoints';
import { Order, OrderDetail } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly http = inject(HttpClient);

  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${API_BASE_URL}/orders`);
  }

  getAdminOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${API_BASE_URL}/orders`);
  }

  createOrder(payload: {
    userId: number;
    items: { productId: number; quantity: number }[];
  }): Observable<Order> {
    return this.http.post<Order>(`${API_BASE_URL}/orders`, payload);
  }

  cancelOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/orders/${orderId}`);
  }

  updateOrder(orderId: number, details: OrderDetail[]): Observable<Order> {
    return this.http.patch<Order>(`${API_BASE_URL}/orders/${orderId}`, {
      details,
    });
  }
}

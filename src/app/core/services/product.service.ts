import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api-endpoints';
import { Item } from '../models/item.model'; // You can rename this model file/interface to Product later if you want!

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);

  // GET /api/products
  getProducts(): Observable<Item[]> {
    return this.http.get<Item[]>(`${API_BASE_URL}/products`);
  }

  // GET /api/products/{id}
  getProductById(id: number): Observable<Item> {
    return this.http.get<Item>(`${API_BASE_URL}/products/${id}`);
  }

  // POST /api/products
  createProduct(payload: Omit<Item, 'id'>): Observable<Item> {
    return this.http.post<Item>(`${API_BASE_URL}/products`, payload);
  }

  // PUT /api/products/{id} (Changed from .patch to .put to match Swagger)
  updateProduct(id: number, payload: Partial<Item>): Observable<Item> {
    return this.http.put<Item>(`${API_BASE_URL}/products/${id}`, payload);
  }

  // DELETE /api/products/{id}
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/products/${id}`);
  }
}
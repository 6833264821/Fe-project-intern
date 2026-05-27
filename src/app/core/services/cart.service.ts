import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../models/item.model';

export interface CartItem {
  item: Item;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: CartItem[] = [];

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  addToCart(item: Item) {
    const existing = this.cartItems.find((c) => c.item.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cartItems.push({ item, quantity: 1 });
    }
    this.cartCountSubject.next(
      this.cartItems.reduce((sum, c) => sum + c.quantity, 0),
    );
  }

  removeFromCart(itemId: number) {
    this.cartItems = this.cartItems.filter((c) => c.item.id !== itemId);
    this.cartCountSubject.next(
      this.cartItems.reduce((sum, c) => sum + c.quantity, 0),
    );
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (sum, c) => sum + c.item.price * c.quantity,
      0,
    );
  }

  clearCart() {
    this.cartItems = [];
    this.cartCountSubject.next(0);
  }
}

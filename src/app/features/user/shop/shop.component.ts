import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../../core/models/item.model';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  private cartService = inject(CartService);

  readonly items: Item[] = [
    {
      id: 6,
      name: 'Green Tea',
      category: 'Drink',
      store: 'Tokyo Cafe',
      description: 'Japanese green tea',
      price: 990,
      quantity: 12,
      isActive: true,
    },
    {
      id: 7,
      name: 'Krapraw',
      category: 'Food',
      store: 'Somewhere',
      description: 'This is a Food',
      price: 450,
      quantity: 25,
      isActive: true,
    },
  ];

  private readonly cartQuantities: Record<number, number> = {};

  quantityOf(item: Item): number {
    return this.cartQuantities[item.id] ?? 0;
  }

  hasCartItem(item: Item): boolean {
    return this.quantityOf(item) > 0;
  }

  addToCart(item: Item): void {
    this.cartQuantities[item.id] = Math.max(1, this.quantityOf(item) + 1);
    this.cartService.addToCart(item);
  }

  increase(item: Item): void {
    this.cartQuantities[item.id] = this.quantityOf(item) + 1;
    this.cartService.addToCart(item);
  }

  decrease(item: Item): void {
    const nextQuantity = Math.max(0, this.quantityOf(item) - 1);
    if (nextQuantity === 0) {
      delete this.cartQuantities[item.id];
      this.cartService.removeFromCart(item.id);
      return;
    }
    this.cartQuantities[item.id] = nextQuantity;
    this.cartService.removeFromCart(item.id);
  }

  get cartTotal(): number {
    return this.items.reduce(
      (total, item) => total + item.price * this.quantityOf(item),
      0,
    );
  }

  get cartCount(): number {
    return this.items.reduce((count, item) => count + this.quantityOf(item), 0);
  }
}

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
      id: 1,
      name: 'Pink Hoodie',
      category: 'Clothing',
      store: 'Rose House Shop',
      description: 'เสื้อฮู้ดโทนชมพูสำหรับโหมดชอปปิ้ง',
      price: 990,
      stock: 12,
      isActive: true,
    },
    {
      id: 2,
      name: 'Rose Cap',
      category: 'Accessories',
      store: 'Pink Accessory Store',
      description: 'หมวกทรงเรียบสำหรับสไตล์มินิมอล',
      price: 450,
      stock: 25,
      isActive: true,
    },
    {
      id: 3,
      name: 'Cherry Bag',
      category: 'Bags',
      store: 'Cherry Market',
      description: 'กระเป๋าใส่ของสำหรับใช้งานทุกวัน',
      price: 1290,
      stock: 8,
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

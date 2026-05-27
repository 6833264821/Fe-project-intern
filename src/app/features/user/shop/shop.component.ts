import { Component, inject, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { Item } from '../../../core/models/item.model';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service'; 

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit { 
  private cartService = inject(CartService);
  private productService = inject(ProductService); 

  
  items: Item[] = []; 
  isLoading = false; 

  private readonly cartQuantities: Record<number, number> = {};

  ngOnInit(): void {
    this.loadProducts();
  }

  
  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.items = data; 
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.isLoading = false;
        window.alert('ไม่สามารถดึงข้อมูลสินค้าจากฐานข้อมูลได้: ' + JSON.stringify(err.error));
      }
    });
  }

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
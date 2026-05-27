import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../../core/services/cart.service';
import { Router } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  isConfirming = false;
  get items(): CartItem[] {
    return this.cartService.getCartItems();
  }

  increase(itemId: number) {
    this.cartService.increaseQuantity(itemId);
  }

  decrease(itemId: number) {
    this.cartService.decreaseQuantity(itemId);
  }
  remove(itemId: number, itemName: string) {
    const confirmed = window.confirm(`ลบ "${itemName}" ออกจากตะกร้า?`);
    if (!confirmed) return;
    this.cartService.removeFromCart(itemId);
  }
  confirmOrder() {
    const confirmed = window.confirm(
      `ยืนยันคำสั่งซื้อ ${this.items.length} รายการ\nรวม ฿${this.cartService.getTotalPrice()} ?`,
    );
    if (!confirmed) return;

    this.isConfirming = true;

    const payload = {
      userId: 1, // replace with actual userId from AuthService if available
      items: this.items.map((c) => ({
        productId: c.item.id,
        quantity: c.quantity,
      })),
      total: this.cartService.getTotalPrice(),
      status: 'pending' as const,
    };

    this.orderService.createOrder(payload).subscribe({
      next: () => {
        this.isConfirming = false;
        this.cartService.clearCart();
        window.alert('สั่งซื้อสำเร็จ! ระบบกำลังพาไปหน้าประวัติการซื้อ');
        this.router.navigate(['/history-buy']);
      },
      error: (err) => {
        this.isConfirming = false;
        console.error('Status:', err.status);
        console.error('Error body:', err.error);
        window.alert(JSON.stringify(err.error));
      },
    });
  }
}

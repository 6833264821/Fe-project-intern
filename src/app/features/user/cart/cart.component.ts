import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../../core/services/cart.service';
import { Router } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../core/services/auth.service';

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
  private authService = inject(AuthService);

  isConfirming = false;
  selectedIds = new Set<number>();

  get items(): CartItem[] {
    return this.cartService.getCartItems();
  }

  ngOnInit() {
    // Select all by default when component loads
    this.cartService.getCartItems().forEach(c => this.selectedIds.add(c.item.id));
  }

  isSelected(itemId: number): boolean {
    return this.selectedIds.has(itemId);
  }

  toggleSelect(itemId: number) {
    if (this.selectedIds.has(itemId)) {
      this.selectedIds.delete(itemId);
    } else {
      this.selectedIds.add(itemId);
    }
  }

  get allSelected(): boolean {
    return this.items.length > 0 && this.items.every(c => this.selectedIds.has(c.item.id));
  }

  toggleSelectAll() {
    if (this.allSelected) {
      this.selectedIds.clear();
    } else {
      this.items.forEach(c => this.selectedIds.add(c.item.id));
    }
  }

  get selectedItems(): CartItem[] {
    return this.items.filter(c => this.selectedIds.has(c.item.id));
  }

  get selectedTotal(): number {
    return this.selectedItems.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
  }

  get selectedCount(): number {
    return this.selectedItems.reduce((sum, c) => sum + c.quantity, 0);
  }

  increase(itemId: number) {
    this.cartService.increaseQuantity(itemId);
  }

  decrease(itemId: number) {
    this.cartService.decreaseQuantity(itemId);
    // ถ้า qty ลดเหลือ 0 จะถูกลบออก ให้ลบออกจาก selectedIds ด้วย
    if (!this.items.find(c => c.item.id === itemId)) {
      this.selectedIds.delete(itemId);
    }
  }

  remove(itemId: number, itemName: string) {
    const confirmed = window.confirm(`ลบ "${itemName}" ออกจากตะกร้า?`);
    if (!confirmed) return;
    this.cartService.removeFromCart(itemId);
    this.selectedIds.delete(itemId);
  }

  confirmOrder() {
    if (this.selectedItems.length === 0) {
      window.alert('กรุณาเลือกสินค้าที่ต้องการสั่งซื้ออย่างน้อย 1 รายการ');
      return;
    }

    const currentUserId = this.authService.getUser().id;
    if (!currentUserId) {
      window.alert('ไม่พบข้อมูลเซสชันผู้ใช้ กรุณาเข้าสู่ระบบใหม่อีกครั้ง');
      this.router.navigate(['/login']);
      return;
    }

    const confirmed = window.confirm(
      `ยืนยันคำสั่งซื้อ ${this.selectedItems.length} รายการ\nรวม ฿${this.selectedTotal} ?`,
    );
    if (!confirmed) return;

    this.isConfirming = true;

    const payload = {
      userId: currentUserId,
      items: this.selectedItems.map((c) => ({
        productId: c.item.id,
        quantity: c.quantity,
      })),
      total: this.selectedTotal,
      status: 'pending' as const,
    };

    this.orderService.createOrder(payload).subscribe({
      next: () => {
        this.isConfirming = false;
        // ลบเฉพาะ item ที่ถูกเลือก (ที่เหลือยังอยู่ในตะกร้า)
        const confirmedIds = [...this.selectedIds];
        confirmedIds.forEach(id => this.cartService.removeFromCart(id));
        this.selectedIds.clear();
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
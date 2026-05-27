import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/models/order.model';

@Component({
  selector: 'app-history-buy',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './history-buy.component.html',
  styleUrl: './history-buy.component.scss',
})
export class HistoryBuyComponent implements OnInit {
  private orderService = inject(OrderService);

  orders: Order[] = [];
  editingOrder: Order | null = null;
  isLoading = false;
  isSaving = false;

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.isLoading = true;
    this.orderService.getMyOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  cancelOrder(order: Order) {
    const confirmed = window.confirm(
      `ยืนยันการยกเลิก Order #${order.orderId} ?`,
    );
    if (!confirmed) return;

    this.orderService.cancelOrder(order.orderId).subscribe({
      next: () => {
        window.alert(`ยกเลิก Order #${order.orderId} สำเร็จ`);
        this.loadOrders();
      },
      error: () => window.alert('เกิดข้อผิดพลาด กรุณาลองใหม่'),
    });
  }

  startEdit(order: Order) {
    this.editingOrder = JSON.parse(JSON.stringify(order));
  }

  saveEdit() {
    if (!this.editingOrder) return;

    // validate no quantity < 1
    if (this.editingOrder.details.some((d) => d.quantity < 1)) {
      window.alert('จำนวนสินค้าต้องมากกว่า 0');
      return;
    }

    const confirmed = window.confirm('ยืนยันการแก้ไข Order?');
    if (!confirmed) return;

    this.isSaving = true;
    const oldOrderId = this.editingOrder.orderId;
    const userId = this.editingOrder.userId;

    const newPayload = {
      userId: userId,
      items: this.editingOrder.details.map((d) => ({
        productId: d.productId,
        quantity: d.quantity,
      })),
    };

    this.orderService.cancelOrder(oldOrderId).subscribe({
      next: () => {
        // Step 2: create new order with updated quantities
        this.orderService.createOrder(newPayload).subscribe({
          next: () => {
            this.isSaving = false;
            window.alert('แก้ไข Order สำเร็จ');
            this.editingOrder = null;
            this.loadOrders(); // 4.5 auto-refresh
          },
          error: (err) => {
            this.isSaving = false;
            console.error('Create error:', err.error);
            window.alert(
              'ลบ Order เดิมแล้วแต่สร้างใหม่ไม่สำเร็จ: ' +
                JSON.stringify(err.error),
            );
            this.loadOrders();
          },
        });
      },
      error: () => {
        this.isSaving = false;
        window.alert('เกิดข้อผิดพลาด กรุณาลองใหม่');
      },
    });
  }

  cancelEdit() {
    this.editingOrder = null;
  }
}

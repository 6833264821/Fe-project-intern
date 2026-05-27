// admin-history.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order } from '../../../core/models/order.model';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-admin-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-history.component.html',
  styleUrl: './admin-history.component.scss',
})
export class AdminHistoryComponent implements OnInit {
  private orderService = inject(OrderService);

  orders: Order[] = [];
  isLoading = false;
  editingOrder: Order | null = null;
  isSaving = false;

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.isLoading = true;
    this.orderService.getAdminOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
  deleteOrder(order: Order) {
    const confirmed = window.confirm(`ลบ Order #${order.orderId} ทั้งหมด?`);
    if (!confirmed) return;

    this.orderService.deleteOrder(order.orderId).subscribe({
      next: () => {
        window.alert(`ลบ Order #${order.orderId} สำเร็จ`);
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
      userId,
      items: this.editingOrder.details.map((d) => ({
        productId: d.productId,
        quantity: d.quantity,
      })),
    };
    this.orderService.deleteOrder(oldOrderId).subscribe({
      next: () => {
        this.orderService.createOrder(newPayload).subscribe({
          next: () => {
            this.isSaving = false;
            window.alert('แก้ไข Order สำเร็จ');
            this.editingOrder = null;
            this.loadOrders();
          },
          error: (err) => {
            this.isSaving = false;
            window.alert('Error: ' + JSON.stringify(err.error));
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
  /*ngOnInit() {
    this.isLoading = true;
    this.orderService.getAdminOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }*/
}

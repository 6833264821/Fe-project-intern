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

    this.orderService
      .updateOrder(this.editingOrder.orderId, this.editingOrder.details)
      .subscribe({
        next: () => {
          window.alert('แก้ไข Order สำเร็จ');
          this.editingOrder = null;
          this.loadOrders();
        },
        error: () => window.alert('เกิดข้อผิดพลาด กรุณาลองใหม่'),
      });
  }

  cancelEdit() {
    this.editingOrder = null;
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order } from '../../../core/models/order.model';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  private orderService = inject(OrderService);

  orders: Order[] = [];
  filteredOrders: Order[] = [];
  isLoading = false;

  // Filters
  filterStatus: string = '';
  filterDate: string = '';
  filterUser: string = '';

  ngOnInit() {
    this.isLoading = true;
    this.orderService.getAdminOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.filteredOrders = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  get totalOrders(): number {
    return this.orders.length;
  }

  get pendingOrders(): number {
    return this.orders.filter((o) => !o.status || o.status === 'pending').length;
  }

  get completedOrders(): number {
    return this.orders.filter((o) => o.status === 'completed').length;
  }

  get totalRevenue(): number {
    return this.orders.reduce((sum, o) => {
      if (o.total) return sum + o.total;
      const orderTotal = o.details.reduce((s, d) => s + (d.price ?? 0) * d.quantity, 0);
      return sum + orderTotal;
    }, 0);
  }

  applyFilters() {
    this.filteredOrders = this.orders.filter((order) => {
      const matchStatus =
        !this.filterStatus ||
        (order.status ?? 'pending') === this.filterStatus;

      const matchDate =
        !this.filterDate ||
        order.createdAt.startsWith(this.filterDate);

      const matchUser =
        !this.filterUser ||
        String(order.userId).includes(this.filterUser.trim());

      return matchStatus && matchDate && matchUser;
    });
  }

  clearFilters() {
    this.filterStatus = '';
    this.filterDate = '';
    this.filterUser = '';
    this.filteredOrders = [...this.orders];
  }

  getStatusLabel(order: Order): string {
    const s = order.status ?? 'pending';
    if (s === 'completed') return 'เสร็จสิ้น';
    if (s === 'cancelled') return 'ยกเลิก';
    return 'รอดำเนินการ';
  }

  getOrderTotal(order: Order): number {
    if (order.total) return order.total;
    return order.details.reduce((s, d) => s + (d.price ?? 0) * d.quantity, 0);
  }
}
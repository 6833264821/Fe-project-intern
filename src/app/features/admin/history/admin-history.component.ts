// admin-history.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../core/models/order.model';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-admin-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-history.component.html',
  styleUrl: './admin-history.component.scss',
})
export class AdminHistoryComponent implements OnInit {
  private orderService = inject(OrderService);

  orders: Order[] = [];
  isLoading = false;

  ngOnInit() {
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
}

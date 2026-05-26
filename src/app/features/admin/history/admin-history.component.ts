import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../core/models/order.model';

@Component({
  selector: 'app-admin-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-history.component.html',
  styleUrl: './admin-history.component.scss'
})
export class AdminHistoryComponent {
  readonly orders: Order[] = [
    {
      id: 201,
      userId: 3,
      items: [{ itemId: 1, name: 'Pink Hoodie', price: 990, quantity: 1 }],
      total: 990,
      status: 'paid',
      createdAt: '2026-05-26'
    }
  ];
}

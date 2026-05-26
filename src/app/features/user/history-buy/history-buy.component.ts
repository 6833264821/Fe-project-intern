import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../core/models/order.model';

@Component({
  selector: 'app-history-buy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-buy.component.html',
  styleUrl: './history-buy.component.scss'
})
export class HistoryBuyComponent {
  readonly orders: Order[] = [
    {
      id: 101,
      userId: 1,
      items: [
        { itemId: 1, name: 'Pink Hoodie', price: 990, quantity: 1 }
      ],
      total: 990,
      status: 'paid',
      createdAt: '2026-05-26'
    },
    {
      id: 102,
      userId: 1,
      items: [
        { itemId: 2, name: 'Rose Cap', price: 450, quantity: 2 }
      ],
      total: 900,
      status: 'pending',
      createdAt: '2026-05-25'
    }
  ];
}

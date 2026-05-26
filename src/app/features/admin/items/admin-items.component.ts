import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../../core/models/item.model';

@Component({
  selector: 'app-admin-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-items.component.html',
  styleUrl: './admin-items.component.scss'
})
export class AdminItemsComponent {
  readonly items: Item[] = [
    { id: 1, name: 'Pink Hoodie', description: 'เสื้อฮู้ดโทนชมพู', price: 990, stock: 12, isActive: true },
    { id: 2, name: 'Rose Cap', description: 'หมวกเรียบ', price: 450, stock: 25, isActive: true }
  ];
}

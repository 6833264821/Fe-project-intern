import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../../core/models/item.model';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  readonly items: Item[] = [
    {
      id: 1,
      name: 'Pink Hoodie',
      description: 'เสื้อฮู้ดโทนชมพูสำหรับโหมดชอปปิ้ง',
      price: 990,
      stock: 12,
      isActive: true
    },
    {
      id: 2,
      name: 'Rose Cap',
      description: 'หมวกทรงเรียบสำหรับสไตล์มินิมอล',
      price: 450,
      stock: 25,
      isActive: true
    },
    {
      id: 3,
      name: 'Cherry Bag',
      description: 'กระเป๋าใส่ของสำหรับใช้งานทุกวัน',
      price: 1290,
      stock: 8,
      isActive: true
    }
  ];
}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../../core/models/item.model';
import { ProductService } from '../../../core/services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-items',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-items.component.html',
  styleUrl: './admin-items.component.scss'
})
export class AdminItemsComponent implements OnInit {
  private readonly productService = inject(ProductService);

  // 1. Make this writeable (remove readonly) and start with an empty array
  items: Item[] = [];

  // 2. Lifecycle hook that triggers as soon as the component loads
  ngOnInit(): void {
    this.loadProducts();
  }

  // 3. Fetch data from service and assign it to the local array
  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.items = data;
        console.log('Products successfully loaded from backend:', this.items);
      },
      error: (err) => {
        console.error('Failed to load products from API:', err);
      }
    });
  }
}
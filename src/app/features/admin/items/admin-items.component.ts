import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 1. CRITICAL: Make sure FormsModule is imported!
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Item } from '../../../core/models/item.model';

@Component({
  selector: 'app-admin-items',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // 2. Add FormsModule here
  templateUrl: './admin-items.component.html',
  styleUrl: './admin-items.component.scss'
})
export class AdminItemsComponent implements OnInit {
  private readonly productService = inject(ProductService);

  items: Item[] = [];
  
  // Tracks the ID of the product currently being edited
  editingId: number | null = null;
  // Holds the temporary form data for the item being edited
  editFormClone: any = null;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.items = data,
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  // Called when clicking the "Edit" button
  startEdit(item: Item): void {
    this.editingId = item.id;
    // Deep clone the object so changes don't affect the main list until saved
    this.editFormClone = { ...item };
  }

  // Cancel editing and revert changes
  cancelEdit(): void {
    this.editingId = null;
    this.editFormClone = null;
  }

  // Save the inline changes to the backend database
  saveEdit(): void {
    if (!this.editFormClone) return;

    this.productService.updateProduct(this.editFormClone.id, this.editFormClone).subscribe({
      next: (updatedItem) => {
        // Update the item directly in our local array list
        const index = this.items.findIndex(i => i.id === this.editFormClone.id);
        if (index !== -1) {
          this.items[index] = updatedItem; 
        }
        
        // Clean up editing state
        this.cancelEdit();
        window.alert('แก้ไขข้อมูลสินค้าสำเร็จ!');
      },
      error: (err) => {
        console.error('Failed to update product:', err);
        window.alert('เกิดข้อผิดพลาด ไม่สามารถบันทึกข้อมูลได้');
      }
    });
  }

  // Keeping your Delete template function ready
  deleteItem(id: number): void {
    if (!window.confirm('คุณต้องการลบสินค้าชิ้นนี้ใช่หรือไม่?')) return;
    
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.items = this.items.filter(item => item.id !== id);
      },
      error: (err) => console.error(err)
    });
  }
}
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  // Initialize form model structure exactly matching your backend JSON schema
  product = {
    name: '',
    description: '',
    quantity: 0,
    type: 0, // Defaulting to 0 (Food)
    restaurant: '',
    price: 0,
    isActive: true
  };

  message = '';
  isSuccess = false;

  submit(): void {
    // Send payload directly to our ProductService POST endpoint
    this.productService.createProduct(this.product).subscribe({
      next: (res) => {
        this.isSuccess = true;
        this.message = 'เพิ่มสินค้าสำเร็จเรียบร้อย!';
        
        // Wait 1.5s to display success feedback before returning to the grid list
        setTimeout(() => {
          this.router.navigate(['/admin/items']);
        }, 1500);
      },
      error: (err) => {
        this.isSuccess = false;
        this.message = err.error?.message ?? 'เกิดข้อผิดพลาดในการเพิ่มสินค้า';
        console.error('Create product failed:', err);
      }
    });
  }
}
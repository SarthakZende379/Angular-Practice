import { Component, OnInit, signal } from '@angular/core';
import { ProductService } from './services/product';
import { Product } from './models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  // signal boxes
  products = signal<Product[]>([]);
  loading = signal(true);
  error = signal('');

  constructor(private productService: ProductService) {}

  ngOnInit() {
    console.log('Component started');

    this.productService.getProducts().subscribe({
      next: (res: { products: Product[] }) => {
        console.log('Data came back:', res);
        this.products.set(res.products);
        this.loading.set(false);
        console.log('Products saved into signal:', this.products());
      },
      error: (err: any) => {
        console.log('Error:', err);
        this.error.set('Failed to load products');
        this.loading.set(false);
      }
    });
  }
}
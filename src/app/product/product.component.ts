// product.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service'; // Update the path as needed
import { product } from '../interface/interfaces'; // Ensure this path is correct

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: product[] = [];
  isLoading: boolean = true;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (response: any) => {
        this.products = response.products || []; 
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching products', error);
        this.isLoading = false;
      }
    );
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}

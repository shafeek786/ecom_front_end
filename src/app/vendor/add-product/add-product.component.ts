import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  addProductForm!: FormGroup;
  categories: string[] = ['Men', 'Women', 'Girls', 'Boys'];
  successMessage: string | null = null; // To hold success message
  errorMessage: string | null = null; // To hold error message

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      productImage: [null, Validators.required],
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addProductForm.patchValue({
        productImage: file,
      });
    }
  }

  onSubmit(): void {
    if (this.addProductForm.valid) {
      const formData = new FormData();
      formData.append(
        'name',
        this.addProductForm.get('productName')?.value ?? ''
      );
      formData.append(
        'description',
        this.addProductForm.get('description')?.value ?? ''
      );
      formData.append('price', this.addProductForm.get('price')?.value ?? '');
      formData.append(
        'category',
        this.addProductForm.get('category')?.value ?? ''
      );
      formData.append(
        'productImage',
        this.addProductForm.get('productImage')?.value ?? ''
      );

      this.productService.addProduct(formData).subscribe(
        (response: any) => {
          this.successMessage = 'Product added successfully'; // Set success message
          this.errorMessage = null; // Clear any previous error message
          this.addProductForm.reset(); // Optionally reset form
        },
        (error: any) => {
          this.errorMessage = 'Error adding product'; // Set error message
          this.successMessage = null; // Clear any previous success message
        }
      );
    }
  }
}

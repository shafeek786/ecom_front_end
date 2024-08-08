import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../interface/interfaces';
import { Environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private route: Router) {}

  apiUrl = Environment.BASE_URL;
  addProduct(data: FormData) {
    return this.http.post(this.apiUrl + '/product/addproduct', data);
  }

  getProducts() {
    return this.http.get(this.apiUrl + '/product');
  }
}

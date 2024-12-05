import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DeletedProduct, ListProducts, Product } from '../models/products.dtos';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient);

  constructor() { }

  getProducts(query = '', page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    return this.http.get<ListProducts>(`https://dummyjson.com/products/search?q=${query}&limit=${take}&skip=${skip}`);
  }

  getProduct(id: number) {
    return this.http.get<Product>(`https://dummyjson.com/products/${id}`);
  }

  addProduct(product: Product) {
    return this.http.post<Product>('https://dummyjson.com/products/add',
      JSON.stringify(product),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
  }

  updateProduct(id: number, product: Product) {
    return this.http.put<Product>(`https://dummyjson.com/products/${id}`,
      JSON.stringify({ ...product, id: undefined }),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
  }

  deleteProduct(id: number) {
    return this.http.delete<DeletedProduct>(`https://dummyjson.com/products/${id}`);
  }
}

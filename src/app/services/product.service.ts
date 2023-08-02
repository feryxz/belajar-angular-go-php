import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService{

  baseUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  GetProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + '/products');
  }
  
  CreateProduct(data: any): Observable<Product> {
    return this.http
      .post<Product>(
        this.baseUrl + '/products',
        JSON.stringify(data),
        this.httpOptions
      )
  }

  GetProductById(id: string): any {
    return this.http.get(this.baseUrl + '/products/' + id)
  }

  UpdateProduct(id: string, data: any): Observable<Product> {
    return this.http
      .put<Product>(
        this.baseUrl + '/products/' + id,
        JSON.stringify(data),
        this.httpOptions
      )
  }

  DeleteProduct(id: string) {
    return this.http.delete(this.baseUrl + '/products/' + id)
  }
  
}

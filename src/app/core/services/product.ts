import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/products';
  readonly products = signal<Product[]>([]);

  load(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(products => this.products.set(products.map(product => ({
        ...product,
        releaseDate: new Date(product.releaseDate)
      }))))
    );
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      tap(product => product.releaseDate = new Date(product.releaseDate))
    );
  }

  create(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap(() => this.load().subscribe())
    );
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product).pipe(
      tap(() => this.load().subscribe())
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.load().subscribe())
    );
  }
}

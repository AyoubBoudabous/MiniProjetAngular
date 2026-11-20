import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ProductService } from '../../../core/services/product';
import { Product } from '../../../core/models/product.model';
import { TndPricePipe } from '../../../shared/pipes/tnd-price-pipe';

@Component({
  imports: [RouterLink, DatePipe, TndPricePipe],
  selector: 'app-product-detail',
  styleUrl: './product-detail.css',
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  readonly product = signal<Product | null>(null);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getById(id).subscribe({
        next: product => this.product.set(product),
        error: () => this.product.set(null)
      });
    }
  }
}

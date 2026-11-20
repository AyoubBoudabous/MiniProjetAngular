import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product';

@Component({
  imports: [RouterLink],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  readonly productService = inject(ProductService);
  readonly productsCount = signal(0);
  readonly availableCount = signal(0);

  ngOnInit(): void {
    this.productService.load().subscribe(products => {
      this.productsCount.set(products.length);
      this.availableCount.set(products.filter(product => product.available).length);
    });
  }
}

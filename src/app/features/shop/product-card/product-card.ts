import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { TndPricePipe } from '../../../shared/pipes/tnd-price-pipe';

@Component({
  imports: [RouterLink, TndPricePipe],
  selector: 'app-product-card',
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
})
export class ProductCard {
  readonly productInput = input.required<Product>({ alias: 'product' });
  readonly favorite = input(false);
  readonly toggleFavorite = output<string>();
}

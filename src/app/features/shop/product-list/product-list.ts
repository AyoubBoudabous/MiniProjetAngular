import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product';
import { ProductCard } from '../product-card/product-card';

@Component({
  imports: [FormsModule, ProductCard],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  private readonly productService = inject(ProductService);
  readonly searchName = signal('');
  readonly maxPrice = signal<number | null>(null);
  readonly category = signal('Tous');
  readonly favorites = signal<string[]>(
    JSON.parse(localStorage.getItem('techtown-favorites') ?? '[]')
  );

  readonly filteredProducts = computed(() => {
    const name = this.searchName().trim().toLowerCase();
    const maxPrice = this.maxPrice();
    const category = this.category();

    return this.productService.products().filter(product =>
      (!name || product.name.toLowerCase().includes(name)) &&
      (maxPrice === null || product.price <= maxPrice) &&
      (category === 'Tous' || product.category === category)
    );
  });

  readonly categories = computed(() =>
    ['Tous', ...new Set(this.productService.products().map(product => product.category))]
  );

  ngOnInit(): void {
    this.productService.load().subscribe();
  }

  toggleFavorite(id: string): void {
    const next = this.favorites().includes(id)
      ? this.favorites().filter(favoriteId => favoriteId !== id)
      : [...this.favorites(), id];

    this.favorites.set(next);
    localStorage.setItem('techtown-favorites', JSON.stringify(next));
  }

  resetSearch(): void {
    this.searchName.set('');
    this.maxPrice.set(null);
    this.category.set('Tous');
  }
}

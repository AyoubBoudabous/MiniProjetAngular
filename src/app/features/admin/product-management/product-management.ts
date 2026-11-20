import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormField, form, required, schema } from '@angular/forms/signals';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product';

@Component({
  imports: [FormField],
  selector: 'app-product-management',
  styleUrl: './product-management.css',
  templateUrl: './product-management.html',
})
export class ProductManagement implements OnInit {
  readonly productService = inject(ProductService);
  readonly editingId = signal<string | null>(null);
  readonly search = signal('');
  readonly message = signal('');

  readonly productModel = signal({
    name: '',
    photo: '',
    price: 0,
    category: 'Composants',
    available: true,
    releaseDate: '',
    description: '',
    processor: '',
    memory: '',
    storage: ''
  });

  readonly productSchema = schema<{
    name: string;
    photo: string;
    price: number;
    category: string;
    available: boolean;
    releaseDate: string;
    description: string;
    processor: string;
    memory: string;
    storage: string;
  }>(path => {
    required(path.name);
    required(path.photo);
    required(path.releaseDate);
  });
  readonly productForm = form(this.productModel, this.productSchema);

  readonly filteredProducts = computed(() => {
    const term = this.search().trim().toLowerCase();
    return this.productService.products().filter(product =>
      !term || product.name.toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    this.productService.load().subscribe();
  }

  edit(product: Product): void {
    this.editingId.set(product.id);
    this.productModel.set({
      name: product.name,
      photo: product.photo,
      price: product.price,
      category: product.category,
      available: product.available,
      releaseDate: new Date(product.releaseDate).toISOString().slice(0, 10),
      description: product.description,
      processor: product.specifications.processor,
      memory: product.specifications.memory,
      storage: product.specifications.storage
    });
  }

  reset(): void {
    this.editingId.set(null);
    this.productModel.set({
      name: '',
      photo: '',
      price: 0,
      category: 'Composants',
      available: true,
      releaseDate: '',
      description: '',
      processor: '',
      memory: '',
      storage: ''
    });
  }

  submit(): void {
    const value = this.productModel();
    if (!value.name || !value.photo || !value.releaseDate || value.price <= 0) {
      this.message.set('Veuillez compléter tous les champs obligatoires.');
      return;
    }

    const productData = {
      name: value.name,
      photo: value.photo,
      price: value.price,
      category: value.category,
      available: value.available,
      releaseDate: new Date(value.releaseDate),
      description: value.description,
      specifications: {
        processor: value.processor,
        memory: value.memory,
        storage: value.storage
      },
      comments: []
    };

    const editingId = this.editingId();
    if (editingId) {
      this.productService.update({
        id: editingId,
        ...productData
      }).subscribe(() => {
        this.message.set('Produit modifié.');
        this.reset();
      });
    } else {
      this.productService.create(productData).subscribe(() => {
        this.message.set('Produit ajouté.');
        this.reset();
      });
    }
  }

  remove(product: Product): void {
    if (confirm(`Supprimer ${product.name} ?`)) {
      this.productService.delete(product.id).subscribe(() =>
        this.message.set('Produit supprimé.')
      );
    }
  }
}

export interface ProductComment {
  id: string;
  author: string;
  text: string;
  rating: number;
}

export interface ProductSpecifications {
  processor: string;
  memory: string;
  storage: string;
}

export interface Product {
  id: string;
  name: string;
  photo: string;
  price: number;
  category: string;
  available: boolean;
  releaseDate: Date;
  description: string;
  specifications: ProductSpecifications;
  comments: ProductComment[];
}

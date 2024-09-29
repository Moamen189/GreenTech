export interface ICart {
  _id: string;
  cartOwner: string;
  products: ProductElement[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  totalCartPrice: number;
}

export interface ProductElement {
  count: number;
  _id: string;
  product: ProductProduct;
  price: number;
}

export interface ProductProduct {
  subcategory: Brand[];
  _id: string;
  id:string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Brand;
  brand: Brand;
  ratingsAverage: number;
  ratingsQuantity: number;
}

export interface Brand {
  _id: string;
  name: string;
    slug: string;
    image: string;
}
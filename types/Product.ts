type Product = {
  productId: number;
  title: string;
  description: string;
  image: string;
  price: number;
  discount: string;
  rating: string;
};

type Review = {
  comment: string;
  date: string;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
};

export interface ProductDescription extends Product {
  category: string;
  productImages: string[];
  stock: number;
  brand: string;
  sku: string;
  shippingInformation: string;
  reviews: Review[];
}

export default Product;

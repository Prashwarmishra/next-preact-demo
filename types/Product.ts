type Product = {
  productId: number;
  title: string;
  description: string;
  price: string;
  discount: string;
  rating: string;
};

export interface ProductDescription extends Product {
  category: string;
  stock: string;
  brand: string;
  sku: string;
  shippingInformation: string;
}

export default Product;

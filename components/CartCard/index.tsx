import { useEffect, useState } from 'react';
import Card from '../../ui/atoms/Card';
import FocusableButton from '../../ui/atoms/FocusableButton';
import { formatCurrency } from '../../utils';
import { removeItemFromCart } from '../../utils/ cart';
import styles from './CartCard.module.scss';
import { ProductDescription } from '../../types/Product';
import Cart from '../../types/Cart';

type Props = {
  data: Cart;
  onRemoveItem: (item: ProductDescription) => void;
};

const CartCard = ({ data, onRemoveItem }: Props) => {
  const { products, totalItems } = data;

  return (
    <div className={styles.root}>
      <Card>
        <div className={styles.orderSummary}>
          {/* Header Section */}
          <div className={styles.header}>
            <h3>Order Summary</h3>
            <p>Total Items: {totalItems}</p>
          </div>

          {/* Product List */}
          {products.map((product) => (
            <div key={product.productId} className={styles.product}>
              <img
                className={styles.productImage}
                src={product.productImages[0]}
                alt={product.title}
              />
              <div className={styles.productDetails}>
                <h4>{product.title}</h4>
                <div className={styles.container}>
                  <div className={styles.section}>
                    <span className={styles.info}>Brand:</span>
                    <span className={styles.value}>{product.brand}</span>
                  </div>
                  <div className={styles.section}>
                    <span className={styles.info}>Rating:</span>
                    <span className={styles.value}>⭐ {product.rating}</span>
                  </div>
                </div>

                <div className={styles.container}>
                  <div className={styles.section}>
                    <span className={styles.info}>Delivery info: </span>
                    <span className={styles.value}>
                      {product.shippingInformation}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.pricing}>
                <div className={styles.price}>
                  {formatCurrency(product.price)}
                  <span className={styles.discount}>
                    -{product.discount}% Off
                  </span>
                </div>

                <FocusableButton
                  focusKey={product.productId.toString()}
                  label='Remove'
                  onClick={() => onRemoveItem(product)}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CartCard;

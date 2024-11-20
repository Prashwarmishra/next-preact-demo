import {
  FocusContext,
  setFocus,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import { ProductDescription as ProductDescriptionType } from '../../types/Product';
import styles from './ProductDescription.module.scss';
import useNavigation from '../../hooks/useNavigation';
import { useEffect, useState } from 'react';
import FocusableButton from '../../ui/atoms/FocusableButton';
import { formatCurrency } from '../../utils';
import FocusableDiv from '../../ui/atoms/FocusableDiv';
import { isUserLoggedIn } from '../../utils/login';
import LoginNudge from '../LoginNudge';
import { addItemToCart, checkIfItemInCart } from '../../utils/ cart';
import toast, { Toaster } from 'react-hot-toast';
import { ADD_TO_CART, GO_TO_CART, OUT_OF_STOCK } from '../../constants/cart';
import REDIRECTION_ROUTES from '../../constants/routes';

type Props = {
  data: ProductDescriptionType;
};

const CTA_FOCUS_KEY = 'addToCartFocusKey';

const ProductDescription = ({ data }: Props) => {
  const { ref, focusKey } = useFocusable();

  const {
    productId,
    productImages,
    title,
    description,
    price,
    discount,
    rating,
    category,
    brand,
    stock,
    reviews,
  } = data;

  // states
  const [selectedImage, setSelectedImage] = useState(productImages[0]);
  const [showLoginNudge, setShowLoginNudge] = useState(false);
  const [isItemInCart, setIsItemInCart] = useState(false);

  const { navigateTo } = useNavigation({});

  const getCartLabel = () => {
    let label = ADD_TO_CART;
    if (isItemInCart) label = GO_TO_CART;
    else if (stock === 0) label = OUT_OF_STOCK;
    return label;
  };

  const handleCloseLoginNudge = () => {
    setShowLoginNudge(false);
  };

  const handleCartCtaClick = () => {
    if (isItemInCart) {
      navigateTo(REDIRECTION_ROUTES.cart);
    }
    if (!isUserLoggedIn()) {
      setShowLoginNudge(true);
    } else {
      addItemToCart(data);
      setIsItemInCart(true);
      toast.success(`${title} added to cart`);
    }
  };

  useEffect(() => {
    setIsItemInCart(checkIfItemInCart(productId));
  }, []);

  useEffect(() => {
    setFocus(CTA_FOCUS_KEY);
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div className={styles.container} ref={ref}>
        {/* Header */}
        <div className={styles.header}>{title}</div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Image Gallery */}
          <div className={styles.firstSection}>
            <div className={styles.imageGallery}>
              <img src={selectedImage} alt='Selected Product' />
              <div className={styles.thumbnail}>
                {productImages.map((image, index) => (
                  <FocusableDiv
                    onEnterPressCallback={() => setSelectedImage(image)}
                  >
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={selectedImage === image ? 'active' : ''}
                      onClick={() => setSelectedImage(image)}
                    />
                  </FocusableDiv>
                ))}
              </div>
            </div>

            {/* Buy Section */}
            <div className={styles.buySection}>
              <FocusableButton
                focusKey={CTA_FOCUS_KEY}
                label={getCartLabel()}
                onClick={handleCartCtaClick}
                disabled={!stock}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className={styles.productDetails}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            <div className={styles.price}>
              {formatCurrency(price)}
              <span className={styles.discount}>{discount}% off</span>
            </div>
            <ul className={styles.features}>
              <div className={styles.feature}>Brand: {brand}</div>
              <div className={styles.feature}>Category: {category}</div>
              <div className={styles.feature}>Rating: ⭐ {rating}</div>
              <div className={styles.feature}>
                Stock: {stock > 0 ? `${stock} available` : 'Out of stock'}
              </div>
            </ul>

            {/* Reviews */}
            <div className={styles.reviews}>
              <h2>Reviews</h2>
              {reviews.map((review, index) => (
                <div key={index} className={styles.review}>
                  <div className={styles.rating}>
                    Rating: ⭐ {review.rating}
                  </div>
                  <div className={styles.comment}>{review.comment}</div>
                  <div className={styles.reviewer}>
                    - {review.reviewerName} ({review.reviewerEmail})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showLoginNudge && (
          <LoginNudge
            onClose={handleCloseLoginNudge}
            title='Login to continue'
            description='You must be logged in to add this item to cart'
          />
        )}

        <Toaster />
      </div>
    </FocusContext.Provider>
  );
};

export default ProductDescription;

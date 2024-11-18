import { BASE_URL, HOMEPAGE_CATEGORIES } from '../constants';
import { serializeProduct } from './getProducts';
import Layout from '../types/Layout';

const getHomepageData = async () => {
  const baseCategoryUrl = `${BASE_URL}/products/category/`;

  const requests = HOMEPAGE_CATEGORIES.map((category) =>
    fetch(`${baseCategoryUrl}${category}`).then((response) => response.json())
  );

  const response = await Promise.all(requests)
    .then((results) => {
      const output: Layout[] = results.map((result, index) => ({
        title: `Trending in ${HOMEPAGE_CATEGORIES[index]}`,
        products: serializeProduct(result.products),
      }));
      return output;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      return null;
    });
  return response;
};

export default getHomepageData;

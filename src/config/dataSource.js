/**
 * Data Source Configuration
 * Permet canviar entre dades mock i WordPress segons l'entorn
 */

import { mockProducts } from '@/data/mockProducts';
import { netlifyWooClient } from '@/api/netlify-woocommerce';

// Check if we should use WordPress data
const USE_WORDPRESS = import.meta.env.VITE_USE_MOCK_DATA === 'false';

/**
 * Get all products from the configured source
 */
export const getProducts = async () => {
  if (USE_WORDPRESS) {
    try {
      return await netlifyWooClient.getTransformedProducts();
    } catch (error) {
      console.error('Error fetching WordPress products, falling back to mock data:', error);
      return mockProducts;
    }
  }

  return mockProducts;
};

/**
 * Get single product by ID
 */
export const getProductById = async (id) => {
  if (USE_WORDPRESS) {
    try {
      const product = await netlifyWooClient.getProduct(id);
      return netlifyWooClient.transformProduct(product);
    } catch (error) {
      console.error('Error fetching WordPress product, falling back to mock data:', error);
      return mockProducts.find(p => p.id === parseInt(id));
    }
  }

  return mockProducts.find(p => p.id === parseInt(id));
};

/**
 * Search products
 */
export const searchProducts = async (searchTerm) => {
  if (USE_WORDPRESS) {
    try {
      const results = await netlifyWooClient.searchProducts(searchTerm);
      return results.map(p => netlifyWooClient.transformProduct(p));
    } catch (error) {
      console.error('Error searching WordPress products, falling back to mock data:', error);
      return mockProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  return mockProducts.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

/**
 * Get products by category
 */
export const getProductsByCategory = async (categorySlug) => {
  if (USE_WORDPRESS) {
    try {
      // Map category slugs to WordPress category names (not IDs)
      // WooCommerce will search by category name
      const categoryMap = {
        'first-contact': 'First Contact',
        'the-human-inside': 'The Human Inside',
        'outcasted': 'Outcasted',
        'cube': 'Cube',
        'austen': 'Austen',
        'phoenix': 'Phoenix'
      };

      const categoryName = categoryMap[categorySlug];
      if (categoryName) {
        // Search by category name
        const allProducts = await netlifyWooClient.getTransformedProducts({ per_page: 100 });
        return allProducts.filter(p => p.category === categoryName);
      }

      return [];
    } catch (error) {
      console.error('Error fetching WordPress category products, falling back to mock data:', error);
      return mockProducts.filter(p => p.collection === categorySlug);
    }
  }

  return mockProducts.filter(p => p.collection === categorySlug);
};

/**
 * Check if using WordPress data source
 */
export const isUsingWordPress = () => USE_WORDPRESS;

/**
 * Get data source name for debugging
 */
export const getDataSourceName = () => USE_WORDPRESS ? 'WordPress' : 'Mock Data';

export default {
  getProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
  isUsingWordPress,
  getDataSourceName,
};

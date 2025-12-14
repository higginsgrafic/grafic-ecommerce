/**
 * WooCommerce REST API Client
 * Handles product fetching and order management
 */

import { decodeHtml } from '@/utils/decodeHtml';

const WP_URL = import.meta.env.VITE_WP_URL || 'https://higginsgrafic.com';
const WOO_CONSUMER_KEY = import.meta.env.VITE_WOO_CONSUMER_KEY;
const WOO_CONSUMER_SECRET = import.meta.env.VITE_WOO_CONSUMER_SECRET;

class WooCommerceClient {
  constructor() {
    this.baseUrl = `${WP_URL}/wp-json/wc/v3`;
    this.consumerKey = WOO_CONSUMER_KEY;
    this.consumerSecret = WOO_CONSUMER_SECRET;
  }

  /**
   * Build URL with OAuth parameters
   */
  buildAuthUrl(endpoint, params = {}) {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    // Add consumer key and secret as query parameters
    url.searchParams.append('consumer_key', this.consumerKey);
    url.searchParams.append('consumer_secret', this.consumerSecret);

    // Add additional parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });

    return url.toString();
  }

  /**
   * Make request to WooCommerce API
   */
  async request(endpoint, options = {}) {
    const { params = {}, ...fetchOptions } = options;
    const url = this.buildAuthUrl(endpoint, params);

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        ...fetchOptions,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'WooCommerce API error');
      }

      return await response.json();
    } catch (error) {
      console.error('WooCommerce request error:', error);
      throw error;
    }
  }

  /**
   * Get all products
   */
  async getProducts(params = {}) {
    const defaultParams = {
      per_page: 100,
      status: 'publish',
      ...params,
    };

    return this.request('/products', { params: defaultParams });
  }

  /**
   * Get single product by ID
   */
  async getProduct(productId) {
    return this.request(`/products/${productId}`);
  }

  /**
   * Get product variations
   */
  async getProductVariations(productId) {
    return this.request(`/products/${productId}/variations`, {
      params: { per_page: 100 }
    });
  }

  /**
   * Search products
   */
  async searchProducts(searchTerm) {
    return this.request('/products', {
      params: {
        search: searchTerm,
        per_page: 50,
      }
    });
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(categoryId) {
    return this.request('/products', {
      params: {
        category: categoryId,
        per_page: 100,
      }
    });
  }

  /**
   * Create order
   */
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  /**
   * Get order by ID
   */
  async getOrder(orderId) {
    return this.request(`/orders/${orderId}`);
  }

  /**
   * Update order status
   */
  async updateOrderStatus(orderId, status) {
    return this.request(`/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  /**
   * Get product categories
   */
  async getCategories() {
    return this.request('/products/categories', {
      params: { per_page: 100 }
    });
  }

  /**
   * Get product attributes
   */
  async getProductAttributes(productId) {
    return this.request(`/products/${productId}/attributes`);
  }

  /**
   * Transform WooCommerce product to GRÀFIC format
   */
  transformProduct(wooProduct) {
    // Descodificar textos amb accents i apòstrofs catalans
    const name = decodeHtml(wooProduct.name);
    const rawDescription = wooProduct.short_description || '';
    const descriptionWithoutTags = rawDescription.replace(/<[^>]*>/g, '');
    const description = decodeHtml(descriptionWithoutTags);
    const category = decodeHtml(wooProduct.categories?.[0]?.name || '');

    return {
      id: wooProduct.id,
      name: name,
      description: description,
      price: parseFloat(wooProduct.price),
      image: wooProduct.images?.[0]?.src || '',
      hoverImage: wooProduct.images?.[1]?.src || wooProduct.images?.[0]?.src,
      category: category,
      slug: wooProduct.slug,
      sku: wooProduct.sku,
      inStock: wooProduct.stock_status === 'instock',
      sizes: ['S', 'M', 'L', 'XL'], // Default sizes, can be overridden by variations
      gallery: wooProduct.images?.map(img => img.src) || [],
      // Store original WooCommerce data for reference
      _woocommerce: wooProduct,
    };
  }

  /**
   * Get all products and transform to GRÀFIC format
   */
  async getTransformedProducts(params = {}) {
    const products = await this.getProducts(params);
    return products.map(product => this.transformProduct(product));
  }
}

// Export singleton instance
export const wooClient = new WooCommerceClient();

export default wooClient;

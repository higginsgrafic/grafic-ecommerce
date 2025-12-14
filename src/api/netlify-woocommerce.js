/**
 * Netlify Functions WooCommerce Client
 * Uses Netlify serverless functions to securely access WooCommerce
 */

import { decodeHtml } from '@/utils/decodeHtml';

// Check if running locally or in production
const NETLIFY_FUNCTIONS_URL = import.meta.env.DEV
  ? 'http://localhost:8888/.netlify/functions'
  : '/.netlify/functions';

class NetlifyWooCommerceClient {
  constructor() {
    this.functionsUrl = NETLIFY_FUNCTIONS_URL;
  }

  /**
   * Fetch products via Netlify Function
   */
  async getProducts(params = {}) {
    const queryParams = new URLSearchParams(params);
    const url = `${this.functionsUrl}/woocommerce-products?${queryParams}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  /**
   * Get single product by ID
   */
  async getProduct(productId) {
    const url = `${this.functionsUrl}/woocommerce-products?product_id=${productId}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  /**
   * Search products
   */
  async searchProducts(searchTerm) {
    return this.getProducts({ search: searchTerm, per_page: 50 });
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(categoryId) {
    return this.getProducts({ category: categoryId, per_page: 100 });
  }

  /**
   * Transform WooCommerce product to GRÀFIC format
   */
  transformProduct(wooProduct) {
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
      sizes: ['S', 'M', 'L', 'XL'],
      gallery: wooProduct.images?.map(img => img.src) || [],
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
export const netlifyWooClient = new NetlifyWooCommerceClient();

export default netlifyWooClient;

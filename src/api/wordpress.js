/**
 * WordPress REST API Client
 * For public WordPress data (posts, pages, media)
 * For WooCommerce, use woocommerce.js instead
 */

import { decodeHtml } from '@/utils/decodeHtml';

const WP_URL = import.meta.env.VITE_WP_URL || 'https://higginsgrafic.com';
const WP_API_URL = import.meta.env.VITE_WP_API_URL || `${WP_URL}/wp-json`;

class WordPressClient {
  constructor() {
    this.baseUrl = WP_API_URL;
  }

  /**
   * Make request to WordPress API
   */
  async request(endpoint, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('WordPress request error:', error);
      throw error;
    }
  }

  /**
   * GET request
   */
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    return this.request(url, { method: 'GET' });
  }

  /**
   * Get WordPress posts
   */
  async getPosts(params = {}) {
    return this.get('/wp/v2/posts', params);
  }

  /**
   * Get single post
   */
  async getPost(postId) {
    return this.get(`/wp/v2/posts/${postId}`);
  }

  /**
   * Get WordPress pages
   */
  async getPages(params = {}) {
    return this.get('/wp/v2/pages', params);
  }

  /**
   * Get single page
   */
  async getPage(pageId) {
    return this.get(`/wp/v2/pages/${pageId}`);
  }

  /**
   * Get media items
   */
  async getMedia(params = {}) {
    return this.get('/wp/v2/media', params);
  }

  /**
   * Search content
   */
  async search(searchTerm, params = {}) {
    return this.get('/wp/v2/search', {
      search: searchTerm,
      ...params,
    });
  }
}

// Export singleton instance
export const wpClient = new WordPressClient();

export default wpClient;

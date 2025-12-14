import { useState, useEffect, useCallback } from 'react';
import { wooClient } from '@/api/woocommerce';

/**
 * Hook for fetching and managing WooCommerce products
 * Provides loading states, error handling, and product caching
 */
export const useWooProducts = (options = {}) => {
  const {
    autoFetch = true,
    params = {},
    cacheTime = 5 * 60 * 1000, // 5 minutes default cache
  } = options;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  /**
   * Fetch products from WooCommerce
   */
  const fetchProducts = useCallback(async (fetchParams = {}) => {
    setLoading(true);
    setError(null);

    try {
      const mergedParams = { ...params, ...fetchParams };
      const data = await wooClient.getTransformedProducts(mergedParams);

      setProducts(data);
      setLastFetch(Date.now());

      return data;
    } catch (err) {
      console.error('Error fetching WooCommerce products:', err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [params]);

  /**
   * Fetch single product by ID
   */
  const fetchProduct = useCallback(async (productId) => {
    setLoading(true);
    setError(null);

    try {
      const product = await wooClient.getProduct(productId);
      const transformed = wooClient.transformProduct(product);

      return transformed;
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Search products
   */
  const searchProducts = useCallback(async (searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') {
      return products; // Return all products if no search term
    }

    setLoading(true);
    setError(null);

    try {
      const results = await wooClient.searchProducts(searchTerm);
      const transformed = results.map(p => wooClient.transformProduct(p));

      return transformed;
    } catch (err) {
      console.error('Error searching products:', err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [products]);

  /**
   * Refresh products (bypass cache)
   */
  const refresh = useCallback(() => {
    return fetchProducts();
  }, [fetchProducts]);

  /**
   * Check if cache is still valid
   */
  const isCacheValid = useCallback(() => {
    if (!lastFetch) return false;
    return Date.now() - lastFetch < cacheTime;
  }, [lastFetch, cacheTime]);

  /**
   * Auto-fetch on mount if enabled
   */
  useEffect(() => {
    if (autoFetch && !isCacheValid()) {
      fetchProducts();
    }
  }, [autoFetch, fetchProducts, isCacheValid]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProduct,
    searchProducts,
    refresh,
    isCacheValid,
  };
};

/**
 * Hook for fetching a single product
 */
export const useWooProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    if (!productId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await wooClient.getProduct(productId);
      const transformed = wooClient.transformProduct(data);

      setProduct(transformed);
      return transformed;
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    error,
    refresh: fetchProduct,
  };
};

/**
 * Hook for product categories
 */
export const useWooCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await wooClient.getCategories();
      setCategories(data);
      return data;
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    refresh: fetchCategories,
  };
};

export default useWooProducts;

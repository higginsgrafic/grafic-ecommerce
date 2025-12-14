import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockProducts, mockProductsBlava, mockProductsNegra, mockProductsGreen, mockProductsCube } from '@/data/mockProducts.jsx';

// Context global per productes i estat de l'aplicació
const ProductContext = createContext();

// Combinar tots els productes
const allProducts = [
  ...mockProducts,
  ...mockProductsBlava,
  ...mockProductsNegra,
  ...mockProductsGreen,
  ...mockProductsCube
];

export const ProductProvider = ({ children }) => {
  // Estat de productes (en futur vindran de l'API)
  const [products, setProducts] = useState(allProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cistell (persistit a localStorage)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Favorits/Wishlist (persistit a localStorage)
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Filtres actius
  const [filters, setFilters] = useState({
    collection: [],
    priceRange: [0, 100],
    search: ''
  });

  // Persistir cistell a localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Persistir wishlist a localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Funcions per gestionar productes
  const getProductById = (id) => {
    return products.find(p => p.id === parseInt(id));
  };

  const getProductsByCollection = (collection) => {
    return products.filter(p => p.collection === collection);
  };

  const searchProducts = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery)
    );
  };

  // Funcions per gestionar cistell
  const addToCart = (product, size, quantity = 1) => {
    const existingItem = cartItems.find(
      item => item.id === product.id && item.size === size
    );

    if (existingItem) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, size, quantity }]);
    }
  };

  const updateQuantity = (itemId, size, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId, size);
      return;
    }

    setCartItems(
      cartItems.map(item =>
        item.id === itemId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (itemId, size) => {
    setCartItems(cartItems.filter(item => !(item.id === itemId && item.size === size)));
  };

  const updateSize = (itemId, oldSize, newSize, quantity) => {
    const item = cartItems.find(i => i.id === itemId && i.size === oldSize);
    if (!item) return;

    const newCartItems = cartItems.filter(i => !(i.id === itemId && i.size === oldSize));
    const existingNewSizeItem = newCartItems.find(i => i.id === itemId && i.size === newSize);

    if (existingNewSizeItem) {
      setCartItems(
        newCartItems.map(i =>
          i.id === itemId && i.size === newSize
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      );
    } else {
      setCartItems([...newCartItems, { ...item, size: newSize, quantity }]);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Funcions per gestionar wishlist/favorits
  const addToWishlist = (product) => {
    const exists = wishlistItems.find(item => item.id === product.id);
    if (!exists) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
  };

  const toggleWishlist = (product) => {
    const exists = wishlistItems.find(item => item.id === product.id);
    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  // Aplicar filtres
  const getFilteredProducts = () => {
    let filtered = [...products];

    // Filtre per col·lecció
    if (filters.collection.length > 0) {
      filtered = filtered.filter(p => filters.collection.includes(p.collection));
    }

    // Filtre per preu
    filtered = filtered.filter(p =>
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Filtre per cerca
    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const value = {
    // Productes
    products,
    loading,
    error,
    getProductById,
    getProductsByCollection,
    searchProducts,
    getFilteredProducts,

    // Cistell
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    updateSize,
    clearCart,
    getTotalItems,
    getTotalPrice,

    // Wishlist/Favorits
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount,

    // Filtres
    filters,
    setFilters
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook personalitzat per utilitzar el context
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext ha de ser utilitzat dins de ProductProvider');
  }
  return context;
};

export default ProductContext;

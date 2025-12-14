import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useProductContext } from '@/contexts/ProductContext';
import { initAnalytics, trackPageView } from '@/utils/analytics';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingScreen from '@/components/LoadingScreen';
import SkipLink from '@/components/SkipLink';
import OffersHeader from '@/components/OffersHeader';
import Header from '@/components/Header';

import ScrollToTop from '@/components/ScrollToTop';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import Checkout from '@/components/Checkout';
import ViewportIndicator from '@/components/ViewportIndicator';

// Lazy loading de pàgines per millorar performance (code splitting)
const Home = lazy(() => import('@/pages/Home'));
const FirstContactPage = lazy(() => import('@/pages/FirstContactPage'));
const TheHumanInsidePage = lazy(() => import('@/pages/TheHumanInsidePage'));
const AustenPage = lazy(() => import('@/pages/AustenPage'));
const CubePage = lazy(() => import('@/pages/CubePage'));
const OutcastedPage = lazy(() => import('@/pages/OutcastedPage'));
const CollectionsPage = lazy(() => import('@/pages/CollectionsPage'));
const NewPage = lazy(() => import('@/pages/NewPage'));
const OrderStatusPage = lazy(() => import('@/pages/OrderStatusPage'));
const OrderTrackingPage = lazy(() => import('@/pages/OrderTrackingPage'));
const CartPage = lazy(() => import('@/pages/CartPage'));
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'));
const WishlistPage = lazy(() => import('@/pages/WishlistPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const OffersPage = lazy(() => import('@/pages/OffersPage'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'));
const OrderConfirmationPage = lazy(() => import('@/pages/OrderConfirmationPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const FAQPage = lazy(() => import('@/pages/FAQPage'));
const ShippingPage = lazy(() => import('@/pages/ShippingPage'));
const SizeGuidePage = lazy(() => import('@/pages/SizeGuidePage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const TermsPage = lazy(() => import('@/pages/TermsPage'));
const CreativeCommonsPage = lazy(() => import('@/pages/CreativeCommonsPage'));

// Component Gallery (dev/showcase)
const ComponentShowcase = lazy(() => import('@/components/examples/ComponentShowcase'));

// Product Test Page (dev only)
const ProductTestPage = lazy(() => import('@/pages/ProductTestPage'));
const ViewportTestPage = lazy(() => import('@/pages/ViewportTestPage'));

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showViewportIndicator, setShowViewportIndicator] = useState(false);
  const location = useLocation();

  // Utilitzar Context API en lloc d'estat local
  const { cartItems, getTotalItems, getTotalPrice, addToCart, updateQuantity, removeFromCart, updateSize, clearCart } = useProductContext();

  // Loading state on route change
  useEffect(() => {
    setIsNavigating(true);

    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [location.pathname]);

  // Inicialitzar analytics
  useEffect(() => {
    initAnalytics();
  }, []);

  // Track page views
  useEffect(() => {
    trackPageView(location.pathname, document.title);
  }, [location.pathname]);

  // Obrir cistell quan s'afegeix un producte
  const handleAddToCart = (product, size, quantity = 1, shouldOpenCart = true) => {
    addToCart(product, size, quantity);
    if (shouldOpenCart) {
      setIsCartOpen(true);
    }
  };

  // Shared props for pages
  const pageProps = {
    onAddToCart: handleAddToCart,
    cartItems,
    onUpdateQuantity: updateQuantity
  };

  // Comprovar si estem a pàgines de test (dev only)
  const isTestRoute = location.pathname === '/test-products' || location.pathname === '/viewport-test';

  return (
    <ErrorBoundary>
      <>
          <SkipLink />
          {isNavigating && <LoadingScreen />}



          <div
            className="min-h-screen bg-white dark:bg-gray-900 flex flex-col overflow-x-hidden"
          >
        {/* Headers - NO mostrar a pàgines de test */}
        {!isTestRoute && (
          <>
            <OffersHeader />
            <Header
              cartItemCount={getTotalItems()}
              onCartClick={() => setIsCartOpen(true)}
            />
          </>
        )}

        <main id="main-content" className={`flex-grow ${!isTestRoute ? 'pt-[104px] lg:pt-[120px]' : ''}`} tabIndex={-1}>
          <Suspense fallback={<LoadingScreen />}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Home {...pageProps} />
                  </motion.div>
                } />
                <Route path="/first-contact" element={
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <FirstContactPage {...pageProps} />
                  </motion.div>
                } />
                <Route path="/the-human-inside" element={
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <TheHumanInsidePage {...pageProps} />
                  </motion.div>
                } />
                <Route path="/austen" element={
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <AustenPage {...pageProps} />
                  </motion.div>
                } />
                <Route path="/cube" element={
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <CubePage {...pageProps} />
                  </motion.div>
                } />
                <Route path="/outcasted" element={
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <OutcastedPage {...pageProps} />
                  </motion.div>
                } />

                {/* Product Detail Page */}
                <Route
                  path="/product/:id"
                  element={
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ProductDetailPage {...pageProps} />
                    </motion.div>
                  }
                />

                {/* Search Page */}
                <Route
                  path="/search"
                  element={
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <SearchPage {...pageProps} />
                    </motion.div>
                  }
                />

                {/* Cart Page */}
                <Route
                  path="/cart"
                  element={
                    <CartPage
                      cartItems={cartItems}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  }
                />

                {/* Wishlist/Favorits Page */}
                <Route
                  path="/wishlist"
                  element={
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <WishlistPage {...pageProps} />
                    </motion.div>
                  }
                />

                {/* Profile Page */}
                <Route
                  path="/profile"
                  element={
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ProfilePage />
                    </motion.div>
                  }
                />

                {/* Checkout Page */}
                <Route
                  path="/checkout"
                  element={
                    <CheckoutPage
                      cartItems={cartItems}
                      onClearCart={clearCart}
                    />
                  }
                />

                {/* Order Confirmation Page */}
                <Route
                  path="/order-confirmation/:orderId"
                  element={
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <OrderConfirmationPage />
                    </motion.div>
                  }
                />

                {/* Footer Service Pages - Només català */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/shipping" element={<ShippingPage />} />
                <Route path="/sizing" element={<SizeGuidePage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/cc" element={<CreativeCommonsPage />} />
                <Route path="/offers" element={<OffersPage />} />

                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/new" element={<NewPage />} />
                <Route path="/status" element={<OrderStatusPage />} />
                <Route path="/track" element={<OrderTrackingPage />} />

                {/* Component Gallery - Showcase de components reutilitzables */}
                <Route path="/components" element={<ComponentShowcase />} />

                {/* Product Test Page - Dev only */}
                <Route path="/test-products" element={<ProductTestPage />} />
                <Route path="/viewport-test" element={<ViewportTestPage />} />

                {/* 404 Page - Must be last */}
                <Route path="*" element={<NotFoundPage />} />

              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>

        {/* Footer - NO mostrar a pàgines de test */}
        {!isTestRoute && <Footer />}

        <ScrollToTop />

        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onUpdateSize={updateSize}
          totalPrice={getTotalPrice()}
        />

        <Checkout
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={cartItems}
          totalPrice={getTotalPrice()}
          onComplete={() => {
            clearCart();
            setIsCheckoutOpen(false);
          }}
        />

        {/* Viewport Indicator */}
        <ViewportIndicator
          visible={showViewportIndicator}
          onClose={() => setShowViewportIndicator(false)}
        />

        {/* Toggle button for Viewport Indicator */}
        <button
          onClick={() => setShowViewportIndicator(!showViewportIndicator)}
          className="fixed bottom-4 left-4 z-40 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 group"
          aria-label="Mostrar/Ocultar indicador de viewport"
          title="Mostrar/Ocultar indicador de viewport"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2" />
            <path d="M8 21h8" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 17v4" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {showViewportIndicator ? 'Ocultar' : 'Mostrar'} dimensions
          </span>
        </button>
          </div>
        </>
    </ErrorBoundary>
  );
}

export default App;

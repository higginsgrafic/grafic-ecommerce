import React from 'react';
import { Helmet } from 'react-helmet';
import ProductGrid from '@/components/ProductGrid';
import { mockProductsGreen } from '@/data/mockProducts.jsx';
import { useTexts } from '@/hooks/useTexts';
import Breadcrumbs from '@/components/Breadcrumbs';

function AustenPage({ onAddToCart, cartItems, onUpdateQuantity }) {
  const texts = useTexts();

  return (
    <>
      <Helmet>
        <title>{texts.collections.austen.seo.title}</title>
        <meta name="description" content={texts.collections.austen.seo.description} />
      </Helmet>

      <div className="py-6 sm:py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
          <Breadcrumbs items={[
            { label: 'Col·leccions', link: '/collections' },
            { label: 'Austen' }
          ]} />
        </div>

        <ProductGrid
          title={texts.collections.austen.title}
          description={texts.collections.austen.description}
          products={mockProductsGreen}
          onAddToCart={onAddToCart}
          cartItems={cartItems}
          onUpdateQuantity={onUpdateQuantity}
        />
      </div>
    </>
  );
}

export default AustenPage;

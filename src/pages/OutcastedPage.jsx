import React from 'react';
import { Helmet } from 'react-helmet';
import ProductGrid from '@/components/ProductGrid';
import { mockProductsNegra } from '@/data/mockProducts.jsx';
import { useTexts } from '@/hooks/useTexts';
import Breadcrumbs from '@/components/Breadcrumbs';

function OutcastedPage({ onAddToCart, cartItems, onUpdateQuantity }) {
  const texts = useTexts();

  return (
    <>
      <Helmet>
        <title>{texts.collections.outcasted.seo.title}</title>
        <meta name="description" content={texts.collections.outcasted.seo.description} />
      </Helmet>

      <div className="py-6 sm:py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
          <Breadcrumbs items={[
            { label: 'Col·leccions', link: '/collections' },
            { label: 'Outcasted' }
          ]} />
        </div>

        <ProductGrid
          title={texts.collections.outcasted.title}
          description={texts.collections.outcasted.description}
          products={mockProductsNegra}
          onAddToCart={onAddToCart}
          cartItems={cartItems}
          onUpdateQuantity={onUpdateQuantity}
        />
      </div>
    </>
  );
}

export default OutcastedPage;

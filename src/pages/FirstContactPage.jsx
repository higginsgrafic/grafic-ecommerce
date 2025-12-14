import React from 'react';
import { Helmet } from 'react-helmet';
import ProductGrid from '@/components/ProductGrid';
import { mockProducts } from '@/data/mockProducts.jsx';
import { useTexts } from '@/hooks/useTexts';
import Breadcrumbs from '@/components/Breadcrumbs';

function FirstContactPage({ onAddToCart, cartItems, onUpdateQuantity }) {
  const texts = useTexts();

  return (
    <>
      <Helmet>
        <title>{texts.collections.firstContact.seo.title}</title>
        <meta name="description" content={texts.collections.firstContact.seo.description} />
      </Helmet>

      <div className="py-6 sm:py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
          <Breadcrumbs items={[
            { label: 'Col·leccions', link: '/collections' },
            { label: 'First Contact' }
          ]} />
        </div>

        <ProductGrid
          title={texts.collections.firstContact.title}
          description={texts.collections.firstContact.description}
          products={mockProducts}
          onAddToCart={onAddToCart}
          cartItems={cartItems}
          onUpdateQuantity={onUpdateQuantity}
        />
      </div>
    </>
  );
}

export default FirstContactPage;

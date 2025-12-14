import React from 'react';
import { Helmet } from 'react-helmet';
import ProductGrid from '@/components/ProductGrid';
import { mockProductsBlava } from '@/data/mockProducts.jsx';
import { useTexts } from '@/hooks/useTexts';
import Breadcrumbs from '@/components/Breadcrumbs';

function TheHumanInsidePage({ onAddToCart, cartItems, onUpdateQuantity }) {
  const texts = useTexts();

  return (
    <>
      <Helmet>
        <title>{texts.collections.theHumanInside.seo.title}</title>
        <meta name="description" content={texts.collections.theHumanInside.seo.description} />
      </Helmet>

      <div className="py-6 sm:py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
          <Breadcrumbs items={[
            { label: 'Col·leccions', link: '/collections' },
            { label: 'The Human Inside' }
          ]} />
        </div>

        <ProductGrid
          title={texts.collections.theHumanInside.title}
          description={texts.collections.theHumanInside.description}
          products={mockProductsBlava}
          onAddToCart={onAddToCart}
          cartItems={cartItems}
          onUpdateQuantity={onUpdateQuantity}
          backgroundColor="bg-gray-50"
        />
      </div>
    </>
  );
}

export default TheHumanInsidePage;

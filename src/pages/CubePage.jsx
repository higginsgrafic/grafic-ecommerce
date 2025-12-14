import React from 'react';
import { Helmet } from 'react-helmet';
import ProductGrid from '@/components/ProductGrid';
import { mockProductsCube } from '@/data/mockProducts.jsx';
import { useTexts } from '@/hooks/useTexts';
import Breadcrumbs from '@/components/Breadcrumbs';

function CubePage({ onAddToCart, cartItems, onUpdateQuantity }) {
  const texts = useTexts();

  return (
    <>
      <Helmet>
        <title>{texts.collections.cube.seo.title}</title>
        <meta name="description" content={texts.collections.cube.seo.description} />
      </Helmet>

      <div className="py-6 sm:py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
          <Breadcrumbs items={[
            { label: 'Col·leccions', link: '/collections' },
            { label: 'Cube' }
          ]} />
        </div>

        <ProductGrid
          title={texts.collections.cube.title}
          description={texts.collections.cube.description}
          products={mockProductsCube}
          onAddToCart={onAddToCart}
          cartItems={cartItems}
          onUpdateQuantity={onUpdateQuantity}
          backgroundColor="bg-gray-50"
        />
      </div>
    </>
  );
}

export default CubePage;

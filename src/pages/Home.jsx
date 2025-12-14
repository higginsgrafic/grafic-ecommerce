import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/HeroSection';
import ProductGrid from '@/components/ProductGrid';
import { mockProducts, mockProductsBlava, mockProductsNegra, mockProductsGreen, mockProductsCube } from '@/data/mockProducts.jsx';
import { useTexts } from '@/hooks/useTexts';

function Home({ onAddToCart, cartItems, onUpdateQuantity }) {
  const texts = useTexts();

  // Estat per les dades editables (des de localStorage o per defecte)
  const [sectionsData, setSectionsData] = useState([]);

  // Carregar dades del localStorage o utilitzar per defecte
  useEffect(() => {
    const savedSections = localStorage.getItem('homeEditorSections');

    if (savedSections) {
      // Si hi ha dades guardades a l'editor, utilitzar-les
      setSectionsData(JSON.parse(savedSections));
    } else {
      // Si no, utilitzar les dades per defecte
      setSectionsData([
        {
          id: 'first-contact',
          title: 'FIRST CONTACT',
          description: texts.home.sections.firstContactDesc,
          products: mockProducts,
          collectionPath: '/first-contact',
          bgColor: 'bg-white'
        },
        {
          id: 'the-human-inside',
          title: 'The Human Inside',
          description: texts.home.sections.theHumanInsideDesc,
          products: mockProductsBlava,
          collectionPath: '/the-human-inside',
          bgColor: 'bg-gray-50'
        },
        {
          id: 'austen',
          title: 'Austen',
          description: texts.home.sections.austenDesc,
          products: mockProductsGreen,
          collectionPath: '/austen',
          bgColor: 'bg-white'
        },
        {
          id: 'cube',
          title: 'Cube',
          description: texts.home.sections.cubeDesc,
          products: mockProductsCube,
          collectionPath: '/cube',
          bgColor: 'bg-gray-50'
        },
        {
          id: 'outcasted',
          title: 'Outcasted',
          description: texts.home.sections.outcastedDesc,
          products: mockProductsNegra,
          collectionPath: '/outcasted',
          bgColor: 'bg-white'
        }
      ]);
    }
  }, [texts]);

  return (
    <>
      <Helmet>
        <title>{texts.home.seo.title}</title>
        <meta name="description" content={texts.home.seo.description} />
      </Helmet>

      <HeroSection />

      <div>
        <div className="space-y-0">
          {sectionsData.map((section) => (
            <ProductGrid
              key={section.id}
              title={section.title}
              description={section.description}
              products={section.products}
              onAddToCart={onAddToCart}
              cartItems={cartItems}
              onUpdateQuantity={onUpdateQuantity}
              collectionPath={section.collectionPath}
              backgroundColor={section.bgColor}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;

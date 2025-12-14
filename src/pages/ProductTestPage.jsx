import React from 'react';
import ProductCard from '@/components/ProductCard';

const ProductTestPage = () => {
  const testProduct = {
    id: 1,
    name: 'MASCHINENMENSCH',
    description: 'First Contact #01',
    price: 15.50,
    image: '/products/first-contact/maschinenmensch.jpg',
    collection: 'First Contact'
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-oswald font-bold mb-8 text-center">Test Botons de Talles - Escalat Proporcional</h1>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i}>
              <ProductCard
                product={testProduct}
                onAddToCart={() => {}}
                cartItems={[]}
              />
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-oswald font-bold mb-4">Canvis Aplicats:</h2>
          <ul className="space-y-2 font-roboto text-sm list-disc list-inside">
            <li>Botons utilitzen <code>width: 100%</code> per omplir el contenidor</li>
            <li>Grid layout amb columnes iguals (<code>1fr</code>)</li>
            <li>Aspect ratio 16:9 per mantenir proporcions</li>
            <li>Font size amb <code>clamp(0.65rem, 3.5vw, 1.125rem)</code> per escalat fluid</li>
            <li>Eliminat <code>scale-75 md:scale-90</code> a favor d'escalat natural</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductTestPage;

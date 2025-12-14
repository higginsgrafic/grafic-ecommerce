import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from '../ui/CartIcon';
import SizeButton from '../ui/SizeButton';
import SizeButtonGroup from '../ui/SizeButtonGroup';
import PriceDisplay from '../ui/PriceDisplay';
import ProductCard from '../ProductCard';

/**
 * GALERIA DE COMPONENTS - Eina de Treball
 * Referència ràpida dels components del sistema
 */
function ComponentShowcase() {
  const [selectedSize, setSelectedSize] = React.useState('M');

  const exampleProduct = {
    id: 'example-1',
    name: 'MASCHINENMENSCH',
    description: 'Component major compost per elements menors.',
    price: 15.50,
    image: 'https://same-assets.com/grafc/first-contact-1.png',
    collection: 'first-contact'
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="border-b">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Components
          </h1>
          <Link to="/" className="text-sm text-gray-600 hover:text-black">
            ← Sortir
          </Link>
        </div>
      </div>

      {/* Contingut */}
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* ProductCard */}
        <section className="mb-12 pb-12 border-b">
          <h2 className="font-bold mb-4">ProductCard</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded">
              <div className="max-w-xs mx-auto">
                <ProductCard product={exampleProduct} onAddToCart={() => {}} />
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 mb-3">Ús:</div>
              <div className="bg-gray-100 p-3 rounded text-xs font-mono">
{`<ProductCard
  product={product}
  onAddToCart={handleAddToCart}
/>`}
              </div>

              <div className="text-sm text-gray-600 mt-4 mb-2">Composició:</div>
              <div className="text-sm font-mono text-gray-700 space-y-1">
                <div>├─ ProductImage</div>
                <div>├─ ProductTitle</div>
                <div>├─ ProductDescription</div>
                <div>├─ PriceDisplay</div>
                <div>├─ CartIcon</div>
                <div>└─ SizeButtonGroup</div>
              </div>
            </div>
          </div>
        </section>

        {/* SizeButtonGroup */}
        <section className="mb-12 pb-12 border-b">
          <h2 className="font-bold mb-4">SizeButtonGroup</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded">
              <SizeButtonGroup
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
              />
              <div className="text-xs text-gray-500 mt-3">Seleccionat: {selectedSize}</div>
            </div>

            <div>
              <div className="bg-gray-100 p-3 rounded text-xs font-mono">
{`<SizeButtonGroup
  selectedSize={selectedSize}
  onSizeChange={setSelectedSize}
/>`}
              </div>

              <div className="mt-4 text-sm">
                <div className="font-mono text-xs text-gray-600 mb-1">Props:</div>
                <table className="w-full text-xs">
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-1 font-mono">selectedSize</td>
                      <td className="py-1 text-gray-600">string</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-mono">onSizeChange</td>
                      <td className="py-1 text-gray-600">function</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* SizeButton */}
        <section className="mb-12 pb-12 border-b">
          <h2 className="font-bold mb-4">SizeButton</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded">
              <div className="flex gap-2">
                <SizeButton size="S" selected={false} />
                <SizeButton size="M" selected={true} />
                <SizeButton size="L" selected={false} />
              </div>
            </div>

            <div>
              <div className="bg-gray-100 p-3 rounded text-xs font-mono">
{`<SizeButton
  size="M"
  selected={true}
  onClick={handleClick}
/>`}
              </div>

              <div className="mt-4 text-sm">
                <div className="font-mono text-xs text-gray-600 mb-1">Props:</div>
                <table className="w-full text-xs">
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-1 font-mono">size</td>
                      <td className="py-1 text-gray-600">string</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-mono">selected</td>
                      <td className="py-1 text-gray-600">boolean</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-mono">onClick</td>
                      <td className="py-1 text-gray-600">function</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* CartIcon */}
        <section className="mb-12 pb-12 border-b">
          <h2 className="font-bold mb-4">CartIcon</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded">
              <div className="flex gap-4 items-center">
                <CartIcon count={0} />
                <CartIcon count={3} />
                <CartIcon count={99} />
              </div>
            </div>

            <div>
              <div className="bg-gray-100 p-3 rounded text-xs font-mono">
{`<CartIcon
  count={3}
  onClick={handleClick}
/>`}
              </div>

              <div className="mt-4 text-sm">
                <div className="font-mono text-xs text-gray-600 mb-1">Props:</div>
                <table className="w-full text-xs">
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-1 font-mono">count</td>
                      <td className="py-1 text-gray-600">number</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-mono">onClick</td>
                      <td className="py-1 text-gray-600">function</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* PriceDisplay */}
        <section className="mb-12">
          <h2 className="font-bold mb-4">PriceDisplay</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded">
              <div className="space-y-2">
                <PriceDisplay price={15.50} />
                <PriceDisplay price={99.99} />
              </div>
            </div>

            <div>
              <div className="bg-gray-100 p-3 rounded text-xs font-mono">
{`<PriceDisplay price={15.50} />`}
              </div>

              <div className="mt-4 text-sm">
                <div className="font-mono text-xs text-gray-600 mb-1">Props:</div>
                <table className="w-full text-xs">
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-1 font-mono">price</td>
                      <td className="py-1 text-gray-600">number</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}

export default ComponentShowcase;

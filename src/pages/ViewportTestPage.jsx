import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Tv, Info } from 'lucide-react';
import ProductCard from '../components/ProductCard';

function ViewportTestPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Product de mostra
  const sampleProduct = {
    id: 1,
    name: 'SAMARRETA BLANCA',
    description: 'Samarreta blanca bàsica sense estampació. Perfecte per veure com s\'escalen els elements.',
    price: 15.50,
    image: '/tshirt-white.jpg'
  };

  // Viewports estàndard amb icones de Lucide i exemples de dispositius
  const viewports = [
    { name: 'Mòbil Petit', width: 320, icon: Smartphone, example: 'iPhone SE' },
    { name: 'Mòbil Mitjà', width: 375, icon: Smartphone, example: 'iPhone 12/13/14' },
    { name: 'Mòbil Gran', width: 414, icon: Smartphone, example: 'iPhone 14 Pro Max' },
    { name: 'Tablet Vertical', width: 768, icon: Smartphone, example: 'iPad (portrait)' },
    { name: 'Tablet Horitzontal', width: 1024, icon: Monitor, example: 'iPad (landscape)' },
    { name: 'Portàtil Petit', width: 1280, icon: Monitor, example: 'MacBook Air 13"' },
    { name: 'Portàtil Estàndard', width: 1440, icon: Tv, example: 'MacBook Pro 14"' },
    { name: 'Desktop Gran', width: 1920, icon: Tv, example: 'Monitor Full HD 24"' },
    { name: 'Desktop Ultra', width: 2560, icon: Tv, example: 'Monitor 2K/4K 27"' }
  ];

  // Calcular valors clamp() per a la mida actual
  const calculateClamp = (min, vw, max, width) => {
    const minPx = parseFloat(min) * 16; // 1rem = 16px
    const maxPx = parseFloat(max) * 16;
    const vwPx = (parseFloat(vw) / 100) * width;

    if (vwPx < minPx) return `${minPx.toFixed(1)}px (MIN)`;
    if (vwPx > maxPx) return `${maxPx.toFixed(1)}px (MAX)`;
    return `${vwPx.toFixed(1)}px`;
  };

  // Detectar tipus de dispositiu actual
  const getCurrentDevice = () => {
    if (windowWidth < 768) return 'Mòbil';
    if (windowWidth < 1024) return 'Tablet';
    return 'Desktop';
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* Header amb info actual */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h1 className="text-4xl font-oswald font-bold text-gray-900 mb-4">
          Testing de Viewports
        </h1>

        {/* Info viewport actual */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-oswald font-medium mb-4">Viewport Actual</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <div className="text-sm text-gray-600">Amplada</div>
              <div className="text-2xl font-bold text-blue-600">{windowWidth}px</div>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <div className="text-sm text-gray-600">Dispositiu</div>
              <div className="text-2xl font-bold text-green-600">{getCurrentDevice()}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded">
              <div className="text-sm text-gray-600">Ratio</div>
              <div className="text-2xl font-bold text-purple-600">{window.devicePixelRatio}x</div>
            </div>
          </div>
        </div>

        {/* Valors clamp() calculats */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-oswald font-medium mb-4">
            <Info className="inline-block w-6 h-6 mr-2 text-blue-500" />
            Valors clamp() Actuals (Actualitzats)
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Els valors clamp() fan que els elements escalin de forma fluida entre un mínim i un màxim segons l'amplada de la pantalla.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-3 rounded">
              <div className="text-sm text-gray-600 font-mono">💰 PriceDisplay (Preu)</div>
              <div className="text-lg font-bold text-gray-900">
                clamp(1.25rem, 3vw, 1.40625rem)
              </div>
              <div className="text-sm text-blue-600 font-mono">
                → {calculateClamp(1.25, 3, 1.40625, windowWidth)}
              </div>
            </div>
            <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded">
              <div className="text-sm text-gray-600 font-mono">🛒 CartIcon (Icona)</div>
              <div className="text-lg font-bold text-gray-900">
                clamp(1.75rem, 3.5vw, 1.640625rem)
              </div>
              <div className="text-sm text-green-600 font-mono">
                → {calculateClamp(1.75, 3.5, 1.640625, windowWidth)}
              </div>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 p-3 rounded">
              <div className="text-sm text-gray-600 font-mono">🔘 SizeButton (Font)</div>
              <div className="text-lg font-bold text-gray-900">
                clamp(0.75rem, 3.2vw, 1.25rem)
              </div>
              <div className="text-sm text-purple-600 font-mono">
                → {calculateClamp(0.75, 3.2, 1.25, windowWidth)}
              </div>
            </div>
            <div className="border-l-4 border-orange-500 pl-4 bg-orange-50 p-3 rounded">
              <div className="text-sm text-gray-600 font-mono">📏 Grid Gap (Separació)</div>
              <div className="text-lg font-bold text-gray-900">
                clamp(0.25rem, 0.8vw, 0.5rem)
              </div>
              <div className="text-sm text-orange-600 font-mono">
                → {calculateClamp(0.25, 0.8, 0.5, windowWidth)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de viewports */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-oswald font-bold text-gray-900 mb-6">
          ProductCards en Diferents Viewports
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {viewports.map((viewport) => {
            const IconComponent = viewport.icon;
            return (
              <div key={viewport.width} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                {/* Header del viewport */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-5 h-5 text-gray-700" />
                      <div>
                        <h3 className="font-oswald font-bold text-lg">{viewport.name}</h3>
                        <p className="text-xs text-gray-500">{viewport.example}</p>
                      </div>
                    </div>
                    <div className="bg-blue-100 px-3 py-1 rounded-full text-sm font-bold border border-blue-300 text-blue-700">
                      {viewport.width}px
                    </div>
                  </div>

                  {/* Valors calculats per aquest viewport */}
                  <div className="text-xs space-y-1 bg-gradient-to-r from-gray-50 to-blue-50 p-3 rounded border border-gray-200">
                    <div className="font-mono"><strong>💰 Preu:</strong> {calculateClamp(1.25, 3, 1.40625, viewport.width)}</div>
                    <div className="font-mono"><strong>🛒 Cistell:</strong> {calculateClamp(1.75, 3.5, 1.640625, viewport.width)}</div>
                    <div className="font-mono"><strong>🔘 Botons:</strong> {calculateClamp(0.75, 3.2, 1.25, viewport.width)}</div>
                  </div>
                </div>

                {/* ProductCard escalada - SENSE fons blanc */}
                <div
                  className="rounded-lg overflow-hidden"
                  style={{
                    width: `${Math.min(viewport.width, 400)}px`,
                    transform: viewport.width > 400 ? `scale(${400 / viewport.width})` : 'none',
                    transformOrigin: 'top left'
                  }}
                >
                  <ProductCard
                    product={sampleProduct}
                    onAddToCart={() => {}}
                    cartItems={[]}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Llegenda i Explicacions */}
      <div className="max-w-7xl mx-auto px-4 mt-8 mb-12">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-lg shadow-md">
          <div className="flex gap-3">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-oswald font-bold text-2xl mb-4 text-gray-900">Com interpretar aquesta pàgina:</h3>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2">📱 Què són els viewports?</h4>
                  <p className="text-sm text-gray-700">
                    Cada quadre mostra com es veu la ProductCard en un dispositiu diferent.
                    Per exemple, "Mòbil Mitjà (iPhone 12/13/14)" mostra exactament com es veurà en un iPhone.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2">📏 Què significa clamp()?</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <code className="bg-gray-100 px-2 py-1 rounded">clamp(0.9rem, 2vw, 1.35rem)</code> vol dir:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                    <li><strong>0.9rem</strong> = Mida mínima (en pantalles petites)</li>
                    <li><strong>2vw</strong> = Creix proporcionalment amb la pantalla</li>
                    <li><strong>1.35rem</strong> = Mida màxima (en pantalles grans)</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2">🔍 Què significa MIN i MAX?</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li><strong className="text-red-600">(MIN)</strong> = La pantalla és tan petita que s'aplica el valor mínim</li>
                    <li><strong className="text-blue-600">Sense etiqueta</strong> = La mida escala proporcionalment</li>
                    <li><strong className="text-green-600">(MAX)</strong> = La pantalla és tan gran que s'aplica el valor màxim</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2">💡 Consells:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>Redimensiona aquesta finestra per veure com canvien els "Valors clamp() Actuals" al capdamunt</li>
                    <li>Les ProductCards més petites de 400px es mostren escalades per veure's millor</li>
                    <li>Compara com es veu el mateix producte en diferents dispositius</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewportTestPage;

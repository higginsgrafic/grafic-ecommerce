import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartIcon from './ui/CartIcon';
import SizeButtonGroup from './ui/SizeButtonGroup';
import SizeButton from './ui/SizeButton';
import PriceDisplay from './ui/PriceDisplay';

function ProductCard({ product, onAddToCart, cartItems = [], variant = 'default' }) {
  const [selectedSize, setSelectedSize] = useState('M');

  // Calcular quantitat total d'aquest producte al cistell
  const productQuantityInCart = cartItems
    .filter(item => item.id === product.id)
    .reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product, selectedSize, 1);
    }
  };

  // Estils segons variant
  const variantStyles = {
    default: {
      padding: 'clamp(0.75rem, 2vw, 1rem)',
      cardShadow: '4px 4px 12px rgba(0, 0, 0, 0.12)',
      imageShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)',
      titleSize: 'clamp(1.125rem, 2.4vw, 1.5rem)',
      descSize: 'clamp(1rem, 2vw, 1.25rem)',
      gap: 'clamp(0.75rem, 1.6vw, 1rem)',
      marginBottom: 'clamp(1rem, 2.4vw, 1.5rem)',
      showDescription: true,
      showSizes: true
    },
    compact: {
      padding: 'clamp(0.5rem, 2vw, 0.75rem)',
      cardShadow: '3px 3px 8px rgba(0, 0, 0, 0.1)',
      imageShadow: '2px 2px 6px rgba(0, 0, 0, 0.08)',
      titleSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
      descSize: 'clamp(0.75rem, 2vw, 1rem)',
      gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
      marginBottom: 'clamp(0.75rem, 2.5vw, 1rem)',
      showDescription: false,
      showSizes: false
    },
    expanded: {
      padding: 'clamp(1rem, 3vw, 1.5rem)',
      cardShadow: '6px 6px 16px rgba(0, 0, 0, 0.15)',
      imageShadow: '5px 5px 12px rgba(0, 0, 0, 0.12)',
      titleSize: 'clamp(1.25rem, 4vw, 1.875rem)',
      descSize: 'clamp(1.125rem, 3vw, 1.5rem)',
      gap: 'clamp(1rem, 3vw, 1.5rem)',
      marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
      showDescription: true,
      showSizes: true
    },
    featured: {
      padding: 'clamp(1rem, 3vw, 1.5rem)',
      cardShadow: '8px 8px 24px rgba(0, 0, 0, 0.18)',
      imageShadow: '6px 6px 16px rgba(0, 0, 0, 0.15)',
      titleSize: 'clamp(1.25rem, 4vw, 1.875rem)',
      descSize: 'clamp(1.125rem, 3vw, 1.5rem)',
      gap: 'clamp(1.25rem, 3.5vw, 1.5rem)',
      marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
      showDescription: true,
      showSizes: true,
      gradient: true
    }
  };

  const styles = variantStyles[variant] || variantStyles.default;

  // Variant horizontal - layout diferent
  if (variant === 'horizontal') {
    return (
      <div
        className="flex flex-row w-full p-3 rounded-sm transition-all duration-300 gap-4 bg-gray-50"
      >
        {/* Imatge petita a l'esquerra */}
        <Link to={`/product/${product.id}`} className="flex-shrink-0">
          <div
            className="w-20 h-20 md:w-24 md:h-24 bg-white overflow-hidden rounded-sm"
            style={{
              boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.08)'
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain transition-transform hover:scale-105 duration-300"
              loading="lazy"
              decoding="async"
            />
          </div>
        </Link>

        {/* Contingut a la dreta */}
        <div className="flex-1 flex flex-col justify-between gap-2">
          {/* Títol centrat */}
          <div className="text-center">
            <Link to={`/product/${product.id}`} className="block">
              <h3 className="font-oswald font-medium uppercase hover:opacity-70 transition-opacity text-gray-900 leading-tight tracking-tight text-base md:text-lg">
                {product.name}
              </h3>
            </Link>
          </div>

          {/* Preu, talles i cistell en línia */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <PriceDisplay price={product.price} />
            <div className="flex items-center gap-2">
              <div className="flex-1 max-w-[180px]">
                <SizeButtonGroup
                  selectedSize={selectedSize}
                  onSizeChange={setSelectedSize}
                  sizes={['S', 'M', 'L', 'XL']}
                />
              </div>
              <CartIcon count={productQuantityInCart} onClick={handleAddToCart} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variants vertical (default, compact, expanded, featured)
  return (
    <div
      className="flex flex-col w-full rounded-sm transition-all duration-300 relative bg-gray-50"
      style={{ padding: styles.padding }}
    >
      {/* Badge "DESTACAT" per variant featured */}
      {variant === 'featured' && (
        <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold font-oswald uppercase z-10">
          Destacat
        </div>
      )}

      {/* Imatge amb ombra a 45º només en hover */}
      <Link to={`/product/${product.id}`} className="block group" style={{ marginBottom: styles.marginBottom }}>
        <div
          className="aspect-square bg-white overflow-hidden rounded-sm transition-shadow duration-300"
          style={{
            boxShadow: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = styles.imageShadow;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain transition-transform group-hover:scale-105 duration-300"
            loading="lazy"
            decoding="async"
          />
        </div>
      </Link>

      {/* Contingut */}
      <div className="flex flex-col text-center" style={{ gap: styles.gap }}>
        {/* Nom del producte - OSWALD Responsive CENTRAT */}
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-oswald font-medium uppercase hover:opacity-70 transition-opacity text-gray-900 leading-tight tracking-tight" style={{ fontSize: styles.titleSize }}>
            {product.name}
          </h3>
        </Link>

        {/* Descripció del producte - ROBOTO LIGHT - 2 LÍNIES FIXES */}
        {styles.showDescription && (
          <div style={{ minHeight: 'clamp(3rem, 7vw, 3.5rem)' }}>
            <p className="font-roboto font-light text-gray-700 line-clamp-2 leading-snug" style={{ fontSize: styles.descSize }}>
              {product.description}
            </p>
          </div>
        )}

        {/* GRID: Preu + Cistell + Botons (estructura simple i ajustable) */}
        {styles.showSizes ? (
          <div
            className="grid grid-cols-4"
            style={{
              gap: 'clamp(0.25rem, 0.8vw, 0.5rem)',
              marginLeft: 'calc(-1 * clamp(0.75rem, 2vw, 1rem))',
              marginRight: 'calc(-1 * clamp(0.75rem, 2vw, 1rem))'
            }}
          >
            {/* FILA 1: Preu i Cistell - Coma al centre del botó S */}
            <div className="col-span-1 flex items-center justify-center">
              <div style={{
                position: 'relative',
                left: '0.5em',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <PriceDisplay price={product.price} />
              </div>
            </div>

            <div className="col-span-2"></div>

            <div className="col-span-1 flex items-center justify-center">
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
              }}>
                <CartIcon count={productQuantityInCart} onClick={handleAddToCart} />
              </div>
            </div>

            {/* FILA 2: Botons de talla - Ara ocupen tota l'amplada */}
            {['S', 'M', 'L', 'XL'].map((size) => (
              <SizeButton
                key={size}
                size={size}
                selected={selectedSize === size}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
              />
            ))}
          </div>
        ) : (
          /* Si no hi ha botons (variant compact), layout simple */
          <div className="flex items-center justify-between">
            <PriceDisplay price={product.price} />
            <CartIcon count={productQuantityInCart} onClick={handleAddToCart} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;

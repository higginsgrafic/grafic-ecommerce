import React from 'react';

function PriceDisplay({
  price,
  className = '',
  fontSize = 'clamp(1.25rem, 3vw, 1.40625rem)'
}) {
  return (
    <span
      className={`font-oswald font-medium text-gray-900 ${className}`}
      style={{
        fontSize,
        whiteSpace: 'nowrap'
      }}
    >
      {price.toFixed(2).replace('.', ',')} €
    </span>
  );
}

export default PriceDisplay;

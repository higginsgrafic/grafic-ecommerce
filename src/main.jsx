import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from '@/contexts/ProductContext';
import { ToastProvider } from '@/contexts/ToastContext';
import App from '@/App';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ProductProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ProductProvider>
  </BrowserRouter>
);

// Registre del Service Worker per PWA
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('✅ Service Worker registrat correctament:', registration);
      })
      .catch((error) => {
        console.log('❌ Error al registrar Service Worker:', error);
      });
  });
}

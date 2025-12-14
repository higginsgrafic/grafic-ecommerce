/**
 * Servei d'integració amb Gelato Print on Demand API
 * Documentació: https://gelato.com/api-docs
 */

import apiClient from './client';

const GELATO_API_URL = 'https://api.gelato.com/v1';
const GELATO_API_KEY = import.meta.env.VITE_GELATO_API_KEY;
const GELATO_SANDBOX = import.meta.env.VITE_GELATO_SANDBOX === 'true';

/**
 * Client específic per Gelato
 */
class GelatoClient {
  constructor(apiKey, sandbox = false) {
    this.apiKey = apiKey;
    this.baseURL = sandbox ? `${GELATO_API_URL}/sandbox` : GELATO_API_URL;
    this.headers = {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json'
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Gelato API error');
      }

      return await response.json();
    } catch (error) {
      console.error('Gelato API Error:', error);
      throw error;
    }
  }

  // ==================== CATÀLEG ====================

  /**
   * Obtenir catàleg de productes disponibles
   */
  async getCatalog() {
    return this.request('/products');
  }

  /**
   * Obtenir detalls d'un producte
   */
  async getProduct(productId) {
    return this.request(`/products/${productId}`);
  }

  /**
   * Obtenir variants d'un producte
   */
  async getProductVariants(productId) {
    return this.request(`/products/${productId}/variants`);
  }

  // ==================== COMANDES ====================

  /**
   * Crear comanda a Gelato
   */
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  }

  /**
   * Obtenir estat d'una comanda
   */
  async getOrder(orderId) {
    return this.request(`/orders/${orderId}`);
  }

  /**
   * Cancel·lar comanda
   */
  async cancelOrder(orderId) {
    return this.request(`/orders/${orderId}/cancel`, {
      method: 'POST'
    });
  }

  // ==================== SHIPPING ====================

  /**
   * Calcular cost d'enviament
   */
  async calculateShipping(shippingData) {
    return this.request('/shipping/calculate', {
      method: 'POST',
      body: JSON.stringify(shippingData)
    });
  }
}

// Instància del client Gelato
const gelatoClient = GELATO_API_KEY
  ? new GelatoClient(GELATO_API_KEY, GELATO_SANDBOX)
  : null;

// ==================== MAPEJAT DE PRODUCTES ====================

/**
 * Mapejar producte de Gelato al format intern
 */
export const mapGelatoProduct = (gelatoProduct) => {
  return {
    id: gelatoProduct.uid,
    name: gelatoProduct.title,
    description: gelatoProduct.description || '',
    price: gelatoProduct.price?.amount || 29.99,
    currency: gelatoProduct.price?.currency || 'EUR',
    images: gelatoProduct.images?.map(img => img.url) || [],
    category: gelatoProduct.category || 'apparel',
    collection: mapGelatoCategory(gelatoProduct.category),
    sku: gelatoProduct.sku,
    gelatoProductId: gelatoProduct.uid,
    variants: gelatoProduct.variants?.map(mapGelatoVariant) || []
  };
};

/**
 * Mapejar variant de Gelato
 */
export const mapGelatoVariant = (gelatoVariant) => {
  return {
    sku: gelatoVariant.sku,
    size: mapGelatoSize(gelatoVariant.size),
    color: mapGelatoColor(gelatoVariant.color),
    price: gelatoVariant.price?.amount || 0,
    stock: gelatoVariant.available ? 999 : 0, // Gelato té stock il·limitat
    isAvailable: gelatoVariant.available,
    image: gelatoVariant.image?.url || null,
    gelatoVariantId: gelatoVariant.uid
  };
};

/**
 * Mapejar categoria de Gelato a col·lecció interna
 */
const mapGelatoCategory = (category) => {
  const categoryMap = {
    'mens-tshirt': 'first-contact',
    'womens-tshirt': 'the-human-inside',
    'unisex-tshirt': 'austen',
    'organic-tshirt': 'cube',
    'premium-tshirt': 'outcasted'
  };
  return categoryMap[category] || 'first-contact';
};

/**
 * Mapejar talla de Gelato a format intern
 */
const mapGelatoSize = (gelatoSize) => {
  const sizeMap = {
    'XS': { id: 'xs', label: 'XS' },
    'S': { id: 's', label: 'S' },
    'M': { id: 'm', label: 'M' },
    'L': { id: 'l', label: 'L' },
    'XL': { id: 'xl', label: 'XL' },
    'XXL': { id: 'xxl', label: 'XXL' }
  };
  return sizeMap[gelatoSize] || { id: 'm', label: 'M' };
};

/**
 * Mapejar color de Gelato a format intern
 */
const mapGelatoColor = (gelatoColor) => {
  const colorMap = {
    'white': { id: 'white', label: 'Blanc', hex: '#FFFFFF' },
    'black': { id: 'black', label: 'Negre', hex: '#181818' },
    'navy': { id: 'blue', label: 'Blau', hex: '#2563EB' },
    'green': { id: 'green', label: 'Verd', hex: '#10B981' },
    'red': { id: 'red', label: 'Vermell', hex: '#DC2626' }
  };
  return colorMap[gelatoColor.toLowerCase()] || { id: 'white', label: 'Blanc', hex: '#FFFFFF' };
};

// ==================== SINCRONITZACIÓ ====================

/**
 * Sincronitzar catàleg de Gelato amb base de dades local
 */
export const syncGelatoCatalog = async () => {
  if (!gelatoClient) {
    console.warn('⚠️ Gelato API Key no configurada, utilitzant dades mock');
    return [];
  }

  try {
    const catalog = await gelatoClient.getCatalog();
    const mappedProducts = catalog.products.map(mapGelatoProduct);

    // Aquí guardaries els productes a la base de dades
    console.log(`✅ Sincronitzats ${mappedProducts.length} productes de Gelato`);

    return mappedProducts;
  } catch (error) {
    console.error('❌ Error sincronitzant catàleg Gelato:', error);
    throw error;
  }
};

/**
 * Crear comanda a Gelato
 */
export const createGelatoOrder = async (orderData) => {
  if (!gelatoClient) {
    console.warn('⚠️ Gelato API Key no configurada, simulant comanda');
    return {
      orderId: 'GLT-MOCK-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      status: 'processing'
    };
  }

  try {
    // Transformar dades de comanda al format Gelato
    const gelatoOrderData = {
      orderReferenceId: orderData.id,
      currency: 'EUR',
      items: orderData.items.map(item => ({
        productUid: item.gelatoProductId,
        variantUid: item.gelatoVariantId,
        quantity: item.quantity,
        files: item.designFiles || [] // URLs dels dissenys personalitzats
      })),
      shippingAddress: {
        firstName: orderData.shippingAddress.firstName,
        lastName: orderData.shippingAddress.lastName,
        addressLine1: orderData.shippingAddress.street,
        city: orderData.shippingAddress.city,
        postCode: orderData.shippingAddress.postalCode,
        country: orderData.shippingAddress.country,
        email: orderData.email
      }
    };

    const response = await gelatoClient.createOrder(gelatoOrderData);

    console.log(`✅ Comanda creada a Gelato: ${response.orderId}`);

    return response;
  } catch (error) {
    console.error('❌ Error creant comanda a Gelato:', error);
    throw error;
  }
};

/**
 * Obtenir estat d'enviament de Gelato
 */
export const getGelatoOrderStatus = async (gelatoOrderId) => {
  if (!gelatoClient) {
    return {
      orderId: gelatoOrderId,
      status: 'in_production',
      trackingNumber: null
    };
  }

  try {
    const order = await gelatoClient.getOrder(gelatoOrderId);
    return {
      orderId: order.orderId,
      status: order.status,
      trackingNumber: order.tracking?.trackingNumber || null,
      trackingUrl: order.tracking?.trackingUrl || null,
      estimatedDelivery: order.estimatedDelivery || null
    };
  } catch (error) {
    console.error('❌ Error obtenint estat comanda Gelato:', error);
    throw error;
  }
};

export { gelatoClient };
export default {
  syncCatalog: syncGelatoCatalog,
  createOrder: createGelatoOrder,
  getOrderStatus: getGelatoOrderStatus,
  mapProduct: mapGelatoProduct,
  mapVariant: mapGelatoVariant
};

import { useState, useEffect } from 'react';
import api from '@/api/endpoints';

/**
 * Hook per obtenir la configuració del header d'ofertes des del backend
 *
 * Retorna:
 * - enabled: boolean - Si el header està actiu
 * - text: string - Text a mostrar
 * - link: string - Enllaç opcional
 * - loading: boolean - Si està carregant
 *
 * Prioritat:
 * 1. Configuració del backend (WordPress)
 * 2. Variable d'entorn VITE_OFFERS_ENABLED
 * 3. Configuració per defecte (enabled: true)
 */
export const useOffersConfig = () => {
  const [config, setConfig] = useState({
    enabled: import.meta.env.VITE_OFFERS_ENABLED !== 'false', // Per defecte actiu
    text: 'Enviament gratuït en comandes superiors a 50€',
    link: '/offers',
    loading: true,
    // Estils editables
    bgColor: '#111827',
    textColor: '#ffffff',
    fontSize: '14px',
    font: 'Roboto'
  });

  useEffect(() => {
    const fetchConfig = async () => {
      // PRIORITAT 1: Comprovar localStorage (HomeEditor)
      const savedOffersHeader = localStorage.getItem('homeEditorOffersHeader');

      if (savedOffersHeader) {
        const editorData = JSON.parse(savedOffersHeader);
        setConfig({
          enabled: true,
          text: editorData.text || 'Enviament gratuït en comandes superiors a 50€',
          link: '/offers',
          loading: false,
          // Aplicar estils de l'editor
          bgColor: editorData.bgColor || '#111827',
          textColor: editorData.textColor || '#ffffff',
          fontSize: editorData.fontSize || '14px',
          font: editorData.font || 'Roboto'
        });
        return;
      }

      // PRIORITAT 2: Backend (WordPress)
      try {
        // Intentar obtenir la configuració del backend
        const response = await api.getOffersConfig();

        if (response && typeof response.enabled !== 'undefined') {
          setConfig({
            enabled: response.enabled,
            text: response.text || 'Enviament gratuït en comandes superiors a 50€',
            link: response.link || '/offers',
            loading: false,
            bgColor: response.bgColor || '#111827',
            textColor: response.textColor || '#ffffff',
            fontSize: response.fontSize || '14px',
            font: response.font || 'Roboto'
          });
        } else {
          // Si no hi ha resposta, usar configuració per defecte
          setConfig(prev => ({ ...prev, loading: false }));
        }
      } catch (error) {
        // Si falla (backend no disponible, mock mode, etc.)
        // Usar configuració per defecte o variable d'entorn
        console.warn('⚠️ No s\'ha pogut obtenir configuració d\'ofertes del backend, usant configuració local');
        setConfig(prev => ({ ...prev, loading: false }));
      }
    };

    fetchConfig();
  }, []);

  return config;
};

export default useOffersConfig;

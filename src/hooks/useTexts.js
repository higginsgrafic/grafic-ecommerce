import { translations } from '@/i18n/index.js';

/**
 * Hook per accedir als textos de l'aplicació
 * Retorna l'objecte de traduccions en català
 */
export const useTexts = () => {
  return translations.ca;
};

export default useTexts;

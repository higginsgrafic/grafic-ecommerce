import React from 'react';
import { Link } from 'react-router-dom';
import { Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTexts } from '@/hooks/useTexts';
import { useOffersConfig } from '@/hooks/useOffersConfig';


const OffersHeader = () => {
  const texts = useTexts();
  const { enabled, text, link, loading, bgColor, textColor, fontSize, font } = useOffersConfig();

  // Canvia a true per mostrar el banner de descàrrega del tema WordPress
  const SHOW_DOWNLOAD_BANNER = false;

  // Si està carregant o no està actiu, no mostrar res
  if (loading || !enabled) {
    return null;
  }

  const marqueeContent = (
    <Link
      to={link || "/offers"}
      className="flex items-start justify-center flex-shrink-0 px-12 hover:opacity-80 transition-opacity"
      style={{
        fontFamily: font || 'Roboto',
        fontSize: fontSize || '14px',
        color: textColor || '#ffffff'
      }}
    >
      <Truck className="h-5 w-5 mr-1 scale-x-[-1] flex-shrink-0 mt-[0.1em]" style={{ color: textColor || '#ffffff' }} />
      <span>
        {text || texts.offersHeader.freeShipping}
      </span>
    </Link>
  );

  // Chaotic, unpredictable variants
  // Combined X scrolling with random Y bouncing
  const chaoticVariants = {
    animate: {
      x: [0, -100, -50, -500, -200, -800, -1200],
      y: [0, -4, 0, 0, -8, 0, -2, 0, 0, -5, 0], // Bouncing effect
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          times: [0, 0.1, 0.2, 0.4, 0.5, 0.8, 1],
          ease: ["easeInOut", "circIn", "linear", "backOut", "easeInOut", "linear"]
        },
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 3, // Faster duration for bouncing
          ease: "easeInOut"
        }
      }
    }
  };

  return (
    <>
      {/* 🎉 BANNER DE DESCÀRREGA WORDPRESS - Activar/Desactivar amb SHOW_DOWNLOAD_BANNER */}
      {SHOW_DOWNLOAD_BANNER && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center py-3 px-4 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap">
            <span className="font-semibold">{texts.offersHeader.wpThemeReady}</span>
            <a
              href="/grafc-theme-wordpress.zip"
              download
              className="bg-white text-purple-600 px-4 py-1.5 rounded-md font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              {texts.offersHeader.downloadTheme}
            </a>
            <a
              href="/descarrega-tema.html"
              target="_blank"
              className="text-white underline hover:text-yellow-200 text-sm"
            >
              {texts.offersHeader.moreInfo}
            </a>
          </div>
        </div>
      )}

      {/* Banner animat d'ofertes */}
      <div
        className="fixed top-0 left-0 right-0 z-50 text-white text-sm h-[40px] flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ backgroundColor: bgColor || '#111827' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center text-center whitespace-nowrap">
          <motion.div
            className="flex"
            variants={chaoticVariants}
            animate="animate"
          >
            {[...Array(20)].map((_, i) => (
              <React.Fragment key={i}>
                {marqueeContent}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default OffersHeader;

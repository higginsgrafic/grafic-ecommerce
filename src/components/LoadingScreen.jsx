import React from 'react';
import { motion } from 'framer-motion';
import { useTexts } from '@/hooks/useTexts';

const LoadingScreen = () => {
  const texts = useTexts();

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo amb animació */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <img
            src="/logo-grafc.png"
            alt="GRAFC"
            className="h-16 w-auto mx-auto"
          />
        </motion.div>

        {/* Spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
            <div className="w-12 h-12 border-4 border-gray-900 rounded-full border-t-transparent absolute top-0 left-0 animate-spin"></div>
          </div>
        </motion.div>

        {/* Text opcional */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-gray-600 font-roboto text-sm"
        >
          {texts.loading.text}
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingScreen;

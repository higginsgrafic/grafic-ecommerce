import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

function SearchDialog({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Focus input quan s'obre el diàleg
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Tancar amb ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navegar a la pàgina de resultats amb la query
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
      setSearchQuery('');
    }
  };

  const handleBackdropClick = (e) => {
    // Només tancar si el clic és directament al backdrop
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 lg:pt-32 px-4 bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-white rounded shadow-xl w-full max-w-xl"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Form */}
            <form onSubmit={handleSubmit} className="p-1">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Productes"
                  className="w-full pl-4 pr-12 py-1 font-roboto text-[13pt] rounded-sm focus:outline-none text-gray-400 placeholder:text-gray-400 focus:placeholder-transparent"
                  style={{
                    border: 'none',
                    fontWeight: '300'
                  }}
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 -translate-y-1/2 h-9 w-9 rounded-sm hover:bg-transparent"
                  style={{ right: '10px' }}
                  disabled={!searchQuery.trim()}
                  aria-label="Cercar"
                >
                  <Search className="h-[26px] w-[26px]" strokeWidth={1.5} style={{ color: '#9ca3af' }} />
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SearchDialog;

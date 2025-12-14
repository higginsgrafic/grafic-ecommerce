import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User } from 'lucide-react';
import { useTexts } from '@/hooks/useTexts';
import SearchDialog from '@/components/SearchDialog';

function Header({
  cartItemCount,
  onCartClick
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const location = useLocation();
  const texts = useTexts();

  // Keyboard accessibility - Tancar menú amb Escape
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Navigation links
  const navLinks = [{
    name: texts.header.navigation.firstContact,
    href: '/first-contact'
  }, {
    name: texts.header.navigation.theHumanInside,
    href: '/the-human-inside'
  }, {
    name: texts.header.navigation.austen,
    href: '/austen'
  }, {
    name: texts.header.navigation.cube,
    href: '/cube'
  }, {
    name: texts.header.navigation.outcasted,
    href: '/outcasted'
  }];

  return (
    <header className="fixed top-[40px] left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="block transition-transform hover:scale-105 active:scale-95"
              title="GRÀFIC - Inici"
            >
              <img
                src="/logo-grafc.png"
                alt="GRAFC"
                className="h-8 lg:h-10 w-auto transition-all duration-200"
              />
            </Link>
          </motion.div>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.href}
                className="font-roboto text-[12pt] font-normal transition-all inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded-sm px-1 text-gray-900"
                onMouseEnter={(e) => {
                  e.target.style.textShadow = '0 0 0.55px #141414, 0 0 0.55px #141414';
                }}
                onMouseLeave={(e) => e.target.style.textShadow = 'none'}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            {/* Search Button - Opens Dialog */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchDialogOpen(true)}
              className="hidden lg:flex h-9 w-9 lg:h-10 lg:w-10 hover:bg-transparent focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              aria-label="Obrir cerca"
            >
              <svg className="h-5 w-5 lg:h-6 lg:w-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="sr-only">Cerca</span>
            </Button>

            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative h-9 w-9 lg:h-10 lg:w-10 hover:bg-transparent focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2">
               <img
                src={cartItemCount > 0 ? "/cistell-ple-2.svg" : "/cistell-buit.svg"}
                alt={cartItemCount > 0 ? texts.header.cart.altFull : texts.header.cart.altEmpty}
                className="h-[27px] w-[27px] lg:h-[31px] lg:w-[31px] transition-all duration-200"
              />
              {cartItemCount > 0 && (
                <span className="absolute left-1/2 -translate-x-1/2 text-white text-[11px] lg:text-[13px] font-bold" style={{ top: 'calc(50% + 0.5px)', lineHeight: '1' }}>
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">{texts.header.cart.srOnly}</span>
            </Button>

            {/* User Profile Button */}
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="h-9 w-9 lg:h-10 lg:w-10 hover:bg-transparent focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2">
                <User className="h-5 w-5 lg:h-6 lg:w-6 text-gray-900" />
                <span className="sr-only">Perfil d'usuari</span>
              </Button>
            </Link>

            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-900 focus-visible:ring-2 focus-visible:ring-gray-900:ring-gray-100 focus-visible:ring-offset-2"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="sr-only">{texts.header.cart.openMenu}</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden bg-white overflow-hidden shadow-lg transition-colors duration-200"
          >
            <nav className="flex flex-col px-4 py-4 space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchDialogOpen(true);
                  }}
                  className="font-roboto text-[11pt] font-normal transition-all py-1 w-full text-left hover:translate-x-1 flex items-center gap-2 text-gray-900"
                  onMouseEnter={(e) => {
                    const color = document.documentElement.classList.contains('dark') ? '#ffffff' : '#141414';
                    e.currentTarget.style.textShadow = `0 0 0.5px ${color}, 0 0 0.5px ${color}`;
                  }}
                  onMouseLeave={(e) => e.currentTarget.style.textShadow = 'none'}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Cerca
                </button>
              </motion.div>

              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: (index + 1) * 0.05, ease: "easeOut" }}
                >
                  <Link
                    to={link.href}
                    className={`font-roboto text-[11pt] font-normal transition-all py-1 block hover:translate-x-1 ${
                      link.isSpecial ? 'text-red-600 font-medium' : 'text-gray-900'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    onMouseEnter={(e) => {
                      const color = link.isSpecial ? '#DC2626' : (document.documentElement.classList.contains('dark') ? '#ffffff' : '#141414');
                      e.target.style.textShadow = `0 0 0.5px ${color}, 0 0 0.5px ${color}`;
                    }}
                    onMouseLeave={(e) => e.target.style.textShadow = 'none'}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Dialog */}
      <SearchDialog
        isOpen={isSearchDialogOpen}
        onClose={() => setIsSearchDialogOpen(false)}
      />
    </header>
  );
}

export default Header;

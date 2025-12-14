import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useTexts } from '@/hooks/useTexts';
import { typography, getTypographyClasses } from '@/config/typography';

// Hook personalitzat per obtenir mides responsives
const useResponsiveFontSize = (config) => {
  const [fontSize, setFontSize] = useState(config.fontSize?.mobile || config.fontSize?.base || '14px');

  useEffect(() => {
    const updateFontSize = () => {
      const width = window.innerWidth;
      if (width >= 1024 && config.fontSize?.desktop) {
        setFontSize(config.fontSize.desktop);
      } else {
        // Manté la mida mobile fins a 1024px per evitar salts
        setFontSize(config.fontSize?.mobile || config.fontSize?.base || '14px');
      }
    };

    updateFontSize();
    window.addEventListener('resize', updateFontSize);
    return () => window.removeEventListener('resize', updateFontSize);
  }, [config]);

  return fontSize;
};

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const isDragging = useRef(false);
  const texts = useTexts();

  // Estat per les dades del Hero (localStorage o per defecte)
  const [heroData, setHeroData] = useState(null);

  // Font sizes responsives
  const titleFontSize = useResponsiveFontSize(typography.hero.title);
  const subtitleFontSize = useResponsiveFontSize(typography.hero.subtitle);

  const getEmbedUrl = (videoId) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&disablekb=1`;
  };

  // Carregar dades del localStorage (HomeEditor) o utilitzar per defecte
  useEffect(() => {
    const savedHero = localStorage.getItem('homeEditorHero');
    if (savedHero) {
      setHeroData(JSON.parse(savedHero));
    }
  }, []);

  const defaultSlides = [
    {
      id: 1,
      title: texts.hero.slides.firstContact.title,
      subtitle: texts.hero.slides.firstContact.subtitle,
      path: "/first-contact",
      videoUrl: getEmbedUrl('I0VjId1PtNA')
    },
    {
      id: 2,
      title: texts.hero.slides.theHumanInside.title,
      subtitle: texts.hero.slides.theHumanInside.subtitle,
      path: "/the-human-inside",
      videoUrl: getEmbedUrl('I0VjId1PtNA')
    },
    {
      id: 3,
      title: texts.hero.slides.austen.title,
      subtitle: texts.hero.slides.austen.subtitle,
      path: "/austen",
      videoUrl: getEmbedUrl('dpAYDELHNR0')
    },
    {
      id: 4,
      title: texts.hero.slides.cube.title,
      subtitle: texts.hero.slides.cube.subtitle,
      path: "/cube",
      videoUrl: getEmbedUrl('I0VjId1PtNA')
    },
    {
      id: 5,
      title: texts.hero.slides.outcasted.title,
      subtitle: texts.hero.slides.outcasted.subtitle,
      path: "/outcasted",
      videoUrl: getEmbedUrl('5eOZJ9CTIdY')
    }
  ];

  // Utilitzar dades de l'editor si estan disponibles, sinó utilitzar per defecte
  // Utilitzem defaultSlides com a base i només sobrescrivim els títols/subtítols si hi ha dades de l'editor
  const slides = heroData?.slides ? defaultSlides.map((defaultSlide, index) => {
    const editorSlide = heroData.slides[index];
    if (editorSlide) {
      return {
        ...defaultSlide,
        title: editorSlide.title || defaultSlide.title,
        subtitle: editorSlide.subtitle || defaultSlide.subtitle
      };
    }
    return defaultSlide;
  }) : defaultSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isDragging.current) {
        nextSlide();
      }
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleDragStart = () => {
    isDragging.current = true;
  };

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;

    // We delay resetting isDragging slightly to prevent the click handler from firing immediately
    setTimeout(() => {
        isDragging.current = false;
    }, 100);

    if (info.offset.x < -swipeThreshold) {
      nextSlide();
    } else if (info.offset.x > swipeThreshold) {
      prevSlide();
    }
  };

  const handleContainerClick = () => {
    // Only navigate if we weren't just dragging
    if (!isDragging.current) {
      navigate(slides[currentSlide].path);
    }
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden text-center text-white bg-black group">
      {/* Unified Swipe and Click Handler */}
      <motion.div
        className="absolute inset-0 z-30 cursor-pointer active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={handleContainerClick}
        style={{ touchAction: 'pan-y' }}
      >
        {/* Transparent overlay that captures both clicks and drags */}
      </motion.div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          {/* Video Background - Reduït 25%: de 300% a 225% */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <iframe
              className="absolute top-1/2 left-1/2 w-[225%] h-[225%] -translate-x-1/2 -translate-y-1/2 opacity-60 min-w-full min-h-full object-cover"
              src={slides[currentSlide].videoUrl}
              title="Background Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ pointerEvents: 'none' }}
            />
          </div>
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Content - Pointer events none so clicks pass to the drag layer */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center p-4">
         <AnimatePresence mode='wait'>
          <motion.div
            key={currentSlide}
            className="max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
              <motion.h1
                className={`${getTypographyClasses(typography.hero.title)} mb-3 lg:mb-4 drop-shadow-lg text-white uppercase`}
                style={{ fontSize: titleFontSize }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                className={`${getTypographyClasses(typography.hero.subtitle)} max-w-4xl mx-auto drop-shadow-md text-gray-100 px-2`}
                style={{ fontSize: subtitleFontSize }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {slides[currentSlide].subtitle}
              </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-40 flex justify-center gap-4 px-4 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); setCurrentSlide(index); }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

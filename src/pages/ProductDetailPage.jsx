import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Share2, Plus, Minus, X, ZoomIn, ZoomOut } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import SEOProductSchema from '@/components/SEOProductSchema';
import { mockProducts, mockProductsBlava, mockProductsNegra, mockProductsGreen, mockProductsCube } from '@/data/mockProducts.jsx';
import { trackProductView, trackAddToCart, trackAddToWishlist, trackShare } from '@/utils/analytics';
import { useProductContext } from '@/contexts/ProductContext';
import { useToast } from '@/contexts/ToastContext';

// Icones personalitzades amb estil angular
const PlayIcon = ({ className, ...props }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M6 4l14 8-14 8V4z" />
  </svg>
);

const PauseIcon = ({ className, ...props }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
  </svg>
);

const SettingsIcon = ({ className, ...props }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M19.5 12c0-.23-.01-.45-.03-.68l1.86-1.41c.4-.3.51-.86.26-1.3l-1.87-3.23c-.25-.44-.79-.62-1.25-.42l-2.15.91c-.37-.26-.76-.49-1.17-.68l-.29-2.31c-.06-.5-.49-.88-.99-.88h-3.73c-.51 0-.94.38-1 .88l-.29 2.31c-.41.19-.8.42-1.17.68l-2.15-.91c-.46-.2-1-.02-1.25.42L2.41 8.62c-.25.44-.14.99.26 1.3l1.86 1.41a7.343 7.343 0 0 0 0 1.36l-1.86 1.41c-.4.3-.51.86-.26 1.3l1.87 3.23c.25.44.79.62 1.25.42l2.15-.91c.37.26.76.49 1.17.68l.29 2.31c.06.5.49.88.99.88h3.73c.5 0 .93-.38.99-.88l.29-2.31c.41-.19.8-.42 1.17-.68l2.15.91c.46.2 1 .02 1.25-.42l1.87-3.23c.25-.44.14-.99-.26-1.3l-1.86-1.41c.03-.23.04-.45.04-.68zm-7.5 5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
  </svg>
);

const ListIcon = ({ className, ...props }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M3 6h2v2H3V6zm0 5h2v2H3v-2zm0 5h2v2H3v-2zm5-10h13v2H8V6zm0 5h13v2H8v-2zm0 5h13v2H8v-2z" />
  </svg>
);

const ShuffleIcon = ({ className, ...props }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M10.59 9.17L6.12 4.7A1 1 0 0 0 4.7 6.12l4.47 4.47 1.42-1.42zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
  </svg>
);

const allProducts = [...mockProducts, ...mockProductsBlava, ...mockProductsNegra, ...mockProductsGreen, ...mockProductsCube];

const ProductDetailPage = ({ onAddToCart, cartItems = [], onUpdateQuantity }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useProductContext();
  const { success } = useToast();

  const product = allProducts.find(p => p.id === parseInt(id));

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Estat per galeria modal fullscreen
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);

  // Estat per zoom de la imatge
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  // Estat per carrousel automàtic d'episodis
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Estats per configuració d'admin del carrusel
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [rotationInterval, setRotationInterval] = useState(() => {
    const saved = localStorage.getItem('carouselInterval');
    return saved ? parseInt(saved) : 16000;
  });
  const [isRandomOrder, setIsRandomOrder] = useState(() => {
    const saved = localStorage.getItem('carouselRandom');
    return saved !== null ? JSON.parse(saved) : false;
  });

  // Refs per tancar menú amb clic fora
  const settingsMenuRef = useRef(null);
  const settingsButtonRef = useRef(null);

  const SIZES = ['S', 'M', 'L', 'XL'];

  // Episodes de Star Trek per a C5 - Roda infinita (estil literari)
  const episodes = [
    {
      originalTitle: "The City on the Edge of Forever",
      title: "LA CIUTAT A LA FRONTERA DEL FUTUR",
      text: "Un portal vibra amb ecos del passat quan McCoy desapareix a través del temps tot esborrant la Federació amb ell mentre Kirk troba l'amor en una època perduda. T'atreveixes a ser part d'aquesta història?"
    },
    {
      originalTitle: "Space Seed",
      title: "LA LLAVOR DE L'ESPAI",
      text: "Dins d'una nau en estasi Khan somia amb grans imperis. Un superhumà del passat es desperta amb fam. Seducció, traïció i ambició. El preu del poder serà car. T'atreveixes a ser part d'aquesta història?"
    },
    {
      originalTitle: "Amok Time",
      title: "L'ÈPOCA DE L'AMOK",
      text: "El foc ancestral de Vulcà crema dins de Spock. Veus rituals i sang. Es trenca l'amistat quan has de lluitar a mort? L'hora baixa tomba sobre el combat. T'atreveixes a ser part d'aquesta història?"
    },
    {
      originalTitle: "Mirror, Mirror",
      title: "MIRALLET, MIRALLET",
      text: "Un accident de teletransport llança Kirk a un univers on la Federació és un Imperi brutal que conquereix amb violència. Kirk haurà d'escapar si vol tornar a casa. T'atreveixes a ser part d'aquesta història?"
    },
    {
      originalTitle: "The Trouble with Tribbles",
      title: "EL PROBLEMA DELS TRIBBLES",
      text: "Misterioses boles de pèl han començat a envair cada racó de la nau i es multipliquen i consumeixen recursos sens fi. L'Enterprise és atacat? T'atreveixes a ser part d'aquesta història?"
    },
    {
      originalTitle: "Balance of Terror",
      title: "L'EQUILIBRI DE LA POR",
      text: "Una nau fantasma travessa la fosca. Els Romulans tornen després de cent anys de silenci. Dos comandants es cacen mútuament en un ballet mortal. T'atreveixes a ser part d'aquesta història?"
    },
    {
      originalTitle: "Arena",
      title: "ARENA",
      text: "Kirk enfronta un Gorn en una platja desèrtica. La intel·ligència contra la força bruta. Amb pedres i pólvora, ha de superar el monstre. La supervivència demana enginy. T'atreveixes a ser part d'aquesta história?"
    },
    {
      originalTitle: "The Doomsday Machine",
      title: "LA MÀQUINA DEL JUDICI FINAL",
      text: "Una arma antiga devora planetes sencers. L'Enterprise troba el capità Decker, obsessionat amb venjança per la seva tripulació que vol destruir la màquina tingui el cost que tingui. T'atreveixes a ser part d'aquesta història?"
    },
    {
      originalTitle: "Journey to Babel",
      title: "VIATGE A BABEL",
      text: "Sarek i Spock naveguen en silenci tens mentre un assassí camina entre els ambaixadors. El cor de Sarek falla mentre Spock comanda el pont. L'honor contra l'amor filial xoquen. T'atreveixes a ser part d'aquesta història?"
    },
    {
      originalTitle: "The Devil in the Dark",
      title: "EL MONSTRE AMAGAT",
      text: "A Janus VI, els treballadors moren a causa d'accidents sospitosos. Una criatura ataca des de l'ombra. A l'Enterprise creuen que allà hi ha una forma de vida de silici! T'atreveixes a ser part d'aquesta història?"
    },
    {
      originalTitle: "Errand of Mercy",
      title: "ELS SALVADORS, SALVATS",
      text: "La guerra esclata entre la Federació i els Kklingon. Kirk i els seus arriben a Orgània per defensar el planeta. Els pacífics habitants, però, somriuen davant la batalla.T'atreveixes a ser part d'aquesta història?"
    },
    {
      originalTitle: "The Menagerie",
      title: "EL ZOO",
      text: "Spock comet traïció per salvar el capità Pike. Navega cap a un món prohibit on la mort és el càstig. La lleialtat supera la lògica. L'amistat crida des del dolor. T'atreveixes a ser part d'aquesta història?"
    }
  ];

  // Estat per l'episodi seleccionat
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(product.id % episodes.length);

  // Estat per edició de textos
  const [editableEpisodes, setEditableEpisodes] = useState(() => {
    const saved = localStorage.getItem('editableEpisodes');
    return saved ? JSON.parse(saved) : episodes;
  });
  const [isEditingText, setIsEditingText] = useState(false);
  const [editedText, setEditedText] = useState('');

  const currentEpisode = editableEpisodes[selectedEpisodeIndex];

  // Guardar episodis editables a localStorage
  useEffect(() => {
    localStorage.setItem('editableEpisodes', JSON.stringify(editableEpisodes));
  }, [editableEpisodes]);

  // Guardar configuració del carrusel a localStorage
  useEffect(() => {
    localStorage.setItem('carouselInterval', rotationInterval.toString());
  }, [rotationInterval]);

  useEffect(() => {
    localStorage.setItem('carouselRandom', JSON.stringify(isRandomOrder));
  }, [isRandomOrder]);

  // Carrousel automàtic d'episodis - només per NCC-1701
  useEffect(() => {
    if (product.name === 'NCC-1701' && isAutoPlay && !isEditingText) {
      const interval = setInterval(() => {
        if (isRandomOrder) {
          // Selecció aleatòria (però diferent de l'actual)
          setSelectedEpisodeIndex((prev) => {
            let newIndex;
            do {
              newIndex = Math.floor(Math.random() * episodes.length);
            } while (newIndex === prev && episodes.length > 1);
            return newIndex;
          });
        } else {
          // Seqüencial
          setSelectedEpisodeIndex((prev) => (prev + 1) % episodes.length);
        }
      }, rotationInterval);

      return () => clearInterval(interval);
    }
  }, [isAutoPlay, isEditingText, product.name, episodes.length, rotationInterval, isRandomOrder]);

  // Navegació amb teclat per la galeria modal
  useEffect(() => {
    if (!showGalleryModal) return;

    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') prevGalleryImage();
      if (e.key === 'ArrowRight') nextGalleryImage();
      if (e.key === 'Escape') closeGallery();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showGalleryModal, galleryImageIndex]);

  // Tancar menú reproductor amb ESC i clic fora
  useEffect(() => {
    if (!showSettingsMenu) return;

    const handleKeyPress = (e) => {
      if (e.key === 'Escape') setShowSettingsMenu(false);
    };

    const handleClickOutside = (e) => {
      if (
        settingsMenuRef.current &&
        !settingsMenuRef.current.contains(e.target) &&
        settingsButtonRef.current &&
        !settingsButtonRef.current.contains(e.target)
      ) {
        setShowSettingsMenu(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettingsMenu]);

  // Track product view
  useEffect(() => {
    if (product) {
      trackProductView(product);
    }
  }, [product]);

  useEffect(() => {
    if (!product) {
      navigate('/404');
    }
  }, [product, navigate]);

  if (!product) return null;

  // Galeria d'imatges - Samarretes llises de colors (6 colors - blanc O negre, mai tots dos)
  // Ordre segons numeració: 01-Blanc/Negre, 02-Vermell, 03-Verd Militar, 04-Verd Fosc, 05-Blau Royal, 06-Blau Marina
  const imagesWhite = [
    '/samarreta-01-blanc.jpeg',         // 01. Blanc
    '/samarreta-02-vermell.jpeg',       // 02. Vermell
    '/samarreta-03-verd-militar.jpeg',  // 03. Verd Militar
    '/samarreta-04-verd-fosc.jpeg',     // 04. Verd Fosc
    '/samarreta-05-blau-royal.jpeg',    // 05. Blau Royal
    '/samarreta-06-blau-marina.jpeg'    // 06. Blau Marina
  ];

  const imagesBlack = [
    '/samarreta-07-negre.jpeg',         // 07. Negre (en lloc del 01)
    '/samarreta-02-vermell.jpeg',       // 02. Vermell
    '/samarreta-03-verd-militar.jpeg',  // 03. Verd Militar
    '/samarreta-04-verd-fosc.jpeg',     // 04. Verd Fosc
    '/samarreta-05-blau-royal.jpeg',    // 05. Blau Royal
    '/samarreta-06-blau-marina.jpeg'    // 06. Blau Marina
  ];

  // Selecciona l'array segons si l'ID del producte és parell (blanc) o senar (negre)
  const images = product.id % 2 === 0 ? imagesWhite : imagesBlack;

  const handleAddToCart = () => {
    trackAddToCart(product, quantity);
    onAddToCart(product, selectedSize, quantity, true);
    success('Producte afegit al cistell');
  };

  // Funcions per galeria modal
  const openGallery = (index) => {
    setGalleryImageIndex(index);
    setShowGalleryModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setShowGalleryModal(false);
    document.body.style.overflow = 'auto';
  };

  const nextGalleryImage = () => {
    setGalleryImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevGalleryImage = () => {
    setGalleryImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Funcions per zoom
  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleDoubleClickEdit = () => {
    setIsEditingText(true);
    setEditedText(currentEpisode.text);
  };

  const handleSaveText = () => {
    const updatedEpisodes = [...editableEpisodes];
    updatedEpisodes[selectedEpisodeIndex] = {
      ...updatedEpisodes[selectedEpisodeIndex],
      text: editedText
    };
    setEditableEpisodes(updatedEpisodes);
    setIsEditingText(false);
    success('Text actualitzat');
  };

  const handleCancelEdit = () => {
    setIsEditingText(false);
    setEditedText('');
  };

  const handleExportEpisodes = () => {
    const exportText = editableEpisodes.map((ep, index) => {
      return `${index + 1}. ${ep.originalTitle}\n   ${ep.title}\n   \n   ${ep.text}\n`;
    }).join('\n---\n\n');

    const fullText = `EPISODIS DE STAR TREK - TEXTOS MODIFICATS\n${'='.repeat(50)}\n\n${exportText}\n${'='.repeat(50)}\n\nExportat: ${new Date().toLocaleString('ca-ES')}`;

    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'episodis-star-trek-modificats.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    success('Episodis exportats');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href
        });
        trackShare('product', product.id, 'native');
      } catch (error) {
        // User cancelled share
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && p.collection === product.collection)
    .slice(0, 4);

  return (
    <>
      <Helmet>
        <title>{product.name} | GRÀFIC</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <SEOProductSchema product={product} />

      <div className="min-h-screen bg-white">
        {/* Breadcrumbs - Fora del contenidor absolut */}
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <nav className="pt-12 pb-4">
            <ol className="flex items-center space-x-2 text-sm uppercase">
              <li><Link to="/" className="text-gray-500 hover:text-gray-900 transition-colors">Inici</Link></li>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <li><Link to={`/${product.collection}`} className="text-gray-500 hover:text-gray-900 transition-colors">{product.collection}</Link></li>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <li className="text-gray-900 font-medium truncate">{product.name}</li>
            </ol>
          </nav>
        </div>

        {/* CONTENIDOR PRINCIPAL AMB PUNT DE REFERÈNCIA FIX */}
        {/* Layout Desktop - Només visible en lg i superior */}
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hidden lg:block transition-all duration-300"
          style={{
            position: 'relative',
            minHeight: '1000px',
            filter: showSettingsMenu ? 'saturate(0.5)' : 'saturate(1)'
          }}
        >

            {/* 1. Imatge gran */}
            <motion.div
              className="aspect-square bg-white overflow-hidden relative cursor-pointer group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ position: 'absolute', top: '19px', left: '35px', width: '576px', height: '576px', transform: 'scale(1.01)' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setIsZoomed(false)}
            >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={images[selectedImage]}
                    alt={`${product.name} - Vista ${selectedImage + 1}`}
                    className="w-full h-full object-cover transition-transform duration-200"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    style={isZoomed ? {
                      transform: 'scale(2)',
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                    } : {}}
                    onClick={() => !isZoomed && openGallery(selectedImage)}
                  />
                </AnimatePresence>

                {/* Botons de zoom */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleZoom();
                    }}
                    className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                    aria-label={isZoomed ? "Reduir zoom" : "Ampliar"}
                  >
                    {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
                  </button>
                </div>
              </motion.div>

              {/* 2. Miniatures */}
              <div style={{ position: 'absolute', top: '619px', left: '35px', width: '576px', transform: 'scale(1.01)' }}>
                <div className="relative">
                  {/* Fletxa esquerra */}
                  <button
                    onClick={() => setSelectedImage((selectedImage - 1 + images.length) % images.length)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-transparent p-5 rounded transition-colors z-10"
                    aria-label="Miniatura anterior"
                  >
                    <ChevronLeft className="h-12 w-6" />
                  </button>

                  {/* Grid de miniatures */}
                  <div className="grid grid-cols-6 gap-0">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`aspect-square rounded-lg overflow-hidden transition-all ${
                          idx === selectedImage ? 'border-black' : 'border-transparent'
                        }`}
                        style={{
                          padding: '5px',
                          borderWidth: '2px'
                        }}
                      >
                        <img
                          src={img}
                          alt={`Miniatura ${idx + 1}`}
                          className="w-full h-full object-cover rounded-md"
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Fletxa dreta */}
                  <button
                    onClick={() => setSelectedImage((selectedImage + 1) % images.length)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-transparent p-5 rounded transition-colors z-10"
                    aria-label="Miniatura següent"
                  >
                    <ChevronRight className="h-12 w-6" />
                  </button>
                </div>
              </div>

              {/* 3. Nom de producte */}
              <h1 className="font-oswald leading-none font-bold uppercase" style={{ position: 'absolute', top: '16px', left: '645px', fontSize: '35.25pt', color: '#000000', transform: 'scale(1.01)' }}>
                {product.name}
              </h1>

              {/* Pastilla grisa de fons - Només per NCC-1701 */}
              {product.name === 'NCC-1701' && (
                <div style={{ position: 'absolute', top: '78px', left: '748px', width: '219.5px', height: '32px', backgroundColor: '#F9FAFB', borderRadius: '4px', transform: 'scale(1.01)', zIndex: 1 }} />
              )}

              {/* 4. Preu de producte */}
              <p className="font-oswald leading-none font-normal" style={{ position: 'absolute', top: '80px', left: '645px', fontSize: '22.5pt', color: '#000000', transform: 'scale(1.01)', zIndex: 2 }}>
                {product.price.toFixed(2).replace('.', ',')} €
              </p>

              {/* 4b. Títol episodi Star Trek - Només per NCC-1701 */}
              {product.name === 'NCC-1701' && (
                <div className="font-roboto font-normal uppercase text-right" style={{ position: 'absolute', top: '78px', left: '748px', width: '219.5px', height: '32px', fontSize: '8pt', color: '#000000', transform: 'scale(1.01)', lineHeight: '32px', paddingRight: '8px', zIndex: 2, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  {currentEpisode.title}
                </div>
              )}

              {/* 4c. Controls del carrousel - Només per NCC-1701 */}
              {product.name === 'NCC-1701' && (
                <div className="flex items-center gap-2 relative" style={{ position: 'absolute', top: '78px', left: '975px', height: '32px', transform: 'scale(1.01)', zIndex: 2 }}>
                  {/* Botó Play/Pause */}
                  <button
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    className="bg-transparent text-black hover:text-gray-600 transition-colors flex items-center justify-center"
                    style={{ width: '32px', height: '32px', borderRadius: '4px' }}
                    aria-label={isAutoPlay ? "Pausar carrousel" : "Reproduir carrousel"}
                    title={isAutoPlay ? "Pausar carrousel automàtic" : "Reproduir carrousel automàtic"}
                  >
                    {isAutoPlay ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
                  </button>

                  {/* Botó Settings */}
                  <button
                    ref={settingsButtonRef}
                    onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                    className="bg-transparent text-black hover:text-gray-600 transition-colors flex items-center justify-center"
                    style={{ width: '32px', height: '32px', borderRadius: '4px' }}
                    aria-label="Configuració del carrousel"
                    title="Configuració del carrousel"
                  >
                    <SettingsIcon className="h-4 w-4" />
                  </button>

                  {/* Menú desplegable de configuració */}
                  {showSettingsMenu && (
                    <div ref={settingsMenuRef} className="absolute right-0 lg:left-full lg:right-auto mt-2 lg:ml-2 lg:mt-0 top-full lg:top-0 bg-white border border-gray-300 rounded-lg shadow-xl z-50" style={{ width: '380px', maxWidth: 'calc(100vw - 2rem)' }}>
                      {/* Header del menú */}
                      <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 className="font-oswald font-bold text-sm uppercase">Reproductor de Sinopsi</h3>
                        <button
                          onClick={() => setShowSettingsMenu(false)}
                          className="hover:bg-gray-100 p-1 rounded transition-colors"
                          aria-label="Tancar configuració"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Contingut del menú */}
                      <div className="p-4 space-y-4">
                        {/* Cadència amb selector al costat */}
                        <div className="flex items-center justify-between gap-3">
                          <label className="text-sm font-roboto font-semibold whitespace-nowrap">
                            Cadència
                          </label>
                          <select
                            value={rotationInterval}
                            onChange={(e) => setRotationInterval(parseInt(e.target.value))}
                            className="flex-1 p-2 border border-gray-300 rounded-md text-sm font-roboto focus:outline-none focus:ring-2 focus:ring-black"
                          >
                            <option value={5000}>5 segons</option>
                            <option value={8000}>8 segons</option>
                            <option value={10000}>10 segons</option>
                            <option value={16000}>16 segons</option>
                            <option value={20000}>20 segons</option>
                            <option value={30000}>30 segons</option>
                          </select>
                        </div>

                        {/* Mode de reproducció amb icones */}
                        <div className="flex items-center justify-between gap-3">
                          <label className="text-sm font-roboto font-semibold whitespace-nowrap">
                            Mode de reproducció
                          </label>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setIsRandomOrder(false)}
                              className={`flex items-center justify-center p-2 rounded-md transition-colors ${
                                !isRandomOrder
                                  ? 'bg-black text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                              aria-label="Mode seqüencial"
                              title="Mode seqüencial"
                            >
                              <ListIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setIsRandomOrder(true)}
                              className={`flex items-center justify-center p-2 rounded-md transition-colors ${
                                isRandomOrder
                                  ? 'bg-black text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                              aria-label="Mode aleatori"
                              title="Mode aleatori"
                            >
                              <ShuffleIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Llista d'episodis - text simple clicable */}
                        <div className="pt-3 border-t border-gray-200">
                          <h4 className="text-sm font-roboto font-semibold mb-3">Episodis disponibles</h4>
                          <div className="space-y-1">
                            {editableEpisodes.map((ep, index) => (
                              <button
                                key={index}
                                onClick={() => setSelectedEpisodeIndex(index)}
                                className={`w-full text-left px-2 py-1 transition-colors text-xs font-roboto ${
                                  index === selectedEpisodeIndex
                                    ? 'font-bold text-black'
                                    : 'font-normal text-gray-700 hover:text-black'
                                }`}
                              >
                                {index + 1}. {ep.title}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 5. Descripció de producte */}
              <div style={{ position: 'absolute', top: '133px', left: '645px', width: '322.5px', height: 'calc(24pt * 7)', transform: 'scale(1.01)' }}>
                {product.name === 'NCC-1701' ? (
                  isEditingText ? (
                    <div className="relative">
                      <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="font-roboto font-normal w-full h-full p-2 border-2 border-blue-500 rounded resize-none focus:outline-none focus:border-blue-600"
                        style={{ fontSize: '16pt', lineHeight: '24pt', height: 'calc(24pt * 7)' }}
                        autoFocus
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={handleSaveText}
                          className="bg-green-600 text-white px-4 py-1 rounded text-sm font-oswald hover:bg-green-700 transition-colors"
                        >
                          GUARDAR
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-400 text-white px-4 py-1 rounded text-sm font-oswald hover:bg-gray-500 transition-colors"
                        >
                          CANCEL·LAR
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="font-roboto font-normal cursor-pointer hover:bg-gray-50 transition-colors p-1 rounded"
                      style={{ fontSize: '16pt', lineHeight: '24pt', height: 'calc(24pt * 7)', color: '#000000', overflow: 'hidden' }}
                      onDoubleClick={handleDoubleClickEdit}
                      title="Fes doble clic per editar"
                    >
                      {currentEpisode.text}
                    </div>
                  )
                ) : (
                  <div className="font-roboto font-normal" style={{ fontSize: '16pt', lineHeight: '24pt', color: '#000000' }}>
                    {product.description}
                  </div>
                )}
              </div>

              {/* 6. Botonera d'acció */}
              <div className="flex items-center gap-4" style={{ position: 'absolute', top: '400px', left: '645px', transform: 'scale(1.01)' }}>
                    <button
                      onClick={() => {
                        const wasInWishlist = isInWishlist(product.id);
                        toggleWishlist(product);
                        if (!wasInWishlist) {
                          trackAddToWishlist(product);
                          success('Afegit a favorits');
                        }
                      }}
                      className="bg-[#F9FAFB] hover:bg-gray-300 transition-all flex items-center justify-center"
                      style={{ width: '70px', height: '35px', position: 'relative', top: '0px', left: '0.5px', clipPath: 'polygon(0 0, calc(100% - 10.1px) 0, 100% 50%, calc(100% - 10.1px) 100%, 0 100%)', borderRadius: '6px 0 0 6px' }}
                    >
                      <Heart className={`h-6 w-6 ${isInWishlist(product.id) ? 'fill-current text-red-500' : ''}`} />
                    </button>
                    <button
                      onClick={() => {
                        handleAddToCart();
                        navigate('/checkout');
                      }}
                      className="bg-[#F9FAFB] hover:bg-gray-300 transition-all font-oswald font-bold text-xl tracking-wide"
                      style={{ width: '154.5px', height: '35px', position: 'relative', top: '0px', left: '-0.75px', clipPath: 'polygon(0 0, calc(100% - 10.1px) 0, 100% 50%, calc(100% - 10.1px) 100%, 0 100%)', borderRadius: '6px 0 0 6px' }}
                    >
                      CHECKOUT
                    </button>
                    <button
                      onClick={handleShare}
                      className="bg-[#F9FAFB] hover:bg-gray-300 transition-all flex items-center justify-center"
                      style={{ width: '70px', height: '35px', position: 'relative', top: '0px', left: '-2px', clipPath: 'polygon(0 0, calc(100% - 10.1px) 0, 100% 50%, calc(100% - 10.1px) 100%, 0 100%)', borderRadius: '6px 0 0 6px' }}
                    >
                      <Share2 className="h-6 w-6" />
                    </button>
                  </div>

              {/* 7. Botonera de talles */}
              <div className="flex items-center gap-4" style={{ position: 'absolute', top: '539px', left: '645px', transform: 'scale(1.01)' }}>
                {SIZES.map((size) => {
                  const leftPosition = size === 'S' ? '0px' : size === 'M' ? '-0.67px' : size === 'L' ? '-1.34px' : '-4px';
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`transition-all duration-200 rounded-md text-xl font-oswald
                        ${selectedSize === size
                          ? 'bg-black text-white font-semibold'
                          : 'bg-[#F9FAFB] text-black font-light hover:bg-gray-300'}`}
                      style={{ width: '70px', height: '35px', position: 'relative', top: '0px', left: leftPosition }}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {/* 8. Cistell */}
              <div className="flex items-center gap-4" style={{ position: 'absolute', top: '531px', left: '1000.5px', transform: 'scale(1.25)' }}>
                <button
                  onClick={handleAddToCart}
                  className="bg-transparent rounded-md flex items-center justify-center relative"
                  style={{ width: '35px', height: '35px' }}
                  aria-label="Afegeix al cistell"
                >
                  {cartItems.length > 0 ? (
                    <>
                      <img src="/cistell-ple-1.svg" alt="Cistell amb productes" className="h-[31px] w-[31px]" />
                      <span
                        className="absolute left-1/2 -translate-x-1/2 font-bold pointer-events-none"
                        style={{
                          top: 'calc(50% + 1px)',
                          color: '#141414',
                          fontSize: '13px',
                          lineHeight: '1'
                        }}
                      >
                        {cartItems.reduce((total, item) => total + item.quantity, 0)}
                      </span>
                    </>
                  ) : (
                    <img src="/cistell-buit.svg" alt="Cistell buit" className="h-[31px] w-[31px]" />
                  )}
                </button>
              </div>
        </div>

        {/* Layout Mòbil/Tablet - Només visible en menys de lg */}
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:hidden transition-all duration-300"
          style={{
            filter: showSettingsMenu ? 'saturate(0.5)' : 'saturate(1)'
          }}
        >
          {/* Imatge principal */}
          <motion.div
            className="w-full aspect-square bg-white overflow-hidden relative mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => openGallery(selectedImage)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={images[selectedImage]}
                alt={`${product.name} - Vista ${selectedImage + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          </motion.div>

          {/* Miniatures */}
          <div className="mb-6">
            <div className="grid grid-cols-6 gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden transition-all ${
                    idx === selectedImage ? 'ring-2 ring-black' : 'ring-1 ring-gray-200'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Miniatura ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Nom del producte */}
          <h1 className="font-oswald text-3xl sm:text-4xl font-bold uppercase mb-4">
            {product.name}
          </h1>

          {/* Preu i episodi (si és NCC-1701) */}
          <div className="flex items-center justify-between mb-4">
            <p className="font-oswald text-2xl sm:text-3xl font-normal">
              {product.price.toFixed(2).replace('.', ',')} €
            </p>
            {product.name === 'NCC-1701' && (
              <div className="flex items-center gap-2 relative">
                <div className="bg-[#F9FAFB] px-3 py-2 rounded font-roboto text-xs uppercase">
                  {currentEpisode.title}
                </div>
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className="bg-transparent text-black p-2"
                  aria-label={isAutoPlay ? "Pausar" : "Reproduir"}
                >
                  {isAutoPlay ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
                </button>
                <button
                  ref={settingsButtonRef}
                  onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                  className="bg-transparent text-black p-2"
                  aria-label="Configuració"
                >
                  <SettingsIcon className="h-5 w-5" />
                </button>

                {/* Menú desplegable de configuració - també visible a mòbil */}
                {showSettingsMenu && (
                  <div ref={settingsMenuRef} className="absolute right-0 lg:left-full lg:right-auto mt-2 lg:ml-2 lg:mt-0 top-full lg:top-0 bg-white border border-gray-300 rounded-lg shadow-xl z-50" style={{ width: '380px', maxWidth: 'calc(100vw - 2rem)' }}>
                    {/* Header del menú */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                      <h3 className="font-oswald font-bold text-sm uppercase">Reproductor de Sinopsi</h3>
                      <button
                        onClick={() => setShowSettingsMenu(false)}
                        className="hover:bg-gray-100 p-1 rounded transition-colors"
                        aria-label="Tancar configuració"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Contingut del menú */}
                    <div className="p-4 space-y-4">
                      {/* Cadència amb selector al costat */}
                      <div className="flex items-center justify-between gap-3">
                        <label className="text-sm font-roboto font-semibold whitespace-nowrap">
                          Cadència
                        </label>
                        <select
                          value={rotationInterval}
                          onChange={(e) => setRotationInterval(parseInt(e.target.value))}
                          className="flex-1 p-2 border border-gray-300 rounded-md text-sm font-roboto focus:outline-none focus:ring-2 focus:ring-black"
                        >
                          <option value={5000}>5 segons</option>
                          <option value={8000}>8 segons</option>
                          <option value={10000}>10 segons</option>
                          <option value={16000}>16 segons</option>
                          <option value={20000}>20 segons</option>
                          <option value={30000}>30 segons</option>
                        </select>
                      </div>

                      {/* Mode de reproducció amb icones */}
                      <div className="flex items-center justify-between gap-3">
                        <label className="text-sm font-roboto font-semibold whitespace-nowrap">
                          Mode de reproducció
                        </label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setIsRandomOrder(false)}
                            className={`flex items-center justify-center p-2 rounded-md transition-colors ${
                              !isRandomOrder
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            aria-label="Mode seqüencial"
                            title="Mode seqüencial"
                          >
                            <ListIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setIsRandomOrder(true)}
                            className={`flex items-center justify-center p-2 rounded-md transition-colors ${
                              isRandomOrder
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            aria-label="Mode aleatori"
                            title="Mode aleatori"
                          >
                            <ShuffleIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Llista d'episodis */}
                      <div className="pt-3 border-t border-gray-200">
                        <h4 className="text-sm font-roboto font-semibold mb-3">Episodis disponibles</h4>
                        <div className="space-y-1">
                          {editableEpisodes.map((ep, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedEpisodeIndex(index)}
                              className={`w-full text-left px-2 py-1 transition-colors text-xs font-roboto ${
                                index === selectedEpisodeIndex
                                  ? 'font-bold text-black'
                                  : 'font-normal text-gray-700 hover:text-black'
                              }`}
                            >
                              {index + 1}. {ep.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Descripció / Text episodi */}
          <div className="mb-6">
            {product.name === 'NCC-1701' ? (
              isEditingText ? (
                <div>
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="font-roboto w-full p-4 border-2 border-blue-500 rounded-lg resize-none focus:outline-none text-base"
                    rows={7}
                    autoFocus
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleSaveText}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-oswald hover:bg-green-700"
                    >
                      GUARDAR
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-400 text-white px-4 py-2 rounded-lg font-oswald hover:bg-gray-500"
                    >
                      CANCEL·LAR
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="font-roboto text-base leading-relaxed cursor-pointer p-4 rounded-lg border border-gray-300"
                  onDoubleClick={handleDoubleClickEdit}
                  title="Fes doble clic per editar"
                >
                  {currentEpisode.text}
                </div>
              )
            ) : (
              <div className="font-roboto text-base leading-relaxed">
                {product.description}
              </div>
            )}
          </div>

          {/* Selector de talles */}
          <div className="mb-6">
            <h3 className="font-oswald text-sm font-bold uppercase mb-3">Talla</h3>
            <div className="grid grid-cols-4 gap-3">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 rounded-md text-lg font-oswald transition-all ${
                    selectedSize === size
                      ? 'bg-black text-white font-semibold'
                      : 'bg-[#F9FAFB] text-black font-light hover:bg-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Botons d'acció */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => {
                const wasInWishlist = isInWishlist(product.id);
                toggleWishlist(product);
                if (!wasInWishlist) {
                  trackAddToWishlist(product);
                  success('Afegit a favorits');
                }
              }}
              className="bg-[#F9FAFB] hover:bg-gray-300 p-3 rounded-md transition-all flex items-center justify-center"
            >
              <Heart className={`h-6 w-6 ${isInWishlist(product.id) ? 'fill-current text-red-500' : ''}`} />
            </button>
            <button
              onClick={() => {
                handleAddToCart();
                navigate('/checkout');
              }}
              className="flex-1 bg-black text-white py-3 px-6 rounded-md font-oswald font-bold text-lg hover:bg-gray-800 transition-all"
            >
              CHECKOUT
            </button>
            <button
              onClick={handleShare}
              className="bg-[#F9FAFB] hover:bg-gray-300 p-3 rounded-md transition-all flex items-center justify-center"
            >
              <Share2 className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Botó d'exportació per NCC-1701 */}
        {product.name === 'NCC-1701' && (
          <div
            className="fixed right-4 bottom-4 z-[10000] transition-all duration-300"
            style={{
              filter: showSettingsMenu ? 'saturate(0.5)' : 'saturate(1)'
            }}
          >
            <button
              onClick={handleExportEpisodes}
              className="bg-white hover:bg-gray-100 px-4 py-2 rounded-full shadow-lg transition-colors border border-gray-300 font-oswald text-sm font-semibold"
              aria-label="Exportar episodis"
              title="Exportar textos dels episodis modificats"
            >
              EXPORTA EPISODIS
            </button>
          </div>
        )}

        {/* Galeria Modal Fullscreen */}
        {showGalleryModal && (
          <div className="fixed inset-0 z-[20000] bg-black/95 flex items-center justify-center">
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              aria-label="Tancar galeria"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            <button
              onClick={prevGalleryImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors"
              aria-label="Imatge anterior"
            >
              <ChevronLeft className="h-8 w-8 text-white" />
            </button>

            <div className="max-w-7xl max-h-[90vh] mx-auto px-4">
              <img
                src={images[galleryImageIndex]}
                alt={`${product.name} - Vista ${galleryImageIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain"
              />
              <div className="text-white text-center mt-4 font-oswald">
                {galleryImageIndex + 1} / {images.length}
              </div>
            </div>

            <button
              onClick={nextGalleryImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors"
              aria-label="Imatge següent"
            >
              <ChevronRight className="h-8 w-8 text-white" />
            </button>

            {/* Miniatures a la galeria */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-3 rounded-lg">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setGalleryImageIndex(idx)}
                  className={`w-16 h-16 rounded overflow-hidden transition-all ${
                    idx === galleryImageIndex ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Miniatura ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Productes relacionats - Fora del contenidor absolut */}
        {relatedProducts.length > 0 && (
          <div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300"
            style={{
              filter: showSettingsMenu ? 'saturate(0.5)' : 'saturate(1)'
            }}
          >
            <div className="border-t border-gray-200 pt-12">
              <h2 className="font-roboto text-2xl sm:text-3xl font-normal uppercase mb-8" style={{ color: '#141414' }}>
                També et podria agradar
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id}>
                    <ProductCard
                      product={relatedProduct}
                      onAddToCart={onAddToCart}
                      cartItems={cartItems}
                      onUpdateQuantity={onUpdateQuantity}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetailPage;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';

function CollectionsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const collections = [
    {
      id: 'first-contact',
      title: 'FIRST CONTACT',
      tagline: 'Only you understand everything this journey entails.',
      description: 'Una reflexió sobre els viatges interiors que només tu coneixes. Sobre els camins que prens sense que ningú més ho vegi. Dissenys inspirats en la ciència-ficció i l\'exploració espacial.',
      image: '/collection-icon-first-contact.png',
      link: '/first-contact',
      color: 'from-blue-600 to-purple-600'
    },
    {
      id: 'the-human-inside',
      title: 'THE HUMAN INSIDE',
      tagline: 'In the deepest, darkest corner rests your hero.',
      description: 'El teu heroi interior viu en els racons més foscos. Allà on pocs s\'atreveixen a mirar és on trobes la teva força. Una col·lecció sobre la complexitat i dualitat humana.',
      image: '/logo-collection-thin.png',
      link: '/the-human-inside',
      color: 'from-gray-700 to-gray-900'
    },
    {
      id: 'austen',
      title: 'AUSTEN',
      tagline: 'I hate to hear you talk about women as if they were irrational simpletons.',
      description: 'Homenatge a Jane Austen i a totes les dones que han lluitat per ser escoltades, no silenciades. Una col·lecció feminista amb força i caràcter.',
      image: '/collection-icon-austen.png',
      link: '/austen',
      color: 'from-pink-600 to-red-600'
    },
    {
      id: 'cube',
      title: 'CUBE',
      tagline: 'Deep down, we are all strangers to our own eyes.',
      description: 'Som éssers complexos, multidimensionals. El que veus a fora no és mai tota la història. Geometria, simetria i perspectiva.',
      image: '/collection-icon-first-contact.png',
      link: '/cube',
      color: 'from-green-600 to-teal-600'
    },
    {
      id: 'outcasted',
      title: 'OUTCASTED',
      tagline: 'As they say, better alone than in bad company.',
      description: 'Per als qui prefereixen la solitud autèntica abans que la companyia falsa. Per als inadaptats orgullosos que trien el seu propi camí.',
      image: '/collection-icon-first-contact.png',
      link: '/outcasted',
      color: 'from-orange-600 to-red-700'
    }
  ];

  return (
    <>
      <SEO
        title="Col·leccions | GRÀFIC"
        description="Explora totes les col·leccions de GRÀFIC: First Contact, The Human Inside, Austen, Cube i Outcasted. Dissenys únics amb missatge que combinen art, ciència-ficció i filosofia."
        keywords="col·leccions gràfic, samarretes amb missatge, dissenys únics, art portable, ciència-ficció"
        type="website"
        url="/collections"
      />

      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gray-900 text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            {/* Breadcrumbs - en blanc sobre fons fosc */}
            <div className="mb-8">
              <nav className="mb-0">
                <ol className="flex items-center space-x-2 text-sm uppercase">
                  <li>
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                      Inici
                    </Link>
                  </li>
                  <span className="text-gray-600">›</span>
                  <li className="text-white font-medium">Col·leccions</li>
                </ol>
              </nav>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-oswald text-[48pt] lg:text-[64pt] font-bold uppercase mb-6">
                Col·leccions
              </h1>
              <p className="font-roboto text-[16pt] lg:text-[18pt] text-gray-300 max-w-3xl mx-auto">
                Cada col·lecció és una narrativa única. Cinc universos diferents que exploren
                la condició humana, la tecnologia i el futur.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="space-y-16 lg:space-y-24">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-2xl ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
              >
                <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-gradient-to-br ${collection.color} p-8 lg:p-12`}>
                  {/* Text Content */}
                  <div className={`${index % 2 === 0 ? '' : 'lg:order-2'} text-white`}>
                    <h2 className="font-oswald text-[36pt] lg:text-[48pt] font-bold uppercase mb-4">
                      {collection.title}
                    </h2>
                    <p className="font-roboto text-[14pt] lg:text-[16pt] italic mb-6 opacity-90">
                      "{collection.tagline}"
                    </p>
                    <p className="font-roboto text-[13pt] lg:text-[14pt] leading-relaxed mb-8 opacity-80">
                      {collection.description}
                    </p>
                    <Link
                      to={collection.link}
                      className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-roboto text-[14pt] font-medium hover:bg-gray-100 transition-colors group"
                    >
                      Explorar Col·lecció
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Image */}
                  <div className={`${index % 2 === 0 ? '' : 'lg:order-1'} flex items-center justify-center`}>
                    <div className="relative w-full max-w-sm mx-auto">
                      <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-2xl p-8 flex items-center justify-center">
                        <img
                          src={collection.image}
                          alt={collection.title}
                          className="w-full h-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-50 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="font-oswald text-[32pt] lg:text-[42pt] font-bold mb-6" style={{ color: '#141414' }}>
                No Trobes el que Busques?
              </h2>
              <p className="font-roboto text-[14pt] text-gray-700 leading-relaxed mb-8">
                Cada mes presentem nous dissenys i col·leccions. Subscriu-te per ser el primer
                en conèixer els nous llançaments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/new"
                  className="bg-gray-900 text-white px-8 py-4 rounded-lg font-roboto text-[14pt] font-medium hover:bg-gray-800 transition-colors"
                >
                  Veure Novetats
                </Link>
                <Link
                  to="/contact"
                  className="bg-white border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg font-roboto text-[14pt] font-medium hover:bg-gray-50 transition-colors"
                >
                  Contacta amb Nosaltres
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CollectionsPage;

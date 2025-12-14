import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, Clock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTexts } from '@/hooks/useTexts';

function GenericPage({ pageKey }) {
  const texts = useTexts();
  const location = useLocation();

  // Obtenir dades de la pàgina segons el pageKey
  const pageData = texts.pages?.[pageKey];

  // Fallback si la pàgina no existeix
  if (!pageData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="font-roboto text-[14pt] text-gray-600">Page not found</p>
      </div>
    );
  }

  const { title, content, seo } = pageData;

  // Renderitzar contingut específic segons el tipus de pàgina
  const renderPageContent = () => {
    switch (pageKey) {
      case 'faq':
        return (
          <>
            <p className="font-roboto text-[14pt] lg:text-[16pt] text-gray-700 leading-relaxed mb-8">
              {content}
            </p>
            <div className="space-y-6 mt-8">
              {pageData.q1 && (
                <div className="bg-gray-50 rounded-lg p-6 lg:p-8">
                  <h3 className="font-oswald text-[18pt] lg:text-[20pt] font-bold mb-3" style={{ color: '#141414' }}>
                    {pageData.q1.question}
                  </h3>
                  <p className="font-roboto text-[13pt] lg:text-[14pt] text-gray-700 leading-relaxed">
                    {pageData.q1.answer}
                  </p>
                </div>
              )}
              {pageData.q2 && (
                <div className="bg-gray-50 rounded-lg p-6 lg:p-8">
                  <h3 className="font-oswald text-[18pt] lg:text-[20pt] font-bold mb-3" style={{ color: '#141414' }}>
                    {pageData.q2.question}
                  </h3>
                  <p className="font-roboto text-[13pt] lg:text-[14pt] text-gray-700 leading-relaxed">
                    {pageData.q2.answer}
                  </p>
                </div>
              )}
              {pageData.q3 && (
                <div className="bg-gray-50 rounded-lg p-6 lg:p-8">
                  <h3 className="font-oswald text-[18pt] lg:text-[20pt] font-bold mb-3" style={{ color: '#141414' }}>
                    {pageData.q3.question}
                  </h3>
                  <p className="font-roboto text-[13pt] lg:text-[14pt] text-gray-700 leading-relaxed">
                    {pageData.q3.answer}
                  </p>
                </div>
              )}
              {pageData.q4 && (
                <div className="bg-gray-50 rounded-lg p-6 lg:p-8">
                  <h3 className="font-oswald text-[18pt] lg:text-[20pt] font-bold mb-3" style={{ color: '#141414' }}>
                    {pageData.q4.question}
                  </h3>
                  <p className="font-roboto text-[13pt] lg:text-[14pt] text-gray-700 leading-relaxed">
                    {pageData.q4.answer}
                  </p>
                </div>
              )}
            </div>
          </>
        );

      case 'contact':
        return (
          <>
            <p className="font-roboto text-[14pt] lg:text-[16pt] text-gray-700 leading-relaxed mb-8">
              {content}
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center text-center">
                <Mail className="w-8 h-8 mb-3" style={{ color: '#141414' }} />
                <p className="font-roboto text-[13pt] lg:text-[14pt] text-gray-700">
                  {pageData.email}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center text-center">
                <Phone className="w-8 h-8 mb-3" style={{ color: '#141414' }} />
                <p className="font-roboto text-[13pt] lg:text-[14pt] text-gray-700">
                  {pageData.phone}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center text-center">
                <Clock className="w-8 h-8 mb-3" style={{ color: '#141414' }} />
                <p className="font-roboto text-[13pt] lg:text-[14pt] text-gray-700">
                  {pageData.hours}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 lg:p-8 mt-8">
              <p className="font-roboto text-[13pt] lg:text-[14pt] text-gray-700 leading-relaxed">
                {pageData.response}
              </p>
            </div>
          </>
        );

      case 'about':
        return (
          <>
            <p className="font-roboto text-[14pt] lg:text-[16pt] text-gray-700 leading-relaxed mb-6">
              {content}
            </p>
            {pageData.section1 && (
              <p className="font-roboto text-[14pt] lg:text-[16pt] text-gray-700 leading-relaxed mb-6">
                {pageData.section1}
              </p>
            )}
            {pageData.section2 && (
              <div className="bg-gray-50 rounded-lg p-6 lg:p-8 mt-8">
                <p className="font-roboto text-[13pt] lg:text-[14pt] text-gray-700 leading-relaxed">
                  {pageData.section2}
                </p>
              </div>
            )}
          </>
        );

      case 'sizing':
        return (
          <>
            <p className="font-roboto text-[14pt] lg:text-[16pt] text-gray-700 leading-relaxed mb-6">
              {content}
            </p>
            <div className="bg-gray-50 rounded-lg p-6 lg:p-8 mt-6">
              <p className="font-roboto text-[13pt] lg:text-[14pt] text-gray-700 leading-relaxed mb-4">
                <strong>{texts.pages.sizing?.fit || pageData.fit}</strong>
              </p>
              <p className="font-roboto text-[13pt] lg:text-[14pt] text-gray-700 leading-relaxed mb-4">
                {pageData.measurements}
              </p>
              <p className="font-roboto text-[13pt] lg:text-[14pt] text-gray-600 leading-relaxed">
                {pageData.tip}
              </p>
            </div>
            {pageData.quality && (
              <p className="font-roboto text-[14pt] text-gray-700 leading-relaxed mt-6">
                {pageData.quality}
              </p>
            )}
          </>
        );

      case 'shipping':
        return (
          <>
            <p className="font-roboto text-[14pt] lg:text-[16pt] text-gray-700 leading-relaxed mb-6">
              {content}
            </p>
            <div className="space-y-4 mt-6">
              {pageData.freeShipping && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="font-roboto text-[13pt] lg:text-[14pt] text-gray-700">
                    ✓ {pageData.freeShipping}
                  </p>
                </div>
              )}
              {pageData.processing && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="font-roboto text-[13pt] lg:text-[14pt] text-gray-700">
                    ✓ {pageData.processing}
                  </p>
                </div>
              )}
              {pageData.delivery && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="font-roboto text-[13pt] lg:text-[14pt] text-gray-700">
                    ✓ {pageData.delivery}
                  </p>
                </div>
              )}
              {pageData.returns && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="font-roboto text-[13pt] lg:text-[14pt] text-gray-700">
                    ✓ {pageData.returns}
                  </p>
                </div>
              )}
              {pageData.condition && (
                <p className="font-roboto text-[13pt] text-gray-600 leading-relaxed mt-4">
                  {pageData.condition}
                </p>
              )}
            </div>
          </>
        );

      case 'privacy':
      case 'terms':
        return (
          <>
            <p className="font-roboto text-[14pt] lg:text-[16pt] text-gray-700 leading-relaxed mb-6">
              {content}
            </p>
            <div className="space-y-6 mt-8">
              {Object.keys(pageData).map((key) => {
                if (['title', 'content', 'seo'].includes(key)) return null;
                return (
                  <div key={key} className="bg-gray-50 rounded-lg p-6 lg:p-8">
                    <p className="font-roboto text-[13pt] lg:text-[14pt] text-gray-700 leading-relaxed">
                      {pageData[key]}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        );

      default:
        return (
          <p className="font-roboto text-[14pt] lg:text-[16pt] text-gray-700 leading-relaxed">
            {content}
          </p>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{seo?.title || `${title} | GRÀFIC`}</title>
        <meta name="description" content={seo?.description || content} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
        {/* Back to home link */}
        <Link to="/" className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-roboto text-[11pt] lg:text-[12pt]">{texts.common.backToHome}</span>
        </Link>

        {/* Title */}
        <motion.h1
          className="font-oswald text-[32pt] lg:text-[42pt] font-bold uppercase mb-6"
          style={{ color: '#141414' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>

        {/* Content */}
        <motion.div
          className="prose max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {renderPageContent()}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 font-roboto text-[12pt] font-medium text-white transition-all hover:scale-105 rounded"
            style={{ backgroundColor: '#141414' }}
          >
            {texts.footer.services.shop.collections}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default GenericPage;

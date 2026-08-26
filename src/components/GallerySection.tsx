import { useState, useMemo, useEffect, Dispatch, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, ChevronLeft, ChevronRight, X, Sparkles, Image as ImageIcon, Facebook, ExternalLink } from 'lucide-react';
import { HIT_FIT_IMAGES, PIWNICA_IMAGES, FACEBOOK_URL } from '../data';

interface GallerySectionProps {
  activeTab: 'all' | 'hit-fit' | 'piwnica';
  setActiveTab: (tab: 'all' | 'hit-fit' | 'piwnica') => void;
  selectedImageIndex: number | null;
  setSelectedImageIndex: Dispatch<SetStateAction<number | null>>;
}

export function GallerySection({
  activeTab,
  setActiveTab,
  selectedImageIndex,
  setSelectedImageIndex,
}: GallerySectionProps) {
  const [visiblePhotosCount, setVisiblePhotosCount] = useState(16);

  const galleryItems = useMemo(() => {
    if (activeTab === 'hit-fit') {
      return HIT_FIT_IMAGES.map((src) => ({ src, venue: 'Hit Fit' }));
    }
    if (activeTab === 'piwnica') {
      return PIWNICA_IMAGES.map((src) => ({ src, venue: 'Piwnica pod Żabą' }));
    }
    return [
      ...HIT_FIT_IMAGES.map((src) => ({ src, venue: 'Hit Fit' })),
      ...PIWNICA_IMAGES.map((src) => ({ src, venue: 'Piwnica pod Żabą' }))
    ];
  }, [activeTab]);

  const currentVisiblePhotos = useMemo(() => {
    return galleryItems.slice(0, visiblePhotosCount);
  }, [galleryItems, visiblePhotosCount]);

  const handleTabChange = (tab: 'all' | 'hit-fit' | 'piwnica') => {
    setActiveTab(tab);
    setVisiblePhotosCount(16);
  };

  // Preload neighboring images in Lightbox for instant flipping with zero lag
  useEffect(() => {
    if (selectedImageIndex === null) return;
    const nextIdx = (selectedImageIndex + 1) % galleryItems.length;
    const prevIdx = (selectedImageIndex - 1 + galleryItems.length) % galleryItems.length;
    [galleryItems[nextIdx]?.src, galleryItems[prevIdx]?.src].forEach((url) => {
      if (url) {
        const img = new Image();
        img.decoding = 'async';
        img.src = url;
      }
    });
  }, [selectedImageIndex, galleryItems]);

  // Keyboard controls for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev !== null && prev < galleryItems.length - 1 ? prev + 1 : 0));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryItems.length - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, galleryItems.length, setSelectedImageIndex]);

  return (
    <section id="galeria" className="py-20 md:py-28 bg-white border-b border-stone-200/80 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-gold-dark uppercase tracking-[0.2em] text-xs font-bold block">
            Wnętrza • Aranżacje • Dekoracje • Otoczenie
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">
            Galeria Wnętrz i Aranżacji Stołów
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light">
            Zobacz przygotowane sale, eleganckie dekoracje stołów, potrawy oraz przestrzeń wokół obu lokali.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => handleTabChange('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'all'
                ? 'bg-stone-900 text-white shadow-md'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Wszystkie Zdjęcia ({HIT_FIT_IMAGES.length + PIWNICA_IMAGES.length})
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('hit-fit')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'hit-fit'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200/60'
            }`}
          >
            Hit Fit • Sala, Taras & Grill ({HIT_FIT_IMAGES.length})
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('piwnica')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'piwnica'
                ? 'bg-amber-800 text-white shadow-md'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200/60'
            }`}
          >
            Piwnica pod Żabą • Klimatyczne Wnętrza ({PIWNICA_IMAGES.length})
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {currentVisiblePhotos.map((item, index) => (
            <GalleryCard
              key={`${item.src}-${index}`}
              src={item.src}
              venue={item.venue}
              priority={index < 8 ? 'eager' : 'lazy'}
              onClick={() => setSelectedImageIndex(index)}
            />
          ))}
        </div>

        {/* Load More & Facebook Note */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-stone-200">
          <div>
            {visiblePhotosCount < galleryItems.length ? (
              <button
                type="button"
                onClick={() => setVisiblePhotosCount(prev => Math.min(prev + 16, galleryItems.length))}
                className="bg-stone-900 hover:bg-stone-800 text-white font-bold px-7 py-3 rounded-full text-xs uppercase tracking-wider transition-all shadow-md"
              >
                Pokaż więcej zdjęć ({galleryItems.length - visiblePhotosCount} pozostało)
              </button>
            ) : (
              <p className="text-xs text-stone-500 font-medium">
                Wyświetlono wszystkie wyselekcjonowane zdjęcia wnętrz i aranżacji ({galleryItems.length})
              </p>
            )}
          </div>

          {/* Clean Facebook Referral */}
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-blue-700 transition-colors"
          >
            <Facebook size={15} className="text-blue-600" />
            <span>Bieżące relacje z imprez i zdjęcia gości publikujemy na Facebooku</span>
            <ExternalLink size={13} className="text-stone-400" />
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && galleryItems[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImageIndex(null)}
          >
            <div 
              className="relative max-w-5xl max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedImageIndex(null)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                title="Zamknij (Esc)"
              >
                <X size={20} />
              </button>

              {/* Prev / Next Navigation */}
              <button
                type="button"
                onClick={() => setSelectedImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryItems.length - 1))}
                className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-black/60 sm:bg-white/10 hover:bg-white/20 transition-colors z-10"
                title="Poprzednie zdjęcie"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                onClick={() => setSelectedImageIndex((prev) => (prev !== null && prev < galleryItems.length - 1 ? prev + 1 : 0))}
                className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-black/60 sm:bg-white/10 hover:bg-white/20 transition-colors z-10"
                title="Następne zdjęcie"
              >
                <ChevronRight size={24} />
              </button>

              {/* Image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-stone-900 border border-white/10">
                <img
                  src={galleryItems[selectedImageIndex].src}
                  alt={`Zdjęcie ${selectedImageIndex + 1}`}
                  className="max-h-[75vh] w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="p-3 bg-stone-900 text-white flex items-center justify-between text-xs border-t border-white/10">
                  <span className="font-semibold">{galleryItems[selectedImageIndex].venue}</span>
                  <span className="text-stone-400">
                    Zdjęcie {selectedImageIndex + 1} z {galleryItems.length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryCard({ 
  src, 
  venue, 
  priority = 'lazy',
  onClick 
}: { 
  key?: string | number; 
  src: string; 
  venue: string; 
  priority?: 'eager' | 'lazy';
  onClick: () => void; 
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => {
        // Prewarm cache on hover
        const img = new Image();
        img.src = src;
      }}
      className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-stone-100 border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300"
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-100 animate-pulse flex items-center justify-center text-stone-300">
          <ImageIcon size={20} />
        </div>
      )}
      <img
        src={src}
        alt={`Aranżacja ${venue}`}
        className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={priority}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* Overlay Details */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3.5 text-white">
        <div className="self-end p-1.5 rounded-full bg-white/20 backdrop-blur-md">
          <Maximize2 size={15} />
        </div>
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-amber-200 block">
            {venue}
          </span>
          <span className="text-xs font-bold">Powiększ zdjęcie</span>
        </div>
      </div>
    </div>
  );
}

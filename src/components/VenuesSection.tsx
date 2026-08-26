import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Sparkles, 
  TreePine, 
  Flame, 
  Car, 
  Utensils, 
  ArrowRight, 
  Maximize2, 
  MapPin, 
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  Phone,
  ChefHat
} from 'lucide-react';
import { VENUES, HIT_FIT_IMAGES, PIWNICA_IMAGES, HIT_FIT_ADDRESS, PIWNICA_ADDRESS } from '../data';

interface VenuesSectionProps {
  onOpenGalleryTab: (tab: 'all' | 'hit-fit' | 'piwnica') => void;
  onOpenImage: (imageSrc: string, venue: 'hit-fit' | 'piwnica') => void;
}

export function VenuesSection({ onOpenGalleryTab, onOpenImage }: VenuesSectionProps) {
  return (
    <section id="lokale" className="py-20 md:py-28 bg-white border-b border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-24">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-gold-dark uppercase tracking-[0.2em] text-xs font-bold block">
            Prezentacja Wnętrz i Możliwości
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">
            Nasze Lokale Bankietowe
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light">
            Zobacz aranżacje stołów, wystrój sal oraz otoczenie naszych obiektów przygotowanych na przyjęcia okolicznościowe.
          </p>
        </div>

        {/* VENUE 1: Hit Fit (Główny Lokal do 90 osób) */}
        <motion.div 
          id="hit-fit" 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.6 }}
          className="bg-stone-50 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm border border-emerald-500/30 overflow-hidden scroll-mt-24 relative"
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider">
                  <Users size={13} /> Główny Lokal: do 90 osób
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-stone-700 font-medium text-xs border border-stone-200 shadow-xs">
                  <MapPin size={13} className="text-emerald-700" /> {HIT_FIT_ADDRESS}
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
                  Sala Bankietowa <span className="text-emerald-800">Hit Fit</span>
                </h3>
                <p className="text-sm font-semibold text-emerald-800 mt-1">
                  Wesela • Komunie • Chrzciny • 18-stki • Bankiety firmowe
                </p>
              </div>
              
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-light">
                Główny obiekt bankietowy mieszczący do 90 gości. Nowoczesna, przestronna sala o jasnej kolorystyce, z doskonałą akustyką i parkietem tanecznym. Obiekt dysponuje zadaszonym tarasem z grillem plenerowym oraz dużym, bezpłatnym parkingiem.
              </p>

              {/* Venue Key Specs */}
              <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-800 font-medium">
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-stone-200/80">
                  <Users size={16} className="text-emerald-700 shrink-0" />
                  <span>Pojemność do 90 osób</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-stone-200/80">
                  <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
                  <span>Organizacja wesel & przyjęć</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-stone-200/80">
                  <TreePine size={16} className="text-emerald-700 shrink-0" />
                  <span>Przestronny taras & grill</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-stone-200/80">
                  <Car size={16} className="text-emerald-700 shrink-0" />
                  <span>Duży bezpłatny parking</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button 
                  type="button"
                  onClick={() => onOpenGalleryTab('hit-fit')}
                  className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm transition-all shadow-md"
                >
                  <span>Zobacz Wnętrza Hit Fit ({HIT_FIT_IMAGES.length} zdjęć)</span>
                  <ArrowRight size={15} />
                </button>

                <a 
                  href="tel:661637770"
                  className="inline-flex items-center gap-2 bg-white hover:bg-stone-100 text-stone-900 border border-stone-200 font-bold px-5 py-3 rounded-full text-xs sm:text-sm transition-all shadow-xs"
                >
                  <Phone size={14} className="text-emerald-700" />
                  <span>Zapytaj o termin</span>
                </a>
              </div>
            </div>

            {/* Photo Preview Grid (Interiors & Arrangements) */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
              {HIT_FIT_IMAGES.slice(0, 4).map((img, idx) => (
                <VenuePhotoPreview
                  key={idx}
                  img={img}
                  alt={`Wnętrze i dekoracja stołów Hit Fit ${idx + 1}`}
                  priority={idx < 2 ? 'eager' : 'lazy'}
                  onClick={() => onOpenImage(img, 'hit-fit')}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* VENUE 2: Piwnica pod Żabą (Lokal Kameralny do 40 osób) */}
        <motion.div 
          id="piwnica-pod-zaba" 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.6 }}
          className="bg-stone-50 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm border border-amber-500/30 overflow-hidden scroll-mt-24 relative"
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Photo Preview Grid */}
            <div className="lg:col-span-6 order-2 lg:order-1 grid grid-cols-2 gap-3 sm:gap-4">
              {PIWNICA_IMAGES.slice(0, 4).map((img, idx) => (
                <VenuePhotoPreview
                  key={idx}
                  img={img}
                  alt={`Klimatyczne wnętrze Piwnicy pod Żabą ${idx + 1}`}
                  priority={idx < 2 ? 'eager' : 'lazy'}
                  onClick={() => onOpenImage(img, 'piwnica')}
                />
              ))}
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-700 text-white font-bold text-xs uppercase tracking-wider">
                  <Sparkles size={13} /> Lokal Kameralny: do 40 osób
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-stone-700 font-medium text-xs border border-stone-200 shadow-xs">
                  <MapPin size={13} className="text-amber-700" /> {PIWNICA_ADDRESS}
                </div>
              </div>

              <div>
                <h3 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
                  Sala Bankietowa <span className="text-amber-800">Piwnica pod Żabą</span>
                </h3>
                <p className="text-sm font-semibold text-amber-800 mt-1">
                  18-stki • Jubileusze • Urodziny • Chrzciny • Komunie do 40 osób
                </p>
              </div>

              <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-light">
                Klimatyczna sala w Lubinie przy ul. Orlej 39a. Wyróżnia się ciepłym, ceglanym wystrojem i domową atmosferą. 
                <strong className="text-stone-900 block mt-1 font-semibold">
                  Uwaga: w lokalu Piwnica pod Żabą nie organizujemy wesel.
                </strong> 
                Lokal jest za to bezkonkurencyjny przy organizacji 18-stek, urodzin, chrzcin, komunii i uroczystości w gronie do 40 osób.
              </p>

              {/* Venue Key Specs */}
              <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-800 font-medium">
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-stone-200/80">
                  <Users size={16} className="text-amber-700 shrink-0" />
                  <span>Pojemność do 40 osób</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-stone-200/80 text-rose-700">
                  <XCircle size={16} className="text-rose-600 shrink-0" />
                  <span>Bez wesel (kameralny)</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-stone-200/80">
                  <Sparkles size={16} className="text-amber-700 shrink-0" />
                  <span>18-stki i jubileusze</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-stone-200/80">
                  <Utensils size={16} className="text-amber-700 shrink-0" />
                  <span>Domowa kuchnia i serwis</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button 
                  type="button"
                  onClick={() => onOpenGalleryTab('piwnica')}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-700 to-gold hover:from-amber-600 hover:to-gold text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm transition-all shadow-md"
                >
                  <span>Zobacz Wnętrza Piwnicy ({PIWNICA_IMAGES.length} zdjęć)</span>
                  <ArrowRight size={15} />
                </button>

                <a 
                  href="tel:661637770"
                  className="inline-flex items-center gap-2 bg-white hover:bg-stone-100 text-stone-900 border border-stone-200 font-bold px-5 py-3 rounded-full text-xs sm:text-sm transition-all shadow-xs"
                >
                  <Phone size={14} className="text-amber-700" />
                  <span>Zapytaj o termin</span>
                </a>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

function VenuePhotoPreview({ 
  img, 
  alt, 
  priority = 'lazy',
  onClick 
}: { 
  key?: string | number; 
  img: string; 
  alt: string; 
  priority?: 'eager' | 'lazy';
  onClick: () => void; 
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-sm bg-stone-200"
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center text-stone-400">
          <ImageIcon size={20} className="opacity-40" />
        </div>
      )}
      <img 
        src={img} 
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={priority}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-xs">
        <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center scale-90 group-hover:scale-100 transition-transform">
          <Maximize2 size={18} />
        </div>
      </div>
    </motion.div>
  );
}

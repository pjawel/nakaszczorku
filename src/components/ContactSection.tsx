import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Navigation, Sparkles, Building2 } from 'lucide-react';
import { HIT_FIT_ADDRESS, HIT_FIT_MAPS_EMBED, HIT_FIT_MAPS_LINK, PIWNICA_ADDRESS, PIWNICA_MAPS_EMBED, PIWNICA_MAPS_LINK } from '../data';

export function ContactSection() {
  const [selectedMap, setSelectedMap] = useState<'hit-fit' | 'piwnica'>('hit-fit');

  const venuesInfo = {
    'hit-fit': {
      name: 'Sala Bankietowa Hit Fit',
      address: HIT_FIT_ADDRESS,
      embed: HIT_FIT_MAPS_EMBED,
      link: HIT_FIT_MAPS_LINK,
      note: 'Konstytucji 3 Maja 3, Lubin • do 90 osób • duży taras i grill',
      badgeColor: 'bg-emerald-600',
    },
    'piwnica': {
      name: 'Sala Bankietowa Piwnica pod Żabą',
      address: PIWNICA_ADDRESS,
      embed: PIWNICA_MAPS_EMBED,
      link: PIWNICA_MAPS_LINK,
      note: 'Orla 39a, Lubin • niepowtarzalny klimat • tradycyjna kuchnia',
      badgeColor: 'bg-gold-dark',
    },
  };

  const currentVenue = venuesInfo[selectedMap];

  return (
    <section id="kontakt" className="py-20 md:py-28 bg-white relative scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact details & addresses */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-8"
          >
            <div>
              <span className="text-gold-dark uppercase tracking-[0.25em] text-xs font-bold mb-3 block">
                Rezerwacje & Informacje
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
                Skontaktuj się z Nami
              </h2>
            </div>
            
            <div className="space-y-4">
              {/* Phone Card */}
              <motion.a 
                href="tel:661637770"
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-start gap-5 p-5 rounded-3xl bg-amber-50/60 hover:bg-amber-50 border border-amber-200/70 transition-all shadow-sm group"
              >
                <div className="w-13 h-13 bg-gradient-to-br from-amber-500 to-gold rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-md shrink-0">
                  <Phone size={24} className="group-hover:animate-bounce" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Telefon kontaktowy</h4>
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 group-hover:text-gold-dark transition-colors">
                    661 637 770
                  </p>
                  <span className="text-xs text-gray-600 font-medium">Zadzwoń bezpośrednio, aby dopytać o wolne terminy</span>
                </div>
              </motion.a>

              {/* Email Card */}
              <motion.a 
                href="mailto:pod.zaba39a@gmail.com"
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-start gap-5 p-5 rounded-3xl bg-off-white hover:bg-amber-50/40 border border-gray-200 hover:border-amber-200/60 transition-all shadow-sm group"
              >
                <div className="w-13 h-13 bg-amber-100 rounded-2xl flex items-center justify-center text-gold-dark group-hover:bg-gold group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-xs shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Adres e-mail</h4>
                  <p className="text-xl sm:text-2xl font-serif font-bold text-gray-900 group-hover:text-gold-dark transition-colors">
                    pod.zaba39a@gmail.com
                  </p>
                  <span className="text-xs text-gray-600 font-medium">Napisz do nas w sprawie szczegółowej wyceny</span>
                </div>
              </motion.a>

              {/* 2 Distinct Location Cards */}
              <div className="pt-2">
                <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-3">
                  Adresy Naszych Lokali (Lubin):
                </h4>
                
                <div className="grid sm:grid-cols-2 gap-3.5">
                  {/* Hit Fit Address Card */}
                  <motion.div
                    onClick={() => setSelectedMap('hit-fit')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                      selectedMap === 'hit-fit' 
                        ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-500/20 shadow-md' 
                        : 'bg-off-white border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <h5 className="font-bold text-sm text-gray-900">Sala Hit Fit</h5>
                    </div>
                    <p className="text-sm font-semibold text-emerald-900 mb-1">
                      {HIT_FIT_ADDRESS}
                    </p>
                    <p className="text-xs text-gray-600">Sala do 90 osób, taras & grill</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-emerald-700 font-bold">
                      <span>{selectedMap === 'hit-fit' ? '✓ Pokazana na mapie' : 'Kliknij, aby pokazać mapę'}</span>
                    </div>
                  </motion.div>

                  {/* Piwnica Pod Zaba Address Card */}
                  <motion.div
                    onClick={() => setSelectedMap('piwnica')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                      selectedMap === 'piwnica' 
                        ? 'bg-amber-50/80 border-gold ring-2 ring-gold/20 shadow-md' 
                        : 'bg-off-white border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-gold" />
                      <h5 className="font-bold text-sm text-gray-900">Piwnica pod Żabą</h5>
                    </div>
                    <p className="text-sm font-semibold text-amber-950 mb-1">
                      {PIWNICA_ADDRESS}
                    </p>
                    <p className="text-xs text-gray-600">Klimatyczne przyjęcia okolicznościowe</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-gold-dark font-bold">
                      <span>{selectedMap === 'piwnica' ? '✓ Pokazana na mapie' : 'Kliknij, aby pokazać mapę'}</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-200 text-gray-800 text-sm italic leading-relaxed shadow-xs">
              "Serdecznie zapraszamy do kontaktu telefonicznego w celu rezerwacji dogodnego terminu oraz omówienia szczegółów Państwa przyjęcia na rok 2026 oraz 2027!"
            </div>
          </motion.div>

          {/* Right Column: Interactive Google Maps Embed with Map Switcher */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 space-y-4"
          >
            {/* Map Selector Tabs */}
            <div className="flex p-1.5 bg-gray-100 rounded-2xl border border-gray-200">
              <button
                type="button"
                onClick={() => setSelectedMap('hit-fit')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  selectedMap === 'hit-fit'
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Building2 size={16} />
                <span>Mapa: Hit Fit</span>
                <span className="hidden sm:inline text-[10px] opacity-80">(Konstytucji 3 Maja)</span>
              </button>
              
              <button
                type="button"
                onClick={() => setSelectedMap('piwnica')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  selectedMap === 'piwnica'
                    ? 'bg-gradient-to-r from-amber-600 to-gold text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Sparkles size={16} />
                <span>Mapa: Piwnica pod Żabą</span>
                <span className="hidden sm:inline text-[10px] opacity-80">(Orla 39a)</span>
              </button>
            </div>

            {/* Map Container */}
            <div className="h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 relative group bg-gray-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMap}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <iframe 
                    src={currentVenue.embed} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Google Maps - ${currentVenue.name}`}
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Overlay card at bottom of map */}
              <div className="absolute bottom-5 left-5 right-5 p-4 bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${currentVenue.badgeColor} rounded-full flex items-center justify-center text-white shrink-0 shadow-sm`}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-900">{currentVenue.name}</div>
                    <div className="text-xs text-gray-600">{currentVenue.address}</div>
                  </div>
                </div>
                
                <motion.a 
                  href={currentVenue.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-900 hover:bg-gold text-white text-xs px-4 py-2.5 rounded-xl transition-colors font-bold flex items-center justify-center gap-1.5 shadow-md shrink-0"
                >
                  <Navigation size={13} />
                  <span>Nawiguj w Google Maps</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

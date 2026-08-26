import { motion } from 'motion/react';
import { Film, Video, Sparkles, Utensils, MapPin } from 'lucide-react';
import { DRONE_VIDEO_URL, PREPARATION_VIDEO_URL, HIT_FIT_IMAGES, PIWNICA_IMAGES, HIT_FIT_ADDRESS } from '../data';
import { LazyVideo } from './LazyVideo';

export function VideoSection() {
  return (
    <section id="wideo" className="py-20 md:py-28 bg-stone-950 text-white scroll-mt-20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-gold/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-gold uppercase tracking-[0.2em] text-xs font-bold block">
            Prezentacje Wideo
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
            Zobacz Nasze Lokale i Kulisy Przygotowań
          </h2>
          <p className="text-stone-400 text-sm sm:text-base font-light">
            Obejrzyj salę Hit Fit z lotu ptaka oraz proces przygotowania wystroju i dań przed przybyciem gości.
          </p>
        </div>

        {/* 1. Drone Video - Hit Fit */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
              <Film size={14} className="text-emerald-400" /> Sala Hit Fit z Lotu Ptaka
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
              Lokal Hit Fit z Lotu Ptaka
            </h3>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              Ujęcia z drona prezentujące przestrzeń sali bankietowej Hit Fit w Lubinie. Zobacz dogodny dojazd, duży bezpłatny parking, zielone otoczenie oraz przestronny taras do dyspozycji Twoich gości.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400 font-medium">
              <MapPin size={14} className="text-emerald-400 shrink-0" />
              <span>{HIT_FIT_ADDRESS}</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <LazyVideo 
              src={DRONE_VIDEO_URL}
              poster={HIT_FIT_IMAGES[0]}
              title="Lokal Hit Fit z Lotu Ptaka - Lubin"
              className="w-full h-[280px] sm:h-[380px] md:h-[420px] object-cover"
            />
          </div>
        </motion.div>

        <div className="h-px bg-white/10" />

        {/* 2. Preparation Process Video */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          <div className="lg:col-span-7 order-2 lg:order-1">
            <LazyVideo 
              src={PREPARATION_VIDEO_URL}
              poster={PIWNICA_IMAGES[1] || HIT_FIT_IMAGES[1]}
              title="Kulisy Przygotowań do Przyjęcia"
              className="w-full h-[280px] sm:h-[380px] md:h-[420px] object-cover"
            />
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} className="text-gold" /> Dbałość o Detale
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
              Kulisy Przygotowań do Przyjęcia
            </h3>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              Zobacz, jak krok po kroku aranżujemy salę na przyjęcie okolicznościowe. Dbamy o każdy szczegół — od eleganckiego nakrycia i dekoracji stołów, po świeże potrawy i profesjonalny serwis.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-200/90 font-medium">
              <Utensils size={14} className="text-gold shrink-0" />
              <span>Świeże składniki, autorska kuchnia i indywidualne podejście</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

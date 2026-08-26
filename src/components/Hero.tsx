import { useState, useRef, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Video, 
  Play, 
  ChefHat, 
  Users, 
  Phone, 
  X, 
  CheckCircle2, 
  Maximize2,
  Volume2,
  VolumeX,
  Building2,
  TreePine,
  Car
} from 'lucide-react';
import { HERO_BG_IMAGE, DRONE_VIDEO_URL, PREPARATION_VIDEO_URL, HIT_FIT_IMAGES, PIWNICA_IMAGES } from '../data';
import { preloadImages, preloadVideo } from '../utils/resourceOptimizer';

export function Hero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Background idle cache warming for fast subsequent viewing
  useEffect(() => {
    // Warm top photos first
    preloadImages([...HIT_FIT_IMAGES.slice(0, 8), ...PIWNICA_IMAGES.slice(0, 6)], 'idle');
    // Prewarm preparation video metadata
    preloadVideo(PREPARATION_VIDEO_URL);
  }, []);

  const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navOffset = window.innerWidth < 1024 ? 65 : 75;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, elementPosition - navOffset);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-14 overflow-hidden bg-stone-950 text-white">
      {/* Background Image / Ambient Backdrop with Rich Dark Gradient */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          src={HERO_BG_IMAGE} 
          alt="Sale Bankietowe Lubin" 
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="w-full h-full object-cover opacity-35"
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-stone-950/40 to-stone-950/90" />
      </div>

      {/* Subtle Gold Ambient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-amber-600/10 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Clear Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.15] tracking-tight"
            >
              Eleganckie Sale na Twoją Uroczystość w Lubinie
            </motion.h1>

            {/* Clear Subtitle answering key questions */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light"
            >
              Organizacja wesel, komunii, chrzcin, 18-stek, jubileuszy i imprez okolicznościowych. 
              Dwa profesjonalne lokale z autorską kuchnią, elegancką oprawą i pełną obsługą.
            </motion.p>

            {/* Concise Venue Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-3 pt-1 text-xs"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-emerald-400/30 text-stone-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span><strong>Hit Fit</strong> (główny lokal do 90 osób • wesela, taras, grill, parking)</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-amber-400/30 text-stone-200">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span><strong>Piwnica pod Żabą</strong> (kameralna do 40 osób • 18-stki, bez wesel)</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-3 flex flex-wrap gap-3 justify-center lg:justify-start items-center"
            >
              <a 
                href="#lokale" 
                onClick={(e) => scrollToSection(e, 'lokale')}
                className="bg-gradient-to-r from-amber-600 via-gold to-yellow-600 hover:from-amber-500 hover:to-gold text-white px-7 py-3.5 rounded-full font-bold transition-all shadow-lg hover:shadow-gold/30 flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
              >
                <span>Zobacz Sale</span>
                <ArrowRight size={16} />
              </a>

              <a 
                href="#oferta" 
                onClick={(e) => scrollToSection(e, 'oferta')}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/25 px-6 py-3.5 rounded-full font-semibold transition-all flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
              >
                <ChefHat size={16} className="text-gold-light" />
                <span>Pakiety Menu</span>
              </a>

              <a 
                href="tel:661637770"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-stone-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                <Phone size={15} className="text-gold" />
                <span>Zadzwoń: <strong>661 637 770</strong></span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Prominent Drone Video Showcase (Lot Ptaka) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-stone-900">
              
              {/* Drone Video Player Container */}
              <div className="relative aspect-video sm:aspect-[4/3] w-full overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  src={DRONE_VIDEO_URL}
                  poster={HIT_FIT_IMAGES[0]}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Overlay Badge */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-white">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Hit Fit z lotu ptaka (dron)</span>
                </div>

                {/* Sound and Fullscreen Controls */}
                <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMuted(!isMuted);
                      if (videoRef.current) {
                        videoRef.current.muted = !isMuted;
                      }
                    }}
                    className="p-2 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all text-xs"
                    title={isMuted ? "Włącz dźwięk" : "Wycisz dźwięk"}
                  >
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsVideoModalOpen(true)}
                    className="p-2 rounded-full bg-gold hover:bg-gold-light text-stone-950 font-bold backdrop-blur-md transition-all shadow-md"
                    title="Otwórz pełny ekran"
                  >
                    <Maximize2 size={15} />
                  </button>
                </div>
              </div>

              {/* Video Caption & Venue Highlights */}
              <div className="p-4 bg-stone-900/95 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gold-light font-bold uppercase tracking-wider">Hit Fit • Lubin</span>
                  <span className="text-stone-400">ul. Konstytucji 3 Maja 3</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed font-light">
                  Zobacz przestrzeń wokół lokalu: bezpieczny dojazd, bezpłatny parking, zadaszony taras i zielone otoczenie.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-stone-300 flex items-center gap-1">
                    <Car size={11} className="text-emerald-400" /> Duży parking
                  </span>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-stone-300 flex items-center gap-1">
                    <TreePine size={11} className="text-emerald-400" /> Taras & Grill
                  </span>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-stone-300 flex items-center gap-1">
                    <Users size={11} className="text-emerald-400" /> Do 90 osób
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Fullscreen Video Modal for Drone Footage */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <div 
              className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 bg-stone-900 border-b border-white/10 text-white">
                <div className="flex items-center gap-2">
                  <Video size={18} className="text-gold" />
                  <span className="font-bold text-sm">Prezentacja z drona – Sala Bankietowa Hit Fit w Lubinie</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="aspect-video w-full">
                <video
                  src={DRONE_VIDEO_URL}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  UtensilsCrossed, 
  Camera, 
  MessageSquare,
  ArrowRight,
  Menu as MenuIcon,
  X,
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  CheckCircle2
} from 'lucide-react';

// --- Constants ---
const MENU_IMAGES = [
  'https://iili.io/BZtKbwv.md.jpg',
  'https://iili.io/BZtKmtR.md.jpg',
  'https://iili.io/BZtKynp.md.jpg',
  'https://iili.io/BZtKt9a.md.jpg',
  'https://iili.io/BZtfdFt.md.jpg',
  'https://iili.io/BZtfqNf.md.jpg',
  'https://iili.io/BZtfxPS.md.jpg',
  'https://iili.io/BZtfoV2.md.jpg',
  'https://iili.io/BZtfnol.md.jpg'
];

const GALLERY_IMAGES = [
  'https://iili.io/BZtxBDu.md.jpg',
  'https://iili.io/BZtnTLx.md.jpg',
  'https://iili.io/BZtnIXj.md.jpg',
  'https://iili.io/BZtnzzb.md.jpg',
  'https://iili.io/BZtnomu.md.jpg',
  'https://iili.io/BZtnR1V.md.jpg',
  'https://iili.io/BZt23Ip.md.jpg',
  'https://iili.io/BZt2YG9.md.jpg',
  'https://iili.io/BZt2w6F.md.jpg',
  'https://iili.io/BZt2eaa.md.jpg',
  'https://iili.io/BZt2Ujp.md.jpg',
  'https://iili.io/BZt2Q8G.md.jpg',
  'https://iili.io/BZt3dFe.md.jpg',
  'https://iili.io/BZt32cu.md.jpg',
  'https://iili.io/BZt39M7.md.jpg',
  'https://iili.io/BZt3K9j.md.jpg',
  'https://iili.io/BZt3BtV.md.jpg'
];

const ORDER_MENU = [
  {
    category: "Zupy",
    items: [
      { id: "szurpa", name: "Szurpa", price: 22 },
      { id: "charczo", name: "Charczo", price: 19 },
      { id: "barszcz-ukr", name: "Barszcz ukraiński", price: 18 },
      { id: "barszcz-piel", name: "Barszcz z pielmieni", price: 17 },
      { id: "rosol-piel", name: "Rosół z pielmieni", price: 16 },
      { id: "rosol-mak", name: "Rosół z makaronem", price: 10 },
      { id: "barszcz-picie", name: "Barszcz do picia", price: 9 }
    ]
  },
  {
    category: "Dania główne",
    items: [
      { id: "poledwiczka", name: "Soczysta polędwiczka z warzywami w zestawie z opieczonymi ziemniaczkami i surówką", price: 42 },
      { id: "kurczak-grill", name: "Grillowany filet kurczaka z frytkami i surówką", price: 38 },
      { id: "schabowe", name: "Schabowe z ziemniakami i surówką", price: 33 }
    ]
  },
  {
    category: "Ryby z patelni",
    description: "w zestawie z ziemniakami albo frytkami i surówką",
    items: [
      { id: "pstrog", name: "Pstrąg łososiowy", price: 34 },
      { id: "dorsz", name: "Dorsz filet w panierce", price: 34 },
      { id: "halibut", name: "Halibut", price: 42 },
      { id: "losos", name: "Łosoś filet", price: 42 }
    ]
  },
  {
    category: "Placki ziemniaczane",
    items: [
      { id: "placki-gulasz", name: "Placki ziemniaczane z gulaszem", price: 27 },
      { id: "placki-smietana", name: "Placki ziemniaczane ze śmietaną", price: 23 }
    ]
  },
  {
    category: "Krokiety z sosem",
    items: [
      { id: "krokiet-kurczak", name: "Krokiety z kurczakiem i mozzarellą (2szt)", price: 25 },
      { id: "krokiet-pieczarki", name: "Krokiety z pieczarkami i mozzarellą (2szt)", price: 25 },
      { id: "krokiet-szpinak", name: "Krokiety ze szpinakiem i fetą (2szt)", price: 25 },
      { id: "krokiet-kapusta", name: "Krokiety z kapustą i grzybami (2szt)", price: 25 },
      { id: "nalesniki-twarog", name: "Naleśniki z twarogiem (2szt)", price: 25 }
    ]
  },
  {
    category: "Czeburek z sosem",
    items: [
      { id: "czeburek-miesto", name: "Czeburek z mięsem (wieprzowina)", price: 16 },
      { id: "czeburek-kurczak-ser", name: "Czeburek z kurczakiem i serem", price: 16 },
      { id: "czeburek-kurczak-grzyby", name: "Czeburek z kurczakiem i grzybami", price: 16 },
      { id: "czeburek-wedzony", name: "Czeburek z wędzonym serem i suszonymi pomidorami", price: 16 }
    ]
  },
  {
    category: "Pierogi",
    items: [
      { id: "pierogi-miks", name: "Miks (5 dowolnych pierogow)", price: 29 },
      { id: "pierogi-miesto", name: "Pierogi z mięsem", price: 28 },
      { id: "pierogi-kurczak-ser", name: "Pierogi z kurczakiem i serem", price: 24 },
      { id: "pierogi-kurczak-meksyk", name: "Pierogi z kurczakiem po meksykańsku", price: 24 },
      { id: "pierogi-ruskie", name: "Pierogi ruskie", price: 24 },
      { id: "pierogi-ruskie-boczek", name: "Rusek z boczkiem", price: 24 },
      { id: "pierogi-kapusta-grzyby", name: "Pierogi z kapustą i grzybami", price: 24 },
      { id: "pierogi-pieczarki", name: "Pierogi z pieczarkami", price: 24 },
      { id: "pierogi-pieczarki-ser", name: "Pierogi z pieczarkami i serem", price: 24 },
      { id: "pierogi-szpinak-feta", name: "Pierogi ze szpinakiem i fetą", price: 24 },
      { id: "pierogi-soczewica", name: "Pierogi z soczewicą (wege)", price: 25 },
      { id: "pierogi-twarog", name: "Pierogi z twarogiem", price: 23 },
      { id: "pierogi-twarog-owoce", name: "Pierogi z twarogiem i owocami", price: 25 },
      { id: "pierogi-owoce", name: "Pierogi z owocami", price: 25 }
    ]
  },
  {
    category: "Pielmieni",
    items: [
      { id: "pielmieni-miks", name: "Miks pielmieni (15szt)", price: 32 },
      { id: "pielmieni-wol-wieprz", name: "Pielmieni z wołowiną i wieprzowiną", price: 28 },
      { id: "pielmieni-indyk-wol", name: "Pielmieni z indykiem i wołowiną", price: 28 },
      { id: "pielmieni-soczewica-borowik", name: "Pielmieni z soczewicą i borowikiem", price: 27 },
      { id: "pielmieni-borowik-pieczarka", name: "Pielmieni z borowikiem i pieczarką", price: 30 }
    ]
  },
  {
    category: "Chinkali",
    items: [
      { id: "chinkali-wol-wieprz", name: "Chinkali z wołowiną i wieprzowiną", price: 35 }
    ]
  },
  {
    category: "Dla dzieci",
    items: [
      { id: "dziecko-schabowy", name: "Schabowe z kurczaka z ziemniakami i surówką", price: 33 },
      { id: "dziecko-schabowy-frytki", name: "Schabowe z kurczaka z frytkami i surówką", price: 33 },
      { id: "dziecko-naggetsy", name: "Frytki i nuggetsy", price: 25 },
      { id: "dziecko-stripsy", name: "Stripsy z kurczaka i frytki", price: 30 },
      { id: "dziecko-leniwe", name: "Pierogi leniwe (15szt)", price: 22 },
      { id: "dziecko-twarog", name: "Pierogi z twarogiem", price: 23 },
      { id: "dziecko-nalesniki-twarog", name: "Naleśniki z twarogiem (2szt)", price: 23 },
      { id: "dziecko-nalesniki-nutella", name: "Naleśniki z nutellą albo dżemem (3szt)", price: 23 }
    ]
  },
  {
    category: "Napoje",
    items: [
      { id: "cola", name: "Cola", price: 8 },
      { id: "fanta", name: "Fanta", price: 8 },
      { id: "sprite", name: "Sprite", price: 8 },
      { id: "sok-j", name: "Sok jabłkowy", price: 6 },
      { id: "sok-p", name: "Sok pomarańczowy", price: 6 },
      { id: "sok-m", name: "Sok multiwitamina", price: 6 },
      { id: "woda-gaz", name: "Woda gazowana", price: 5 },
      { id: "woda-ngaz", name: "Woda niegazowana", price: 5 }
    ]
  },
  {
    category: "Dodatki",
    items: [
      { id: "surowka", name: "surówka", price: 8 },
      { id: "ziemniaki", name: "ziemniaki", price: 8 },
      { id: "frytki", price: 10 }
    ]
  }
];

const webhookUrl = 'https://hook.eu1.make.com/5kir8yq9nvnzln131kr83bmarlcwe492';

// --- Components ---

const Navbar = ({ onOrderClick }: { onOrderClick: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-rustic-cream/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://iili.io/BZtFIX2.png" 
              alt="Logo" 
              className={`rounded-full border-2 border-rustic-brown transition-all duration-500 ${scrolled ? 'w-10 h-10' : 'w-14 h-14'}`}
            />
            <span className={`font-serif font-bold tracking-tight text-rustic-dark transition-all duration-500 ${scrolled ? 'text-lg' : 'text-2xl'}`}>
              Pierogarnia <span className="hidden sm:inline">na Kaszczorku</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium uppercase tracking-[0.2em] text-rustic-brown pt-1">
            <a href="#menu" className="hover:text-rustic-accent transition-colors">Menu</a>
            <a href="#gallery" className="hover:text-rustic-accent transition-colors">Galeria</a>
            <a href="#contact" className="hover:text-rustic-accent transition-colors">Kontakt</a>
            <button 
              onClick={onOrderClick}
              className="bg-rustic-accent text-white px-8 py-3 rounded-full hover:bg-rustic-dark transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <ShoppingCart size={18} />
              Zamów Online
            </button>
            <a href="tel:789779658" className="bg-rustic-brown text-white px-8 py-3 rounded-full hover:bg-rustic-dark transition-all shadow-md hover:shadow-lg">
              789 779 658
            </a>
          </div>

          <button className="md:hidden text-rustic-brown" onClick={() => setMobileMenuOpen(true)}>
            <MenuIcon size={28} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-rustic-dark/90 backdrop-blur-sm flex flex-col items-center justify-center gap-8 text-white text-2xl font-serif"
          >
            <button className="absolute top-8 right-8" onClick={() => setMobileMenuOpen(false)}>
              <X size={32} />
            </button>
            <a href="#menu" onClick={() => setMobileMenuOpen(false)}>Menu</a>
            <a href="#gallery" onClick={() => setMobileMenuOpen(false)}>Galeria</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Kontakt</a>
            <button 
              onClick={() => { onOrderClick(); setMobileMenuOpen(false); }}
              className="px-10 py-4 bg-rustic-accent text-white rounded-full flex items-center gap-2"
            >
              <ShoppingCart size={24} />
              Zamów Online
            </button>
            <a href="tel:789779658" className="mt-4 px-10 py-4 border-2 border-white rounded-full">789 779 658</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const PaperMenu = () => {
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const spreads = [];
  for (let i = 0; i < MENU_IMAGES.length; i += 2) {
    spreads.push([MENU_IMAGES[i], MENU_IMAGES[i + 1] || null]);
  }

  const next = () => {
    if (spreadIndex < spreads.length - 1 && !isAnimating) {
      setDirection('next');
      setIsAnimating(true);
      setTimeout(() => {
        setSpreadIndex(prev => prev + 1);
        setIsAnimating(false);
        setDirection(null);
      }, 800);
    }
  };

  const prev = () => {
    if (spreadIndex > 0 && !isAnimating) {
      setDirection('prev');
      setIsAnimating(true);
      setTimeout(() => {
        setSpreadIndex(prev => prev - 1);
        setIsAnimating(false);
        setDirection(null);
      }, 800);
    }
  };

  const handleZoom = (img: string) => {
    setZoomImage(img);
    setIsZoomed(true);
  };

  return (
    <section id="menu" className="py-32 bg-rustic-beige relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.03] pointer-events-none" />
      <div className="absolute top-10 left-10 text-[18vw] font-serif font-black text-rustic-brown/5 leading-none select-none pointer-events-none text-right">
        01
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="font-cormorant italic text-rustic-brown text-xl mb-4 tracking-wide">Smaki tradycji</p>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-rustic-dark mb-6">Nasza Karta</h2>
          <div className="w-24 h-1 bg-rustic-brown mx-auto" />
        </div>
        
        <div 
          className="relative group max-w-5xl mx-auto perspective-2000 px-4 md:px-0"
          onContextMenu={(e) => e.preventDefault()}
        >
          <motion.div 
            onPanEnd={(_, info) => {
              if (Math.abs(info.offset.x) > 50) {
                if (info.offset.x < 0) next();
                else prev();
              }
            }}
            className="relative aspect-[1.1/1] md:aspect-[1.4/1] bg-white rounded-sm shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] flex preserve-3d"
          >
            
            {/* Background Pages */}
            <div className="w-full h-full flex absolute inset-0 z-0">
               <div className="w-1/2 h-full border-r border-black/5 bg-gradient-to-r from-[#fdfbf6] to-white p-2 md:p-8 relative">
                  {(direction === 'prev' ? spreads[spreadIndex - 1]?.[0] : spreads[spreadIndex]?.[0]) && (
                    <img 
                      src={direction === 'prev' ? spreads[spreadIndex - 1][0] : spreads[spreadIndex][0]} 
                      className="w-full h-full object-contain" 
                      alt="bg-left"
                    />
                  )}
                  <div className="absolute inset-y-0 right-0 w-8 md:w-12 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
               </div>
               <div className="w-1/2 h-full bg-gradient-to-l from-[#fdfbf6] to-white p-2 md:p-8 relative">
                  {(direction === 'next' ? spreads[spreadIndex + 1]?.[1] : spreads[spreadIndex]?.[1]) && (
                    <img 
                      src={direction === 'next' ? (spreads[spreadIndex + 1]?.[1] || '') : (spreads[spreadIndex][1] || '')} 
                      className="w-full h-full object-contain" 
                      alt="bg-right"
                    />
                  )}
                  <div className="absolute inset-y-0 left-0 w-8 md:w-12 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
               </div>
            </div>

            {/* Turning Leaf */}
            <AnimatePresence>
              {isAnimating && direction === 'next' && (
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: -180 }}
                  transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1] }}
                  style={{ transformOrigin: 'left center', left: '50%', width: '50%', zIndex: 100 }}
                  className="absolute inset-y-0 preserve-3d"
                >
                  <div className="absolute inset-0 bg-white border-l border-black/5 p-2 md:p-8 backface-hidden flex items-center justify-center">
                    <img src={spreads[spreadIndex][1]!} className="w-full h-full object-contain" alt="turn-front" />
                    <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/10 to-transparent" />
                  </div>
                  <div className="absolute inset-0 bg-[#fdfbf6] border-r border-black/5 p-2 md:p-8 backface-hidden rotate-y-180 flex items-center justify-center">
                    <img src={spreads[spreadIndex + 1][0]!} className="w-full h-full object-contain" alt="turn-back" />
                    <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/10 to-transparent" />
                  </div>
                </motion.div>
              )}

              {isAnimating && direction === 'prev' && (
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 180 }}
                  transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1] }}
                  style={{ transformOrigin: 'right center', left: '0%', width: '50%', zIndex: 100 }}
                  className="absolute inset-y-0 preserve-3d"
                >
                  <div className="absolute inset-0 bg-white border-r border-black/5 p-2 md:p-8 backface-hidden flex items-center justify-center">
                    <img src={spreads[spreadIndex][0]!} className="w-full h-full object-contain" alt="turn-front-prev" />
                    <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/10 to-transparent" />
                  </div>
                  <div className="absolute inset-0 bg-[#fdfbf6] border-l border-black/5 p-2 md:p-8 backface-hidden rotate-y-180 flex items-center justify-center">
                    <img src={spreads[spreadIndex - 1][1]!} className="w-full h-full object-contain" alt="turn-back-prev" />
                    <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/10 to-transparent" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute inset-y-0 left-1/2 w-10 -translate-x-1/2 z-[110] bg-gradient-to-r from-black/5 via-black/20 to-black/5 pointer-events-none" />

            {!isAnimating && (
              <div className="absolute inset-0 z-[120] flex">
                <div 
                  className="w-1/2 h-full cursor-zoom-in group/page relative" 
                  onClick={() => spreads[spreadIndex][0] && handleZoom(spreads[spreadIndex][0]!)}
                >
                  <div className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 md:opacity-0 group-hover/page:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); prev(); }}>
                    <div className="p-2 md:p-3 bg-white/90 rounded-full shadow-lg text-rustic-brown cursor-pointer">
                      <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                  </div>
                </div>
                <div 
                  className="w-1/2 h-full cursor-zoom-in group/page relative" 
                  onClick={() => spreads[spreadIndex][1] && handleZoom(spreads[spreadIndex][1]!)}
                >
                  <div className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 md:opacity-0 group-hover/page:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); next(); }}>
                    <div className="p-2 md:p-3 bg-white/90 rounded-full shadow-lg text-rustic-brown cursor-pointer">
                      <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex gap-4 bg-white/60 backdrop-blur-md px-8 py-4 rounded-full border border-rustic-brown/10 z-[130] shadow-sm">
            {spreads.map((_, i) => (
              <button 
                key={i}
                disabled={isAnimating}
                onClick={() => { if(i !== spreadIndex) { setDirection(i > spreadIndex ? 'next' : 'prev'); setSpreadIndex(i); } }}
                className={`group flex flex-col items-center gap-1 transition-all duration-300 ${i === spreadIndex ? 'scale-110' : 'opacity-30 hover:opacity-100'}`}
              >
                <div className={`w-8 h-4 border-2 transition-colors ${i === spreadIndex ? 'bg-rustic-brown border-rustic-brown' : 'border-rustic-brown'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isZoomed && zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-[200] bg-rustic-dark/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <button className="absolute top-8 right-8 text-white p-2 hover:bg-white/10 rounded-full transition-colors" onClick={() => setIsZoomed(false)}>
              <X size={40} />
            </button>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative max-w-full max-h-full">
              <img src={zoomImage} alt="Zoomed Menu" className="w-auto h-auto max-w-full max-h-[90vh] rounded-sm shadow-2xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Gallery = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-32 bg-rustic-cream relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-10 right-10 text-[18vw] font-serif font-black text-rustic-brown/5 leading-none select-none pointer-events-none">
          02
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <p className="font-cormorant italic text-rustic-brown text-xl mb-4">Uchwycone chwile</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-rustic-dark">Galeria</h2>
          </div>
          <p className="text-rustic-brown max-w-md text-lg leading-relaxed italic font-serif">
            Zajrzyj do naszej kuchni i poczuj atmosferę miejsca, w którym tradycja łączy się z pasją do domowego gotowania.
          </p>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onClick={() => setZoomedImage(img)}
              className="relative break-inside-avoid group cursor-zoom-in overflow-hidden rounded-sm shadow-md bg-white p-1.5 md:p-2"
            >
              <div className="overflow-hidden">
                <img 
                  src={img} 
                  alt={`Kaszczorek Galeria ${i}`} 
                  className="w-full h-auto block transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-[6px] md:inset-[8px] bg-rustic-dark/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 z-[100] bg-rustic-dark/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <button className="absolute top-8 right-8 text-white p-2 hover:bg-white/10 rounded-full transition-colors" onClick={() => setZoomedImage(null)}>
              <X size={40} />
            </button>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative max-w-full max-h-full">
              <img src={zoomedImage} alt="Zoomed Gallery" className="w-auto h-auto max-w-full max-h-[90vh] rounded-sm shadow-2xl border-4 border-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Reviews = () => (
  <section className="py-32 bg-rustic-dark text-rustic-beige overflow-hidden relative">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <p className="font-cormorant italic text-rustic-accent text-xl mb-4 tracking-widest uppercase">Zadowoleni Goście</p>
      <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16">Co o nas mówią</h2>
      
      <div className="relative p-12 md:p-20 bg-rustic-brown/20 rounded-3xl border border-rustic-beige/10 backdrop-blur-sm">
        <div className="flex justify-center gap-1 mb-8 text-yellow-500">
          {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={20} />)}
        </div>
        <p className="text-2xl md:text-3xl font-serif italic mb-12 leading-relaxed">
          "Najlepsze pierogi jakie jadłem w Toruniu! Czuć, że są robione z sercem i tradycją. 
          Kaszczorek ma swój kulinarny skarb, do którego wracamy całą rodziną."
        </p>
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-1 bg-rustic-accent" />
          <a 
            href="https://www.facebook.com/pierogarnianakaszczorku/reviews/?id=100057447759306&sk=reviews" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full transition-all text-sm tracking-widest uppercase"
          >
            <Facebook size={18} className="text-blue-400" />
            Opinie na Facebooku
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-32 bg-rustic-beige relative overflow-hidden">
    <div className="absolute inset-0 bg-dot-pattern opacity-[0.03] pointer-events-none" />
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-20 items-stretch">
        <div className="flex flex-col justify-center">
          <p className="font-cormorant italic text-rustic-brown text-xl mb-4 tracking-wide">Zapraszamy do stołu</p>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-rustic-dark mb-12">Odwiedź nas</h2>
          
          <div className="grid sm:grid-cols-2 gap-10">
            <div className="space-y-10">
              <div className="group">
                <p className="text-sm uppercase tracking-widest text-rustic-accent mb-2 font-bold font-sans">Lokalizacja</p>
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-rustic-brown mt-1 shrink-0" />
                  <p className="text-xl text-rustic-dark font-serif font-medium">
                    Dożynkowa 9c,<br />
                    87-100 Toruń
                  </p>
                </div>
              </div>
              
              <div className="group">
                <p className="text-sm uppercase tracking-widest text-rustic-accent mb-2 font-bold font-sans">Kontakt</p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <Phone size={20} className="text-rustic-brown shrink-0" />
                    <a href="tel:789779658" className="text-xl text-rustic-dark font-serif font-medium hover:text-rustic-accent">789 779 658</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="group">
                <p className="text-sm uppercase tracking-widest text-rustic-accent mb-2 font-bold font-sans">Godziny Gościnności</p>
                <div className="flex items-start gap-4">
                  <Clock size={20} className="text-rustic-brown mt-1 shrink-0" />
                  <div className="text-lg text-rustic-dark font-serif">
                    <p className="flex justify-between gap-4 mb-1"><span>Pon - Nd:</span> <span className="font-bold">11:00 - 19:00</span></p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <motion.a 
                  whileHover={{ x: 5 }}
                  href="https://www.facebook.com/pierogarnianakaszczorku"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 px-10 py-5 bg-[#1877F2] text-white rounded-full font-bold shadow-xl transition-all"
                >
                  <Facebook size={24} />
                  <span>Obserwuj nas</span>
                  <ArrowRight size={20} />
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group min-h-[500px]">
          <div className="absolute inset-0 bg-rustic-brown transform rotate-2 rounded-3xl -z-10 transition-transform group-hover:rotate-1" />
          <div className="h-full rounded-2xl overflow-hidden shadow-2xl border-[12px] border-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2400.669019862265!2d18.694886212709505!3d53.00833539984403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ccb100d560067%3A0xb324e78759e1080a!2sDo%C5%BCynkowa%209C%2C%2087-162%20Toru%C5%84!5e0!3m2!1spl!2spl!4v1778146675909!5m2!1spl!2spl" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Hero = ({ onOrderClick }: { onOrderClick: () => void }) => (
  <header className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
    <div className="absolute inset-0 z-0 text-white">
      <img 
        src="https://iili.io/BZtxBDu.md.jpg" 
        alt="Pierogi Background" 
        className="w-full h-full object-cover brightness-50"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-rustic-cream via-transparent to-transparent opacity-60" />
      <div className="absolute inset-0 bg-rustic-dark/30" />
    </div>

    <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <p className="font-cormorant italic text-rustic-beige text-2xl mb-6 tracking-widest uppercase">Witamy w Pierogarni</p>
        <h1 className="text-6xl md:text-8xl font-serif font-black text-white mb-8 leading-[0.95] tracking-tight">
          Domowa tradycja <br />
          <span className="text-rustic-beige italic font-medium">lepiona ręcznie.</span>
        </h1>
        <div className="flex flex-wrap gap-6 items-center">
          <a href="#menu" className="group px-12 py-5 bg-rustic-beige text-rustic-dark rounded-full font-bold shadow-2xl hover:bg-white transition-all flex items-center gap-3">
             Nasza Karta
             <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </a>
          <button 
            onClick={onOrderClick}
            className="px-10 py-5 bg-rustic-accent text-white rounded-full font-bold shadow-2xl hover:bg-rustic-dark transition-all flex items-center gap-3"
          >
            <ShoppingCart size={20} />
            Złóż zamówienie
          </button>
        </div>
      </motion.div>
    </div>

    <motion.div 
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-3"
    >
      <span className="text-xs uppercase tracking-[0.4em] font-medium">Przewiń</span>
      <div className="w-px h-12 bg-white/30" />
    </motion.div>
  </header>
);

const Footer = () => (
  <footer className="py-24 bg-rustic-dark text-rustic-beige relative">
    <div className="max-w-7xl mx-auto px-6 text-white">
      <div className="grid md:grid-cols-4 gap-16 mb-20 text-rustic-beige">
        <div className="md:col-span-2">
          <div className="flex items-center gap-4 mb-8">
            <img src="https://iili.io/BZtFIX2.png" alt="Logo" className="w-12 h-12 rounded-full border border-white/20" />
            <span className="font-serif font-bold text-2xl tracking-tighter">Pierogarnia na Kaszczorku</span>
          </div>
          <p className="text-rustic-beige/60 max-w-sm leading-relaxed text-lg italic font-serif">
            "Smak, który pamiętasz z dzieciństwa, serwowany codziennie w samym sercu toruńskiego Kaszczorka."
          </p>
        </div>
        
        <div>
          <h4 className="font-sans font-bold uppercase tracking-widest text-xs text-rustic-accent mb-8 text-white">Nawigacja</h4>
          <ul className="space-y-4 font-serif text-lg">
            <li><a href="#menu" className="hover:text-white transition-colors">Karta Menu</a></li>
            <li><a href="#gallery" className="hover:text-white transition-colors">Galeria Zdjęć</a></li>
            <li><a href="#contact" className="hover:text-white transition-colors">Odwiedź Nas</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans font-bold uppercase tracking-widest text-xs text-rustic-accent mb-8 text-white">Kontakt</h4>
           <ul className="space-y-4 font-serif text-lg opacity-80">
            <li>789 779 658</li>
            <li>Dożynkowa 9c, Toruń</li>
            <li>Pon - Nd: 11:00 - 19:00</li>
          </ul>
        </div>
      </div>

      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm font-sans tracking-widest opacity-40 uppercase">
          © {new Date().getFullYear()} Pierogarnia na Kaszczorku. Wszystkie prawa zastrzeżone.
        </p>
      </div>
    </div>
  </footer>
);

const OrderSystem = ({ onBack }: { onBack: () => void }) => {
  const [cart, setCart] = useState<{ id: string, name: string, price: number, quantity: number }[]>([]);
  const [step, setStep] = useState<'menu' | 'details' | 'summary'>('menu');
  const [isSending, setIsSending] = useState(false);
  const [orderDetails, setOrderDetails] = useState({ 
    name: '', 
    phone: '', 
    street: '', 
    building: '', 
    apartment: '', 
    city: '', 
    notes: '' 
  });

  const isPhoneValid = /^\d{9}$/.test(orderDetails.phone.replace(/\s/g, ''));

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(0, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleFinalize = async () => {
    setIsSending(true);
    try {
      const payload = {
        klient: {
          imie: orderDetails.name,
          telefon: orderDetails.phone,
          ulica: orderDetails.street,
          numer_budynku: orderDetails.building,
          numer_lokalu: orderDetails.apartment || 'brak',
          miasto: orderDetails.city,
          uwagi: orderDetails.notes || 'brak'
        },
        produkty: cart.map(item => ({
          danie: item.name,
          ilosc: item.quantity,
          cena_jednostkowa: item.price,
          suma_pozycji: item.price * item.quantity
        })),
        podsumowanie_zamowienia: cart.map(item => `${item.quantity}x ${item.name}`).join(', '),
        suma_calkowita: total,
        metoda_platnosci: 'Przy odbiorze',
        data_zamowienia: new Date().toLocaleString('pl-PL')
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).catch(err => {
        if (err.message === 'Failed to fetch') {
          throw new Error('Błąd połączenia (Failed to fetch). Upewnij się, że scenariusz w Make.com jest włączony (ON) i nasłuchuje żądań.');
        }
        throw err;
      });

      if (response.ok) {
        setStep('summary');
      } else {
        const errorText = await response.text().catch(() => 'Brak szczegółów błędu');
        throw new Error(`Błąd serwera (Status: ${response.status}). ${errorText}`);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.');
      setIsSending(false);
    }
  };

  if (step === 'summary') {
    return (
      <div className="min-h-screen bg-rustic-cream py-32 px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-4xl font-serif font-bold text-rustic-dark mb-4">Dziękujemy!</h2>
          <p className="text-xl text-rustic-brown mb-8 font-serif italic text-balance">
            Zamówienie zostało wysłane pomyślnie! Powiadomienie trafiło na telefon właściciela.
          </p>
          <div className="bg-rustic-beige/30 rounded-2xl p-6 text-left mb-8">
            <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-rustic-accent">Szczegóły zamówienia:</h3>
            <p className="mb-2"><strong>Imię:</strong> {orderDetails.name}</p>
            <p className="mb-2"><strong>Telefon:</strong> {orderDetails.phone}</p>
            <p className="mb-2"><strong>Adres:</strong> {orderDetails.street} {orderDetails.building}{orderDetails.apartment ? `/${orderDetails.apartment}` : ''}, {orderDetails.city}</p>
            <p className="mb-6"><strong>Płatność:</strong> Przy odbiorze (Gotówka / Karta)</p>
            <div className="border-t border-rustic-brown/10 pt-4">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm mb-2">
                  <span>{item.quantity}x {item.name}</span>
                  <span>{item.price * item.quantity} zł</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-lg mt-4 border-t border-rustic-brown/20 pt-4">
                <span>Suma:</span>
                <span>{total} zł</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onBack}
            className="px-10 py-4 bg-rustic-brown text-white rounded-full font-bold shadow-lg hover:bg-rustic-dark transition-all"
          >
            Wróć do strony głównej
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rustic-cream pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Main Menu Area */}
        <div className="lg:w-2/3">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={onBack} className="p-2 hover:bg-rustic-beige rounded-full transition-colors text-rustic-brown">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-4xl font-serif font-bold text-rustic-dark">Zamówienie Online</h1>
          </div>

          {step === 'menu' ? (
            <div className="space-y-12">
              {ORDER_MENU.map((cat, idx) => (
                <div key={idx}>
                  <div className="mb-6 border-b border-rustic-brown/10 pb-2">
                    <h2 className="text-2xl font-serif font-bold text-rustic-brown">{cat.category}</h2>
                    {cat.description && <p className="text-sm font-serif italic text-rustic-brown/60">{cat.description}</p>}
                  </div>
                  <div className="grid gap-4">
                    {cat.items.map(item => (
                      <div 
                        key={item.id} 
                        className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
                      >
                        <div className="flex-1 pr-4">
                          <h3 className="font-serif font-medium text-rustic-dark text-lg">{item.name}</h3>
                          <p className="text-rustic-accent font-bold">{item.price} zł</p>
                        </div>
                        <button 
                          onClick={() => addToCart(item)}
                          className="w-10 h-10 bg-rustic-beige text-rustic-brown rounded-full flex items-center justify-center hover:bg-rustic-brown hover:text-white transition-all shadow-sm"
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-serif font-bold text-rustic-dark mb-8">Dane do dostawy</h2>
              <div className="grid gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-rustic-accent mb-2 font-bold">Twoje Imię</label>
                  <input 
                    type="text" 
                    value={orderDetails.name}
                    onChange={(e) => setOrderDetails(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-rustic-beige/30 border-2 border-transparent focus:border-rustic-brown rounded-2xl px-6 py-4 outline-none transition-all font-serif"
                    placeholder="Wpisz swoje imię..."
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-rustic-accent mb-2 font-bold">Numer Telefonu</label>
                  <input 
                    type="tel" 
                    value={orderDetails.phone}
                    onChange={(e) => setOrderDetails(prev => ({ ...prev, phone: e.target.value }))}
                    className={`w-full bg-rustic-beige/30 border-2 ${orderDetails.phone && !isPhoneValid ? 'border-red-400' : 'border-transparent'} focus:border-rustic-brown rounded-2xl px-6 py-4 outline-none transition-all font-serif`}
                    placeholder="Wpisz 9 cyfr..."
                  />
                  {orderDetails.phone && !isPhoneValid && (
                    <p className="text-red-500 text-xs mt-1 font-serif">Numer telefonu musi składać się z dokładnie 9 cyfr.</p>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-rustic-accent mb-2 font-bold">Ulica</label>
                    <input 
                      type="text" 
                      value={orderDetails.street}
                      onChange={(e) => setOrderDetails(prev => ({ ...prev, street: e.target.value }))}
                      className="w-full bg-rustic-beige/30 border-2 border-transparent focus:border-rustic-brown rounded-2xl px-6 py-4 outline-none transition-all font-serif"
                      placeholder="Nazwa ulicy..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-rustic-accent mb-2 font-bold">Nr budynku</label>
                      <input 
                        type="text" 
                        value={orderDetails.building}
                        onChange={(e) => setOrderDetails(prev => ({ ...prev, building: e.target.value }))}
                        className="w-full bg-rustic-beige/30 border-2 border-transparent focus:border-rustic-brown rounded-2xl px-6 py-4 outline-none transition-all font-serif"
                        placeholder="Np. 9C"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-rustic-accent mb-2 font-bold">Nr lokalu</label>
                      <input 
                        type="text" 
                        value={orderDetails.apartment}
                        onChange={(e) => setOrderDetails(prev => ({ ...prev, apartment: e.target.value }))}
                        className="w-full bg-rustic-beige/30 border-2 border-transparent focus:border-rustic-brown rounded-2xl px-6 py-4 outline-none transition-all font-serif"
                        placeholder="Opcjonalnie"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-rustic-accent mb-2 font-bold">Miasto</label>
                  <input 
                    type="text" 
                    value={orderDetails.city}
                    onChange={(e) => setOrderDetails(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full bg-rustic-beige/30 border-2 border-transparent focus:border-rustic-brown rounded-2xl px-6 py-4 outline-none transition-all font-serif"
                    placeholder="Miejscowość..."
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-rustic-accent mb-2 font-bold">Uwagi (opcjonalnie)</label>
                  <input 
                    type="text" 
                    value={orderDetails.notes}
                    onChange={(e) => setOrderDetails(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full bg-rustic-beige/30 border-2 border-transparent focus:border-rustic-brown rounded-2xl px-6 py-4 outline-none transition-all font-serif"
                    placeholder="Dodatkowe informacje..."
                  />
                </div>

                <div className="bg-rustic-beige/20 p-6 rounded-2xl border border-rustic-brown/10">
                  <div className="flex items-center gap-3 text-rustic-dark mb-2">
                    <CheckCircle2 size={20} className="text-rustic-accent" />
                    <span className="font-serif font-bold italic">Metoda płatności</span>
                  </div>
                  <p className="text-sm text-rustic-brown font-serif">
                    Płatność odbywa się **wyłącznie przy odbiorze** zamówienia. Możesz zapłacić gotówką lub kartą u dostawcy.
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setStep('menu')}
                    disabled={isSending}
                    className="flex-1 py-4 border-2 border-rustic-brown text-rustic-brown rounded-full font-bold hover:bg-rustic-beige transition-all disabled:opacity-50"
                  >
                    Wróć do menu
                  </button>
                  <button 
                    onClick={handleFinalize}
                    disabled={
                      isSending ||
                      !orderDetails.name || 
                      !isPhoneValid || 
                      !orderDetails.street || 
                      !orderDetails.building || 
                      !orderDetails.city
                    }
                    className="flex-[2] py-4 bg-rustic-brown text-white rounded-full font-bold hover:bg-rustic-dark transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSending ? (
                      <>
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Wysyłanie...
                      </>
                    ) : (
                      `Finalizuj zamówienie (${total} zł)`
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Cart Area */}
        <div className="lg:w-1/3">
          <div className="bg-white sticky top-32 rounded-3xl shadow-xl p-8 border border-rustic-brown/5 overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
              <ShoppingCart className="text-rustic-accent" size={24} />
              <h2 className="text-xl font-serif font-bold text-rustic-dark">Twój Koszyk</h2>
            </div>

            <div className="max-h-[50vh] overflow-y-auto mb-8 pr-2 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-rustic-brown/40 italic font-serif">Twój koszyk jest pusty...</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex flex-col gap-2 border-b border-rustic-brown/5 pb-4">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif font-medium text-rustic-dark leading-tight">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-rustic-beige/50 rounded-full px-3 py-1 gap-4">
                          <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-rustic-accent">
                            <Minus size={14} />
                          </button>
                          <span className="font-bold text-sm min-w-[20px] text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-rustic-accent">
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-bold text-rustic-brown">{item.price * item.quantity} zł</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-rustic-brown/20 pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-rustic-brown uppercase tracking-widest text-xs font-bold">Łącznie</span>
                <span className="text-2xl font-serif font-bold text-rustic-dark">{total} zł</span>
              </div>
              
              {step === 'menu' && (
                <button 
                  onClick={() => setStep('details')}
                  disabled={cart.length === 0}
                  className="w-full py-4 bg-rustic-accent text-white rounded-full font-bold shadow-xl hover:bg-rustic-dark transition-all disabled:opacity-50 disabled:grayscale"
                >
                  Przejdź do dostawy
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'home' | 'order'>('home');

  if (view === 'order') {
    return <OrderSystem onBack={() => setView('home')} />;
  }

  return (
    <div className="min-h-screen bg-rustic-cream selection:bg-rustic-brown selection:text-white font-serif scroll-smooth">
      <Navbar onOrderClick={() => setView('order')} />
      <main>
        <Hero onOrderClick={() => setView('order')} />
        
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-pattern opacity-[0.03] pointer-events-none" />
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20 relative z-10">
             <div className="md:w-1/2 relative group">
                <div className="absolute inset-0 bg-rustic-beige rounded-[40px] -rotate-3 transition-transform group-hover:rotate-0" />
                <img 
                  src="https://iili.io/BZt3K9j.md.jpg" 
                  alt="Wnętrze" 
                  className="rounded-[40px] shadow-2xl relative z-10 w-full aspect-[4/5] object-cover border-4 border-white"
                />
             </div>
             <div className="md:w-1/2">
                <p className="font-cormorant italic text-rustic-brown text-2xl mb-6">Nasza Historia</p>
                <h2 className="text-5xl md:text-6xl font-serif font-bold text-rustic-dark mb-8 leading-tight">
                   Więcej niż kulinaria.<br />To nasze życie.
                </h2>
                <div className="space-y-6 text-xl text-rustic-dark/80 font-serif leading-relaxed italic">
                  <p>
                    „Dla nas każda lepiona sztuka to osobna historia. Nie uznajemy skrótów, dlatego składniki wybieramy tak, jakbyśmy robili je dla własnej rodziny.”
                  </p>
                  <p>
                    Kaszczorek to miejsce, gdzie czas płynie wolniej. Nasza pierogarnia oddaje ten klimat – jest swojsko, smacznie i zawsze z uśmiechem.
                  </p>
                </div>
                <div className="mt-12 flex gap-4">
                  <img src="https://iili.io/BZt3BtV.md.jpg" alt="Detail" className="w-32 h-32 rounded-2xl object-cover shadow-lg border-2 border-white" />
                  <img src="https://iili.io/BZt39M7.md.jpg" alt="Detail" className="w-32 h-32 rounded-2xl object-cover shadow-lg border-2 border-white" />
                </div>
             </div>
          </div>
        </section>

        <PaperMenu />
        
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
             <div className="bg-rustic-beige/50 p-12 md:p-20 rounded-[3rem] border border-rustic-brown/10 shadow-inner">
                <UtensilsCrossed className="mx-auto mb-8 text-rustic-accent" size={48} />
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-rustic-dark mb-6">Zgłodniałeś?</h2>
                <p className="text-xl text-rustic-brown mb-10 font-serif italic max-w-2xl mx-auto">
                  Zamów nasze domowe przysmaki bezpośrednio do swojego domu. Świeże, gorące i lepione z pasją.
                </p>
                <button 
                  onClick={() => setView('order')}
                  className="px-12 py-6 bg-rustic-accent text-white rounded-full font-bold text-xl shadow-2xl hover:bg-rustic-dark transition-all flex items-center gap-4 mx-auto group"
                >
                  <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
                  Przejdź do zamawiania
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </button>
             </div>
          </div>
        </section>

        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}


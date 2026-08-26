import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Menu, X, Phone, Sparkles } from 'lucide-react';
import { FACEBOOK_URL } from '../data';

interface NavbarProps {
  isScrolled: boolean;
}

export function Navbar({ isScrolled }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinks = [
    { name: 'Nasze Sale', href: '#lokale' },
    { name: 'Menu & Pakiety', href: '#oferta' },
    { name: 'Wideo & Dron', href: '#wideo' },
    { name: 'Galeria Wnętrz', href: '#galeria' },
    { name: 'Kontakt', href: '#kontakt' },
  ];

  const scrollToTarget = (href: string) => {
    if (href === '#' || href === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const navOffset = window.innerWidth < 1024 ? 65 : 75;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, elementPosition - navOffset);

      // Scroll with smooth behavior
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Fallback for native scrollIntoView
      try {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch {
        // Fallback already handled by window.scrollTo
      }

      if (window.location.hash !== href) {
        window.history.pushState(null, '', href);
      }
    }
  };

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // Initial immediate scroll trigger
    scrollToTarget(href);

    // Secondary delayed trigger to compensate for mobile drawer closing animation & layout shifts
    setTimeout(() => {
      scrollToTarget(href);
    }, 120);

    setTimeout(() => {
      scrollToTarget(href);
    }, 320);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-gray-100' 
        : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => handleNavClick(e, '#')}
          className="flex items-center gap-3 group"
        >
          <div className="flex flex-col">
            <span className={`font-serif text-lg md:text-xl font-bold tracking-tight leading-none transition-colors ${
              isScrolled ? 'text-gray-900 group-hover:text-gold-dark' : 'text-white'
            }`}>
              Piwnica pod Żabą <span className="text-gold">&</span> Hit Fit
            </span>
            <span className={`text-[10px] tracking-widest uppercase mt-1 font-semibold ${
              isScrolled ? 'text-gray-500' : 'text-white/80'
            }`}>
              Sale Bankietowe Lubin
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              className={`relative font-semibold text-xs uppercase tracking-wider py-1.5 transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-gold-dark' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.name}
              {hoveredLink === link.name && (
                <motion.span
                  layoutId="navHoverUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-gold rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </a>
          ))}

          {/* Facebook Link */}
          <motion.a 
            href={FACEBOOK_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 6 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2.5 rounded-full border transition-all ${
              isScrolled 
                ? 'border-gray-200 text-blue-600 hover:bg-blue-50' 
                : 'border-white/30 text-white hover:bg-white/10'
            }`}
            title="Odwiedź nasz profil na Facebooku"
          >
            <Facebook size={17} />
          </motion.a>

          {/* Booking CTA Button */}
          <motion.a 
            href="#kontakt" 
            onClick={(e) => handleNavClick(e, '#kontakt')}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-amber-600 via-gold to-yellow-600 hover:from-amber-500 hover:to-gold text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-gold/30 border border-white/20 cursor-pointer"
          >
            Rezerwacja
          </motion.a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <motion.a 
            href="tel:661637770"
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gold text-white shadow-sm mr-1"
            title="Zadzwoń"
          >
            <Phone size={18} />
          </motion.a>

          <button 
            className={`p-2 rounded-xl transition-colors ${
              isScrolled ? 'text-gray-900 bg-gray-100' : 'text-white bg-white/10'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white shadow-2xl border-b border-gray-100 lg:hidden overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-base font-serif font-bold text-gray-800 hover:text-gold-dark transition-colors py-2.5 border-b border-gray-50 flex items-center justify-between cursor-pointer"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <span>{link.name}</span>
                  <span className="text-gold text-xs font-sans">→</span>
                </a>
              ))}
              
              <div className="flex items-center justify-between pt-3 mt-1">
                <a 
                  href={FACEBOOK_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider"
                >
                  <Facebook size={16} /> Facebook
                </a>
                
                <a 
                  href="#kontakt" 
                  className="bg-gradient-to-r from-amber-600 to-gold text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
                  onClick={(e) => handleNavClick(e, '#kontakt')}
                >
                  Skontaktuj się
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ArrowUp, MessageCircle } from 'lucide-react';

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Quick Phone Call Button */}
      <motion.a
        href="tel:661637770"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="pointer-events-auto relative group flex items-center gap-3 bg-stone-900 hover:bg-amber-700 text-white pl-4 pr-5 py-3 rounded-full shadow-xl border border-gold/40 transition-colors duration-200"
        title="Zadzwoń: 661 637 770"
      >
        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold-light group-hover:text-white transition-colors">
          <Phone size={16} />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase font-bold tracking-wider text-stone-300 leading-none">Zadzwoń do nas</span>
          <span className="font-serif font-bold text-sm leading-tight text-white">661 637 770</span>
        </div>
      </motion.a>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="pointer-events-auto p-3.5 rounded-full bg-gray-900/90 hover:bg-gold text-white shadow-xl backdrop-blur-md border border-white/20 transition-colors"
            aria-label="Przewiń do góry"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

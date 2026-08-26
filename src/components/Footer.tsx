import { MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Facebook, ChevronRight, Heart } from 'lucide-react';
import { FACEBOOK_URL } from '../data';

export function Footer() {
  const scrollTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navOffset = window.innerWidth < 1024 ? 65 : 75;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <footer className="bg-gray-950 text-white py-16 border-t border-gray-800 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-12 mb-12"
        >
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Piwnica pod Żabą <span className="text-gold">&</span> Hit Fit
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-light">
              Dwa unikalne lokale bankietowe w Lubinie na przyjęcia okolicznościowe, wesela, chrzciny, komunie oraz imprezy firmowe.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-4 text-gold-light font-bold">Nasze Lokale & Oferta</h4>
            <ul className="space-y-2.5 text-sm text-gray-400 font-medium">
              <li>
                <a 
                  href="#hit-fit" 
                  onClick={(e) => scrollTo(e, 'hit-fit')}
                  className="hover:text-gold-light transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ChevronRight size={14} className="text-gold" /> Sala Bankietowa Hit Fit (do 90 osób)
                </a>
              </li>
              <li>
                <a 
                  href="#piwnica-pod-zaba" 
                  onClick={(e) => scrollTo(e, 'piwnica-pod-zaba')}
                  className="hover:text-gold-light transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ChevronRight size={14} className="text-gold" /> Sala Bankietowa Piwnica pod Żabą
                </a>
              </li>
              <li>
                <a 
                  href="#oferta" 
                  onClick={(e) => scrollTo(e, 'oferta')}
                  className="hover:text-gold-light transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ChevronRight size={14} className="text-gold" /> Menu okolicznościowe & Dania gorące
                </a>
              </li>
              <li>
                <a 
                  href="#galeria" 
                  onClick={(e) => scrollTo(e, 'galeria')}
                  className="hover:text-gold-light transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ChevronRight size={14} className="text-gold" /> Galeria Zdjęć (Hit Fit & Piwnica)
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-4 text-gold-light font-bold">Kontakt & Adresy</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-medium">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold shrink-0">
                  <Phone size={16} />
                </div>
                <a href="tel:661637770" className="hover:text-white font-bold text-white transition-colors">661 637 770</a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold shrink-0">
                  <Mail size={16} />
                </div>
                <a href="mailto:pod.zaba39a@gmail.com" className="hover:text-white transition-colors">pod.zaba39a@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-900/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="text-white font-semibold block text-xs">Hit Fit:</span>
                  <span>Konstytucji 3 Maja 3, 59-300 Lubin</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center text-gold shrink-0 mt-0.5">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="text-white font-semibold block text-xs">Piwnica pod Żabą:</span>
                  <span>Orla 39a, 59-300 Lubin</span>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>
        
        <div className="pt-8 border-t border-gray-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Piwnica pod Żabą & Hit Fit Lubin. Wszelkie prawa zastrzeżone.</p>
          <div className="flex items-center gap-4">
            <a 
              href={FACEBOOK_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              <Facebook size={16} /> Profil na Facebooku
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

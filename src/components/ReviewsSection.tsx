import { motion } from 'motion/react';
import { Facebook, Quote, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FACEBOOK_REVIEWS, FACEBOOK_REVIEWS_URL } from '../data';

export function ReviewsSection() {
  return (
    <section id="opinie" className="py-20 md:py-24 bg-stone-900 text-white relative overflow-hidden scroll-mt-20">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-amber-200 border border-white/10">
            <Facebook size={14} className="text-blue-400 fill-blue-400" /> Autentyczne Recenzje
          </div>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">
            Opinie Naszych Gości z Facebooka
          </h3>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-light">
            Recenzje z profilu społecznościowego Hit Fit i Piwnica pod Żabą w Lubinie.
          </p>
        </motion.div>

        {/* Facebook Reviews Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {FACEBOOK_REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-stone-800/80 border border-stone-700/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-lg text-left"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] text-stone-300 bg-white/10 px-2.5 py-0.5 rounded-full font-medium">
                    <Facebook size={11} className="text-blue-400 fill-blue-400" /> Facebook
                  </span>
                </div>
                
                <Quote size={22} className="text-amber-500/40" />
                
                <p className="text-stone-200 text-sm sm:text-base font-serif leading-relaxed italic">
                  „{review.text}”
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-stone-700/80 flex items-center justify-between text-xs text-stone-400">
                <span className="font-semibold text-white">{review.author}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={12} /> Poleca lokal
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center pt-2">
          <a 
            href={FACEBOOK_REVIEWS_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-white hover:bg-stone-100 text-stone-950 px-8 py-3.5 rounded-full font-bold shadow-lg text-xs sm:text-sm uppercase tracking-wider transition-all"
          >
            <span>Zobacz Profil i Opinie na Facebooku</span>
            <Facebook size={16} className="text-blue-600 fill-blue-600" />
          </a>
        </div>
      </div>
    </section>
  );
}

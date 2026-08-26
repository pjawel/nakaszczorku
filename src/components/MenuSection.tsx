import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChefHat, Coffee, Wine, Sparkles, CheckCircle2, Search, HeartHandshake,
  FileText, Download, LayoutGrid, UtensilsCrossed, Phone, Baby, PartyPopper,
  Users, Calendar, ChevronRight, X, Info, Utensils, ShieldCheck
} from 'lucide-react';
import { 
  MENU_WELCOME_TITLE, MENU_WELCOME_TEXT, MENU_WELCOME_SUBTEXT, MENU_CATEGORIES,
  MENU_DOCUMENT_PAGES, EVENT_MENU_PACKAGES, OCCASION_FILTERS, EventMenuPackage
} from '../data';
import { downloadMenuPdf } from '../utils/generateMenuPdf';

export function MenuSection() {
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [activeMenuCategory, setActiveMenuCategory] = useState<string>('obiad');
  const [menuSearchQuery, setMenuSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'packages' | 'interactive' | 'document'>('packages');
  const [docCurrentPage, setDocCurrentPage] = useState<number>(1);

  // Filter packages based on selected occasion
  const filteredPackages = useMemo(() => {
    if (selectedOccasion === 'all') return EVENT_MENU_PACKAGES;
    return EVENT_MENU_PACKAGES.filter((pkg) => 
      pkg.eventTypes.includes(selectedOccasion)
    );
  }, [selectedOccasion]);

  const activeDocPage = MENU_DOCUMENT_PAGES.find(p => p.pageNumber === docCurrentPage) || MENU_DOCUMENT_PAGES[0];

  return (
    <section id="oferta" className="py-20 md:py-28 bg-stone-50/80 scroll-mt-20 relative overflow-hidden border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16 relative z-10">
        
        {/* 1. Header with clean typography */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-widest">
            <ChefHat size={15} /> Bogata Kuchnia i Pakiety
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">
            Menu na Każdą Uroczystość
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light max-w-2xl mx-auto">
            Wybierz rodzaj uroczystości, aby zobaczyć rekomendowany zestaw dań, lub skomponuj własne menu z pełnej karty bankietowej.
          </p>
        </div>

        {/* 2. Welcome Message from Hosts - Clean & Warm */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-amber-500/20">
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-200 border border-white/10">
              <HeartHandshake size={13} /> {MENU_WELCOME_TITLE}
            </div>
            <p className="text-base sm:text-xl font-serif leading-relaxed text-amber-50/90 italic">
              „{MENU_WELCOME_TEXT}”
            </p>
            <p className="text-xs sm:text-sm text-stone-300 font-light">
              {MENU_WELCOME_SUBTEXT}
            </p>
          </div>
        </div>

        {/* 3. Occasion Quick Navigator (Wybierz Uroczystość) */}
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-xs uppercase tracking-widest font-bold text-amber-800">
              Krok 1: Wybierz rodzaj swojej imprezy
            </h3>
            <p className="text-stone-500 text-xs sm:text-sm font-light">
              Filtruj gotowe zestawy dopasowane do charakteru Twojego spotkania
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 max-w-5xl mx-auto">
            {OCCASION_FILTERS.map((occ) => {
              const isSelected = selectedOccasion === occ.id && viewMode === 'packages';
              return (
                <button
                  key={occ.id}
                  type="button"
                  onClick={() => {
                    setSelectedOccasion(occ.id);
                    setViewMode('packages');
                  }}
                  className={`px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-800 text-white border-amber-800 shadow-md scale-102'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200 shadow-xs'
                  }`}
                >
                  {occ.id === 'all' && <Sparkles size={16} className={isSelected ? 'text-amber-200' : 'text-amber-700'} />}
                  {occ.id === 'wesela' && <HeartHandshake size={16} className={isSelected ? 'text-amber-200' : 'text-amber-700'} />}
                  {occ.id === 'chrzciny' && <Baby size={16} className={isSelected ? 'text-rose-200' : 'text-rose-600'} />}
                  {occ.id === 'urodziny' && <PartyPopper size={16} className={isSelected ? 'text-amber-200' : 'text-amber-700'} />}
                  {occ.id === 'firmowe' && <ChefHat size={16} className={isSelected ? 'text-emerald-200' : 'text-emerald-700'} />}
                  <span>{occ.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Three View Modes (Gotowe Zestawy, Pełna Karta Dań, Dokument PDF) */}
        <div id="menu-view-container" className="pt-2">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-stone-200/90 rounded-2xl max-w-md mx-auto mb-8 border border-stone-300">
            <button
              type="button"
              onClick={() => setViewMode('packages')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                viewMode === 'packages'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <UtensilsCrossed size={15} />
              <span>Zestawy ({filteredPackages.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('interactive')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                viewMode === 'interactive'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <LayoutGrid size={15} />
              <span>Katalog Dań</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('document')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                viewMode === 'document'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <FileText size={15} />
              <span>Karta PDF</span>
            </button>
          </div>
        </div>

        {/* Key Included Perks Bar */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-stone-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200/60">
              <Coffee size={20} />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Napoje bez limitu</h4>
              <p className="text-stone-500 text-xs">Kawa, herbata, woda i soki w cenie</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-xs border border-stone-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200/60">
              <Wine size={20} />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Własny alkohol</h4>
              <p className="text-stone-500 text-xs">Brak opłaty korkowej w lokalu</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-xs border border-stone-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200/60">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Pełna elastyczność</h4>
              <p className="text-stone-500 text-xs">Dowolna zamiana dań w zestawie</p>
            </div>
          </div>
        </div>

        {/* VIEW MODE 1: Event Packages (Clear, Spacious & Informative) */}
        {viewMode === 'packages' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {filteredPackages.map((pkg, idx) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`bg-white rounded-3xl p-6 sm:p-8 shadow-md border transition-all flex flex-col justify-between ${
                    pkg.id === 'chrzciny-menu'
                      ? 'border-rose-300 ring-1 ring-rose-200/60'
                      : 'border-stone-200 hover:border-amber-400'
                  }`}
                >
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b border-stone-100 pb-4 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                          pkg.highlightColor === 'rose'
                            ? 'bg-rose-100 text-rose-900'
                            : pkg.highlightColor === 'emerald'
                            ? 'bg-emerald-100 text-emerald-900'
                            : pkg.highlightColor === 'blue'
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-amber-100 text-amber-950'
                        }`}>
                          {pkg.badge}
                        </span>

                        <span className="text-xs text-stone-500 font-medium">
                          {pkg.venue}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-serif font-bold text-2xl text-stone-900">
                          {pkg.title}
                        </h3>
                        <p className="text-sm font-semibold text-amber-800 mt-0.5">
                          {pkg.subtitle}
                        </p>
                      </div>

                      {/* Recommended For Banner */}
                      <div className="bg-stone-50 rounded-xl p-3 text-xs text-stone-700 space-y-1 border border-stone-200/80">
                        <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-emerald-700" />
                          <span>Rekomendowane na:</span>
                        </div>
                        <p className="text-stone-600 pl-4">{pkg.recommendedFor}</p>
                        <p className="text-stone-500 text-[11px] pl-4 italic">{pkg.capacityText}</p>
                      </div>
                    </div>

                    {/* Dishes Breakdown */}
                    <div className="space-y-4">
                      {pkg.courses.map((course, cIdx) => (
                        <div key={cIdx} className="space-y-1.5">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-700 inline-block" />
                            {course.category}:
                          </h4>
                          <ul className="space-y-1.5 pl-2 border-l-2 border-amber-100">
                            {course.items.map((item, iIdx) => (
                              <li key={iIdx} className="text-xs sm:text-sm text-stone-800 font-medium flex items-start gap-2">
                                <CheckCircle2 size={14} className="text-amber-700 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      {/* Beverages */}
                      <div className="space-y-1.5 pt-2 border-t border-stone-100">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                          <Coffee size={13} className="text-amber-700" />
                          Napoje w cenie:
                        </h4>
                        <div className="bg-amber-50/70 rounded-xl p-3 text-xs text-stone-800 space-y-1 font-medium border border-amber-100">
                          {pkg.beverages.map((bev, bIdx) => (
                            <p key={bIdx}>• {bev}</p>
                          ))}
                          {pkg.alcohol && (
                            <p className="text-amber-900 font-semibold pt-1 border-t border-amber-200 mt-1">
                              🍸 {pkg.alcohol}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 pt-4 border-t border-stone-100 space-y-3">
                    <p className="text-xs text-stone-500 italic leading-relaxed">
                      💡 {pkg.note}
                    </p>

                    <div className="flex items-center gap-2 pt-2">
                      <a
                        href="tel:661637770"
                        className="flex-1 py-3 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <Phone size={14} className="text-gold" />
                        <span>Zapytaj o termin: 661 637 770</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setDocCurrentPage(5);
                          setViewMode('document');
                          const el = document.getElementById('menu-view-container');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="py-3 px-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition-all border border-stone-300 flex items-center gap-1"
                        title="Zobacz w Karcie Menu PDF"
                      >
                        <FileText size={14} />
                        <span>Karta PDF</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW MODE 2: Interactive Category Explorer (A la carte) */}
        {viewMode === 'interactive' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-stone-200 pb-4">
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {MENU_CATEGORIES.map((cat) => {
                  const isActive = activeMenuCategory === cat.id && !menuSearchQuery;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setActiveMenuCategory(cat.id);
                        setMenuSearchQuery('');
                      }}
                      className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-amber-800 text-white shadow-sm'
                          : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                      }`}
                    >
                      <span>{cat.title}</span>
                      {cat.badge && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider ${
                          isActive ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900'
                        }`}>
                          {cat.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Szukaj dania (np. schab, barszcz)..."
                  value={menuSearchQuery}
                  onChange={(e) => setMenuSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 bg-white"
                />
                {menuSearchQuery && (
                  <button 
                    onClick={() => setMenuSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Render Category Items */}
            {MENU_CATEGORIES.filter(c => !menuSearchQuery ? c.id === activeMenuCategory : true).map((cat) => (
              <div key={cat.id} className="space-y-6">
                {cat.note && (
                  <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 text-amber-900 text-xs sm:text-sm font-medium flex items-center gap-2">
                    <Info size={16} className="shrink-0 text-amber-700" />
                    <span>{cat.note}</span>
                  </div>
                )}

                {cat.subsections ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {cat.subsections.map((sub, sIdx) => {
                      const filteredItems = menuSearchQuery
                        ? sub.items.filter(item => item.toLowerCase().includes(menuSearchQuery.toLowerCase()))
                        : sub.items;

                      if (menuSearchQuery && filteredItems.length === 0) return null;

                      return (
                        <div key={sIdx} className="bg-white rounded-2xl p-6 shadow-xs border border-stone-200 space-y-4">
                          <div>
                            <h4 className="font-serif font-bold text-lg text-stone-900">
                              {sub.subtitle}
                            </h4>
                            {sub.note && (
                              <p className="text-xs text-amber-800 font-semibold">{sub.note}</p>
                            )}
                          </div>

                          <ul className="space-y-2">
                            {filteredItems.map((item, iIdx) => (
                              <li key={iIdx} className="text-xs sm:text-sm text-stone-700 flex items-start gap-2">
                                <CheckCircle2 size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                ) : cat.items ? (
                  <div className="bg-white rounded-2xl p-6 shadow-xs border border-stone-200">
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {cat.items
                        .filter(item => !menuSearchQuery || item.toLowerCase().includes(menuSearchQuery.toLowerCase()))
                        .map((item, iIdx) => (
                          <li key={iIdx} className="text-xs sm:text-sm text-stone-700 flex items-start gap-2 p-2 rounded-xl bg-stone-50 border border-stone-100">
                            <CheckCircle2 size={14} className="text-amber-700 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}

        {/* VIEW MODE 3: Full PDF Document Viewer with Page Switching */}
        {viewMode === 'document' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Strona {docCurrentPage} z {MENU_DOCUMENT_PAGES.length}:
                </span>
                <span className="text-xs sm:text-sm font-serif font-bold text-amber-900">
                  {activeDocPage.title}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1">
                  {MENU_DOCUMENT_PAGES.map((p) => (
                    <button
                      key={p.pageNumber}
                      type="button"
                      onClick={() => setDocCurrentPage(p.pageNumber)}
                      className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        docCurrentPage === p.pageNumber
                          ? 'bg-amber-800 text-white shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                      title={`Strona ${p.pageNumber}`}
                    >
                      {p.pageNumber}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={downloadMenuPdf}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs transition-all shadow-xs cursor-pointer active:scale-95 ml-1"
                  title="Pobierz pełną Kartę Menu w formacie PDF"
                >
                  <Download size={13} />
                  <span>Pobierz PDF</span>
                </button>
              </div>
            </div>

            {/* Rendered Document Page */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6">
              <div className="border-b border-stone-200 pb-4 text-center space-y-1">
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-widest">
                  Karta Menu • Sala Hit Fit & Piwnica pod Żabą
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  {activeDocPage.title}
                </h3>
              </div>

              {activeDocPage.content.greeting && (
                <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80 space-y-2 text-stone-800 text-xs sm:text-sm">
                  <h4 className="font-serif font-bold text-base text-stone-900">{activeDocPage.content.greeting}</h4>
                  <p className="italic">{activeDocPage.content.intro}</p>
                </div>
              )}

              {activeDocPage.content.sections && (
                <div className="grid sm:grid-cols-2 gap-6">
                  {activeDocPage.content.sections.map((sec, sIdx) => (
                    <div key={sIdx} className="space-y-2 bg-stone-50/50 p-4 rounded-2xl border border-stone-100">
                      <h4 className="font-serif font-bold text-base text-stone-900 border-b border-amber-200 pb-1">
                        {sec.heading}
                      </h4>
                      {sec.note && (
                        <p className="text-xs text-amber-800 font-semibold">{sec.note}</p>
                      )}
                      {'text' in sec && sec.text && (
                        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">{sec.text}</p>
                      )}
                      {'items' in sec && sec.items && (
                        <ul className="space-y-1 pl-2">
                          {sec.items.map((item, iIdx) => (
                            <li key={iIdx} className="text-xs sm:text-sm text-stone-700 flex items-start gap-2">
                              <span className="text-amber-700">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
                <span>Zadzwoń, aby ustalić szczegóły: <strong className="text-stone-900 font-bold">661 637 770</strong></span>
                <button
                  type="button"
                  onClick={downloadMenuPdf}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow cursor-pointer active:scale-95"
                  title="Pobierz pełną Kartę Menu w formacie PDF"
                >
                  <Download size={15} />
                  <span>Pobierz PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

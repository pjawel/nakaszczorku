import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VenuesSection } from './components/VenuesSection';
import { MenuSection } from './components/MenuSection';
import { VideoSection } from './components/VideoSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { HIT_FIT_IMAGES, PIWNICA_IMAGES } from './data';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState<'all' | 'hit-fit' | 'piwnica'>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenGalleryTab = (tab: 'all' | 'hit-fit' | 'piwnica') => {
    setActiveGalleryTab(tab);
    const element = document.getElementById('galeria');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenImage = (imageSrc: string, venue: 'hit-fit' | 'piwnica') => {
    setActiveGalleryTab(venue);
    const imagesList = venue === 'hit-fit' ? HIT_FIT_IMAGES : PIWNICA_IMAGES;
    const idx = imagesList.indexOf(imageSrc);
    setSelectedImageIndex(idx >= 0 ? idx : 0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-off-white text-gray-900 font-sans antialiased selection:bg-gold selection:text-white">
      {/* Navigation */}
      <Navbar isScrolled={isScrolled} />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section with Drone Video */}
        <Hero />

        {/* 2. Venues Detailed Showcase */}
        <VenuesSection 
          onOpenGalleryTab={handleOpenGalleryTab}
          onOpenImage={handleOpenImage}
        />

        {/* 3. Menu & Bankiet Offer */}
        <MenuSection />

        {/* 4. Video Showcase & Drone Tours */}
        <VideoSection />

        {/* 5. Full Photo Gallery & Lightbox */}
        <GallerySection 
          activeTab={activeGalleryTab}
          setActiveTab={setActiveGalleryTab}
          selectedImageIndex={selectedImageIndex}
          setSelectedImageIndex={setSelectedImageIndex}
        />

        {/* 6. Verified Facebook Customer Reviews */}
        <ReviewsSection />

        {/* 7. Contact, Reservation & Map */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons: Quick Dial & Scroll-to-top */}
      <FloatingActions />
    </div>
  );
}

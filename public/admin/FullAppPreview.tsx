import React from 'react';
// Importujesz Twój główny komponent App
import App from '../App';

interface FullAppPreviewProps {
  entry: {
    getIn: (path: string[]) => any;
  };
}

export const FullAppPreview: React.FC<FullAppPreviewProps> = ({ entry }) => {
  // 1. Pobierasz dane z pól w CMS
  const rawImages = entry.getIn(['data', 'menu_images']);
  const title = entry.getIn(['data', 'title']);
  const subtitle = entry.getIn(['data', 'subtitle']);

  // 2. Konwertujesz dane Decap (Immutable.js) do zwykłej tablicy
  const formattedImages: any[] = rawImages ? rawImages.toJS() : [];

  // 3. Normalizujesz ścieżki do zdjęć (obsługuje stringi oraz obiekty { image: "..." })
  const menuImages = formattedImages
    .map((item) => {
      if (typeof item === 'object' && item !== null) {
        return item.image || item.url || '';
      }
      if (typeof item === 'string') {
        return item;
      }
      return '';
    })
    .filter(Boolean);

  // 4. Tworzysz obiekt konfiguracyjny dokładnie w takim kształcie, jakiego oczekuje App
  const cmsConfig = {
    title,
    subtitle,
    menu_images: menuImages,
  };

  // 5. Renderujesz CAŁĄ aplikację App.tsx przekazując do niej podglądowe dane
  return (
    <div className="cms-preview-wrapper" style={{ width: '100%', minHeight: '100vh' }}>
      <App cmsData={cmsConfig} />
    </div>
  );
};

export default FullAppPreview;

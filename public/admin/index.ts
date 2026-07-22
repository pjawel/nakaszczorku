import React from 'react';
import CMS from 'decap-cms-app'; // lub 'netlify-cms-app'
import App from './App';

// Importuj swoje style (Tailwind / CSS), aby wczytały się do ramki podglądu
import './index.css'; 

const MenuPreview = ({ entry }) => {
  // 1. Pobieramy dane z wpisu CMS i konwertujemy z Immutable.js na zwykły obiekt JS
  const entryData = entry.getIn(['data']);
  const data = entryData ? entryData.toJS() : {};

  // 2. Owijamy w kontener z jawną wysokością (częsty problem w iframe Decap CMS)
  return (
    <div className="w-full min-h-screen bg-rustic-cream">
      <App cmsData={data} />
    </div>
  );
};

// Rejestrujemy szablon podglądu dla kolekcji/pliku 'menu'
CMS.registerPreviewTemplate('menu', MenuPreview);

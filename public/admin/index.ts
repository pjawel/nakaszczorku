import CMS from 'decap-cms-app';
import FullAppPreview from './FullAppPreview';

// 1. Inicjalizacja Decap CMS
CMS.init();

// 2. Wstrzyknięcie Twoich stylów CSS do ramki iFrame podglądu
// Podmien /src/index.css na ścieżkę do Twojego głównego pliku ze stylami/Tailwindem
CMS.registerPreviewStyle('/src/index.css'); 

// 3. Rejestracja podglądu całej aplikacji dla kolekcji 'menu'
CMS.registerPreviewTemplate('menu', FullAppPreview);

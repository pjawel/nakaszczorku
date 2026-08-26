import { jsPDF } from 'jspdf';
import { MENU_DOCUMENT_PAGES, EVENT_MENU_PACKAGES, HIT_FIT_ADDRESS, PIWNICA_ADDRESS, CONTACT_PHONE, CONTACT_PHONE_FORMATTED } from '../data';

/**
 * Strips or converts Polish diacritics for basic PDF font compatibility
 * ensuring clean rendering without broken glyphs.
 */
function cleanText(str: string): string {
  if (!str) return '';
  return str
    .replace(/ą/g, 'a').replace(/Ą/g, 'A')
    .replace(/ć/g, 'c').replace(/Ć/g, 'C')
    .replace(/ę/g, 'e').replace(/Ę/g, 'E')
    .replace(/ł/g, 'l').replace(/Ł/g, 'L')
    .replace(/ń/g, 'n').replace(/Ń/g, 'N')
    .replace(/ó/g, 'o').replace(/Ó/g, 'O')
    .replace(/ś/g, 's').replace(/Ś/g, 'S')
    .replace(/ź/g, 'z').replace(/Ź/g, 'Z')
    .replace(/ż/g, 'z').replace(/Ż/g, 'Z')
    .replace(/„/g, '"').replace(/”/g, '"')
    .replace(/•/g, '-');
}

export function downloadMenuPdf(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  let cursorY = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (cursorY + neededHeight > pageHeight - 20) {
      addFooter();
      doc.addPage();
      cursorY = margin + 10;
      addHeader();
    }
  };

  const addHeader = () => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(140, 100, 40);
    doc.text(cleanText('KARTA MENU I OFERTA BANKIETOWA - LOKALE HIT FIT & PIWNICA POD ZABA (LUBIN)'), margin, 10);
    doc.setDrawColor(220, 200, 160);
    doc.setLineWidth(0.3);
    doc.line(margin, 12, pageWidth - margin, 12);
  };

  const addFooter = () => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.setDrawColor(220, 200, 160);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
    doc.text(cleanText(`Rezerwacje: ${CONTACT_PHONE_FORMATTED} | www.hitfitlubin.pl`), margin, pageHeight - 8);
    const pageStr = `Strona ${doc.getNumberOfPages()}`;
    doc.text(pageStr, pageWidth - margin - 15, pageHeight - 8);
  };

  // --- COVER / HEADER ---
  // Top decorative box
  doc.setFillColor(35, 30, 25);
  doc.roundedRect(margin, cursorY, contentWidth, 38, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(245, 210, 130);
  doc.text(cleanText('KARTA MENU I OFERTA PRZYJEC'), margin + 6, cursorY + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(cleanText('Sala Bankietowa Hit Fit (do 90 os.) & Piwnica pod Zaba (do 40 os.) w Lubinie'), margin + 6, cursorY + 20);

  doc.setFontSize(8);
  doc.setTextColor(200, 200, 200);
  doc.text(cleanText(`Adresy: ${HIT_FIT_ADDRESS} | ${PIWNICA_ADDRESS}`), margin + 6, cursorY + 27);
  doc.text(cleanText(`Kontakt telefoniczny: ${CONTACT_PHONE_FORMATTED} (Piotr Jaworski)`), margin + 6, cursorY + 33);

  cursorY += 45;

  // --- WELCOME TEXT ---
  doc.setFillColor(250, 246, 240);
  doc.setDrawColor(230, 215, 185);
  doc.roundedRect(margin, cursorY, contentWidth, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(140, 70, 20);
  doc.text(cleanText('Drodzy Goscie!'), margin + 4, cursorY + 6);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(60, 60, 60);
  const introLines = doc.splitTextToSize(
    cleanText('Dolozymy wszelkich staran pod wzgledem jakosci, starannosci, dobrych produktow, oprawy stolu i milej fachowej obslugi, aby Wasze przyjecie bylo niezapomniana, smaczna uroczystoscia.'),
    contentWidth - 8
  );
  doc.text(introLines, margin + 4, cursorY + 12);

  cursorY += 30;

  // --- SECTION: GOTOWE PAKIETY OKOLICZNOSCIOWE ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 30, 30);
  doc.text(cleanText('1. Gotowe Zestawy Menu na Przyjecia'), margin, cursorY);
  cursorY += 6;

  EVENT_MENU_PACKAGES.forEach((pkg) => {
    checkPageBreak(50);

    doc.setFillColor(245, 245, 245);
    doc.setDrawColor(210, 210, 210);
    doc.roundedRect(margin, cursorY, contentWidth, 7, 1, 1, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(120, 60, 15);
    doc.text(cleanText(`${pkg.title.toUpperCase()} (${pkg.badge})`), margin + 3, cursorY + 5);

    cursorY += 10;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(cleanText(`Rekomendacja: ${pkg.recommendedFor} | ${pkg.venue}`), margin + 2, cursorY);
    cursorY += 5;

    pkg.courses.forEach((course) => {
      checkPageBreak(15);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(50, 50, 50);
      doc.text(cleanText(`- ${course.category}:`), margin + 2, cursorY);
      cursorY += 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(70, 70, 70);
      const itemsStr = course.items.join(', ');
      const splitItems = doc.splitTextToSize(cleanText(itemsStr), contentWidth - 8);
      doc.text(splitItems, margin + 6, cursorY);
      cursorY += splitItems.length * 3.8 + 2;
    });

    // Beverages & Notes
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 80, 40);
    doc.text(cleanText(`Napoje w cenie: ${pkg.beverages.join(' | ')}`), margin + 2, cursorY);
    cursorY += 4;
    if (pkg.alcohol) {
      doc.text(cleanText(`Alkohol: ${pkg.alcohol}`), margin + 2, cursorY);
      cursorY += 4;
    }
    cursorY += 4;
  });

  // --- SECTION: PELNA KARTA DAN (OBIADY, PRZEKASKI, KOLACJE) ---
  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 30, 30);
  doc.text(cleanText('2. Pelna Karta Dan i Dodatkow (Do Dowolnej Kompozycji)'), margin, cursorY);
  cursorY += 7;

  MENU_DOCUMENT_PAGES.forEach((page) => {
    if (page.pageNumber === 5) return; // already covered in packages above

    checkPageBreak(25);
    doc.setFillColor(235, 235, 235);
    doc.roundedRect(margin, cursorY, contentWidth, 6, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    doc.text(cleanText(page.title.toUpperCase()), margin + 3, cursorY + 4.5);
    cursorY += 9;

    if (page.content.sections) {
      page.content.sections.forEach((sec) => {
        checkPageBreak(18);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(140, 70, 20);
        doc.text(cleanText(`> ${sec.heading}`), margin + 2, cursorY);
        cursorY += 4.5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(60, 60, 60);

        if ('text' in sec && sec.text) {
          const lines = doc.splitTextToSize(cleanText(sec.text), contentWidth - 4);
          doc.text(lines, margin + 4, cursorY);
          cursorY += lines.length * 3.8 + 2;
        }

        if ('items' in sec && sec.items) {
          sec.items.forEach((item) => {
            checkPageBreak(8);
            const itemLines = doc.splitTextToSize(cleanText(`- ${item}`), contentWidth - 6);
            doc.text(itemLines, margin + 4, cursorY);
            cursorY += itemLines.length * 3.8;
          });
          cursorY += 2;
        }

        if (sec.note) {
          doc.setFont('helvetica', 'italic');
          doc.setFontSize(7.5);
          doc.setTextColor(120, 100, 50);
          doc.text(cleanText(`* Uwaga: ${sec.note}`), margin + 4, cursorY);
          cursorY += 4;
        }
      });
    }
  });

  // --- SECTION: WARUNKI ORGANIZACYJNE ---
  checkPageBreak(35);
  doc.setFillColor(250, 245, 235);
  doc.setDrawColor(210, 180, 130);
  doc.roundedRect(margin, cursorY, contentWidth, 32, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(130, 60, 10);
  doc.text(cleanText('WARUNKI ORGANIZACYJNE I REZERWACJA'), margin + 4, cursorY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(60, 60, 60);
  const terms = [
    '• Alkohol powyzej 18% mozna przyniesc wlasny bez zadnych oplat korkowego (przy zakupie 10 szt. Coca-Cola 1L w lokalu).',
    '• Kawa z ekspresu, herbata, woda z cytryna oraz soki owocowe bez ograniczen przez caly czas trwania przyjecia.',
    '• Kazde menu mozna modyfikowac i dopasowywac do indywidualnych preferencji gosci.',
    `• Rezerwacja terminow: ${CONTACT_PHONE_FORMATTED} (Piotr Jaworski), ${HIT_FIT_ADDRESS} / ${PIWNICA_ADDRESS}`
  ];

  let termY = cursorY + 11;
  terms.forEach((t) => {
    doc.text(cleanText(t), margin + 4, termY);
    termY += 4.5;
  });

  // Add headers and footers to all generated pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    // Page Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(140, 100, 40);
    doc.text(cleanText('KARTA MENU - SALA HIT FIT & PIWNICA POD ZABA (LUBIN)'), margin, 8);
    doc.setDrawColor(230, 215, 185);
    doc.setLineWidth(0.2);
    doc.line(margin, 10, pageWidth - margin, 10);

    // Page Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 120, 120);
    doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);
    doc.text(cleanText(`Rezerwacja terminow: ${CONTACT_PHONE_FORMATTED} | www.hitfitlubin.pl`), margin, pageHeight - 6);
    doc.text(`Strona ${i} z ${totalPages}`, pageWidth - margin - 18, pageHeight - 6);
  }

  // Trigger download
  doc.save('Karta_Menu_Hit_Fit_Piwnica_Lubin.pdf');
}

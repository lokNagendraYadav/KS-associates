/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DivisionType, CurrencyCode, LanguageCode, CommodityItem, CosmeticProduct, FontTheme } from './types';
import { Navbar } from './components/Navbar';
import { ImportExportView } from './components/ImportExportView';
import { CosmeticsView } from './components/CosmeticsView';
import { Footer } from './components/Footer';
import { ExportRfqModal } from './components/ExportRfqModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CommodityDetailModal } from './components/CommodityDetailModal';
import { SampleKitModal } from './components/SampleKitModal';
import { CertificateModal } from './components/CertificateModal';

export default function App() {
  const [activeDivision, setActiveDivision] = useState<DivisionType>('import-export');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [fontTheme, setFontTheme] = useState<FontTheme>('corporate');

  useEffect(() => {
    document.documentElement.setAttribute('data-font-theme', fontTheme);
  }, [fontTheme]);

  // Modals state
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [rfqSelectedItem, setRfqSelectedItem] = useState<string | undefined>(undefined);
  const [rfqDefaultDivision, setRfqDefaultDivision] = useState<DivisionType>('import-export');

  const [selectedProductForDetail, setSelectedProductForDetail] = useState<CosmeticProduct | null>(null);
  const [selectedCommodityForDetail, setSelectedCommodityForDetail] = useState<CommodityItem | null>(null);

  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [samplePreselectedProduct, setSamplePreselectedProduct] = useState<CosmeticProduct | null>(null);

  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);

  const handleOpenRfqModal = (itemName?: string, division?: DivisionType) => {
    setRfqSelectedItem(itemName);
    setRfqDefaultDivision(division || activeDivision);
    setIsRfqModalOpen(true);
  };

  const handleOpenSampleModal = (product?: CosmeticProduct) => {
    setSamplePreselectedProduct(product || null);
    setIsSampleModalOpen(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    // If the section belongs to a division, switch if necessary
    if (sectionId === 'cosmetics-catalog' && activeDivision !== 'cosmetics') {
      setActiveDivision('cosmetics');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    if (sectionId === 'trade-catalog' && activeDivision !== 'import-export') {
      setActiveDivision('import-export');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    if (sectionId === 'compliance-vault') {
      setIsCertificateModalOpen(true);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#0b1b32] text-slate-900 ${language === 'ar' ? 'font-sans' : ''}`}>
      
      {/* Top Bar with 3-Zone Contract */}
      <Navbar
        activeDivision={activeDivision}
        onSelectDivision={setActiveDivision}
        currency={currency}
        onSelectCurrency={setCurrency}
        language={language}
        onSelectLanguage={setLanguage}
        fontTheme={fontTheme}
        onSelectFontTheme={setFontTheme}
        onOpenRfqModal={(div) => handleOpenRfqModal(undefined, div)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 bg-slate-50">
        {activeDivision === 'import-export' ? (
          <ImportExportView
            currency={currency}
            language={language}
            onOpenRfqModal={(itemName) => handleOpenRfqModal(itemName, 'import-export')}
            onOpenCommodityDetail={(comm) => setSelectedCommodityForDetail(comm)}
            onOpenCertificateModal={() => setIsCertificateModalOpen(true)}
          />
        ) : (
          <CosmeticsView
            currency={currency}
            language={language}
            onOpenProductDetail={(prod) => setSelectedProductForDetail(prod)}
            onOpenSampleModal={handleOpenSampleModal}
            onOpenRfqModal={(prodName) => handleOpenRfqModal(prodName, 'cosmetics')}
            onOpenCertificateModal={() => setIsCertificateModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectDivision={setActiveDivision}
        onOpenRfqModal={() => handleOpenRfqModal()}
        onOpenCertificateModal={() => setIsCertificateModalOpen(true)}
      />

      {/* Modals & Dialogs */}
      <ExportRfqModal
        isOpen={isRfqModalOpen}
        onClose={() => setIsRfqModalOpen(false)}
        defaultDivision={rfqDefaultDivision}
        selectedItemName={rfqSelectedItem}
        currency={currency}
      />

      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        currency={currency}
        onRequestSample={(prod) => {
          setSelectedProductForDetail(null);
          handleOpenSampleModal(prod);
        }}
        onRequestRfq={(prodName) => {
          setSelectedProductForDetail(null);
          handleOpenRfqModal(prodName, 'cosmetics');
        }}
      />

      <CommodityDetailModal
        commodity={selectedCommodityForDetail}
        onClose={() => setSelectedCommodityForDetail(null)}
        currency={currency}
        onRequestRfq={(commName) => {
          setSelectedCommodityForDetail(null);
          handleOpenRfqModal(commName, 'import-export');
        }}
      />

      <SampleKitModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        preselectedProduct={samplePreselectedProduct}
      />

      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
      />

    </div>
  );
}

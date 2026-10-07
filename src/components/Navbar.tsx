import React, { useState } from 'react';
import { DivisionType, CurrencyCode, LanguageCode, FontTheme } from '../types';
import { CURRENCY_RATES, TRANSLATIONS, FONT_THEME_OPTIONS } from '../data/mockData';
import { 
  Ship, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  ChevronDown, 
  ShieldCheck,
  Send,
  Menu,
  X,
  ExternalLink,
  Anchor,
  FileCheck,
  Calculator,
  Compass,
  Type
} from 'lucide-react';
import { generateWhatsAppTradeLink } from '../utils/formatters';

interface NavbarProps {
  activeDivision: DivisionType;
  onSelectDivision: (division: DivisionType) => void;
  currency: CurrencyCode;
  onSelectCurrency: (currency: CurrencyCode) => void;
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  fontTheme: FontTheme;
  onSelectFontTheme: (theme: FontTheme) => void;
  onOpenRfqModal: (defaultDivision?: DivisionType) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeDivision,
  onSelectDivision,
  currency,
  onSelectCurrency,
  language,
  onSelectLanguage,
  fontTheme,
  onSelectFontTheme,
  onOpenRfqModal,
  onNavigateSection,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const languages: { code: LanguageCode; label: string }[] = [
    { code: 'en', label: 'English (EN)' },
    { code: 'ar', label: 'العربية (AR)' },
    { code: 'fr', label: 'Français (FR)' },
    { code: 'es', label: 'Español (ES)' },
    { code: 'zh', label: '中文 (ZH)' },
    { code: 'de', label: 'Deutsch (DE)' },
  ];

  const whatsappDeskUrl = generateWhatsAppTradeLink({
    division: activeDivision === 'import-export' ? 'Global Import & Export' : 'KS Cosmetics & Beauty',
    notes: 'Inquiry from official portal menu'
  });

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <>
      {/* Floating Curved Tablet Navigation Bar with Reduced Opacity */}
      <header className="fixed top-2 sm:top-4 inset-x-0 z-40 px-2 sm:px-5 lg:px-8 pointer-events-none transition-all">
        <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/60 shadow-xl shadow-slate-950/15 ring-1 ring-slate-900/5 overflow-hidden transition-all pointer-events-auto">
          <div className="h-16 sm:h-20 px-3.5 sm:px-6 flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Brand Wordmark & Logo (Clean & Uncrowded) */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#0b1b32] text-amber-400 flex items-center justify-center font-bold text-base sm:text-lg font-display shadow-md group-hover:bg-blue-700 transition-colors shrink-0">
              KS
            </div>
            <div>
              <span className="text-lg sm:text-2xl font-black tracking-tight text-[#0b1b32] font-display block leading-none">
                KS ASSOCIATES
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-blue-700 block mt-0.5 font-mono">
                GLOBAL EXIM & LUXURY BEAUTY
              </span>
            </div>
          </a>

          {/* Division Switcher (Compact Segmented Tabs) */}
          <div className="hidden md:flex items-center p-1 bg-slate-200/50 backdrop-blur-sm rounded-xl border border-slate-300/40 shrink-0">
            <button
              type="button"
              onClick={() => onSelectDivision('import-export')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeDivision === 'import-export'
                  ? 'bg-[#0b1b32] text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              <Ship className="w-3.5 h-3.5 text-sky-400" />
              <span>Import & Export</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectDivision('cosmetics')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeDivision === 'cosmetics'
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-900" />
              <span>Cosmetics & Beauty</span>
            </button>
          </div>

          {/* Right Action & Sandwich Menu Button */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            
            {/* Currency Selector (Quick access) */}
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => {
                  setCurrencyOpen(!currencyOpen);
                  setLangOpen(false);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/70 hover:bg-white text-slate-800 font-mono text-xs font-semibold border border-slate-200/80 shadow-sm transition-colors"
                title="Select Currency"
              >
                <span>{CURRENCY_RATES[currency]?.symbol}</span>
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {currencyOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white/95 backdrop-blur-md text-slate-800 border border-slate-200 rounded-xl shadow-xl py-1 z-50 text-xs">
                  {(Object.keys(CURRENCY_RATES) as CurrencyCode[]).map((cur) => (
                    <button
                      key={cur}
                      type="button"
                      onClick={() => {
                        onSelectCurrency(cur);
                        setCurrencyOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        currency === cur ? 'bg-blue-50 text-blue-700 font-bold' : ''
                      }`}
                    >
                      <span>{cur}</span>
                      <span className="text-slate-400">{CURRENCY_RATES[cur].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Request Quote Button */}
            <button
              type="button"
              onClick={() => onOpenRfqModal(activeDivision)}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all shadow-md active:scale-95 whitespace-nowrap bg-blue-700 hover:bg-blue-800 text-white shrink-0 flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Request Quote</span>
              <span className="xs:hidden">Quote</span>
            </button>

            {/* Sandwich (Hamburger) Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="p-2 sm:p-2.5 rounded-xl bg-white/70 hover:bg-white text-slate-800 border border-slate-200/80 shadow-sm transition-colors flex items-center gap-1.5 shrink-0"
              aria-label="Open navigation menu"
              title="Menu"
            >
              <Menu className="w-5 h-5 text-slate-800" />
              <span className="hidden sm:inline text-xs font-bold text-slate-700 uppercase font-mono">Menu</span>
            </button>

          </div>

        </div>

        {/* Mobile quick division toggle strip */}
        <div className="md:hidden flex border-t border-slate-200/60 bg-white/50 backdrop-blur-md rounded-b-2xl sm:rounded-b-3xl overflow-hidden">
          <button
            type="button"
            onClick={() => onSelectDivision('import-export')}
            className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeDivision === 'import-export'
                ? 'border-blue-700 text-blue-700 bg-blue-50/50'
                : 'border-transparent text-slate-500'
            }`}
          >
            <Ship className="w-3.5 h-3.5" />
            <span>Global Trade</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectDivision('cosmetics')}
            className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeDivision === 'cosmetics'
                ? 'border-amber-500 text-amber-600 bg-amber-50/50'
                : 'border-transparent text-slate-500'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cosmetics & Beauty</span>
          </button>
        </div>
      </div>
    </header>

      {/* Slide-out Sandwich Menu Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          
          {/* Backdrop */}
          <div 
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-md bg-[#0b1b32] text-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 p-6 sm:p-8 space-y-6">
            
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-amber-400 flex items-center justify-center font-bold text-sm font-display">
                    KS
                  </div>
                  <div>
                    <span className="font-bold font-display text-white text-base block leading-tight">KS ASSOCIATES</span>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Navigation Menu</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Division Selectors in Menu */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                  Switch Business Division
                </span>
                
                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectDivision('import-export');
                      setIsMenuOpen(false);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      activeDivision === 'import-export'
                        ? 'bg-blue-600/30 border-blue-500 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/20 text-sky-400">
                        <Ship className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold block">Global Import, Export & Logistics</span>
                        <span className="text-[10px] text-slate-400">Customs Clearance, Freight, Agro & Minerals</span>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectDivision('cosmetics');
                      setIsMenuOpen(false);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      activeDivision === 'cosmetics'
                        ? 'bg-amber-500/30 border-amber-500 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold block">KS Luxury Cosmetics & Beauty Export</span>
                        <span className="text-[10px] text-slate-400">Clinical Serums, Perfumery, Private Label</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Section Links */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  Quick Navigation ({activeDivision === 'import-export' ? 'Trade' : 'Cosmetics'})
                </span>

                <div className="space-y-1 text-xs font-medium">
                  {activeDivision === 'import-export' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleNavClick('core-services')}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-white/10 text-slate-200 transition-colors flex items-center gap-2.5"
                      >
                        <Anchor className="w-3.5 h-3.5 text-sky-400" />
                        <span>Core Exim Services (Customs, Freight & DGFT)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavClick('trade-catalog')}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-white/10 text-slate-200 transition-colors flex items-center gap-2.5"
                      >
                        <Ship className="w-3.5 h-3.5 text-sky-400" />
                        <span>Commodities & Raw Materials Inventory</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavClick('trade-corridors')}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-white/10 text-slate-200 transition-colors flex items-center gap-2.5"
                      >
                        <Compass className="w-3.5 h-3.5 text-sky-400" />
                        <span>Shipping Corridors & Port Matrix</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavClick('freight-calculator')}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-white/10 text-slate-200 transition-colors flex items-center gap-2.5"
                      >
                        <Calculator className="w-3.5 h-3.5 text-sky-400" />
                        <span>Interactive Freight Estimator</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavClick('compliance-vault')}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-white/10 text-slate-200 transition-colors flex items-center gap-2.5"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>AEO-T1, ISO 9001 & DGFT Credentials</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleNavClick('cosmetics-catalog')}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-white/10 text-slate-200 transition-colors flex items-center gap-2.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Haute Formulation Catalog</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavClick('cosmetics-catalog')}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-white/10 text-slate-200 transition-colors flex items-center gap-2.5"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Active Botanical Ingredients (INCI)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavClick('cosmetics-catalog')}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-white/10 text-slate-200 transition-colors flex items-center gap-2.5"
                      >
                        <Anchor className="w-3.5 h-3.5 text-amber-400" />
                        <span>Private Label (OEM / ODM) Studio</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavClick('compliance-vault')}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-white/10 text-slate-200 transition-colors flex items-center gap-2.5"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>EU CPNP & US FDA Safety Dossiers</span>
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => handleNavClick('contact-desk')}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-white/10 text-slate-200 transition-colors flex items-center gap-2.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span>Direct Trade Desk Contact</span>
                  </button>
                </div>
              </div>

              {/* Typography Themes in Drawer */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                    Professional Typography & Fonts
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Live Preview</span>
                </div>

                <div className="space-y-2">
                  {FONT_THEME_OPTIONS.map((themeOpt) => {
                    const isSelected = fontTheme === themeOpt.id;
                    return (
                      <button
                        key={themeOpt.id}
                        type="button"
                        onClick={() => onSelectFontTheme(themeOpt.id)}
                        className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-blue-600/30 border-blue-400 text-white shadow-md'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                          isSelected ? 'bg-blue-500 text-white' : 'bg-white/10 text-slate-300'
                        }`}>
                          <Type className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-white block truncate">{themeOpt.name}</span>
                            {isSelected && (
                              <span className="text-[9px] font-mono uppercase tracking-wider bg-blue-500 text-white px-1.5 py-0.5 rounded">Selected</span>
                            )}
                          </div>
                          <span className="text-[11px] text-amber-300/90 font-medium block">{themeOpt.tag}</span>
                          <span className="text-[10px] text-slate-400 leading-tight block mt-0.5">{themeOpt.description}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Currency & Language in Menu */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  International Localization
                </span>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Currency</label>
                    <select
                      value={currency}
                      onChange={(e) => onSelectCurrency(e.target.value as CurrencyCode)}
                      className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-white focus:outline-none"
                    >
                      {(Object.keys(CURRENCY_RATES) as CurrencyCode[]).map((cur) => (
                        <option key={cur} value={cur} className="bg-[#0b1b32] text-white">
                          {cur} ({CURRENCY_RATES[cur].symbol})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Language</label>
                    <select
                      value={language}
                      onChange={(e) => onSelectLanguage(e.target.value as LanguageCode)}
                      className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-white focus:outline-none"
                    >
                      {languages.map((lng) => (
                        <option key={lng.code} value={lng.code} className="bg-[#0b1b32] text-white">
                          {lng.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <a
                href={whatsappDeskUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp Trade Desk</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenRfqModal(activeDivision);
                }}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Request Official Export Quote</span>
              </button>

              <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>AEO Certified · DGFT Licensed · ISO 9001:2015</span>
              </div>
            </div>

          </div>

        </div>
      )}
    </>
  );
};

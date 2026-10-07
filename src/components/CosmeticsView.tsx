import React, { useState } from 'react';
import { CosmeticProduct, CurrencyCode, LanguageCode } from '../types';
import { COSMETIC_PRODUCTS } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';
import { 
  Sparkles, 
  FlaskConical, 
  ArrowRight, 
  Shield, 
  Layers, 
  Search, 
  CheckCircle2,
  FileCheck
} from 'lucide-react';

interface CosmeticsViewProps {
  currency: CurrencyCode;
  language: LanguageCode;
  onOpenProductDetail: (product: CosmeticProduct) => void;
  onOpenSampleModal: (product?: CosmeticProduct) => void;
  onOpenRfqModal: (productName?: string) => void;
  onOpenCertificateModal: () => void;
}

export const CosmeticsView: React.FC<CosmeticsViewProps> = ({
  currency,
  onOpenProductDetail,
  onOpenSampleModal,
  onOpenRfqModal,
  onOpenCertificateModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Active Serums',
    'Barrier Creams',
    'Artisanal Fragrance',
    'Clinical Cleansers',
    'Hair & Scalp',
  ];

  const filteredProducts = COSMETIC_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.keyActives.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16">
      
      {/* Grand Hero Banner (Cinematic Video Background) */}
      <section className="relative bg-[#0b1b32] text-white overflow-hidden pt-28 sm:pt-36 pb-16 lg:pb-24">
        
        {/* Full-bleed HTML5 Background Video */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=80"
            className="w-full h-full object-cover opacity-30 scale-105"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-waves-in-the-ocean-1229-large.mp4" type="video/mp4" />
            <source src="https://upload.wikimedia.org/wikipedia/commons/c/c0/ContainerShip.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1b32] via-[#0b1b32]/95 to-[#0b1b32]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b32] via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>KS ASSOCIATES · LUXURY COSMETIC MANUFACTURING & EXPORT</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-[1.1]">
                Haute Formulations & Certified Luxury Cosmetics For Global Retail
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Dermatologist-grade active botanicals, pure clinical serums, and bespoke perfumery engineered in ISO 22716 GMP cleanrooms for international prestige retail and private label ODM contracts.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-200">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>ISO 22716 GMP Cleanroom</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>EU CPNP & US FDA Registered</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>100% Halal & Cruelty-Free</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenSampleModal()}
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-amber-500/25 flex items-center gap-2 active:scale-95"
                >
                  <FlaskConical className="w-4 h-4" />
                  <span>Order Free Lab Sample Kit</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenRfqModal()}
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm transition-colors"
                >
                  Request Wholesale RFQ
                </button>

                <button
                  type="button"
                  onClick={onOpenCertificateModal}
                  className="px-4 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-slate-300 border border-white/10 font-semibold text-sm transition-colors flex items-center gap-2"
                >
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>View EU/FDA Dossiers</span>
                </button>
              </div>

            </div>

            {/* Right Column: Visual Showcase Photo Box */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-amber-400/30 shadow-2xl relative group bg-[#081220]">
                <img
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80"
                  alt="KS Luxury Skincare Bottles on Stone"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs">
                  <div className="flex items-center justify-between text-amber-400 font-bold font-mono">
                    <span>Export Formulations</span>
                    <span>MOQ: 500 Units</span>
                  </div>
                  <p className="text-slate-200 mt-1">
                    Available in finished luxury glass bottles or bulk stainless drums (25L–200L).
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Product Catalog Grid (Crisp White Star Group Theme) */}
      <section id="cosmetics-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Heading & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block font-mono mb-1">
              HAUTE BEAUTY PORTFOLIO
            </span>
            <h2 className="text-3xl font-bold font-display text-slate-900 tracking-tight">
              Clinical Cosmetic Formulations Available For Export
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Every formula complies with European Union CPNP, US FDA VCRP, and Gulf SFDA regulations.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search formula or active ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 placeholder:text-slate-400 shadow-sm"
            />
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Photo */}
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-[#0b1b32]/85 backdrop-blur-md text-amber-300 font-bold">
                      {product.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#0b1b32]/85 backdrop-blur-md text-white">
                      {product.volume}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 text-xs text-white font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>ISO 22716 Cleanroom Formulation</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold font-display text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                    {product.name}
                  </h3>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      Core Active Ingredients:
                    </span>
                    <div className="space-y-1">
                      {product.keyActives.slice(0, 2).map((act, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                          <span className="truncate">{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-slate-500 block text-[10px]">Export Dossier</span>
                      <span className="font-semibold text-emerald-700">EU CPNP & US FDA</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-slate-500 block text-[10px]">Private Label MOQ</span>
                      <span className="font-semibold text-slate-800 font-mono">{product.moqUnits} Units</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Action Footer */}
              <div className="p-5 pt-0 space-y-3">
                <div className="flex items-baseline justify-between border-t border-slate-100 pt-3">
                  <span className="text-xs text-slate-500">Wholesale Tier:</span>
                  <div className="text-right">
                    <span className="text-base font-bold font-display text-slate-900">
                      {formatCurrency(product.basePriceUsd, currency)}
                    </span>
                    <span className="text-[11px] text-slate-500 block font-normal">/ unit (500+ pcs)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenProductDetail(product)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Full Formula</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenSampleModal(product)}
                    className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <FlaskConical className="w-3.5 h-3.5" />
                    <span>Sample Vial</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Private Label (OEM/ODM) Showroom */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-8">
          
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-600 font-bold">
              <Layers className="w-4 h-4" />
              <span>Turnkey Contract Manufacturing (OEM/ODM)</span>
            </div>
            <h2 className="text-3xl font-bold font-display text-slate-900 tracking-tight">
              Launch Your Brand’s Next Best-Seller with KS Lab
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We handle cleanroom compounding, custom luxury frosted bottles, silk-screen decaling, and European CPNP safety dossiers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 group">
              <div className="h-44 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
                  alt="Aseptic Laboratory Formulation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-amber-300 font-mono">01. CLEANROOM COMPOUNDING</span>
              </div>
              <div className="p-4 space-y-1 text-xs">
                <h4 className="font-bold text-slate-900">Custom Active Formulation</h4>
                <p className="text-slate-600">80+ proven clinical benchmark master recipes or bespoke botanicals engineered to your exact brief.</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 group">
              <div className="h-44 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1512290900672-1f49673de144?auto=format&fit=crop&w=600&q=80"
                  alt="Silk Screen Printing and Glass Vessels"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-amber-300 font-mono">02. BESPOKE PACKAGING</span>
              </div>
              <div className="p-4 space-y-1 text-xs">
                <h4 className="font-bold text-slate-900">Silk-Screen Glass & Crystal Flacons</h4>
                <p className="text-slate-600">Italian heavy frosted droppers, PCR airless pumps, and laser-engraved gold closures with your logo.</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 group">
              <div className="h-44 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
                  alt="Regulatory Dossier and Testing"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-amber-300 font-mono">03. REGULATORY REGISTRATION</span>
              </div>
              <div className="p-4 space-y-1 text-xs">
                <h4 className="font-bold text-slate-900">EU CPNP & US FDA Compliance</h4>
                <p className="text-slate-600">Complete Cosmetic Product Safety Report (CPSR Part A & B) signed by European certified assessors.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Non-Disclosure Agreements (NDA) signed prior to bespoke recipe development.</span>
            </div>
            <button
              type="button"
              onClick={() => onOpenRfqModal('Private Label Project Inquiry')}
              className="px-6 py-3 bg-[#0b1b32] hover:bg-blue-900 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
            >
              Inquire Private Label Project
            </button>
          </div>

        </div>
      </section>

      {/* Lab Sample Kit CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider font-mono bg-black/10 px-3 py-1 rounded-full inline-block">
              INTERNATIONAL RETAILERS & BUYERS
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display">
              Request Your Free International Lab Sample Kit
            </h3>
            <p className="text-xs sm:text-sm text-slate-900/80 leading-relaxed font-medium">
              Experience the sensory feel, skin absorption, and aroma profile in your lab. Dispatched via DHL Express air courier with batch Certificate of Analysis (COA).
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenSampleModal()}
            className="px-8 py-4 bg-[#0b1b32] hover:bg-slate-900 text-white font-bold rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
          >
            <FlaskConical className="w-4 h-4 text-amber-400" />
            <span>Order Lab Sample Kit</span>
          </button>
        </div>
      </section>

    </div>
  );
};

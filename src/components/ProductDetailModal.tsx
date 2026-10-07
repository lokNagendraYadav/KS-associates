import React, { useState } from 'react';
import { CosmeticProduct, CurrencyCode } from '../types';
import { formatCurrency } from '../utils/formatters';
import { X, Sparkles, Check, Shield, FileText, FlaskConical, Package, Send } from 'lucide-react';

interface ProductDetailModalProps {
  product: CosmeticProduct | null;
  onClose: () => void;
  currency: CurrencyCode;
  onRequestSample: (product: CosmeticProduct) => void;
  onRequestRfq: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  currency,
  onRequestSample,
  onRequestRfq,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'inci' | 'wholesale' | 'compliance'>('overview');

  if (!product) return null;

  // Wholesale volume pricing calculator
  const tierPricing = [
    { tier: '500 – 2,499 Units (Pilot MOQ)', discount: 'Base Price', pricePerUnit: product.basePriceUsd },
    { tier: '2,500 – 9,999 Units (Regional Retail)', discount: '-15% Volume Discount', pricePerUnit: product.basePriceUsd * 0.85 },
    { tier: '10,000+ Units (Enterprise / Bulk)', discount: '-28% Export Container', pricePerUnit: product.basePriceUsd * 0.72 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-8 bg-[#0b0f17] border border-amber-500/20 rounded-2xl shadow-2xl overflow-hidden text-neutral-100">
        
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-400/10 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
                <span>{product.category}</span>
                <span>·</span>
                <span>ISO 22716 GMP Certified Cleanroom</span>
              </div>
              <h3 className="text-xl font-bold font-display text-white">{product.name}</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-white/[0.01] px-6">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-semibold tracking-wide border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Formulation & Benefits
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('inci')}
            className={`py-3 px-4 text-xs font-semibold tracking-wide border-b-2 transition-colors ${
              activeTab === 'inci'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Full INCI Ingredients
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('wholesale')}
            className={`py-3 px-4 text-xs font-semibold tracking-wide border-b-2 transition-colors ${
              activeTab === 'wholesale'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            B2B Wholesale Tiers & Packaging
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('compliance')}
            className={`py-3 px-4 text-xs font-semibold tracking-wide border-b-2 transition-colors ${
              activeTab === 'compliance'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Export Approvals & COA
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Product Visual Showcase Split */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 rounded-2xl overflow-hidden border border-amber-400/20 shadow-lg relative h-64 bg-neutral-900">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-[11px] font-mono text-amber-300">
                    Aseptic Batch Tested · Standard {product.volume}
                  </div>
                </div>

                <div className="md:col-span-7 space-y-3">
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Clinical Study Box */}
                  <div className="p-3.5 rounded-xl bg-amber-500/[0.07] border border-amber-500/20 space-y-1">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Clinical Efficacy Study</span>
                    <p className="text-xs text-neutral-200 leading-relaxed font-sans">{product.clinicalResults}</p>
                  </div>
                </div>
              </div>

              {/* Key Actives Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <FlaskConical className="w-4 h-4" />
                  Key Bio-Active Compounds
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.keyActives.map((active, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-neutral-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span>{active}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                  <span className="text-xs text-neutral-400 block">Skin Target</span>
                  <span className="text-xs font-medium text-white">{product.skinType}</span>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                  <span className="text-xs text-neutral-400 block">Standard Unit Vol</span>
                  <span className="text-xs font-medium text-white">{product.volume}</span>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                  <span className="text-xs text-neutral-400 block">Minimum Order</span>
                  <span className="text-xs font-semibold text-amber-400">{product.moqUnits} Units</span>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                  <span className="text-xs text-neutral-400 block">Lead Time</span>
                  <span className="text-xs font-medium text-white">{product.leadTimeWeeks} Weeks</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inci' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  International Nomenclature of Cosmetic Ingredients (INCI)
                </h4>
                <span className="text-xs text-neutral-400">100% Transparent Full Disclosure</span>
              </div>
              <p className="text-xs text-neutral-400">
                All formulations are formulated without parabens, sulfates (SLS/SLES), phthalates, artificial fragrance, microplastics, or formaldehyde releasers.
              </p>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 font-mono text-xs text-neutral-300 leading-relaxed space-y-2">
                {product.inciList.map((ingredient, i) => (
                  <div key={i} className="flex items-start gap-2 border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                    <span className="text-neutral-500 select-none">{String(i + 1).padStart(2, '0')}.</span>
                    <span className="text-neutral-200">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wholesale' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400">Volume Export Tier Pricing</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {tierPricing.map((tier, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border ${idx === 1 ? 'bg-amber-400/[0.08] border-amber-400/40' : 'bg-white/[0.02] border-white/10'}`}>
                      <span className="text-xs text-neutral-400 block">{tier.tier}</span>
                      <div className="text-xl font-bold font-display text-white mt-1">
                        {formatCurrency(tier.pricePerUnit, currency)} <span className="text-xs text-neutral-400 font-normal">/ unit</span>
                      </div>
                      <span className="text-xs text-amber-400 block mt-1">{tier.discount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging Customization Options */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  International Packaging & Private Label Options
                </h4>
                <div className="space-y-2">
                  {product.packagingOptions.map((pkg, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl text-xs text-neutral-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{pkg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  International Regulatory Registrations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.exportApprovals.map((appr, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20 text-xs text-neutral-200 flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{appr}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dossier Documentation Available */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <span className="text-xs font-semibold text-neutral-200 block">Export Dossier Documents Included with Wholesale Orders:</span>
                <ul className="text-xs text-neutral-400 space-y-1 list-disc list-inside">
                  <li>Batch-Specific Certificate of Analysis (COA) with HPLC Assay</li>
                  <li>Safety Data Sheet (MSDS / SDS) 16-Section GHS Format</li>
                  <li>Certificate of Free Sale (CFS) authenticated by Indian Chamber of Commerce</li>
                  <li>Stability Testing Report (Accelerated 40°C / 75% RH 6-Month Study)</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-neutral-400">
            Export Packaging: Export carton with shock absorbers & air freight thermo-liners
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                onClose();
                onRequestSample(product);
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-amber-400/40 text-amber-300 hover:bg-amber-400/10 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Order Lab Sample</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onRequestRfq(product.name);
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold transition-colors shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Request Wholesale RFQ</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

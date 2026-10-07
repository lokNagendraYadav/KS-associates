import React, { useState } from 'react';
import { CommodityItem, CurrencyCode, LanguageCode, TradeRoute } from '../types';
import { COMMODITIES } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';
import { TradeRouteMatrix } from './TradeRouteMatrix';
import { 
  Ship, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Box, 
  Calculator,
  Search,
  CheckCircle2,
  Anchor,
  Plane,
  FileSpreadsheet,
  Truck
} from 'lucide-react';

interface ImportExportViewProps {
  currency: CurrencyCode;
  language: LanguageCode;
  onOpenRfqModal: (itemName?: string) => void;
  onOpenCommodityDetail: (commodity: CommodityItem) => void;
  onOpenCertificateModal: () => void;
}

export const ImportExportView: React.FC<ImportExportViewProps> = ({
  currency,
  onOpenRfqModal,
  onOpenCommodityDetail,
  onOpenCertificateModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Quick hero inquiry widget state
  const [quickService, setQuickService] = useState('Export Customs Clearance');
  const [quickCargo, setQuickCargo] = useState('Whole Tellicherry Black Pepper');
  const [quickPort, setQuickPort] = useState('Rotterdam (EU)');

  // Freight Estimator state
  const [calcCommodity, setCalcCommodity] = useState<string>(COMMODITIES[0].name);
  const [calcPort, setCalcPort] = useState<string>('Rotterdam (EU)');
  const [calcIncoterm, setCalcIncoterm] = useState<string>('CIF');
  const [calcVolume, setCalcVolume] = useState<number>(1);

  const categories = [
    'All',
    'Agro & Spices',
    'Industrial Minerals',
    'Textiles & Fiber',
    'Specialty Chemicals & Hardware',
  ];

  const filteredCommodities = COMMODITIES.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.hsCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedCalcCommodityObj = COMMODITIES.find(c => c.name === calcCommodity) || COMMODITIES[0];

  const handleRouteSelect = (route: TradeRoute) => {
    onOpenRfqModal(`Corridor: ${route.corridor} (${route.originPort} to ${route.destinationPort})`);
  };

  const handleQuickInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenRfqModal(`${quickService}: ${quickCargo} to ${quickPort}`);
  };

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
            poster="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80"
            className="w-full h-full object-cover opacity-35 scale-105"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-waves-in-the-ocean-1229-large.mp4" type="video/mp4" />
            <source src="https://upload.wikimedia.org/wikipedia/commons/c/c0/ContainerShip.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1b32] via-[#0b1b32]/90 to-[#0b1b32]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b32] via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Star Group Style Pitch */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/30 border border-blue-400/40 text-amber-400 font-mono text-xs font-semibold">
                <Ship className="w-3.5 h-3.5 text-amber-400" />
                <span>KS ASSOCIATES · INTEGRATED EXIM & FREIGHT SOLUTIONS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-[1.1]">
                Simplifying Global Trade With Complete Supply Chain & Export Solutions
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Premier customs brokerage, international air & ocean freight forwarding, DGFT trade incentives, and direct-origin agricultural & industrial commodity exports to 48+ international ports.
              </p>

              {/* Trust Badges Bar */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-200">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Licensed Customs Broker</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>AEO-T1 Certified Entity</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>ISO 9001:2015 Registered</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenRfqModal()}
                  className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 active:scale-95"
                >
                  <span>Request Export Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('core-services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm transition-colors"
                >
                  Explore Core Services
                </button>
              </div>

            </div>

            {/* Right Column: Floating Quick Rate & Inquiry Card (Star Group Style) */}
            <div className="lg:col-span-5">
              <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
                
                <div className="border-b border-slate-200 pb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block font-mono">
                    Direct Trade Desk
                  </span>
                  <h3 className="text-xl font-bold font-display text-slate-900 mt-0.5">
                    Fast Freight & Customs Rate Inquiry
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Get an instant quote for ocean freight, customs clearance, or commodity dispatch.
                  </p>
                </div>

                <form onSubmit={handleQuickInquirySubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Required Service *
                    </label>
                    <select
                      value={quickService}
                      onChange={(e) => setQuickService(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    >
                      <option value="Customs Clearance & Brokerage">Customs Clearance & Port Handling</option>
                      <option value="International Ocean Freight FCL/LCL">International Ocean Freight (FCL/LCL)</option>
                      <option value="International Air Cargo Express">International Air Cargo Express</option>
                      <option value="Direct Commodity Export Procurement">Direct Commodity Export Procurement</option>
                      <option value="DGFT Matters & Foreign Trade Advisory">DGFT Matters & Foreign Trade Advisory</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Target Commodity / Cargo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tellicherry Pepper, Organic Cotton, Stainless Hardware"
                      value={quickCargo}
                      onChange={(e) => setQuickCargo(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Discharge Terminal / Port *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rotterdam, Jebel Ali (Dubai), New York, Singapore"
                      value={quickPort}
                      onChange={(e) => setQuickPort(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Submit Rate Inquiry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Response from licensed customs desk within 2 business hours</span>
                  </div>
                </form>

              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Core Services Section (Matching Star Group's Portfolio) */}
      <section id="core-services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 font-mono">
            WHAT WE DO
          </span>
          <h2 className="text-3xl font-bold font-display text-slate-900 tracking-tight">
            Comprehensive End-to-End Trade & Logistics Services
          </h2>
          <p className="text-sm text-slate-600">
            Backed by over two decades of on-ground expertise at major Indian ports, air cargo complexes, and international liner networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Service 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="h-44 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=600&q=80"
                alt="Customs Clearance and Port Handling"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white flex items-center gap-2">
                <Anchor className="w-4 h-4 text-sky-400" />
                <span className="font-bold text-xs uppercase font-mono">Port Operations</span>
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                Customs Clearance & Brokerage
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expert customs clearance at Nhava Sheva (JNPT), Mundra, Chennai, and air cargo stations with EDI fast filing.
              </p>
            </div>
          </div>

          {/* Service 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="h-44 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80"
                alt="Ocean and Air Freight Forwarding"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white flex items-center gap-2">
                <Plane className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-xs uppercase font-mono">Multimodal Freight</span>
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                Ocean & Air Freight Forwarding
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                FCL container bookings, LCL consolidation, and air charters with contracted allotments on Maersk, MSC, and Emirates SkyCargo.
              </p>
            </div>
          </div>

          {/* Service 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="h-44 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80"
                alt="DGFT and Trade Advisory"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-xs uppercase font-mono">Trade Compliance</span>
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                DGFT Matters & Export Incentives
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Advisory on Advance Authorisation, EPCG scheme, RoDTEP claims, Duty Drawback recovery, and trade dispute resolution.
              </p>
            </div>
          </div>

          {/* Service 4 */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="h-44 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80"
                alt="Inland Transportation and CFS Warehousing"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white flex items-center gap-2">
                <Truck className="w-4 h-4 text-sky-400" />
                <span className="font-bold text-xs uppercase font-mono">Inland Logistics</span>
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                CFS Coordination & Warehousing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Container freight station (CFS) handling, temperature-controlled bonded storage, and dedicated GPS-tracked fleet.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* Commodity Export Catalog (Rich Photographic Presentation) */}
      <section id="trade-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Heading & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block font-mono mb-1">
              EXPORT COMMODITY INVENTORY
            </span>
            <h2 className="text-3xl font-bold font-display text-slate-900 tracking-tight">
              Export-Grade Agro Products & Industrial Raw Materials
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Direct-from-source agricultural commodities and minerals with verified SGS laboratory certificates.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search commodity or HS Code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 placeholder:text-slate-400 shadow-sm"
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
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Commodities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommodities.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Photo */}
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-[#0b1b32]/80 backdrop-blur-md text-amber-300 font-bold">
                      {item.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#0b1b32]/80 backdrop-blur-md text-white">
                      HS {item.hsCode}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 text-xs text-white font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{item.origin}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold font-display text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                    {item.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-slate-500 block text-[10px]">Purity / Assay</span>
                      <span className="font-bold text-emerald-700 font-mono">{item.purity}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-slate-500 block text-[10px]">Minimum Order</span>
                      <span className="font-bold text-slate-800 font-mono truncate block">{item.moq}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="p-5 pt-0 space-y-3">
                <div className="flex items-baseline justify-between border-t border-slate-100 pt-3">
                  <span className="text-xs text-slate-500">Valuation:</span>
                  <div className="text-right">
                    <span className="text-base font-bold font-display text-slate-900">
                      {formatCurrency(item.basePriceUsd, currency)}
                    </span>
                    <span className="text-[11px] text-slate-500 block font-normal">/ {item.priceUnit}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenCommodityDetail(item)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-700" />
                    <span>Lab Specs</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenRfqModal(item.name)}
                    className="py-2.5 px-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Instant RFQ</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Trade Route Corridors */}
      <TradeRouteMatrix
        currency={currency}
        onSelectRouteForRfq={handleRouteSelect}
      />

      {/* Interactive Quick Freight Estimator */}
      <section id="freight-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
          
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-700 font-bold">
            <Calculator className="w-4 h-4" />
            <span>Interactive Freight & Transit Estimator</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl font-bold font-display text-slate-900">
                Model Ocean Freight Capacities & Port Transit Days
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Commodity of Interest
                  </label>
                  <select
                    value={calcCommodity}
                    onChange={(e) => setCalcCommodity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900"
                  >
                    {COMMODITIES.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Discharge Port Hub
                  </label>
                  <select
                    value={calcPort}
                    onChange={(e) => setCalcPort(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900"
                  >
                    <option value="Rotterdam (EU)">Rotterdam Port (Netherlands)</option>
                    <option value="Jebel Ali (UAE)">Jebel Ali Terminal (Dubai)</option>
                    <option value="Newark / NY (USA)">New York / Newark (USA)</option>
                    <option value="Singapore (SG)">Singapore (Transshipment)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Container Capacity: {calcVolume} x 20FT FCL (~{calcVolume * 22} MT)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={calcVolume}
                  onChange={(e) => setCalcVolume(parseInt(e.target.value) || 1)}
                  className="w-full accent-blue-700 cursor-pointer"
                />
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0b1b32] text-white space-y-4">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block font-semibold">
                Simulated Port Readout
              </span>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-slate-300">Origin Port:</span>
                  <span className="text-white font-medium">Nhava Sheva (JNPT) / Mundra</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-slate-300">Ocean Transit:</span>
                  <span className="text-emerald-400 font-bold font-mono">
                    {calcPort.includes('Jebel Ali') ? '3 – 5 Days' : '18 – 22 Days'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-slate-300">Commodity Valuation:</span>
                  <span className="text-base font-bold font-display text-amber-400">
                    {formatCurrency(selectedCalcCommodityObj.basePriceUsd * calcVolume * 20, currency)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenRfqModal(`${calcCommodity} - ${calcVolume} x 20FT to ${calcPort}`)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-1.5"
              >
                <span>Convert to Official Export RFQ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

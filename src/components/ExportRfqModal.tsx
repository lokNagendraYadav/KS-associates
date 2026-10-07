import React, { useState } from 'react';
import { DivisionType, CurrencyCode, CommodityItem, CosmeticProduct } from '../types';
import { COMMODITIES, COSMETIC_PRODUCTS } from '../data/mockData';
import { formatCurrency, generateWhatsAppTradeLink } from '../utils/formatters';
import { X, CheckCircle, Send, ExternalLink, Ship, Sparkles, ShieldCheck } from 'lucide-react';

interface ExportRfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDivision: DivisionType;
  selectedItemName?: string;
  currency: CurrencyCode;
}

export const ExportRfqModal: React.FC<ExportRfqModalProps> = ({
  isOpen,
  onClose,
  defaultDivision,
  selectedItemName,
  currency,
}) => {
  const [division, setDivision] = useState<DivisionType>(defaultDivision);
  const [selectedProduct, setSelectedProduct] = useState<string>(selectedItemName || '');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [destinationCountry, setDestinationCountry] = useState('United Arab Emirates');
  const [destinationPort, setDestinationPort] = useState('Jebel Ali (Dubai)');
  const [incoterm, setIncoterm] = useState<'FOB' | 'CIF' | 'CFR' | 'DDP'>('CIF');
  const [shippingMode, setShippingMode] = useState<'20FT FCL' | '40FT HC' | 'LCL Consolidation' | 'Air Cargo Expedited'>('20FT FCL');
  const [quantity, setQuantity] = useState('1 Full Container Load (FCL)');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `KSA-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceId(generatedRef);
    setIsSubmitted(true);
  };

  const currentProductList = division === 'import-export'
    ? COMMODITIES.map(c => c.name)
    : COSMETIC_PRODUCTS.map(c => c.name);

  const selectedCommodity = COMMODITIES.find(c => c.name === selectedProduct);
  const selectedCosmetic = COSMETIC_PRODUCTS.find(c => c.name === selectedProduct);

  const whatsappLink = generateWhatsAppTradeLink({
    division: division === 'import-export' ? 'Commodity Import & Export Division' : 'Luxury Cosmetics Export Division',
    item: selectedProduct || 'General Catalog Inquiry',
    country: destinationCountry,
    incoterm: incoterm,
    notes: `Shipping mode: ${shippingMode}. Quantity: ${quantity}. Notes: ${specialRequirements || 'Standard export packaging requested.'}`
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-[#0c1017] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-neutral-100">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${division === 'import-export' ? 'bg-sky-500/20 text-sky-400' : 'bg-amber-400/20 text-amber-400'}`}>
              {division === 'import-export' ? <Ship className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-white">International Export Quotation Request (RFQ)</h3>
              <p className="text-xs text-neutral-400">Direct response from KS Associates International Trade Desk within 12 business hours.</p>
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

        {isSubmitted ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase">Submission Confirmed</span>
              <h4 className="text-2xl font-bold font-display text-white">Quotation Dossier Generated</h4>
              <p className="text-sm text-neutral-300 max-w-md mx-auto">
                Thank you, <span className="text-white font-semibold">{contactName || 'Valued Partner'}</span>. Your formal inquiry has been logged under Reference ID:
              </p>
              <div className="inline-block px-4 py-2 bg-white/[0.04] border border-white/10 rounded-xl font-mono text-amber-400 text-sm font-semibold">
                {referenceId}
              </div>
            </div>

            {/* Inquiry Summary Box */}
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 text-left text-xs space-y-2 max-w-lg mx-auto">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Target Product:</span>
                <span className="text-white font-medium text-right">{selectedProduct || 'General Portfolio'}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Destination:</span>
                <span className="text-white">{destinationPort}, {destinationCountry}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Incoterm / Terms:</span>
                <span className="text-amber-400 font-semibold">{incoterm} · {shippingMode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Dispatch Estimate:</span>
                <span className="text-white">Commercial Invoice & Port Schedule dispatched to {email}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs transition-colors shadow-lg shadow-emerald-600/20"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Notify Trade Desk via WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 bg-white/10 hover:bg-white/15 text-neutral-200 font-semibold rounded-xl text-xs transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Division Switcher in Modal */}
            <div className="grid grid-cols-2 gap-3 p-1 bg-white/[0.03] border border-white/10 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setDivision('import-export');
                  setSelectedProduct('');
                }}
                className={`py-2 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  division === 'import-export'
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Ship className="w-3.5 h-3.5" />
                <span>Commodities & Raw Materials</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setDivision('cosmetics');
                  setSelectedProduct('');
                }}
                className={`py-2 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  division === 'cosmetics'
                    ? 'bg-amber-400 text-neutral-950 font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Luxury Cosmetics & Beauty</span>
              </button>
            </div>

            {/* Product selection */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2">
                Select Product / Commodity of Interest *
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                required
                className="w-full bg-[#131924] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-neutral-100 focus:outline-none focus:border-amber-400 transition-colors"
              >
                <option value="">-- Choose from our export inventory --</option>
                {currentProductList.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              {/* Price guide teaser */}
              {selectedCommodity && (
                <div className="mt-2 text-xs text-sky-400 flex items-center gap-2">
                  <span>Base Commodity Index:</span>
                  <span className="font-semibold">{formatCurrency(selectedCommodity.basePriceUsd, currency)} / {selectedCommodity.priceUnit}</span>
                  <span>· MOQ: {selectedCommodity.moq}</span>
                </div>
              )}
              {selectedCosmetic && (
                <div className="mt-2 text-xs text-amber-400 flex items-center gap-2">
                  <span>Wholesale Base Tier:</span>
                  <span className="font-semibold">{formatCurrency(selectedCosmetic.basePriceUsd, currency)} / unit</span>
                  <span>· MOQ: {selectedCosmetic.moqUnits} units · Private Label Ready</span>
                </div>
              )}
            </div>

            {/* Two Column Logistics Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Destination Country *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Germany, UAE, United States, Japan"
                  value={destinationCountry}
                  onChange={(e) => setDestinationCountry(e.target.value)}
                  className="w-full bg-[#131924] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Discharge Port / Airport *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Port of Rotterdam / Jebel Ali / Newark"
                  value={destinationPort}
                  onChange={(e) => setDestinationPort(e.target.value)}
                  className="w-full bg-[#131924] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Incoterms 2020 *
                </label>
                <select
                  value={incoterm}
                  onChange={(e) => setIncoterm(e.target.value as any)}
                  className="w-full bg-[#131924] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-400"
                >
                  <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                  <option value="FOB">FOB (Free On Board Origin Port)</option>
                  <option value="CFR">CFR (Cost and Freight)</option>
                  <option value="DDP">DDP (Delivered Duty Paid)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Shipment Container / Mode *
                </label>
                <select
                  value={shippingMode}
                  onChange={(e) => setShippingMode(e.target.value as any)}
                  className="w-full bg-[#131924] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-400"
                >
                  <option value="20FT FCL">20FT FCL (Full Container)</option>
                  <option value="40FT HC">40FT High-Cube Container</option>
                  <option value="LCL Consolidation">LCL Consolidation</option>
                  <option value="Air Cargo Expedited">Air Cargo Expedited (3-5 Days)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Volume / Quantity *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2 Containers / 5,000 pcs"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full bg-[#131924] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Buyer contact information */}
            <div className="pt-2 border-t border-white/10 space-y-4">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
                Company & Trade Representative
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Company Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nordic Imports GmbH / Al-Baraka Trading"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-[#131924] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Procurement Officer / Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alexander Müller / Tariq Mansoor"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-[#131924] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="procurement@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#131924] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    WhatsApp / Direct Phone (with Country Code) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 50 123 4567 / +49 151 234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#131924] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Custom Requirements / Packaging / Private Label Specs
                </label>
                <textarea
                  rows={2}
                  placeholder="Specify private label packaging, custom branding, pallet specifications, or target delivery timeframe..."
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  className="w-full bg-[#131924] border border-white/10 rounded-xl p-3 text-xs text-neutral-100 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>
            </div>

            {/* Compliance footnote */}
            <div className="flex items-center gap-2 text-xs text-neutral-400 bg-white/[0.02] p-3 rounded-xl border border-white/5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                All inquiries backed by ISO 9001:2015 & SGS pre-shipment quality verification with Chamber of Commerce verified COO documentation.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg active:scale-95 ${
                  division === 'import-export'
                    ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-sky-500/20'
                    : 'bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-amber-400/20'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Export RFQ</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

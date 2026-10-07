import React, { useState } from 'react';
import { CosmeticProduct } from '../types';
import { COSMETIC_PRODUCTS } from '../data/mockData';
import { X, FlaskConical, Check, Plane, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SampleKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: CosmeticProduct | null;
}

export const SampleKitModal: React.FC<SampleKitModalProps> = ({
  isOpen,
  onClose,
  preselectedProduct,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    preselectedProduct ? [preselectedProduct.id] : [COSMETIC_PRODUCTS[0].id]
  );
  const [recipientName, setRecipientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United Arab Emirates');
  const [shippingAddress, setShippingAddress] = useState('');
  const [dhlAccountOptional, setDhlAccountOptional] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sampleDispatchId, setSampleDispatchId] = useState('');

  if (!isOpen) return null;

  const toggleSelectProduct = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter(item => item !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dispatchId = `KSA-SAMPLE-${Math.floor(10000 + Math.random() * 90000)}`;
    setSampleDispatchId(dispatchId);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 bg-[#0d111a] border border-amber-500/20 rounded-2xl shadow-2xl overflow-hidden text-neutral-100">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-400/10 text-amber-400">
              <FlaskConical className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold font-display text-white">International Cosmetic Sample Dispatch Kit</h3>
              <p className="text-xs text-neutral-400">Select up to 3 lab-grade formulas for evaluation by your formulation & retail team.</p>
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
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase">Sample Kit Dispatched for Prep</span>
              <h4 className="text-2xl font-bold font-display text-white">Evaluation Dossier Registered</h4>
              <p className="text-sm text-neutral-300 max-w-md mx-auto">
                Thank you, <span className="text-white font-semibold">{recipientName}</span>. Your lab samples are being sterile-packed and assigned tracking number under:
              </p>
              <div className="inline-block px-4 py-2 bg-white/[0.04] border border-white/10 rounded-xl font-mono text-amber-400 text-sm font-semibold">
                {sampleDispatchId}
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Dispatch Destination:</span>
                <span className="text-white">{country}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Courier Service:</span>
                <span className="text-amber-400 font-semibold">DHL Express Air Priority (3-4 Business Days)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Documentation Attached:</span>
                <span className="text-white">Batch COA + Technical Data Sheet (TDS)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-xl text-xs transition-colors"
            >
              Return to Catalog
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Step 1: Select up to 3 samples */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Step 1: Choose Up to 3 Evaluation Formulations ({selectedIds.length}/3 selected)
                </label>
              </div>

              <div className="space-y-2">
                {COSMETIC_PRODUCTS.map((prod) => {
                  const isSelected = selectedIds.includes(prod.id);
                  return (
                    <div
                      key={prod.id}
                      onClick={() => toggleSelectProduct(prod.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-400/10 border-amber-400/40 text-white'
                          : 'bg-white/[0.02] border-white/5 text-neutral-300 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          isSelected ? 'bg-amber-400 border-amber-400 text-neutral-950' : 'border-white/20'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <span className="text-xs font-semibold block">{prod.name}</span>
                          <span className="text-xs text-neutral-400">{prod.category} · {prod.volume}</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-neutral-400">Lab Vial (15ml)</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Shipping details */}
            <div className="pt-2 border-t border-white/10 space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                Step 2: International Delivery Address (DHL Express)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Company / Brand Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. L’Étoile Beauty Lab"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-[#141822] border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Recipient Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Claire Dubois"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full bg-[#141822] border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Corporate Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="rd@beautybrand.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#141822] border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Phone / Mobile for Courier SMS *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+33 6 12 34 56 78"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#141822] border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Country & City *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Paris, France / Dubai, UAE / Tokyo, Japan"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-[#141822] border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Complete Physical Street Address *</label>
                <input
                  type="text"
                  required
                  placeholder="Suite number, street, postal code (P.O. Boxes not accepted for chemical samples)"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full bg-[#141822] border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Optional: Your DHL / FedEx Corporate Account # (for zero-cost expedited billing)
                </label>
                <input
                  type="text"
                  placeholder="e.g. DHL #962817291 (Leave blank for KS Associates sponsored freight)"
                  value={dhlAccountOptional}
                  onChange={(e) => setDhlAccountOptional(e.target.value)}
                  className="w-full bg-[#141822] border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Courier note */}
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center gap-2 text-xs text-neutral-400">
              <Plane className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                All sample vials are dispatched with Certificate of Analysis (COA) and Non-Hazardous chemical declaration for fast customs clearance.
              </span>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-xl text-xs transition-colors shadow-lg shadow-amber-400/20"
              >
                Dispatch Sample Request
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

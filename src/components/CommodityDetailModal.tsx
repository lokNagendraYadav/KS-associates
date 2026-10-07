import React from 'react';
import { CommodityItem, CurrencyCode } from '../types';
import { formatCurrency } from '../utils/formatters';
import { X, Ship, ShieldCheck, Scale, FileSpreadsheet, Send, Layers } from 'lucide-react';

interface CommodityDetailModalProps {
  commodity: CommodityItem | null;
  onClose: () => void;
  currency: CurrencyCode;
  onRequestRfq: (commodityName: string) => void;
}

export const CommodityDetailModal: React.FC<CommodityDetailModalProps> = ({
  commodity,
  onClose,
  currency,
  onRequestRfq,
}) => {
  if (!commodity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-[#0c1018] border border-sky-500/20 rounded-2xl shadow-2xl overflow-hidden text-neutral-100">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
              <Ship className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2 text-xs text-sky-400 font-mono">
                <span>{commodity.category}</span>
                <span>·</span>
                <span>HS Code: {commodity.hsCode}</span>
              </div>
              <h3 className="text-lg font-bold font-display text-white">{commodity.name}</h3>
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

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Commodity Visual Split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 rounded-2xl overflow-hidden border border-sky-400/20 shadow-lg relative h-56 bg-neutral-900">
              <img
                src={commodity.image}
                alt={commodity.name}
                loading="eager"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-[11px] font-mono text-sky-300">
                {commodity.origin} · HS {commodity.hsCode}
              </div>
            </div>

            <div className="md:col-span-7 space-y-3">
              <p className="text-sm text-neutral-300 leading-relaxed">
                {commodity.description}
              </p>
              
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-neutral-300 space-y-1">
                <span className="text-neutral-400 block text-[10px] uppercase font-mono">Export Packing Protocol:</span>
                <span>{commodity.packaging}</span>
              </div>
            </div>
          </div>

          {/* Key Trade Specs Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-white/[0.03] border border-white/5 rounded-xl">
              <span className="text-xs text-neutral-400 block">Origin Basin</span>
              <span className="text-xs font-semibold text-white">{commodity.origin}</span>
            </div>
            <div className="p-3 bg-white/[0.03] border border-white/5 rounded-xl">
              <span className="text-xs text-neutral-400 block">Assay / Purity</span>
              <span className="text-xs font-semibold text-emerald-400">{commodity.purity}</span>
            </div>
            <div className="p-3 bg-white/[0.03] border border-white/5 rounded-xl">
              <span className="text-xs text-neutral-400 block">Moisture Content</span>
              <span className="text-xs font-semibold text-white">{commodity.moisture}</span>
            </div>
            <div className="p-3 bg-white/[0.03] border border-white/5 rounded-xl">
              <span className="text-xs text-neutral-400 block">Dispatch Lead</span>
              <span className="text-xs font-semibold text-sky-400">{commodity.leadTimeDays} Days</span>
            </div>
          </div>

          {/* Detailed Lab Specifications Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Verified Laboratory Test Parameters
            </h4>
            <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden divide-y divide-white/5 font-mono text-xs">
              {Object.entries(commodity.specs).map(([key, val], idx) => (
                <div key={idx} className="flex items-center justify-between p-3">
                  <span className="text-neutral-400 font-sans">{key}</span>
                  <span className="text-white font-semibold">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Packaging & Logistics Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-400" />
                Standard Export Packaging
              </span>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {commodity.packaging}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
                <Scale className="w-4 h-4 text-sky-400" />
                Minimum Export Order Quantity
              </span>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {commodity.moq}
              </p>
            </div>
          </div>

          {/* Inspection Authorities */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Pre-Shipment Inspection & Survey Authorities
            </span>
            <div className="flex flex-wrap gap-2">
              {commodity.inspectionBodies.map((body, i) => (
                <span key={i} className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/[0.08] text-emerald-300 border border-emerald-500/20 font-medium">
                  {body} Certified
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
          <div>
            <span className="text-xs text-neutral-400 block">Baseline Commodity Valuation</span>
            <div className="text-lg font-bold font-display text-sky-400">
              {formatCurrency(commodity.basePriceUsd, currency)} <span className="text-xs text-neutral-400 font-normal">/ {commodity.priceUnit}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onRequestRfq(commodity.name);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-sky-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Inquire This Commodity</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

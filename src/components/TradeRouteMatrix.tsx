import React, { useState } from 'react';
import { TRADE_ROUTES } from '../data/mockData';
import { CurrencyCode, TradeRoute } from '../types';
import { formatCurrency } from '../utils/formatters';
import { Anchor, Clock, Ship, ShieldCheck, ArrowRight, Compass } from 'lucide-react';

interface TradeRouteMatrixProps {
  currency: CurrencyCode;
  onSelectRouteForRfq: (route: TradeRoute) => void;
}

export const TradeRouteMatrix: React.FC<TradeRouteMatrixProps> = ({
  currency,
  onSelectRouteForRfq,
}) => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>(TRADE_ROUTES[0].id);

  const activeRoute = TRADE_ROUTES.find(r => r.id === selectedRouteId) || TRADE_ROUTES[0];

  return (
    <section id="trade-corridors" className="py-16 border-y border-slate-200 bg-slate-100 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-700 font-bold mb-1">
            <Compass className="w-4 h-4" />
            <span>Multimodal Maritime Corridors & Port Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight">
            Direct Global Shipping Routes & Deep-Water Port Infrastructure
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Consolidated container liner schedules and bulk vessel charters operating between primary Indian loading ports (JNPT & Mundra) and 48+ international deep-sea terminals.
          </p>
        </div>

        {/* Interactive Corridor Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Corridor selector buttons */}
          <div className="lg:col-span-5 space-y-3">
            {TRADE_ROUTES.map((route) => {
              const isSelected = route.id === selectedRouteId;
              return (
                <div
                  key={route.id}
                  onClick={() => setSelectedRouteId(route.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                    isSelected
                      ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-600/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600 shadow-sm'
                  }`}
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200 relative bg-slate-100">
                    <img
                      src={route.image}
                      alt={route.corridor}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[11px] font-mono uppercase text-blue-700 font-bold">{route.transitDays}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{route.frequency}</span>
                    </div>
                    <h3 className={`text-sm font-bold font-display truncate ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                      {route.corridor}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
                      <span className="truncate">{route.destinationPort}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Corridor Telemetry & Specs */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xl space-y-6">
            
            {/* Harbor Visual Banner */}
            <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-200">
              <img
                src={activeRoute.image}
                alt={activeRoute.corridor}
                loading="eager"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[11px] font-mono text-amber-300 uppercase tracking-wider block font-bold">Target Trade Lane</span>
                  <h3 className="text-xl font-bold font-display text-white">{activeRoute.corridor}</h3>
                </div>
                <div className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md text-amber-400 border border-white/10">
                  <Ship className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Port to Port Visual Track */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 font-semibold">
                <span>PORT OF LOADING (POL)</span>
                <span>PORT OF DISCHARGE (POD)</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Anchor className="w-4 h-4 text-blue-700" />
                    <span>{activeRoute.originPort}</span>
                  </div>
                  <span className="text-xs text-slate-500 block">Direct Customs Bonded Yard</span>
                </div>

                {/* Animated visual transit line */}
                <div className="flex-1 flex flex-col items-center">
                  <span className="text-xs font-mono text-blue-700 font-bold mb-1">{activeRoute.transitDays}</span>
                  <div className="w-full h-0.5 bg-blue-200 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                  </div>
                  <span className="text-xs text-slate-500 mt-1">{activeRoute.frequency}</span>
                </div>

                <div className="space-y-1 text-right">
                  <div className="flex items-center justify-end gap-2 text-slate-900 font-bold text-sm">
                    <span>{activeRoute.destinationPort}</span>
                    <Anchor className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-xs text-slate-500 block">Customs Clearance Hub</span>
                </div>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-blue-700" />
                  Avg. Customs Release
                </span>
                <span className="text-lg font-bold font-mono text-slate-900 mt-1 block">
                  {activeRoute.customsAvgHours} Hours
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <Ship className="w-3.5 h-3.5 text-blue-700" />
                  Base 20' Ocean Index
                </span>
                <span className="text-lg font-bold font-mono text-blue-700 mt-1 block">
                  {formatCurrency(activeRoute.oceanFreightBaseUsd, currency)}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Bill of Lading
                </span>
                <span className="text-lg font-bold font-mono text-emerald-700 mt-1 block">
                  Express Telex Release
                </span>
              </div>
            </div>

            {/* Carrier Alliances */}
            <div className="space-y-3 pt-1">
              <div className="text-xs">
                <span className="text-slate-500 block font-mono font-medium">Contracted Container Lines:</span>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {activeRoute.carrierAlliances.map((carrier, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-medium">
                      {carrier}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA action */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Incoterms: FOB Origin or CIF Discharge Port fully serviced
              </span>
              <button
                type="button"
                onClick={() => onSelectRouteForRfq(activeRoute)}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
              >
                Inquire Rates for This Corridor
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

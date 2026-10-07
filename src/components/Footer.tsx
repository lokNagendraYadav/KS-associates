import React from 'react';
import { DivisionType } from '../types';
import { generateWhatsAppTradeLink } from '../utils/formatters';
import { Ship, Sparkles, ShieldCheck, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

interface FooterProps {
  onSelectDivision: (division: DivisionType) => void;
  onOpenRfqModal: () => void;
  onOpenCertificateModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectDivision,
  onOpenRfqModal,
  onOpenCertificateModal,
}) => {
  const whatsappDeskUrl = generateWhatsAppTradeLink({
    division: 'Global Import & Export + Cosmetics Division',
    notes: 'General overseas client trade inquiry'
  });

  return (
    <footer id="contact-desk" className="border-t border-slate-200 bg-[#071324] text-slate-400 text-xs mt-20">
      
      {/* Top Banner / Fast Contact Strip */}
      <div className="border-b border-white/10 py-8 bg-[#0b1b32]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-amber-400 flex items-center justify-center font-bold text-lg font-display shadow-md">
              KS
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-display">KS Associates International Trade Desk</h4>
              <p className="text-xs text-slate-300">Customs Clearance, Multimodal Freight Forwarding & Luxury Cosmetics Export</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={whatsappDeskUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors flex items-center gap-2 shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>WhatsApp Direct Desk</span>
            </a>
            <button
              type="button"
              onClick={onOpenRfqModal}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors shadow-sm"
            >
              Request Formal RFQ
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <span className="text-2xl font-bold tracking-tight text-white font-display block">
              KS ASSOCIATES
            </span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 block mt-0.5">
              AEO Certified Exporter & Licensed Customs Broker
            </span>
          </div>

          <p className="text-slate-400 leading-relaxed max-w-sm">
            Providing comprehensive customs brokerage, ocean & air freight forwarding, DGFT trade consultancy, and export-grade cosmetic manufacturing for international buyers.
          </p>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onOpenCertificateModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>AEO-T1, ISO 9001 & ISO 22716 Audited</span>
            </button>
          </div>
        </div>

        {/* Division 1 Navigation */}
        <div className="space-y-3">
          <h5 className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-1.5 font-bold">
            <Ship className="w-3.5 h-3.5" />
            Global Trade
          </h5>
          <ul className="space-y-2 text-slate-300">
            <li>
              <button
                type="button"
                onClick={() => {
                  onSelectDivision('import-export');
                  document.getElementById('core-services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors text-left"
              >
                Customs Clearance (JNPT/Mundra)
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  onSelectDivision('import-export');
                  document.getElementById('core-services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors text-left"
              >
                Ocean & Air Freight Forwarding
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  onSelectDivision('import-export');
                  document.getElementById('core-services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors text-left"
              >
                DGFT Matters & Export Incentives
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  onSelectDivision('import-export');
                  document.getElementById('trade-catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors text-left"
              >
                Commodity Export Inventory
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  onSelectDivision('import-export');
                  document.getElementById('trade-corridors')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors text-left"
              >
                Liner Corridors & Port Matrix
              </button>
            </li>
          </ul>
        </div>

        {/* Division 2 Navigation */}
        <div className="space-y-3">
          <h5 className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            KS Cosmetics
          </h5>
          <ul className="space-y-2 text-slate-300">
            <li>
              <button
                type="button"
                onClick={() => {
                  onSelectDivision('cosmetics');
                  document.getElementById('cosmetics-catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors text-left"
              >
                Triple-Peptide Serums
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  onSelectDivision('cosmetics');
                  document.getElementById('cosmetics-catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors text-left"
              >
                Ceramide Barrier Crèmes
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  onSelectDivision('cosmetics');
                  document.getElementById('cosmetics-catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors text-left"
              >
                Oud Royale Pure Perfume
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectDivision('cosmetics')}
                className="hover:text-white transition-colors text-left"
              >
                Private Label (OEM/ODM)
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectDivision('cosmetics')}
                className="hover:text-white transition-colors text-left"
              >
                EU CPNP & US FDA Compliance
              </button>
            </li>
          </ul>
        </div>

        {/* Port Offices & Locations */}
        <div className="space-y-3">
          <h5 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
            Operations & Port Offices
          </h5>
          <div className="space-y-2.5 text-slate-300">
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
              <span>Nhava Sheva (JNPT) & Mumbai Air Cargo Hub</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>Mundra Port Gateway & Gujarat Mineral Zone</span>
            </div>
            <div className="flex items-start gap-2 pt-2 border-t border-white/5">
              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span className="text-white">trade@ksassociates.in</span>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-white">+91 98400 01234 / +971 4 398 2100</span>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Sub-bar */}
      <div className="border-t border-white/10 py-6 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} KS Associates. All Rights Reserved. Customs Brokerage & International Cosmetic Manufacturing.
          </div>
          <div className="flex items-center gap-4">
            <span>Incoterms® 2020 Compliant</span>
            <span>·</span>
            <span>AEO-T1 Certified</span>
            <span>·</span>
            <span>ISO 9001:2015 & ISO 22716</span>
          </div>
        </div>
      </div>

    </footer>
  );
};

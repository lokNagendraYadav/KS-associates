import React, { useState } from 'react';
import { ComplianceCertificate } from '../types';
import { CERTIFICATES } from '../data/mockData';
import { X, ShieldCheck, Award, FileCheck, CheckCircle2, Download } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCertId?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  selectedCertId,
}) => {
  const [activeCert, setActiveCert] = useState<ComplianceCertificate>(
    CERTIFICATES.find(c => c.id === selectedCertId) || CERTIFICATES[0]
  );
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSimulateDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-8 bg-[#0b0f16] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-neutral-100">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold font-display text-white">Global Compliance & Audit Verification Vault</h3>
              <p className="text-xs text-neutral-400">Verifiable credentials, international accreditations, and regulatory registrations.</p>
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

        {/* 2-Column Inspector */}
        <div className="grid grid-cols-1 md:grid-cols-3 min-h-[460px]">
          
          {/* Certificate Selection List */}
          <div className="border-r border-white/10 p-4 space-y-2 bg-white/[0.01]">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block px-2 mb-2">
              Audited Credentials ({CERTIFICATES.length})
            </span>
            {CERTIFICATES.map((cert) => (
              <button
                key={cert.id}
                type="button"
                onClick={() => setActiveCert(cert)}
                className={`w-full text-left p-3 rounded-xl transition-all border ${
                  activeCert.id === cert.id
                    ? 'bg-amber-400/10 border-amber-400/40 text-white shadow-sm'
                    : 'bg-white/[0.02] border-white/5 text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-400">{cert.status}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-neutral-400">{cert.division}</span>
                </div>
                <h4 className="text-xs font-semibold text-white mt-1 line-clamp-1">{cert.title}</h4>
                <p className="text-xs text-neutral-500 line-clamp-1">{cert.accreditationBody}</p>
              </button>
            ))}
          </div>

          {/* Certificate Dossier View */}
          <div className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* Certificate badge visual */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-white pointer-events-none">
                  <Award className="w-36 h-36" />
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>AUTHENTICATED COMPLIANCE CERTIFICATE</span>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    {activeCert.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-white">{activeCert.title}</h3>
                <p className="text-xs text-neutral-300 mt-1">Accredited by: {activeCert.accreditationBody}</p>

                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-neutral-400 block font-mono">Registration Number:</span>
                    <span className="font-mono text-amber-400 font-semibold">{activeCert.certNumber}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block font-mono">Validity Period:</span>
                    <span className="font-mono text-white">{activeCert.issueDate} to {activeCert.validThrough}</span>
                  </div>
                </div>
              </div>

              {/* Certified Scope */}
              <div className="space-y-2">
                <h5 className="text-xs font-mono uppercase tracking-wider text-neutral-400">Registered Audit Scope & Standards</h5>
                <p className="text-xs text-neutral-300 leading-relaxed p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  {activeCert.scope}
                </p>
              </div>

              {/* Legal Notes */}
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <FileCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <span>
                  Official apostilled copies and notarized chamber affidavits can be attached to Letters of Credit (L/C) upon commercial contract signature.
                </span>
              </div>
            </div>

            {/* Download and Share Button */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              {downloadSuccess ? (
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  PDF Dossier Transferred to Download Queue
                </span>
              ) : (
                <span className="text-xs text-neutral-400 font-mono">
                  Document ID: {activeCert.certNumber}
                </span>
              )}

              <button
                type="button"
                onClick={handleSimulateDownload}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Verified PDF Certificate</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export type DivisionType = 'import-export' | 'cosmetics';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'AED' | 'SGD' | 'JPY';

export interface CurrencyRate {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD (1.0)
  name: string;
}

export type LanguageCode = 'en' | 'ar' | 'fr' | 'es' | 'zh' | 'de';

export type FontTheme = 'corporate' | 'enterprise' | 'luxury' | 'stargroup';

export interface FontThemeOption {
  id: FontTheme;
  name: string;
  displayFont: string;
  bodyFont: string;
  description: string;
  tag: string;
}

export interface CommodityItem {
  id: string;
  name: string;
  image: string;
  category: 'Agro & Spices' | 'Industrial Minerals' | 'Textiles & Fiber' | 'Specialty Chemicals & Hardware';
  origin: string;
  hsCode: string;
  purity: string;
  moisture: string;
  packaging: string;
  moq: string;
  basePriceUsd: number; // per MT or unit
  priceUnit: string;
  leadTimeDays: number;
  description: string;
  specs: { [key: string]: string };
  inspectionBodies: string[];
  inStock: boolean;
  featured: boolean;
}

export interface CosmeticProduct {
  id: string;
  name: string;
  image: string;
  category: 'Active Serums' | 'Barrier Creams' | 'Artisanal Fragrance' | 'Clinical Cleansers' | 'Hair & Scalp';
  volume: string;
  keyActives: string[];
  skinType: string;
  certifications: string[];
  basePriceUsd: number; // per unit at base wholesale tier
  moqUnits: number;
  leadTimeWeeks: number;
  description: string;
  clinicalResults: string;
  inciList: string[];
  packagingOptions: string[];
  exportApprovals: string[];
  privateLabelAvailable: boolean;
  sampleKitAvailable: boolean;
  featured: boolean;
}

export interface TradeRoute {
  id: string;
  corridor: string;
  image: string;
  originPort: string;
  destinationPort: string;
  transitDays: string;
  frequency: string;
  primaryCargo: string;
  carrierAlliances: string[];
  customsAvgHours: number;
  oceanFreightBaseUsd: number;
}

export interface ComplianceCertificate {
  id: string;
  title: string;
  division: 'All' | 'Import-Export' | 'Cosmetics';
  accreditationBody: string;
  certNumber: string;
  issueDate: string;
  validThrough: string;
  scope: string;
  status: 'Verified Active' | 'Audited 2026';
}

export interface RfqDraft {
  division: DivisionType;
  fullName: string;
  companyName: string;
  corporateEmail: string;
  phoneWhatsapp: string;
  destinationCountry: string;
  destinationPort: string;
  incoterm: 'FOB' | 'CIF' | 'CFR' | 'DDP' | 'EXW';
  shippingMode: '20FT FCL' | '40FT HC' | 'LCL Consolidation' | 'Air Cargo Expedited';
  selectedItemName: string;
  quantityEst: string;
  targetDeliveryDate: string;
  additionalNotes: string;
}

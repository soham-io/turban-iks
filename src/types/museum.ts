export type TurbanDifficulty = 'Beginner friendly' | 'Intermediate' | 'Expert';

export type TurbanStyleCategory =
  | 'Traditional'
  | 'Royal'
  | 'Contemporary'
  | 'Ceremonial'
  | 'Regional';

export type TryOnPresetId =
  | 'jodhpuri-safa'
  | 'punjabi-dastar'
  | 'kolhapuri-pheta'
  | 'mysore-peta';

export interface TutorialStep {
  phase: string;
  title: string;
  beginnerInstruction: string;
  detailedInstruction: string;
  clothLengthNote: string;
  wrapAngleDeg: number;
  layerCount: number;
}

export interface GalleryImage {
  url: string;
  viewLabel: string;
  caption: string;
  sourceAttribution: string;
}

export interface Turban {
  id: string;
  accessionNumber: string;
  name: string;
  localName: string;
  classification: 'Safa' | 'Pagri' | 'Pagdi' | 'Dastar' | 'Pheta' | 'Peta' | 'Khandwa' | 'Topi & Pagri';
  region: string;
  subRegion: string;
  summary: string;
  description: string;
  historicalOrigin: string;
  culturalMeaning: string;
  verificationNote: string;
  occasions: string[];
  colors: string[];
  colorHexes: string[];
  fabric: string;
  fabricCategory: 'Cotton' | 'Silk' | 'Bandhani' | 'Printed fabrics' | 'Wool & Handloom' | 'Other traditional textiles';
  style: TurbanStyleCategory;
  difficulty: TurbanDifficulty;
  typicalLengthMeters: string;
  featuredFact: string;
  image: string;
  gallery: GalleryImage[];
  tryOnPresetId: TryOnPresetId;
  tryOnSupported: boolean;
  tutorialSteps: TutorialStep[];
}

export interface RegionProfile {
  id: string;
  name: string;
  localTerms: string[];
  headline: string;
  summary: string;
  climateAndCraft: string;
  culturalNote: string;
  image: string;
  representativeTurbanIds: string[];
  mapCoordinates: { x: number; y: number };
}

export interface HeritageStory {
  slug: string;
  chapterNumber: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  author: string;
  publishedDate: string;
  heroImage: string;
  excerpt: string;
  pullQuote: string;
  marginNotes: { title: string; body: string }[];
  sections: { heading: string; paragraphs: string[] }[];
}

export interface OccasionRecommendation {
  turban: Turban;
  whyItFits: string;
  suggestedColors: string[];
  culturalEtiquette: string;
}

export interface GalleryExhibitItem {
  id: string;
  title: string;
  category: 'Royal turbans' | 'Wedding turbans' | 'Festival turbans' | 'Everyday turbans' | 'Historical turbans' | 'Modern turbans' | 'Colour collections' | 'Textile and craftsmanship';
  region: string;
  turbanId: string;
  turbanName: string;
  caption: string;
  sourceAttribution: string;
  image: string;
}

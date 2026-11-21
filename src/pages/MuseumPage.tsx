import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MuseumImage } from '../components/MuseumImage';

interface MuseumWing {
  title: string;
  terminology: string;
  description: string;
  regionFilter: string;
  image: string;
  documented: boolean;
}

const MUSEUM_WINGS: MuseumWing[] = [
  {
    title: 'Turbans of Rajasthan',
    terminology: 'Safa · Pagri · Paag',
    description:
      'Celebrated for Leheriya waves, Bandhani knots, and twenty-metre Jaipur Pagris shaped for desert heat and royal festivals.',
    regionFilter: 'Rajasthan',
    image: '/src/assets/images/turban_jodhpuri_safa_1795273980634.jpg',
    documented: true,
  },
  {
    title: 'Turbans of Punjab',
    terminology: 'Dastar · Pagg · Dumalla',
    description:
      'A living spiritual crown in Sikh heritage—tied freshly each morning in crisp Full Voile cotton as an emblem of dignity and equality.',
    regionFilter: 'Punjab',
    image: '/src/assets/images/turban_punjabi_dastar_1795273980615.jpg',
    documented: true,
  },
  {
    title: 'Turbans of Maharashtra',
    terminology: 'Pheta · Puneri Pagdi · Mawala',
    description:
      'Bridging the vibrant saffron Kolhapuri Pheta with its pleated fan crest and the GI-protected sculpted Puneri silk Pagdi.',
    regionFilter: 'Maharashtra',
    image: '/src/assets/images/turban_kolhapuri_pheta_1795273980861.jpg',
    documented: true,
  },
  {
    title: 'Turbans of Gujarat',
    terminology: 'Paghdi · Moliyu · Halari',
    description:
      'Thick handspun khadi cotton cushions and vermilion Bandhani borders crafted across Saurashtra and Kutch.',
    regionFilter: 'Gujarat',
    image: '/src/assets/images/turban_gujarati_pagdi_1795273980645.jpg',
    documented: true,
  },
  {
    title: 'Turbans of Haryana',
    terminology: 'Khandwa · Pagri',
    description:
      'Broad, crisp unbleached white cotton turbans symbolising rural panchayat wisdom, stewardship, and sworn brotherhood.',
    regionFilter: 'Haryana',
    image: '/src/assets/images/turban_haryanvi_khandwa_1795273980120.jpg',
    documented: true,
  },
  {
    title: 'Turbans of Himachal Pradesh',
    terminology: 'Kulluvi Pagri · Thethu · Topi',
    description:
      'Handspun Himalayan sheep wool coils and structured mountain headwear accented by geometric pit-loom patti strips.',
    regionFilter: 'Himachal Pradesh',
    image: '/src/assets/images/turban_himachali_kulluvi_1795273980673.jpg',
    documented: true,
  },
  {
    title: 'Turbans of Kashmir',
    terminology: 'Dastar · Lungi',
    description:
      'Softly coiled unstarched linen and fine pashmina wrapped gently over embroidered skullcaps in the Kashmir valley.',
    regionFilter: 'Kashmir',
    image: '/src/assets/images/turban_kashmiri_dastar_1795273980898.jpg',
    documented: true,
  },
  {
    title: 'Turbans of South India',
    terminology: 'Mysore Peta · Talappavu · Mundas',
    description:
      'Featuring Karnataka’s luminous mulberry silk and gold-zari Mysore Peta presented at civic honours alongside lighter coastal headcloths.',
    regionFilter: 'South India',
    image: '/src/assets/images/turban_mysore_peta_1795273980342.jpg',
    documented: true,
  },
];

const ADDITIONAL_TRADITIONS = [
  {
    title: 'Turbans of Uttar Pradesh',
    terminology: 'Muretha · Pagri · Safa',
    note: 'From Braj and Awadh courtly wraps to agrarian cotton murethas tied across the Gangetic plains during harvests and weddings.',
  },
  {
    title: 'Turbans of Central India',
    terminology: 'Indori Safa · Malwi Pagri · Gond Headwear',
    note: 'Influenced by Maratha courts in Indore and Gwalior alongside vibrant rural Malwa cotton wraps.',
  },
  {
    title: 'Tribal & Indigenous Headwear Traditions',
    terminology: 'Bhil Pheta · Naga Feather Headgear · Toda & Adivasi Wraps',
    note: 'Distinct indigenous traditions where woven bamboo, natural fibers, feathers, or bright cotton wraps mark community identity and seasonal rites.',
  },
];

const TERMINOLOGY_LEXICON = [
  {
    term: 'Pagdi / Pagri',
    detail: 'Usually a long, narrower strip (up to 18–22 m) wound into tight horizontal ridges or pre-sculpted over a mould (as in Pune).',
  },
  {
    term: 'Safa',
    detail: 'Wider and shorter than a Pagri (typically ~9 m × 1.1 m), tied diagonally across the temples with a trailing shoulder cloth (shimla).',
  },
  {
    term: 'Dastar',
    detail: 'In Sikh heritage, a sacred daily article of faith and sovereignty; in Kashmir, a softly wound linen or pashmina turban over an inner cap.',
  },
  {
    term: 'Pheta / Peta',
    detail: 'In Maharashtra, a celebratory hand-wrapped Pheta with an upright pleated fan; in Mysuru, a silk-and-zari Peta symbolising civic honour.',
  },
];

export function MuseumPage() {
  return (
    <div className="pt-24 pb-24 bg-[#F6F1E7] text-[#1B1B1B]">
      {/* Exhibition Introduction */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 pb-20 border-b border-[#1B1B1B]/12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#641F2B] font-semibold">
              Permanent Exhibition · Introduction
            </p>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#1B1B1B] leading-[1.08]">
              An India.
              <br />
              <span className="italic text-[#641F2B]">A thousand ways</span>
              <br />
              to wear a turban.
            </h1>
            <p className="editorial-dropcap text-base sm:text-lg text-[#1B1B1B]/80 leading-relaxed max-w-xl">
              Across the Indian subcontinent, headwear is never uniform. Geography, climate,
              sacred faith, artisanal looms, and regional history shaped hundreds of distinct
              ways to fold an uncut length of cloth. What appears at a glance to be similar fabric
              reveals vastly different names, silhouettes, and meanings every few hundred kilometres.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1B1B1B] text-[#F6F1E7] text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#641F2B] transition-colors whitespace-nowrap shrink-0"
              >
                Browse Complete Catalog
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#1B1B1B]/25 text-[#1B1B1B] text-xs font-semibold uppercase tracking-[0.12em] hover:border-[#641F2B] hover:text-[#641F2B] transition-colors whitespace-nowrap shrink-0"
              >
                View Photographic Gallery
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="arch-frame overflow-hidden border border-[#1B1B1B]/15 bg-[#EBE3D3] shadow-sm">
              <MuseumImage
                src="/src/assets/images/museum_textile_archive_1795273980409.jpg"
                alt="Handwoven Indian turban textiles displayed beneath a carved sandstone arch"
                loading="eager"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <p className="text-xs font-serif italic text-[#1B1B1B]/60 mt-3 text-center">
              Fig. 1 — Exhibition plinths featuring ivory khadi cotton, saffron mulberry silk, and maroon zari brocade.
            </p>
          </div>
        </div>
      </section>

      {/* Regional Terminology Distinction */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 border-b border-[#1B1B1B]/12">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-[#641F2B] font-semibold">
            Curatorial Lexicon
          </p>
          <h2 className="font-editorial text-2xl sm:text-3xl text-[#1B1B1B] mt-2">
            Words carry geometry: Pagdi, Safa, Dastar, and Pheta
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TERMINOLOGY_LEXICON.map((item) => (
            <div key={item.term} className="pt-4 border-t border-[#641F2B]/35 space-y-2">
              <h3 className="font-editorial text-xl text-[#1B1B1B]">{item.term}</h3>
              <p className="text-sm text-[#1B1B1B]/75 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Regional Exhibition Wings */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#641F2B] font-semibold">
              Regional Galleries
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1B1B1B] mt-2">
              Explore by Indian Region
            </h2>
          </div>
          <Link
            to="/map"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#641F2B] hover:text-[#B75E40]"
          >
            Open Interactive Cultural Map
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MUSEUM_WINGS.map((wing) => (
            <Link
              key={wing.title}
              to={`/explore?region=${encodeURIComponent(wing.regionFilter)}`}
              className="group bg-[#F6F1E7] border border-[#1B1B1B]/12 hover:border-[#641F2B] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] bg-[#EBE3D3] overflow-hidden">
                  <MuseumImage
                    src={wing.image}
                    alt={wing.title}
                    fallbackTitle={wing.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#641F2B] font-medium">
                    {wing.terminology}
                  </p>
                  <h3 className="font-editorial text-xl text-[#1B1B1B] group-hover:text-[#641F2B] transition-colors">
                    {wing.title}
                  </h3>
                  <p className="text-sm text-[#1B1B1B]/75 leading-relaxed">
                    {wing.description}
                  </p>
                </div>
              </div>
              <div className="px-5 py-3.5 border-t border-[#1B1B1B]/10 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.1em] text-[#1B1B1B]/75 group-hover:text-[#641F2B]">
                <span>Enter Gallery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Regional & Indigenous Traditions Under Archival Expansion */}
        <div className="pt-8 border-t border-[#1B1B1B]/12">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.18em] text-[#1B1B1B]/55 font-semibold">
              Expanding Archival Research Wings
            </p>
            <h3 className="font-editorial text-2xl text-[#1B1B1B] mt-1">
              Central, Gangetic &amp; Indigenous Headwear Traditions
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ADDITIONAL_TRADITIONS.map((item) => (
              <div
                key={item.title}
                className="p-6 bg-[#EBE3D3]/45 border border-[#1B1B1B]/12 space-y-2.5"
              >
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#641F2B] font-medium">
                  {item.terminology}
                </p>
                <h4 className="font-editorial text-xl text-[#1B1B1B]">{item.title}</h4>
                <p className="text-sm text-[#1B1B1B]/75 leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { museumApi } from '../services/museumApi';
import type { RegionProfile } from '../types/museum';
import { MuseumImage } from './MuseumImage';

interface RegionalPolygon {
  id: string;
  label: string;
  d: string;
  labelX: number;
  labelY: number;
}

const INDIA_SILHOUETTE_PATH =
  'M202,22 L238,24 L268,46 L278,86 L252,118 L276,142 L318,176 L372,196 L432,198 L470,178 L498,196 L486,238 L452,258 L412,248 L382,272 L352,326 L306,368 L286,422 L272,482 L248,546 L224,578 L206,540 L192,478 L174,412 L152,356 L112,336 L88,304 L116,278 L112,244 L138,214 L158,178 L172,134 L168,94 L184,54 Z';

const REGIONAL_POLYGONS: RegionalPolygon[] = [
  {
    id: 'Kashmir',
    label: 'Kashmir',
    d: 'M184,52 L204,26 L236,28 L264,48 L268,84 L240,104 L196,102 L174,84 Z',
    labelX: 222,
    labelY: 70,
  },
  {
    id: 'Himachal Pradesh',
    label: 'Himachal',
    d: 'M216,102 L252,102 L272,126 L252,150 L218,144 L208,122 Z',
    labelX: 242,
    labelY: 126,
  },
  {
    id: 'Punjab',
    label: 'Punjab',
    d: 'M172,112 L212,112 L216,154 L182,164 L164,142 Z',
    labelX: 192,
    labelY: 140,
  },
  {
    id: 'Haryana',
    label: 'Haryana',
    d: 'M192,162 L228,154 L238,194 L204,204 L186,184 Z',
    labelX: 214,
    labelY: 180,
  },
  {
    id: 'Rajasthan',
    label: 'Rajasthan',
    d: 'M136,198 L194,182 L214,226 L198,274 L148,284 L112,248 Z',
    labelX: 162,
    labelY: 236,
  },
  {
    id: 'Gujarat',
    label: 'Gujarat',
    d: 'M112,268 L156,282 L166,324 L132,348 L92,318 L94,288 Z',
    labelX: 128,
    labelY: 312,
  },
  {
    id: 'Maharashtra',
    label: 'Maharashtra',
    d: 'M162,334 L248,332 L268,376 L232,424 L178,412 L156,368 Z',
    labelX: 208,
    labelY: 378,
  },
  {
    id: 'South India',
    label: 'Karnataka / South',
    d: 'M186,424 L252,428 L272,492 L242,554 L208,546 L186,478 Z',
    labelX: 226,
    labelY: 486,
  },
];

export function IndiaCulturalMap() {
  const [regions, setRegions] = useState<RegionProfile[]>([]);
  const [selectedId, setSelectedId] = useState<string>('Rajasthan');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    museumApi
      .getRegions()
      .then((res) => {
        if (!active) return;
        setRegions(res.regions);
        setLoading(false);
      })
      .catch(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const activeRegion =
    regions.find((r) => r.id === selectedId) || regions[0] || null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
      {/* Interactive Stylized Map Panel */}
      <div className="lg:col-span-6 bg-[#EBE3D3]/65 border border-[#1B1B1B]/12 p-6 sm:p-8 flex flex-col justify-between">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#1B1B1B]/10">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[#641F2B] font-semibold">
              Interactive Cartography
            </p>
            <h3 className="font-editorial text-xl text-[#1B1B1B] mt-0.5">
              Select a region to inspect its lineage
            </h3>
          </div>
          <span className="font-mono text-xs text-[#1B1B1B]/55 tabular-nums">
            8 ARCHIVED REGIONS
          </span>
        </div>

        <div className="relative my-4 flex items-center justify-center">
          <svg
            viewBox="55 10 475 585"
            className="w-full max-w-[460px] h-auto select-none"
            role="img"
            aria-label="Interactive cultural map of India showing regional turban traditions"
          >
            {/* Architectural latitude/longitude cartographic lines */}
            <g stroke="rgba(27,27,27,0.07)" strokeWidth="1" strokeDasharray="3 4">
              <line x1="65" y1="120" x2="515" y2="120" />
              <line x1="65" y1="240" x2="515" y2="240" />
              <line x1="65" y1="360" x2="515" y2="360" />
              <line x1="65" y1="480" x2="515" y2="480" />
              <line x1="160" y1="20" x2="160" y2="580" />
              <line x1="280" y1="20" x2="280" y2="580" />
              <line x1="400" y1="20" x2="400" y2="580" />
            </g>

            {/* Subcontinent base silhouette */}
            <path
              d={INDIA_SILHOUETTE_PATH}
              fill="#F6F1E7"
              stroke="rgba(27,27,27,0.22)"
              strokeWidth="1.5"
            />

            {/* Eastern & Central contextual note */}
            <text
              x="345"
              y="262"
              className="fill-[#1B1B1B]/40 text-[10px] font-sans tracking-wider uppercase"
              textAnchor="middle"
            >
              Gangetic &amp; Central Plains
            </text>
            <circle cx="345" cy="244" r="3" fill="#B49A62" opacity="0.6" />

            {/* Interactive Regional Territories */}
            {REGIONAL_POLYGONS.map((poly) => {
              const isActive = poly.id === selectedId;
              return (
                <g
                  key={poly.id}
                  onClick={() => setSelectedId(poly.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedId(poly.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  aria-label={`Select ${poly.id} turban traditions`}
                  className="cursor-pointer focus:outline-none group"
                >
                  <path
                    d={poly.d}
                    fill={isActive ? '#641F2B' : '#DCC9A6'}
                    fillOpacity={isActive ? 0.92 : 0.72}
                    stroke={isActive ? '#1B1B1B' : '#B75E40'}
                    strokeWidth={isActive ? 1.8 : 1.1}
                    className="transition-colors duration-200 group-hover:fill-[#B75E40] group-hover:fill-opacity-85"
                  />
                  <circle
                    cx={poly.labelX}
                    cy={poly.labelY - 11}
                    r={isActive ? 4.5 : 3}
                    fill={isActive ? '#F6F1E7' : '#641F2B'}
                  />
                  <text
                    x={poly.labelX}
                    y={poly.labelY + 4}
                    textAnchor="middle"
                    className={`text-[10.5px] font-semibold tracking-wide pointer-events-none transition-colors ${
                      isActive ? 'fill-[#F6F1E7]' : 'fill-[#1B1B1B]'
                    }`}
                  >
                    {poly.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Accessible quick region selector buttons for keyboard & small screens */}
        <div className="pt-4 border-t border-[#1B1B1B]/10 flex flex-wrap gap-2">
          {REGIONAL_POLYGONS.map((poly) => {
            const active = poly.id === selectedId;
            return (
              <button
                key={poly.id}
                type="button"
                onClick={() => setSelectedId(poly.id)}
                className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 border transition-colors ${
                  active
                    ? 'bg-[#641F2B] text-[#F6F1E7] border-[#641F2B]'
                    : 'bg-[#F6F1E7] text-[#1B1B1B]/80 border-[#1B1B1B]/15 hover:border-[#641F2B]'
                }`}
              >
                {poly.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Region Curatorial Dossier */}
      <div className="lg:col-span-6 bg-[#F6F1E7] border border-[#1B1B1B]/12 flex flex-col justify-between">
        {loading ? (
          <div className="p-8 text-sm text-[#1B1B1B]/60">Loading regional archive...</div>
        ) : activeRegion ? (
          <>
            <div>
              <div className="aspect-[16/10] bg-[#EBE3D3] overflow-hidden">
                <MuseumImage
                  src={activeRegion.image}
                  alt={`${activeRegion.name} turban tradition`}
                  fallbackTitle={activeRegion.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6 sm:p-8 space-y-5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#641F2B] font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activeRegion.name}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#1B1B1B]/70">
                    Regional Names: {activeRegion.localTerms.join(' / ')}
                  </span>
                </div>

                <div>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#1B1B1B]">
                    {activeRegion.headline}
                  </h3>
                  <p className="text-sm sm:text-base text-[#1B1B1B]/80 leading-relaxed mt-3">
                    {activeRegion.summary}
                  </p>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#1B1B1B]/10 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.12em] text-[#1B1B1B]/55 font-semibold">
                      Climate &amp; Textile Craft
                    </dt>
                    <dd className="text-[#1B1B1B]/80 mt-1 leading-relaxed">
                      {activeRegion.climateAndCraft}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.12em] text-[#1B1B1B]/55 font-semibold">
                      Cultural Etiquette
                    </dt>
                    <dd className="text-[#1B1B1B]/80 mt-1 leading-relaxed">
                      {activeRegion.culturalNote}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-5 bg-[#EBE3D3]/50 border-t border-[#1B1B1B]/10 flex flex-wrap items-center justify-between gap-4">
              <Link
                to={`/explore?region=${encodeURIComponent(activeRegion.name)}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B1B1B] text-[#F6F1E7] text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#641F2B] transition-colors whitespace-nowrap shrink-0"
              >
                Enter {activeRegion.name} Collection
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to={`/turbans/${activeRegion.representativeTurbanIds[0]}`}
                className="text-xs font-semibold uppercase tracking-[0.1em] text-[#641F2B] hover:text-[#B75E40] transition-colors"
              >
                Inspect Featured Style
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

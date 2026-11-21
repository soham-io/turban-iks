import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { museumApi } from '../services/museumApi';
import type { Turban } from '../types/museum';
import { TurbanCard } from '../components/TurbanCard';

const REGIONS = [
  'All',
  'Rajasthan',
  'Punjab',
  'Maharashtra',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Kashmir',
  'South India',
];

const OCCASIONS = [
  'All',
  'Wedding',
  'Groom',
  'Festival',
  'Religious occasion',
  'Cultural celebration',
  'Everyday traditional wear',
  'Royal or ceremonial occasion',
  'Formal event',
];

const COLORS = [
  { name: 'All', hex: '' },
  { name: 'Red', hex: '#641F2B' },
  { name: 'Saffron', hex: '#D4622B' },
  { name: 'White', hex: '#F6F1E7' },
  { name: 'Yellow', hex: '#D9A441' },
  { name: 'Pink', hex: '#D9778A' },
  { name: 'Blue', hex: '#1F305E' },
  { name: 'Green', hex: '#7C8872' },
  { name: 'Multicolour', hex: '#B75E40' },
];

const STYLES = ['All', 'Traditional', 'Royal', 'Contemporary', 'Ceremonial', 'Regional'];

const FABRICS = [
  'All',
  'Cotton',
  'Silk',
  'Bandhani',
  'Printed fabrics',
  'Wool & Handloom',
  'Other traditional textiles',
];

const DIFFICULTIES = ['All', 'Beginner friendly', 'Intermediate', 'Expert'];

export function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [region, setRegion] = useState(searchParams.get('region') || 'All');
  const [occasion, setOccasion] = useState(searchParams.get('occasion') || 'All');
  const [color, setColor] = useState(searchParams.get('color') || 'All');
  const [style, setStyle] = useState(searchParams.get('style') || 'All');
  const [fabric, setFabric] = useState(searchParams.get('fabric') || 'All');
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') || 'All');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const [turbans, setTurbans] = useState<Turban[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sync URL parameters when filters change
  useEffect(() => {
    const next = new URLSearchParams();
    if (query.trim()) next.set('q', query.trim());
    if (region !== 'All') next.set('region', region);
    if (occasion !== 'All') next.set('occasion', occasion);
    if (color !== 'All') next.set('color', color);
    if (style !== 'All') next.set('style', style);
    if (fabric !== 'All') next.set('fabric', fabric);
    if (difficulty !== 'All') next.set('difficulty', difficulty);
    setSearchParams(next, { replace: true });
  }, [query, region, occasion, color, style, fabric, difficulty, setSearchParams]);

  // Fetch filtered turbans from Express backend
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    museumApi
      .getTurbans({
        q: query.trim(),
        region,
        occasion,
        color,
        style,
        fabric,
        difficulty,
      })
      .then((res) => {
        if (!active) return;
        setTurbans(res.turbans);
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Unable to load archive.');
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [query, region, occasion, color, style, fabric, difficulty]);

  const activeFilterCount = [region, occasion, color, style, fabric, difficulty].filter(
    (v) => v !== 'All'
  ).length + (query.trim() ? 1 : 0);

  const clearFilters = () => {
    setQuery('');
    setRegion('All');
    setOccasion('All');
    setColor('All');
    setStyle('All');
    setFabric('All');
    setDifficulty('All');
  };

  return (
    <div className="pt-24 pb-24 bg-[#F6F1E7] text-[#1B1B1B] min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
        {/* Page Header */}
        <header className="pt-6 pb-8 border-b border-[#1B1B1B]/12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[#641F2B] font-semibold">
              Archival Collection
            </p>
            <h1 className="font-editorial text-4xl sm:text-5xl text-[#1B1B1B]">
              Turban Explorer
            </h1>
            <p className="text-base text-[#1B1B1B]/75 leading-relaxed">
              Filter documented Indian turbans across region, occasion, natural colour, textile
              tradition, and tying craft.
            </p>
          </div>

          <div className="w-full lg:w-96">
            <label htmlFor="turban-search" className="sr-only">
              Explore turbans, regions, traditions
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-[#1B1B1B]/45 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                id="turban-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Explore turbans, regions, traditions..."
                className="w-full pl-11 pr-4 py-3 bg-[#EBE3D3]/45 border border-[#1B1B1B]/20 text-sm text-[#1B1B1B] placeholder:text-[#1B1B1B]/45 focus:outline-none focus:border-[#641F2B]"
              />
            </div>
          </div>
        </header>

        {/* Filter Bar & Controls */}
        <section aria-label="Archive Filters" className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setShowFiltersMobile((v) => !v)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 border border-[#1B1B1B]/20 text-xs font-semibold uppercase tracking-[0.1em]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {showFiltersMobile ? 'Hide Filters' : 'Filter Archive'}
              {activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
            </button>

            <div className="text-xs text-[#1B1B1B]/65 font-mono tabular-nums">
              {loading
                ? 'SEARCHING ARCHIVE...'
                : `${turbans.length} DOCUMENTED ${turbans.length === 1 ? 'ARTIFACT' : 'ARTIFACTS'}`}
            </div>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#641F2B] hover:text-[#B75E40]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear Filters ({activeFilterCount})
              </button>
            )}
          </div>

          <div
            className={`${
              showFiltersMobile ? 'grid' : 'hidden lg:grid'
            } grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-5 bg-[#EBE3D3]/45 border border-[#1B1B1B]/12`}
          >
            <div>
              <label
                htmlFor="filter-region"
                className="block text-[11px] uppercase tracking-[0.14em] text-[#1B1B1B]/60 font-semibold mb-1.5"
              >
                Region
              </label>
              <select
                id="filter-region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#F6F1E7] border border-[#1B1B1B]/15 text-sm focus:outline-none focus:border-[#641F2B]"
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r === 'All' ? 'All Regions' : r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="filter-occasion"
                className="block text-[11px] uppercase tracking-[0.14em] text-[#1B1B1B]/60 font-semibold mb-1.5"
              >
                Occasion
              </label>
              <select
                id="filter-occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#F6F1E7] border border-[#1B1B1B]/15 text-sm focus:outline-none focus:border-[#641F2B]"
              >
                {OCCASIONS.map((o) => (
                  <option key={o} value={o}>
                    {o === 'All' ? 'All Occasions' : o}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="filter-style"
                className="block text-[11px] uppercase tracking-[0.14em] text-[#1B1B1B]/60 font-semibold mb-1.5"
              >
                Style
              </label>
              <select
                id="filter-style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#F6F1E7] border border-[#1B1B1B]/15 text-sm focus:outline-none focus:border-[#641F2B]"
              >
                {STYLES.map((s) => (
                  <option key={s} value={s}>
                    {s === 'All' ? 'All Styles' : s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="filter-fabric"
                className="block text-[11px] uppercase tracking-[0.14em] text-[#1B1B1B]/60 font-semibold mb-1.5"
              >
                Fabric
              </label>
              <select
                id="filter-fabric"
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#F6F1E7] border border-[#1B1B1B]/15 text-sm focus:outline-none focus:border-[#641F2B]"
              >
                {FABRICS.map((f) => (
                  <option key={f} value={f}>
                    {f === 'All' ? 'All Fabrics' : f}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="filter-difficulty"
                className="block text-[11px] uppercase tracking-[0.14em] text-[#1B1B1B]/60 font-semibold mb-1.5"
              >
                Tying Complexity
              </label>
              <select
                id="filter-difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#F6F1E7] border border-[#1B1B1B]/15 text-sm focus:outline-none focus:border-[#641F2B]"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {d === 'All' ? 'All Levels' : d}
                  </option>
                ))}
              </select>
            </div>

            {/* Colour Swatches Row */}
            <div className="sm:col-span-2 lg:col-span-5 pt-3 border-t border-[#1B1B1B]/10 flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.14em] text-[#1B1B1B]/60 font-semibold mr-2">
                Colour:
              </span>
              {COLORS.map((c) => {
                const active = color === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c.name)}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium border whitespace-nowrap shrink-0 transition-colors ${
                      active
                        ? 'bg-[#1B1B1B] text-[#F6F1E7] border-[#1B1B1B]'
                        : 'bg-[#F6F1E7] text-[#1B1B1B]/80 border-[#1B1B1B]/15 hover:border-[#641F2B]'
                    }`}
                  >
                    {c.hex && (
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-[#1B1B1B]/25"
                        style={{ backgroundColor: c.hex }}
                      />
                    )}
                    <span>{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Results Grid */}
        {error ? (
          <div className="p-10 bg-[#EBE3D3]/50 border border-[#641F2B]/30 text-center space-y-3">
            <p className="font-editorial text-xl text-[#641F2B]">Unable to reach the archive</p>
            <p className="text-sm text-[#1B1B1B]/75">{error}</p>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-[420px] bg-[#EBE3D3]/55 border border-[#1B1B1B]/10 animate-pulse"
              />
            ))}
          </div>
        ) : turbans.length === 0 ? (
          <div className="p-14 bg-[#EBE3D3]/45 border border-[#1B1B1B]/12 text-center space-y-4">
            <h2 className="font-editorial text-2xl text-[#1B1B1B]">
              No matching turban traditions found
            </h2>
            <p className="text-sm text-[#1B1B1B]/70 max-w-md mx-auto">
              Try broadening your region, fabric, or colour combination to view more artifacts in
              the collection.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="px-6 py-3 bg-[#641F2B] text-[#F6F1E7] text-xs font-semibold uppercase tracking-[0.12em]"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {turbans.map((turban) => (
              <TurbanCard key={turban.id} turban={turban} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

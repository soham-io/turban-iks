import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { museumApi } from '../services/museumApi';
import type { GalleryExhibitItem } from '../types/museum';
import { MuseumImage } from '../components/MuseumImage';

const CATEGORIES = [
  'All',
  'Royal turbans',
  'Wedding turbans',
  'Festival turbans',
  'Everyday turbans',
  'Historical turbans',
  'Colour collections',
  'Textile and craftsmanship',
];

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [items, setItems] = useState<GalleryExhibitItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    museumApi
      .getGallery(selectedCategory)
      .then((res) => {
        if (!active) return;
        setItems(res.items);
        setLoading(false);
      })
      .catch(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [selectedCategory]);

  // Keyboard navigation in fullscreen lightbox
  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowRight') {
        setLightboxIdx((i) => (i === null ? null : (i + 1) % items.length));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIdx((i) => (i === null ? null : (i - 1 + items.length) % items.length));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, items.length]);

  const activeItem = lightboxIdx !== null ? items[lightboxIdx] : null;

  return (
    <div className="pt-24 pb-24 bg-[#F6F1E7] text-[#1B1B1B]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
        <header className="pt-6 pb-8 border-b border-[#1B1B1B]/12 max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[#641F2B] font-semibold">
            Visual Exhibition
          </p>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#1B1B1B]">
            Turban Gallery
          </h1>
          <p className="text-base text-[#1B1B1B]/75 leading-relaxed">
            Editorial documentary portraits, exhibition plinths, and close-up textile studies
            from across India. Click any photograph to inspect fullscreen.
          </p>
        </header>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = cat === selectedCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setLightboxIdx(null);
                }}
                className={`px-3.5 py-2 text-xs font-medium border whitespace-nowrap shrink-0 transition-colors ${
                  active
                    ? 'bg-[#1B1B1B] text-[#F6F1E7] border-[#1B1B1B]'
                    : 'bg-[#F6F1E7] text-[#1B1B1B]/80 border-[#1B1B1B]/15 hover:border-[#641F2B]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Exhibition Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-[#EBE3D3]/60 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {items.map((item, idx) => (
              <figure
                key={item.id}
                className="group bg-[#F6F1E7] border border-[#1B1B1B]/12 flex flex-col justify-between"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIdx(idx)}
                  className="relative aspect-[4/3] w-full bg-[#EBE3D3] overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-[#641F2B]"
                >
                  <MuseumImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-3 right-3 p-2 bg-black/65 text-[#F6F1E7] opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </button>

                <figcaption className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#641F2B]">
                    <span>{item.region}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#1B1B1B]/60">{item.category}</span>
                  </div>
                  <h2 className="font-editorial text-xl text-[#1B1B1B]">{item.title}</h2>
                  <p className="text-xs text-[#1B1B1B]/75 leading-relaxed">{item.caption}</p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-[#1B1B1B]/55">
                    <span>{item.sourceAttribution}</span>
                    <Link
                      to={`/turbans/${item.turbanId}`}
                      className="font-semibold uppercase tracking-wider text-[#641F2B] hover:underline"
                    >
                      {item.turbanName}
                    </Link>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Viewer */}
      {activeItem && lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#111111]/95 text-[#F6F1E7] flex flex-col justify-between p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs font-mono tabular-nums text-[#DCC9A6]">
              PLATE {lightboxIdx + 1} OF {items.length} · {activeItem.region.toUpperCase()}
            </div>
            <button
              type="button"
              onClick={() => setLightboxIdx(null)}
              aria-label="Close fullscreen viewer"
              className="p-2 border border-white/20 hover:border-[#DCC9A6]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center gap-4 my-4 min-h-0">
            <button
              type="button"
              onClick={() =>
                setLightboxIdx((lightboxIdx - 1 + items.length) % items.length)
              }
              aria-label="Previous image"
              className="p-3 border border-white/20 hover:border-[#DCC9A6] shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] flex items-center justify-center overflow-hidden">
              <MuseumImage
                src={activeItem.image}
                alt={activeItem.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <button
              type="button"
              onClick={() => setLightboxIdx((lightboxIdx + 1) % items.length)}
              aria-label="Next image"
              className="p-3 border border-white/20 hover:border-[#DCC9A6] shrink-0"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="max-w-3xl mx-auto w-full text-center space-y-1.5 border-t border-white/15 pt-4">
            <h3 className="font-editorial text-2xl">{activeItem.title}</h3>
            <p className="text-sm text-[#F6F1E7]/75">{activeItem.caption}</p>
            <p className="text-xs text-[#DCC9A6]">
              {activeItem.turbanName} · {activeItem.sourceAttribution}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

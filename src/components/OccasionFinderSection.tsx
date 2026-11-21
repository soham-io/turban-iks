import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { museumApi } from '../services/museumApi';
import type { OccasionRecommendation } from '../types/museum';
import { MuseumImage } from './MuseumImage';

const OCCASIONS = [
  'Wedding',
  'Reception',
  'Festival',
  'Religious celebration',
  'Independence Day',
  'Cultural event',
  'Family celebration',
  'Traditional photoshoot',
  'Everyday wear',
];

export function OccasionFinderSection() {
  const [selectedOccasion, setSelectedOccasion] = useState<string>('Wedding');
  const [recommendations, setRecommendations] = useState<OccasionRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    museumApi
      .getRecommendations(selectedOccasion)
      .then((res) => {
        if (!active) return;
        setRecommendations(res.recommendations);
        setLoading(false);
      })
      .catch(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [selectedOccasion]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {OCCASIONS.map((occ) => {
          const active = occ === selectedOccasion;
          return (
            <button
              key={occ}
              type="button"
              onClick={() => setSelectedOccasion(occ)}
              className={`px-4 py-2.5 text-xs sm:text-sm font-medium border whitespace-nowrap shrink-0 transition-colors duration-200 ${
                active
                  ? 'bg-[#641F2B] text-[#F6F1E7] border-[#641F2B]'
                  : 'bg-[#F6F1E7] text-[#1B1B1B]/80 border-[#1B1B1B]/15 hover:border-[#641F2B]'
              }`}
            >
              {occ}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="h-96 bg-[#EBE3D3]/60 border border-[#1B1B1B]/10 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <article
              key={rec.turban.id}
              className="bg-[#F6F1E7] border border-[#1B1B1B]/12 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] bg-[#EBE3D3] overflow-hidden">
                  <MuseumImage
                    src={rec.turban.image}
                    alt={rec.turban.name}
                    fallbackTitle={rec.turban.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#641F2B] font-medium">
                    <span>{rec.turban.region}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#1B1B1B]/65">{rec.turban.classification}</span>
                  </div>

                  <h3 className="font-editorial text-2xl text-[#1B1B1B]">
                    {rec.turban.name}
                  </h3>

                  <p className="text-sm text-[#1B1B1B]/80 leading-relaxed">
                    {rec.whyItFits}
                  </p>

                  <div className="pt-3 border-t border-[#1B1B1B]/10 space-y-2 text-xs">
                    <div>
                      <span className="uppercase tracking-[0.1em] text-[#1B1B1B]/55 font-semibold">
                        Suggested Colours:{' '}
                      </span>
                      <span className="text-[#1B1B1B]/85">
                        {rec.suggestedColors.join(' · ')}
                      </span>
                    </div>
                    <div>
                      <span className="uppercase tracking-[0.1em] text-[#1B1B1B]/55 font-semibold">
                        Cultural Note:{' '}
                      </span>
                      <span className="text-[#1B1B1B]/75">{rec.culturalEtiquette}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-[#EBE3D3]/45 border-t border-[#1B1B1B]/10 flex items-center justify-between gap-4">
                <Link
                  to={`/try-on?turban=${encodeURIComponent(rec.turban.id)}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#641F2B] hover:text-[#B75E40] transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Try This Turban
                </Link>
                <Link
                  to={`/turbans/${rec.turban.id}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#1B1B1B]/75 hover:text-[#1B1B1B] transition-colors"
                >
                  Read History
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

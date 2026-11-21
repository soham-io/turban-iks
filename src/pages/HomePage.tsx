import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Camera, RefreshCw } from 'lucide-react';
import { museumApi } from '../services/museumApi';
import type { Turban } from '../types/museum';
import { MuseumImage } from '../components/MuseumImage';
import { IndiaCulturalMap } from '../components/IndiaCulturalMap';
import { OccasionFinderSection } from '../components/OccasionFinderSection';
import { ShortFilmPlayer } from '../components/ShortFilmPlayer';

export function HomePage() {
  const [featured, setFeatured] = useState<Turban | null>(null);
  const [featuredDate, setFeaturedDate] = useState<string>('');
  const [featuredOffset, setFeaturedOffset] = useState(0);

  useEffect(() => {
    let active = true;
    museumApi
      .getFeatured(featuredOffset)
      .then((res) => {
        if (!active) return;
        setFeatured(res.turban);
        setFeaturedDate(res.dateLabel);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [featuredOffset]);

  return (
    <div className="bg-[#F6F1E7] text-[#1B1B1B]">
      {/* 1. CINEMATIC FULL-SCREEN HERO */}
      <section className="relative min-h-[92vh] lg:min-h-screen flex items-end overflow-hidden bg-[#1B1B1B]">
        <motion.div
          initial={{ scale: 1.06, opacity: 0.85 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <MuseumImage
            src="/src/assets/images/hero_turban_portrait_1795273975279.jpg"
            alt="Rajasthani gentleman wearing a crimson and saffron Bandhani Safa beneath sandstone palace arches"
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14110F]/92 via-[#14110F]/45 to-[#14110F]/30" />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-16 sm:pb-20">
          <div className="max-w-3xl space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs uppercase tracking-[0.22em] text-[#DCC9A6] font-medium"
            >
              PAGDI — The Turban Museum of India
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="font-editorial text-4xl sm:text-6xl lg:text-[4.25rem] text-[#F6F1E7] leading-[1.06] tracking-tight"
            >
              More than a turban.
              <br />
              <span className="italic text-[#DCC9A6]">A legacy you wear.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-base sm:text-lg text-[#F6F1E7]/85 max-w-xl leading-relaxed"
            >
              Across the landscapes of India, a single piece of cloth carries centuries of
              identity, pride, tradition, and belonging.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/museum"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#F6F1E7] text-[#1B1B1B] text-xs font-semibold uppercase tracking-[0.14em] hover:bg-[#DCC9A6] transition-colors whitespace-nowrap shrink-0"
              >
                Explore the Museum
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/try-on"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-[#F6F1E7]/50 text-[#F6F1E7] text-xs font-semibold uppercase tracking-[0.14em] hover:bg-[#F6F1E7]/10 transition-colors whitespace-nowrap shrink-0"
              >
                <Camera className="w-4 h-4" />
                Try a Turban
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scrolling Cultural Ribbon */}
      <div className="bg-[#641F2B] text-[#F6F1E7] py-3 overflow-hidden border-y border-[#DCC9A6]/20">
        <div className="flex whitespace-nowrap animate-marquee text-[11px] uppercase tracking-[0.26em] font-medium">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-8 pr-8">
              <span>Identity</span>
              <span aria-hidden="true">·</span>
              <span>Heritage</span>
              <span aria-hidden="true">·</span>
              <span>Honour</span>
              <span aria-hidden="true">·</span>
              <span>Craft</span>
              <span aria-hidden="true">·</span>
              <span>Celebration</span>
              <span aria-hidden="true">·</span>
              <span>Tradition</span>
              <span aria-hidden="true">·</span>
              <span>Brotherhood</span>
              <span aria-hidden="true">·</span>
              <span>Belonging</span>
              <span aria-hidden="true">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. TURBAN OF THE DAY — ARCHIVAL SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#1B1B1B]/12">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#641F2B] font-semibold">
              Daily Curatorial Selection {featuredDate ? `· ${featuredDate}` : ''}
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1B1B1B] mt-2">
              Turban of the Day
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setFeaturedOffset((o) => o + 1)}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#1B1B1B]/75 hover:text-[#641F2B] transition-colors self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Next Featured Artifact
          </button>
        </div>

        {featured ? (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch bg-[#EBE3D3]/45 border border-[#1B1B1B]/12">
            <div className="lg:col-span-6 bg-[#EBE3D3] overflow-hidden min-h-[320px]">
              <MuseumImage
                src={featured.image}
                alt={featured.name}
                fallbackTitle={featured.name}
                className="w-full h-full object-cover object-top lg:max-h-[480px]"
              />
            </div>

            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#1B1B1B]/60">
                  <span className="font-mono tabular-nums">{featured.accessionNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#641F2B] font-medium">{featured.region}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featured.subRegion}</span>
                </div>

                <div>
                  <h3 className="font-editorial text-3xl sm:text-4xl text-[#1B1B1B]">
                    {featured.name}
                  </h3>
                  <p className="text-sm text-[#1B1B1B]/60 mt-1">{featured.localName}</p>
                </div>

                <p className="text-base text-[#1B1B1B]/80 leading-relaxed">
                  {featured.summary}
                </p>

                <div className="p-5 bg-[#F6F1E7] border border-[#1B1B1B]/10 space-y-1.5">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#B75E40] font-semibold">
                    Curatorial Field Note
                  </p>
                  <p className="font-editorial italic text-lg text-[#1B1B1B]">
                    {featured.featuredFact}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to={`/turbans/${featured.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B1B1B] text-[#F6F1E7] text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#641F2B] transition-colors whitespace-nowrap shrink-0"
                >
                  Explore Artifact
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to={`/try-on?turban=${encodeURIComponent(featured.id)}`}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#1B1B1B]/25 text-[#1B1B1B] text-xs font-semibold uppercase tracking-[0.12em] hover:border-[#641F2B] hover:text-[#641F2B] transition-colors whitespace-nowrap shrink-0"
                >
                  Try Virtually
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10 h-80 bg-[#EBE3D3]/50 border border-[#1B1B1B]/10 animate-pulse" />
        )}
      </section>

      {/* 3. INTERACTIVE CULTURAL MAP OF INDIA */}
      <section className="bg-[#EBE3D3]/45 border-y border-[#1B1B1B]/12 py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-[0.18em] text-[#641F2B] font-semibold">
              Regional Geography
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1B1B1B]">
              One subcontinent. Distinct living vocabularies.
            </h2>
            <p className="text-base text-[#1B1B1B]/75 leading-relaxed">
              Every Indian landscape shapes how cloth is spun, dyed, and wrapped. Select any
              territory below to discover its traditional names, climate logic, and collection.
            </p>
          </div>

          <IndiaCulturalMap />
        </div>
      </section>

      {/* 4. TURBAN FOR YOUR OCCASION */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-24 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1B1B1B]/12">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-[0.18em] text-[#641F2B] font-semibold">
              Living Tradition Finder
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1B1B1B]">
              Which turban belongs to your moment?
            </h2>
            <p className="text-base text-[#1B1B1B]/75 leading-relaxed">
              From weddings and family milestones to national celebrations and everyday heritage,
              discover styles aligned with authentic regional etiquette.
            </p>
          </div>
          <Link
            to="/occasions"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#641F2B] hover:text-[#B75E40] whitespace-nowrap shrink-0"
          >
            Open Full Occasion Guide
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <OccasionFinderSection />
      </section>

      {/* 5. SHORT FILM — CINEMATIC EXPERIENCE */}
      <section className="bg-[#1B1B1B] text-[#F6F1E7] py-20 lg:py-24 border-t border-[#DCC9A6]/15">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs uppercase tracking-[0.18em] text-[#DCC9A6] font-semibold">
                Museum Cinema Exhibition
              </p>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#F6F1E7]">
                A legacy woven in cloth.
              </h2>
              <p className="text-base text-[#F6F1E7]/75 leading-relaxed">
                Experience the interactive documentary storyboard tracing how an uncut length of
                cotton or silk carries memory across generations.
              </p>
            </div>
            <Link
              to="/film"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#DCC9A6] hover:text-[#F6F1E7] whitespace-nowrap shrink-0"
            >
              Read Full Narrative Script
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <ShortFilmPlayer />
        </div>
      </section>

      {/* 6. CLOSING INVITATION TO TRY-ON STUDIO */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-24">
        <div className="bg-[#EBE3D3]/60 border border-[#1B1B1B]/12 p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#641F2B] font-semibold">
              Virtual Try-On Studio
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#1B1B1B] leading-tight">
              Tradition isn’t meant to stay in photographs.{' '}
              <span className="italic text-[#641F2B]">It’s meant to be worn.</span>
            </h2>
            <p className="text-base text-[#1B1B1B]/75 max-w-2xl leading-relaxed">
              Open your camera or upload a portrait in our live studio to see how a Royal
              Jodhpuri Safa, Patiala Shahi Dastar, Kolhapuri Pheta, or Mysore Peta frames your
              features.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              to="/try-on"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#641F2B] text-[#F6F1E7] text-xs font-semibold uppercase tracking-[0.14em] hover:bg-[#4E1620] transition-colors whitespace-nowrap shrink-0"
            >
              <Camera className="w-4 h-4" />
              Launch Try-On Studio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

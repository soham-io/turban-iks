import { OccasionFinderSection } from '../components/OccasionFinderSection';

export function OccasionsPage() {
  return (
    <div className="pt-24 pb-24 bg-[#F6F1E7] text-[#1B1B1B] min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
        <header className="pt-6 pb-8 border-b border-[#1B1B1B]/12 max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[#641F2B] font-semibold">
            Cultural Occasion Guide
          </p>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#1B1B1B]">
            Which turban belongs to your moment?
          </h1>
          <p className="text-base text-[#1B1B1B]/75 leading-relaxed">
            Whether preparing for a wedding procession, family gathering, national celebration,
            or everyday heritage wear, select your occasion to explore authentic regional pairings
            and etiquette.
          </p>
        </header>

        <OccasionFinderSection />
      </div>
    </div>
  );
}

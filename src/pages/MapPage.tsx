import { IndiaCulturalMap } from '../components/IndiaCulturalMap';

export function MapPage() {
  return (
    <div className="pt-24 pb-24 bg-[#F6F1E7] text-[#1B1B1B] min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
        <header className="pt-6 pb-8 border-b border-[#1B1B1B]/12 max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[#641F2B] font-semibold">
            Regional Cartography
          </p>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#1B1B1B]">
            Cultural Map of Indian Turbans
          </h1>
          <p className="text-base text-[#1B1B1B]/75 leading-relaxed">
            Explore how geography, climate, and community shaped India’s turban traditions from
            the Kashmir valley to the Mysuru plateau.
          </p>
        </header>

        <IndiaCulturalMap />
      </div>
    </div>
  );
}

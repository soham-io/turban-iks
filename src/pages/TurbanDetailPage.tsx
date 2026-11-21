import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Camera, Info } from 'lucide-react';
import { museumApi } from '../services/museumApi';
import type { Turban } from '../types/museum';
import { MuseumImage } from '../components/MuseumImage';
import { TurbanCard } from '../components/TurbanCard';

export function TurbanDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [turban, setTurban] = useState<Turban | null>(null);
  const [related, setRelated] = useState<Turban[]>([]);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    let active = true;
    setLoading(true);
    setNotFound(false);
    setActiveImageIdx(0);
    setActiveStepIdx(0);

    museumApi
      .getTurbanById(id)
      .then((res) => {
        if (!active) return;
        setTurban(res.turban);
        setRelated(res.related);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setNotFound(true);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="pt-28 pb-24 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="h-[540px] bg-[#EBE3D3]/60 border border-[#1B1B1B]/10 animate-pulse" />
      </div>
    );
  }

  if (notFound || !turban) {
    return (
      <div className="pt-32 pb-24 max-w-3xl mx-auto px-5 text-center space-y-5">
        <h1 className="font-editorial text-3xl text-[#1B1B1B]">Artifact Not Found</h1>
        <p className="text-sm text-[#1B1B1B]/70">
          This accession entry could not be located in the current exhibition catalog.
        </p>
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B1B1B] text-[#F6F1E7] text-xs font-semibold uppercase tracking-[0.12em]"
        >
          Return to Explorer
        </Link>
      </div>
    );
  }

  const gallery =
    turban.gallery.length > 0
      ? turban.gallery
      : [
          {
            url: turban.image,
            viewLabel: 'Primary View',
            caption: turban.summary,
            sourceAttribution: 'PAGDI Archive',
          },
        ];

  const currentSlide = gallery[activeImageIdx] || gallery[0];
  const currentTutorialStep = turban.tutorialSteps[activeStepIdx] || turban.tutorialSteps[0];

  return (
    <div className="pt-24 pb-24 bg-[#F6F1E7] text-[#1B1B1B]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-16">
        {/* Breadcrumb */}
        <div className="pt-4">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#1B1B1B]/65 hover:text-[#641F2B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Turban Explorer
          </Link>
        </div>

        {/* Pattern B: Museum Accession Hero Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Gallery Viewer */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[4/3] bg-[#EBE3D3] border border-[#1B1B1B]/12 overflow-hidden">
              <MuseumImage
                src={currentSlide.url}
                alt={`${turban.name} — ${currentSlide.viewLabel}`}
                loading="eager"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#1B1B1B]/65">
              <p className="font-serif italic">
                {currentSlide.viewLabel} — {currentSlide.caption}
              </p>
              <span className="shrink-0">{currentSlide.sourceAttribution}</span>
            </div>

            {gallery.length > 1 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {gallery.map((item, idx) => (
                  <button
                    key={item.viewLabel}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`px-3.5 py-2 text-xs font-medium border transition-colors ${
                      idx === activeImageIdx
                        ? 'bg-[#1B1B1B] text-[#F6F1E7] border-[#1B1B1B]'
                        : 'bg-[#EBE3D3]/50 text-[#1B1B1B]/80 border-[#1B1B1B]/15 hover:border-[#641F2B]'
                    }`}
                  >
                    {item.viewLabel}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accession Metadata & Primary CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <p className="font-mono text-xs tracking-wider uppercase text-[#641F2B]">
                {turban.accessionNumber} · {turban.region} ({turban.subRegion})
              </p>
              <h1 className="font-editorial text-4xl sm:text-5xl text-[#1B1B1B]">
                {turban.name}
              </h1>
              <p className="text-base text-[#1B1B1B]/60">{turban.localName}</p>
            </div>

            <p className="text-base text-[#1B1B1B]/80 leading-relaxed">
              {turban.description}
            </p>

            {/* Primary Try-On CTA */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to={`/try-on?turban=${encodeURIComponent(turban.id)}`}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#641F2B] text-[#F6F1E7] text-xs font-semibold uppercase tracking-[0.14em] hover:bg-[#4E1620] transition-colors whitespace-nowrap shrink-0"
              >
                <Camera className="w-4 h-4" />
                Try This Turban
              </Link>
              <Link
                to={`/craft?turban=${encodeURIComponent(turban.id)}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#1B1B1B]/25 text-[#1B1B1B] text-xs font-semibold uppercase tracking-[0.12em] hover:border-[#641F2B] hover:text-[#641F2B] transition-colors whitespace-nowrap shrink-0"
              >
                Full Tying Guide
              </Link>
            </div>

            {/* Museum Accession Definition List */}
            <dl className="divide-y divide-[#1B1B1B]/10 border-y border-[#1B1B1B]/12 text-sm">
              <div className="py-3 grid grid-cols-3 gap-4">
                <dt className="text-xs uppercase tracking-[0.12em] text-[#1B1B1B]/55 font-semibold">
                  Classification
                </dt>
                <dd className="col-span-2 text-[#1B1B1B]">{turban.classification}</dd>
              </div>
              <div className="py-3 grid grid-cols-3 gap-4">
                <dt className="text-xs uppercase tracking-[0.12em] text-[#1B1B1B]/55 font-semibold">
                  Material &amp; Craft
                </dt>
                <dd className="col-span-2 text-[#1B1B1B]">{turban.fabric}</dd>
              </div>
              <div className="py-3 grid grid-cols-3 gap-4">
                <dt className="text-xs uppercase tracking-[0.12em] text-[#1B1B1B]/55 font-semibold">
                  Dimensions
                </dt>
                <dd className="col-span-2 font-mono tabular-nums text-[#1B1B1B]">
                  {turban.typicalLengthMeters}
                </dd>
              </div>
              <div className="py-3 grid grid-cols-3 gap-4">
                <dt className="text-xs uppercase tracking-[0.12em] text-[#1B1B1B]/55 font-semibold">
                  Occasions
                </dt>
                <dd className="col-span-2 text-[#1B1B1B]">
                  {turban.occasions.join(' · ')}
                </dd>
              </div>
              <div className="py-3 grid grid-cols-3 gap-4">
                <dt className="text-xs uppercase tracking-[0.12em] text-[#1B1B1B]/55 font-semibold">
                  Tying Complexity
                </dt>
                <dd className="col-span-2 text-[#1B1B1B]">{turban.difficulty}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Historical Context & Cultural Meaning */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10 border-t border-[#1B1B1B]/12">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#641F2B] font-semibold">
              Historical Context &amp; Evolution
            </p>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#1B1B1B]">
              Origins in {turban.subRegion}
            </h2>
            <p className="text-base text-[#1B1B1B]/80 leading-relaxed">
              {turban.historicalOrigin}
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#641F2B] font-semibold">
              Cultural Meaning
            </p>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#1B1B1B]">
              Identity, Etiquette &amp; Symbolism
            </h2>
            <p className="text-base text-[#1B1B1B]/80 leading-relaxed">
              {turban.culturalMeaning}
            </p>

            <div className="p-4 bg-[#EBE3D3]/60 border border-[#1B1B1B]/12 flex items-start gap-3 text-xs text-[#1B1B1B]/75 leading-relaxed">
              <Info className="w-4 h-4 text-[#641F2B] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold uppercase tracking-wider text-[#1B1B1B]">
                  Historical Verification Note:{' '}
                </span>
                {turban.verificationNote}
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Wrapping Sequence Preview */}
        {turban.tutorialSteps.length > 0 && currentTutorialStep && (
          <section className="bg-[#EBE3D3]/45 border border-[#1B1B1B]/12 p-6 sm:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#641F2B] font-semibold">
                  Wrapping Technique
                </p>
                <h2 className="font-editorial text-2xl sm:text-3xl text-[#1B1B1B] mt-1">
                  How the {turban.name} is Constructed
                </h2>
              </div>
              <Link
                to={`/craft?turban=${encodeURIComponent(turban.id)}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#641F2B] hover:text-[#B75E40]"
              >
                Open Interactive Workshop
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {turban.tutorialSteps.map((step, idx) => (
                <button
                  key={step.phase}
                  type="button"
                  onClick={() => setActiveStepIdx(idx)}
                  className={`px-3 py-2 text-xs font-medium border transition-colors ${
                    idx === activeStepIdx
                      ? 'bg-[#641F2B] text-[#F6F1E7] border-[#641F2B]'
                      : 'bg-[#F6F1E7] text-[#1B1B1B]/80 border-[#1B1B1B]/15 hover:border-[#641F2B]'
                  }`}
                >
                  {step.phase}
                </button>
              ))}
            </div>

            <div className="bg-[#F6F1E7] border border-[#1B1B1B]/12 p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-2">
                <p className="font-mono text-xs text-[#641F2B] uppercase">
                  {currentTutorialStep.phase} · {currentTutorialStep.clothLengthNote}
                </p>
                <h3 className="font-editorial text-2xl text-[#1B1B1B]">
                  {currentTutorialStep.title}
                </h3>
                <p className="text-sm sm:text-base text-[#1B1B1B]/80 leading-relaxed">
                  {currentTutorialStep.detailedInstruction}
                </p>
              </div>
              <div className="md:col-span-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={activeStepIdx === 0}
                  onClick={() => setActiveStepIdx((i) => Math.max(0, i - 1))}
                  className="px-4 py-2 border border-[#1B1B1B]/20 text-xs font-semibold uppercase disabled:opacity-35"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={activeStepIdx >= turban.tutorialSteps.length - 1}
                  onClick={() =>
                    setActiveStepIdx((i) =>
                      Math.min(turban.tutorialSteps.length - 1, i + 1)
                    )
                  }
                  className="px-4 py-2 bg-[#1B1B1B] text-[#F6F1E7] text-xs font-semibold uppercase disabled:opacity-35"
                >
                  Next Step
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Related Artifacts */}
        {related.length > 0 && (
          <section className="space-y-8 pt-6 border-t border-[#1B1B1B]/12">
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#1B1B1B]">
              Related Traditions in the Archive
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <TurbanCard key={item.id} turban={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

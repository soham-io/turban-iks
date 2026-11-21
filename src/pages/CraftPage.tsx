import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Camera, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { museumApi } from '../services/museumApi';
import type { Turban } from '../types/museum';
import { MuseumImage } from '../components/MuseumImage';

export function CraftPage() {
  const [searchParams] = useSearchParams();
  const requestedId = searchParams.get('turban');

  const [turbans, setTurbans] = useState<Turban[]>([]);
  const [selectedId, setSelectedId] = useState<string>(requestedId || 'jodhpuri-safa');
  const [guideLevel, setGuideLevel] = useState<'beginner' | 'detailed'>('beginner');
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    museumApi
      .getTurbans()
      .then((res) => {
        if (!active) return;
        setTurbans(res.turbans);
        if (requestedId && res.turbans.some((t) => t.id === requestedId)) {
          setSelectedId(requestedId);
        }
        setLoading(false);
      })
      .catch(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [requestedId]);

  const activeTurban = turbans.find((t) => t.id === selectedId) || turbans[0];
  const steps = activeTurban?.tutorialSteps || [];
  const currentStep = steps[activeStepIdx] || steps[0];
  const progressPct =
    steps.length > 0 ? Math.round(((activeStepIdx + 1) / steps.length) * 100) : 0;

  return (
    <div className="pt-24 pb-24 bg-[#F6F1E7] text-[#1B1B1B]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-14">
        {/* Hero Intro */}
        <header className="pt-6 pb-10 border-b border-[#1B1B1B]/12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#641F2B] font-semibold">
              Living Craftsmanship
            </p>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#1B1B1B] leading-[1.08]">
              A cloth.
              <br />
              A craft.
              <br />
              <span className="italic text-[#641F2B]">An art.</span>
            </h1>
            <p className="text-base text-[#1B1B1B]/80 leading-relaxed max-w-xl">
              To tie a turban by hand is to dialogue with tension, grain, and proportion. Explore
              how an uncut strip of cotton or silk transforms through seven structured phases.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="aspect-[16/10] bg-[#EBE3D3] border border-[#1B1B1B]/12 overflow-hidden">
              <MuseumImage
                src="/src/assets/images/craft_tying_hands_1795273981267.jpg"
                alt="Master artisan pleating hand-dyed Bandhani silk"
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Workshop Controls */}
        <section className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Turban Tradition Selector */}
            <div className="flex flex-wrap gap-2">
              {turbans.slice(0, 6).map((t) => {
                const active = t.id === activeTurban?.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(t.id);
                      setActiveStepIdx(0);
                    }}
                    className={`px-3.5 py-2 text-xs font-medium border whitespace-nowrap shrink-0 transition-colors ${
                      active
                        ? 'bg-[#641F2B] text-[#F6F1E7] border-[#641F2B]'
                        : 'bg-[#F6F1E7] text-[#1B1B1B]/80 border-[#1B1B1B]/15 hover:border-[#641F2B]'
                    }`}
                  >
                    {t.name}
                  </button>
                );
              })}
            </div>

            {/* Beginner vs Detailed Toggle */}
            <div className="inline-flex border border-[#1B1B1B]/20 bg-[#EBE3D3]/50 p-1 self-start">
              <button
                type="button"
                onClick={() => setGuideLevel('beginner')}
                className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
                  guideLevel === 'beginner'
                    ? 'bg-[#1B1B1B] text-[#F6F1E7]'
                    : 'text-[#1B1B1B]/75 hover:text-[#1B1B1B]'
                }`}
              >
                Beginner Guide
              </button>
              <button
                type="button"
                onClick={() => setGuideLevel('detailed')}
                className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
                  guideLevel === 'detailed'
                    ? 'bg-[#1B1B1B] text-[#F6F1E7]'
                    : 'text-[#1B1B1B]/75 hover:text-[#1B1B1B]'
                }`}
              >
                Detailed Guide
              </button>
            </div>
          </div>

          {loading || !activeTurban || !currentStep ? (
            <div className="h-96 bg-[#EBE3D3]/55 border border-[#1B1B1B]/10 animate-pulse" />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left: Step List & Progress */}
              <div className="lg:col-span-4 bg-[#EBE3D3]/45 border border-[#1B1B1B]/12 p-6 space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono tabular-nums text-[#641F2B]">
                    <span>PROGRESS</span>
                    <span>
                      STEP {activeStepIdx + 1} OF {steps.length} ({progressPct}%)
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#1B1B1B]/10 overflow-hidden">
                    <div
                      className="h-full bg-[#641F2B] transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                <ol className="space-y-1.5">
                  {steps.map((step, idx) => {
                    const active = idx === activeStepIdx;
                    const completed = idx < activeStepIdx;
                    return (
                      <li key={step.phase}>
                        <button
                          type="button"
                          onClick={() => setActiveStepIdx(idx)}
                          className={`w-full text-left px-3.5 py-2.5 border transition-colors flex items-center justify-between gap-2 ${
                            active
                              ? 'bg-[#F6F1E7] border-[#641F2B] text-[#1B1B1B]'
                              : 'bg-transparent border-transparent hover:bg-[#F6F1E7]/60 text-[#1B1B1B]/75'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="font-mono text-[10px] uppercase tracking-wider text-[#641F2B]">
                              {step.phase}
                            </div>
                            <div className="text-sm font-medium truncate">{step.title}</div>
                          </div>
                          {completed && (
                            <CheckCircle2 className="w-4 h-4 text-[#7C8872] shrink-0" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Right: Interactive Wrap Geometry Diagram & Step Instructions */}
              <div className="lg:col-span-8 bg-[#F6F1E7] border border-[#1B1B1B]/12 p-6 sm:p-10 flex flex-col justify-between gap-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  {/* Animated Wrap Geometry Diagram */}
                  <div className="md:col-span-5 bg-[#EBE3D3]/60 border border-[#1B1B1B]/10 p-6 flex flex-col items-center justify-center">
                    <svg
                      viewBox="0 0 220 220"
                      className="w-48 h-48"
                      role="img"
                      aria-label={`Wrapping geometry diagram for ${currentStep.title}`}
                    >
                      {/* Stylized head crown contour */}
                      <circle
                        cx="110"
                        cy="128"
                        r="48"
                        fill="#DCC9A6"
                        fillOpacity="0.45"
                        stroke="#1B1B1B"
                        strokeOpacity="0.25"
                        strokeWidth="1.5"
                      />
                      {/* Progressive wrap arcs based on layerCount & wrapAngleDeg */}
                      {Array.from({ length: currentStep.layerCount }).map((_, idx) => {
                        const y = 104 - idx * 8;
                        const tilt = (currentStep.wrapAngleDeg * (idx % 2 === 0 ? 1 : -1)) / 4;
                        return (
                          <g key={idx} transform={`rotate(${tilt} 110 ${y})`}>
                            <path
                              d={`M ${56 + idx * 2} ${y + 12} Q 110 ${y - 24} ${164 - idx * 2} ${
                                y + 12
                              }`}
                              fill="none"
                              stroke={idx % 2 === 0 ? '#641F2B' : '#B75E40'}
                              strokeWidth="6.5"
                              strokeLinecap="round"
                              opacity={0.85}
                            />
                          </g>
                        );
                      })}
                      <text
                        x="110"
                        y="204"
                        textAnchor="middle"
                        className="fill-[#1B1B1B]/65 text-[10px] font-mono"
                      >
                        {currentStep.clothLengthNote}
                      </text>
                    </svg>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#1B1B1B]/60 mt-2">
                      Wrap Axis: {currentStep.wrapAngleDeg}° · Active Layers: {currentStep.layerCount}
                    </p>
                  </div>

                  {/* Step Instructions */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#641F2B] font-mono uppercase">
                      <span>{currentStep.phase}</span>
                      <span aria-hidden="true">·</span>
                      <span>{activeTurban.typicalLengthMeters}</span>
                    </div>

                    <h2 className="font-editorial text-2xl sm:text-3xl text-[#1B1B1B]">
                      {currentStep.title}
                    </h2>

                    <p className="text-base text-[#1B1B1B]/85 leading-relaxed">
                      {guideLevel === 'beginner'
                        ? currentStep.beginnerInstruction
                        : currentStep.detailedInstruction}
                    </p>

                    <div className="pt-3 border-t border-[#1B1B1B]/10 text-xs text-[#1B1B1B]/65">
                      Fabric Note: {activeTurban.fabric}
                    </div>
                  </div>
                </div>

                {/* Step Navigation & Try-On Link */}
                <div className="pt-6 border-t border-[#1B1B1B]/12 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={activeStepIdx === 0}
                      onClick={() => setActiveStepIdx((i) => Math.max(0, i - 1))}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-[#1B1B1B]/20 text-xs font-semibold uppercase tracking-[0.1em] disabled:opacity-35"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    <button
                      type="button"
                      disabled={activeStepIdx >= steps.length - 1}
                      onClick={() =>
                        setActiveStepIdx((i) => Math.min(steps.length - 1, i + 1))
                      }
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#1B1B1B] text-[#F6F1E7] text-xs font-semibold uppercase tracking-[0.1em] disabled:opacity-35"
                    >
                      Next Phase
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <Link
                    to={`/try-on?turban=${encodeURIComponent(activeTurban.id)}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#641F2B] hover:text-[#B75E40]"
                  >
                    <Camera className="w-4 h-4" />
                    Try {activeTurban.name} Virtually
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

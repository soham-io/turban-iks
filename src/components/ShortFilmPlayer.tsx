import { useEffect, useRef, useState } from 'react';
import {
  Captions,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { MuseumImage } from './MuseumImage';

interface FilmScene {
  id: string;
  startSec: number;
  endSec: number;
  sceneLabel: string;
  image: string;
  narration: string;
  visualNote: string;
  isTitleCard?: boolean;
}

const TOTAL_DURATION_SEC = 72; // Concise 6-scene documentary sequence

const FILM_SCENES: FilmScene[] = [
  {
    id: 'opening',
    startSec: 0,
    endSec: 12,
    sceneLabel: 'Opening · Sound of Cloth Unfolding',
    image: '/src/assets/images/craft_tying_hands_1795273981267.jpg',
    narration: 'Before it became something you wore, it was something you inherited.',
    visualNote: 'Close-up of hand-dyed Bandhani silk unfolding in morning sunlight.',
  },
  {
    id: 'scene-2',
    startSec: 12,
    endSec: 24,
    sceneLabel: 'Scene II · Hands & Sunlight',
    image: '/src/assets/images/museum_textile_archive_1795273980409.jpg',
    narration: 'Across India, generations have wrapped their stories in cloth.',
    visualNote: 'Different turbans being folded; linen, saffron silk, and zari brocade.',
  },
  {
    id: 'scene-3',
    startSec: 24,
    endSec: 36,
    sceneLabel: 'Scene III · Across Lands',
    image: '/src/assets/images/turban_kolhapuri_pheta_1795273980861.jpg',
    narration:
      'Different lands. Different traditions. Different ways of wearing it. Yet each carries something beyond itself.',
    visualNote: 'From Marwar deserts to Kolhapur courtyards and Himalayan valleys.',
  },
  {
    id: 'scene-4',
    startSec: 36,
    endSec: 48,
    sceneLabel: 'Scene IV · Honour & Identity',
    image: '/src/assets/images/turban_punjabi_dastar_1795273980615.jpg',
    narration:
      'For some, it is honour. For some, identity. For some, celebration. For some, a connection to the people who came before.',
    visualNote: 'A wedding, a daily prayer, an elder tying folds with quiet calm.',
  },
  {
    id: 'scene-5',
    startSec: 48,
    endSec: 60,
    sceneLabel: 'Scene V · Living Heritage',
    image: '/src/assets/images/hero_turban_portrait_1795273975279.jpg',
    narration: 'Traditions survive when they are remembered. They thrive when they are lived.',
    visualNote: 'Artisans, museum archives, and a new generation stepping into the light.',
  },
  {
    id: 'finale',
    startSec: 60,
    endSec: 72,
    sceneLabel: 'Finale · PAGDI Museum',
    image: '',
    narration: "Don't just remember the tradition. Wear it forward.",
    visualNote: 'PAGDI — THE TURBAN MUSEUM OF INDIA',
    isTitleCard: true,
  },
];

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function ShortFilmPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [subtitlesOn, setSubtitlesOn] = useState(true);
  const [muted, setMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Playback timer
  useEffect(() => {
    if (!playing) return;
    const interval = window.setInterval(() => {
      setElapsed((prev) => {
        if (prev + 0.25 >= TOTAL_DURATION_SEC) {
          setPlaying(false);
          return TOTAL_DURATION_SEC;
        }
        return prev + 0.25;
      });
    }, 250);
    return () => window.clearInterval(interval);
  }, [playing]);

  // Subtle Web Audio harmonic drone when user unmutes during playback
  useEffect(() => {
    if (!playing || muted) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.25);
      }
      return;
    }
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        const ctx = new Ctx();
        const masterGain = ctx.createGain();
        masterGain.gain.value = 0;
        masterGain.connect(ctx.destination);

        // Warm tanpura-inspired soft fifth drone (D3 + A3)
        [146.83, 220.0].forEach((freq) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          osc.type = 'sine';
          osc.frequency.value = freq;
          filter.type = 'lowpass';
          filter.frequency.value = 420;
          osc.connect(filter);
          filter.connect(masterGain);
          osc.start();
        });

        audioCtxRef.current = ctx;
        gainNodeRef.current = masterGain;
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => undefined);
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0.05, audioCtxRef.current.currentTime, 0.4);
      }
    } catch {
      // Ignore Web Audio errors on restricted devices
    }
  }, [playing, muted]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => undefined);
      }
    };
  }, []);

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const togglePlay = () => {
    if (elapsed >= TOTAL_DURATION_SEC) {
      setElapsed(0);
      setPlaying(true);
    } else {
      setPlaying((p) => !p);
    }
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fullscreen unavailable in restricted iframe
    }
  };

  const currentScene =
    FILM_SCENES.find((s) => elapsed >= s.startSec && elapsed < s.endSec) ||
    FILM_SCENES[FILM_SCENES.length - 1];

  const progressPct = Math.min(100, (elapsed / TOTAL_DURATION_SEC) * 100);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#111111] text-[#F6F1E7] border border-[#DCC9A6]/20 overflow-hidden"
    >
      {/* 16:9 Cinema Stage */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0D0D0D]">
        {currentScene.isTitleCard ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center bg-[#0D0D0D]">
            <p className="font-editorial text-2xl sm:text-4xl lg:text-5xl text-[#F6F1E7] max-w-2xl leading-tight">
              Don’t just remember the tradition.
              <br />
              <span className="italic text-[#DCC9A6]">Wear it forward.</span>
            </p>
            <div className="mt-8 pt-6 border-t border-[#DCC9A6]/25">
              <p className="text-xs tracking-[0.24em] uppercase text-[#DCC9A6]">
                PAGDI — THE TURBAN MUSEUM OF INDIA
              </p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0">
            <MuseumImage
              src={currentScene.image}
              alt={currentScene.sceneLabel}
              fallbackTitle={currentScene.sceneLabel}
              className={`w-full h-full object-cover transition-transform duration-[12000ms] ease-out ${
                playing ? 'scale-105' : 'scale-100'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/35" />
          </div>
        )}

        {/* Top Scene Chapter Marker */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-[#F6F1E7]/75">
          <span className="font-mono tracking-wider uppercase">{currentScene.sceneLabel}</span>
          <span className="font-mono tabular-nums">
            {formatTime(elapsed)} / {formatTime(TOTAL_DURATION_SEC)}
          </span>
        </div>

        {/* Center Play Overlay when paused at start or mid-film */}
        {!playing && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label={elapsed > 0 && elapsed < TOTAL_DURATION_SEC ? 'Resume film' : 'Play short film'}
            className="absolute inset-0 flex flex-col items-center justify-center group focus-visible:outline-none"
          >
            <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F6F1E7]/95 text-[#1B1B1B] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105">
              <Play className="w-7 h-7 ml-1 fill-current" />
            </span>
            <span className="mt-3 text-xs uppercase tracking-[0.2em] text-[#F6F1E7]/90">
              {elapsed >= TOTAL_DURATION_SEC
                ? 'Replay Documentary Storyboard'
                : elapsed > 0
                ? 'Resume Film'
                : 'Watch Documentary Film Preview'}
            </span>
          </button>
        )}

        {/* Cinematic Subtitles */}
        {subtitlesOn && !currentScene.isTitleCard && (
          <div className="absolute bottom-14 sm:bottom-16 left-4 right-4 flex justify-center pointer-events-none">
            <div className="max-w-2xl bg-black/75 backdrop-blur-sm px-5 py-2.5 text-center border border-white/10">
              <p className="font-editorial italic text-base sm:text-xl text-[#F6F1E7]">
                “{currentScene.narration}”
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Custom Minimal Cinema Control Bar */}
      <div className="bg-[#1B1B1B] px-4 sm:px-6 py-3.5 border-t border-white/10 space-y-2.5">
        {/* Interactive Scrubber */}
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={TOTAL_DURATION_SEC}
            step={0.5}
            value={elapsed}
            aria-label="Seek film timeline"
            onChange={(e) => setElapsed(Number(e.target.value))}
            className="w-full h-1.5 accent-[#B75E40] cursor-pointer"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? 'Pause' : 'Play'}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#F6F1E7] text-[#1B1B1B] hover:bg-[#DCC9A6] transition-colors"
            >
              {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{playing ? 'Pause' : 'Play'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setElapsed(0);
                setPlaying(true);
              }}
              aria-label="Restart film"
              className="p-1.5 text-[#F6F1E7]/75 hover:text-[#F6F1E7] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? 'Unmute ambient score' : 'Mute ambient score'}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#F6F1E7]/80 hover:text-[#F6F1E7] transition-colors"
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{muted ? 'Sound Off' : 'Ambient Drone'}</span>
            </button>

            <span className="text-xs font-mono tabular-nums text-[#F6F1E7]/60">
              {Math.round(progressPct)}%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSubtitlesOn((s) => !s)}
              aria-pressed={subtitlesOn}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs border transition-colors ${
                subtitlesOn
                  ? 'border-[#DCC9A6] text-[#DCC9A6]'
                  : 'border-white/15 text-[#F6F1E7]/60'
              }`}
            >
              <Captions className="w-3.5 h-3.5" />
              <span>Subtitles</span>
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              className="p-1.5 text-[#F6F1E7]/80 hover:text-[#F6F1E7] transition-colors"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Scene Cue Selector Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-white/10 bg-[#151515]">
        {FILM_SCENES.map((scene, idx) => {
          const active = scene.id === currentScene.id;
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => setElapsed(scene.startSec)}
              className={`text-left px-3.5 py-2.5 border-r border-white/10 last:border-r-0 transition-colors ${
                active ? 'bg-[#641F2B]/60 text-[#F6F1E7]' : 'text-[#F6F1E7]/60 hover:text-[#F6F1E7]'
              }`}
            >
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#DCC9A6]">
                0{idx + 1} · {formatTime(scene.startSec)}
              </div>
              <div className="text-xs truncate mt-0.5">{scene.sceneLabel.split('·')[1] || scene.sceneLabel}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

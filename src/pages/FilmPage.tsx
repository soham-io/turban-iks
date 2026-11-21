import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { ShortFilmPlayer } from '../components/ShortFilmPlayer';

const FILM_SCRIPT = [
  {
    label: 'Opening',
    visual: 'Black screen. The sound of cloth unfolding. Close-up of woven fabric.',
    voice: '“Before it became something you wore, it was something you inherited.”',
  },
  {
    label: 'Scene II',
    visual: 'Different turbans being tied. Close-ups of hands folding pleats. Colours moving through sunlight.',
    voice: '“Across India, generations have wrapped their stories in cloth.”',
  },
  {
    label: 'Scene III',
    visual: 'Different regions, faces, silhouettes, and regional traditions across desert, plain, and mountain.',
    voice:
      '“Different lands. Different traditions. Different ways of wearing it. Yet each carries something beyond itself.”',
  },
  {
    label: 'Scene IV',
    visual: 'A wedding procession, a festival, an elder tying his turban, a young person trying one for the first time.',
    voice:
      '“For some, it is honour. For some, identity. For some, celebration. For some, a connection to the people who came before.”',
  },
  {
    label: 'Scene V',
    visual: 'The virtual museum, traditional artisans at the loom, and modern generations.',
    voice: '“Traditions survive when they are remembered. They thrive when they are lived.”',
  },
  {
    label: 'Final Scene',
    visual: 'A person confidently wearing a hand-tied turban. Fade to black.',
    voice: '“Don’t just remember the tradition. Wear it forward.”',
  },
];

export function FilmPage() {
  return (
    <div className="pt-24 pb-24 bg-[#1B1B1B] text-[#F6F1E7] min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-16">
        <header className="pt-6 pb-8 border-b border-white/12 max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[#DCC9A6] font-semibold">
            Short Documentary Exhibition
          </p>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#F6F1E7]">
            A legacy woven in cloth.
          </h1>
          <p className="text-base text-[#F6F1E7]/75 leading-relaxed">
            An interactive museum screening room presenting the six-scene documentary narrative
            and voiceover script.
          </p>
        </header>

        <ShortFilmPlayer />

        {/* Documentary Script & Curatorial Screening Notes */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6 border-t border-white/12">
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#DCC9A6] font-semibold">
              Director’s Treatment
            </p>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#F6F1E7]">
              Narrative &amp; Screening Notes
            </h2>
            <p className="text-sm text-[#F6F1E7]/75 leading-relaxed">
              This interactive screening room previews the six-chapter documentary structure (2–4
              minutes runtime). A master 4K MP4 or HLS stream can be connected directly inside
              the museum cinema player component.
            </p>
            <div className="pt-2">
              <Link
                to="/try-on"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F6F1E7] text-[#1B1B1B] text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#DCC9A6] transition-colors"
              >
                <Camera className="w-4 h-4" />
                Experience the Try-On Studio
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8 divide-y divide-white/10 border-y border-white/12">
            {FILM_SCRIPT.map((scene) => (
              <div
                key={scene.label}
                className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-baseline"
              >
                <div className="sm:col-span-3 font-mono text-xs uppercase tracking-wider text-[#DCC9A6]">
                  {scene.label}
                </div>
                <div className="sm:col-span-9 space-y-1.5">
                  <p className="font-editorial italic text-xl text-[#F6F1E7]">
                    {scene.voice}
                  </p>
                  <p className="text-xs text-[#F6F1E7]/60">{scene.visual}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

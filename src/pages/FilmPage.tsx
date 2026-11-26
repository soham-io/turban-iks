import { ShortFilmPlayer } from '../components/ShortFilmPlayer';

export function FilmPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1B1B1B] px-5 py-24 text-[#F6F1E7] sm:px-8">
      <div className="w-full max-w-5xl space-y-5">
        <h1 className="font-editorial text-2xl text-[#F6F1E7] sm:text-3xl">
          Short Film on Pagdi
        </h1>
        <ShortFilmPlayer />
      </div>
    </div>
  );
}

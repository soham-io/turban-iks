import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { MuseumPage } from './pages/MuseumPage';
import { ExplorePage } from './pages/ExplorePage';
import { TurbanDetailPage } from './pages/TurbanDetailPage';
import { TryOnStudioPage } from './pages/TryOnStudioPage';
import { CraftPage } from './pages/CraftPage';
import { StoriesPage } from './pages/StoriesPage';
import { OccasionsPage } from './pages/OccasionsPage';
import { MapPage } from './pages/MapPage';
import { GalleryPage } from './pages/GalleryPage';
import { FilmPage } from './pages/FilmPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MuseumShell() {
  const { pathname } = useLocation();
  const isTryOn = pathname.startsWith('/try-on');

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E7] text-[#1B1B1B]">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/museum" element={<MuseumPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/turbans/:id" element={<TurbanDetailPage />} />
          <Route path="/try-on" element={<TryOnStudioPage />} />
          <Route path="/occasions" element={<OccasionsPage />} />
          <Route path="/craft" element={<CraftPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/stories/:slug" element={<StoriesPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/film" element={<FilmPage />} />
        </Routes>
      </main>
      {!isTryOn && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MuseumShell />
    </BrowserRouter>
  );
}

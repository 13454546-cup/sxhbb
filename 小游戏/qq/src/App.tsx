import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Breathing } from '@/pages/Breathing';
import { NatureSounds } from '@/pages/NatureSounds';
import { Meditation } from '@/pages/Meditation';
import { Journal } from '@/pages/Journal';
import { TruthBoxPage } from '@/pages/TruthBoxPage';
import { SongGuessPage } from '@/pages/SongGuessPage';
import { useStore } from '@/store/useStore';

export default function App() {
  const { loadEntries } = useStore();

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/breathing" element={<Breathing />} />
      <Route path="/nature-sounds" element={<NatureSounds />} />
      <Route path="/meditation" element={<Meditation />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/truth-box" element={<TruthBoxPage />} />
      <Route path="/song-guess" element={<SongGuessPage />} />
    </Routes>
  );
}

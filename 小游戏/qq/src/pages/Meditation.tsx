import { Header } from '@/components/layout/Header';
import { MeditationScene } from '@/components/meditation/MeditationScene';

export const Meditation = () => {
  return (
    <div className="min-h-screen">
      <Header title="互动冥想" showBack />

      <main className="px-6 py-8">
        <div className="text-center mb-6">
          <h2 className="text-white text-xl font-bold mb-2">沉浸式互动冥想</h2>
          <p className="text-white/80 text-sm">
            随机场景 · 点击互动 · 心灵放松
          </p>
        </div>

        <MeditationScene />
      </main>
    </div>
  );
};

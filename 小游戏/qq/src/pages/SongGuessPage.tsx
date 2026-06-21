import { Header } from '@/components/layout/Header';
import { SongGuessGame } from '@/components/song-guess/SongGuessGame';

export const SongGuessPage = () => {
  return (
    <div className="min-h-screen">
      <Header title="猜歌名" showBack />
      
      <main className="px-6 py-8">
        <div className="text-center mb-6">
          <h2 className="text-white text-xl font-bold mb-2">🎵 猜歌名挑战</h2>
          <p className="text-white/80 text-sm">
            听音乐猜歌名，答对得分，答错有鼓励哦！
          </p>
        </div>
        
        <SongGuessGame />
      </main>
    </div>
  );
};
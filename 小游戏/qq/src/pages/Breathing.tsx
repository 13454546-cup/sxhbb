import { Header } from '@/components/layout/Header';
import { BreathingCircle } from '@/components/breathing/BreathingCircle';

export const Breathing = () => {
  return (
    <div className="min-h-screen">
      <Header title="呼吸练习" showBack />
      
      <main className="px-6 py-8">
        <div className="text-center mb-8">
          <p className="text-white/80 text-lg">
            跟随圆形的节奏，深呼吸放松身心
          </p>
        </div>
        
        <BreathingCircle />
      </main>
    </div>
  );
};

import { Header } from '@/components/layout/Header';
import { TruthBox } from '@/components/truth-box/TruthBox';

export const TruthBoxPage = () => {
  return (
    <div className="min-h-screen">
      <Header title="盲盒真心话" showBack />
      
      <main className="px-6 py-8">
        <div className="text-center mb-6">
          <h2 className="text-white text-xl font-bold mb-2">抽取真心话盲盒</h2>
          <p className="text-white/80 text-sm">
            每个盲盒都藏着一个真心话问题，勇敢回答或选择跳过
          </p>
        </div>
        
        <TruthBox />
      </main>
    </div>
  );
};
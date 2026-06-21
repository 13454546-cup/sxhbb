import { motion } from 'framer-motion';
import { Wind, Headphones, Sparkles, BookOpen, Gift, Music } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { FeatureCard } from '@/components/home/FeatureCard';
import { MoodSelector } from '@/components/home/MoodSelector';

export const Home = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '早上好';
    if (hour < 18) return '下午好';
    return '晚上好';
  };

  const getDate = () => {
    const date = new Date();
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  return (
    <div className="min-h-screen">
      <Header title="放松乐园" />
      
      <main className="px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">{getGreeting()}！</h2>
          <p className="text-white/80">{getDate()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <MoodSelector />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold text-white mb-6"
        >
          选择放松方式
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            icon={Wind}
            title="呼吸练习"
            description="跟随引导进行深呼吸，缓解紧张情绪"
            color="linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)"
            path="/breathing"
            delay={0.3}
          />
          <FeatureCard
            icon={Headphones}
            title="自然之声"
            description="聆听大自然的声音，放松身心"
            color="linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)"
            path="/nature-sounds"
            delay={0.4}
          />
          <FeatureCard
            icon={Sparkles}
            title="互动冥想"
            description="创造属于你的星空，平静心灵"
            color="linear-gradient(135deg, #F472B6 0%, #EC4899 100%)"
            path="/meditation"
            delay={0.5}
          />
          <FeatureCard
            icon={BookOpen}
            title="时间胶囊"
            description="记录心情变化，释放内心压力"
            color="linear-gradient(135deg, #10B981 0%, #059669 100%)"
            path="/journal"
            delay={0.6}
          />
          <FeatureCard
            icon={Gift}
            title="盲盒真心话"
            description="抽取真心话盲盒，勇敢回答或跳过"
            color="linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)"
            path="/truth-box"
            delay={0.7}
          />
          <FeatureCard
            icon={Music}
            title="猜歌名"
            description="听音乐猜歌名，答错有鼓励"
            color="linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)"
            path="/song-guess"
            delay={0.8}
          />
        </div>
      </main>
    </div>
  );
};

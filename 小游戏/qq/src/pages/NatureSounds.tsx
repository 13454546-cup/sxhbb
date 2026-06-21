import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { SoundCard, sounds, SoundCardRef } from '@/components/nature-sounds/SoundCard';

const categoryNames: Record<string, string> = {
  rain: '雨声系列',
  forest: '森林环境',
  ocean: '海洋之声',
  birds: '鸟类鸣叫',
  fire: '火焰燃烧',
};

const categoryIcons: Record<string, string> = {
  rain: '🌧️',
  forest: '🌲',
  ocean: '🌊',
  birds: '🐦',
  fire: '🔥',
};

export const NatureSounds = () => {
  const [playingSounds, setPlayingSounds] = useState<Set<string>>(new Set());
  const [volumes, setVolumes] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // 使用ref来存储所有SoundCard的引用
  const soundCardRefs = useRef<Record<string, SoundCardRef>>({});

  // 退出页面时自动关闭所有声音
  useEffect(() => {
    return () => {
      // 停止所有正在播放的声音
      setPlayingSounds(new Set());
      // 调用每个SoundCard的stop方法
      Object.values(soundCardRefs.current).forEach(ref => {
        if (ref && ref.stop) {
          ref.stop();
        }
      });
    };
  }, []);

  const toggleSound = (id: string) => {
    setPlayingSounds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const updateVolume = (id: string, volume: number) => {
    setVolumes((prev) => ({ ...prev, [id]: volume }));
  };

  const categories = [...new Set(sounds.map(s => s.category))];
  const filteredSounds = selectedCategory 
    ? sounds.filter(s => s.category === selectedCategory)
    : sounds;

  return (
    <div className="min-h-screen">
      <Header title="自然之声" showBack />
      
      <main className="px-6 py-8">
        <div className="text-center mb-6">
          <h2 className="text-white text-xl font-bold mb-2">真实自然声音合集</h2>
          <p className="text-white/80 text-sm">
            15种真实录音 · 支持混音播放 · 退出自动关闭
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-2xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === null
                ? 'bg-white text-gray-800 shadow-lg'
                : 'bg-white/30 text-white hover:bg-white/50'
            }`}
          >
            全部 ({sounds.length})
          </motion.button>
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                selectedCategory === cat
                  ? 'bg-white text-gray-800 shadow-lg'
                  : 'bg-white/30 text-white hover:bg-white/50'
              }`}
            >
              {categoryIcons[cat]} {categoryNames[cat]}
            </motion.button>
          ))}
        </div>

        {/* Sound Cards grouped by category */}
        <div className="max-w-2xl mx-auto space-y-6">
          {selectedCategory === null ? (
            // Show all sounds grouped by category
            categories.map((cat) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{categoryIcons[cat]}</span>
                  <h3 className="text-white font-bold text-lg">{categoryNames[cat]}</h3>
                  <span className="text-white/60 text-sm">
                    ({sounds.filter(s => s.category === cat).length}种)
                  </span>
                </div>
                {sounds.filter(s => s.category === cat).map((sound) => (
                  <SoundCard
                    key={sound.id}
                    ref={(el) => {
                      if (el) {
                        soundCardRefs.current[sound.id] = el;
                      }
                    }}
                    sound={sound}
                    isPlaying={playingSounds.has(sound.id)}
                    volume={volumes[sound.id] || 50}
                    onToggle={() => toggleSound(sound.id)}
                    onVolumeChange={(v) => updateVolume(sound.id, v)}
                  />
                ))}
              </motion.div>
            ))
          ) : (
            // Show filtered sounds
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{categoryIcons[selectedCategory]}</span>
                <h3 className="text-white font-bold text-lg">{categoryNames[selectedCategory]}</h3>
              </div>
              {filteredSounds.map((sound) => (
                <SoundCard
                  key={sound.id}
                  ref={(el) => {
                    if (el) {
                      soundCardRefs.current[sound.id] = el;
                    }
                  }}
                  sound={sound}
                  isPlaying={playingSounds.has(sound.id)}
                  volume={volumes[sound.id] || 50}
                  onToggle={() => toggleSound(sound.id)}
                  onVolumeChange={(v) => updateVolume(sound.id, v)}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* Playing indicator */}
        {playingSounds.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 glass-card rounded-full px-6 py-3 shadow-lg"
          >
            <p className="text-gray-700 font-medium flex items-center gap-2">
              <span className="animate-pulse">🎵</span>
              正在播放 {playingSounds.size} 种声音
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

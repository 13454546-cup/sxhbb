import { motion } from 'framer-motion';
import { Smile, Cloud, CloudRain, Frown } from 'lucide-react';
import { useStore } from '@/store/useStore';

const moodOptions = [
  { value: 'happy' as const, icon: Smile, color: 'bg-yellow-400', label: '开心' },
  { value: 'calm' as const, icon: Cloud, color: 'bg-blue-400', label: '平静' },
  { value: 'anxious' as const, icon: CloudRain, color: 'bg-orange-400', label: '焦虑' },
  { value: 'sad' as const, icon: Frown, color: 'bg-gray-400', label: '难过' },
];

export const MoodSelector = () => {
  const { currentMood, setMood } = useStore();

  return (
    <div className="glass-card rounded-3xl p-6 shadow-soft">
      <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">今天心情怎么样？</h3>
      <div className="flex justify-center gap-4">
        {moodOptions.map((mood) => {
          const Icon = mood.icon;
          const isSelected = currentMood === mood.value;
          return (
            <motion.button
              key={mood.value}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={() => setMood(mood.value)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 ${
                isSelected
                  ? 'scale-110 ring-4 ring-white shadow-lg'
                  : 'hover:scale-105 hover:bg-white/50'
              }`}
              style={{ backgroundColor: isSelected ? undefined : 'rgba(255,255,255,0.3)' }}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isSelected ? mood.color : 'bg-white/60'
                }`}
              >
                <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
              </div>
              <span
                className={`text-sm font-medium ${isSelected ? 'text-gray-800' : 'text-gray-500'}`}
              >
                {mood.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

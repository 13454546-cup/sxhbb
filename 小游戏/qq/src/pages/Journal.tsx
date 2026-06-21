import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smile, Cloud, CloudRain, Frown } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { useStore } from '@/store/useStore';

const moodConfig = {
  happy: { icon: Smile, color: 'bg-yellow-400', label: '开心' },
  calm: { icon: Cloud, color: 'bg-blue-400', label: '平静' },
  anxious: { icon: CloudRain, color: 'bg-orange-400', label: '焦虑' },
  sad: { icon: Frown, color: 'bg-gray-400', label: '难过' },
};

export const Journal = () => {
  const { journalEntries, addEntry, loadEntries } = useStore();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMood, setSelectedMood] = useState<'happy' | 'calm' | 'anxious' | 'sad'>('calm');
  const [note, setNote] = useState('');

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  useEffect(() => {
    const entry = journalEntries.find((e) => e.date === selectedDate);
    if (entry) {
      setSelectedMood(entry.mood);
      setNote(entry.note);
    } else {
      setSelectedMood('calm');
      setNote('');
    }
  }, [selectedDate, journalEntries]);

  const handleSave = () => {
    addEntry({
      date: selectedDate,
      mood: selectedMood,
      note,
      timestamp: Date.now(),
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      month: 'long',
      day: 'numeric',
    });
  };

  const recentEntries = journalEntries.slice(-5).reverse();

  return (
    <div className="min-h-screen">
      <Header title="时间胶囊" showBack />
      
      <main className="px-6 py-8">
        <div className="glass-card rounded-3xl p-6 shadow-soft mb-6">
          <div className="flex items-center gap-4 mb-6">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border-0 bg-white/50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium shadow-soft"
            >
              保存
            </button>
          </div>
          
          <div className="mb-6">
            <h4 className="text-gray-700 font-medium mb-3">今天的心情</h4>
            <div className="flex gap-4">
              {(Object.keys(moodConfig) as Array<keyof typeof moodConfig>).map((mood) => {
                const config = moodConfig[mood];
                const Icon = config.icon;
                return (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(mood)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 ${
                      selectedMood === mood
                        ? 'bg-white ring-2 ring-primary'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${config.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm text-gray-600">{config.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div>
            <h4 className="text-gray-700 font-medium mb-3">记录一下...</h4>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="写下今天的感受..."
              className="w-full h-32 px-4 py-3 rounded-xl border-0 bg-white/50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
        </div>

        {recentEntries.length > 0 && (
          <div className="glass-card rounded-3xl p-6 shadow-soft">
            <h4 className="text-gray-800 font-bold mb-4">最近记录</h4>
            <div className="space-y-3">
              {recentEntries.map((entry) => (
                <motion.div
                  key={entry.date}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white/30"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${moodConfig[entry.mood].color}`}>
                    {(() => {
                      const Icon = moodConfig[entry.mood].icon;
                      return <Icon className="w-5 h-5 text-white" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{formatDate(entry.date)}</p>
                    {entry.note && (
                      <p className="text-sm text-gray-500 truncate">{entry.note}</p>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{moodConfig[entry.mood].label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

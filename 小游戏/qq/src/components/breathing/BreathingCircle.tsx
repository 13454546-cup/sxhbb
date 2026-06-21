import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BreathingCircle = () => {
  const [phase, setPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [countdown, setCountdown] = useState(4);
  const [isRunning, setIsRunning] = useState(false);

  const breathingCycle = useCallback(() => {
    if (!isRunning) return;

    switch (phase) {
      case 'idle':
        setPhase('inhale');
        setCountdown(4);
        break;
      case 'inhale':
        if (countdown === 0) {
          setPhase('hold');
          setCountdown(4);
        } else {
          setCountdown(countdown - 1);
        }
        break;
      case 'hold':
        if (countdown === 0) {
          setPhase('exhale');
          setCountdown(6);
        } else {
          setCountdown(countdown - 1);
        }
        break;
      case 'exhale':
        if (countdown === 0) {
          setPhase('inhale');
          setCountdown(4);
        } else {
          setCountdown(countdown - 1);
        }
        break;
    }
  }, [isRunning, phase, countdown]);

  useEffect(() => {
    const timer = setInterval(breathingCycle, 1000);
    return () => clearInterval(timer);
  }, [breathingCycle]);

  const getPhaseText = () => {
    switch (phase) {
      case 'idle': return '准备开始';
      case 'inhale': return '吸气';
      case 'hold': return '屏息';
      case 'exhale': return '呼气';
    }
  };

  const getScale = () => {
    switch (phase) {
      case 'idle': return 1;
      case 'inhale': return 1 + (4 - countdown) * 0.125;
      case 'hold': return 1.5;
      case 'exhale': return 1.5 - (6 - countdown) * 0.083;
    }
  };

  const getColor = () => {
    switch (phase) {
      case 'idle': return 'rgba(99, 102, 241, 0.3)';
      case 'inhale': return 'rgba(99, 102, 241, 0.6)';
      case 'hold': return 'rgba(139, 92, 246, 0.7)';
      case 'exhale': return 'rgba(56, 189, 248, 0.5)';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-80 h-80 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: getColor() }}
          animate={{
            scale: getScale(),
            opacity: phase === 'idle' ? 0.5 : 0.8,
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute inset-4 rounded-full bg-white/30"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
          animate={{
            scale: getScale(),
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute inset-8 rounded-full bg-white/50"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
          animate={{
            scale: getScale(),
          }}
          transition={{ duration: 0.5 }}
        />
        <div className="relative z-10 flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-4xl font-bold text-white mb-2"
            >
              {countdown}
            </motion.span>
            <motion.span
              key={`text-${phase}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl text-white/90 font-medium"
            >
              {getPhaseText()}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      
      <div className="mt-12 flex gap-4">
        <motion.button
          onClick={() => {
            setIsRunning(true);
            setPhase('inhale');
            setCountdown(4);
          }}
          disabled={isRunning}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-bold text-lg shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
        >
          开始练习
        </motion.button>
        <motion.button
          onClick={() => {
            setIsRunning(false);
            setPhase('idle');
            setCountdown(4);
          }}
          disabled={!isRunning}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-white/50 text-gray-700 rounded-full font-bold text-lg shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
        >
          停止
        </motion.button>
      </div>
    </div>
  );
};

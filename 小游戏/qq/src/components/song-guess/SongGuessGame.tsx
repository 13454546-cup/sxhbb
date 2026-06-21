import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, Lightbulb, RotateCcw, Trophy, Volume2, VolumeX, Volume1, Clock } from 'lucide-react';
import { Song, getRandomSong, getRandomEncouragement } from './songData';

interface GameState {
  currentSong: Song | null;
  isPlaying: boolean;
  userAnswer: string;
  isCorrect: boolean | null;
  showHint: boolean;
  score: number;
  round: number;
  maxRounds: number;
  encouragement: string;
  usedHints: number;
  completedSongs: number[];
  gameOver: boolean;
  audioLoading: boolean;
  audioError: string | null;
  volume: number;
  timeLeft: number;
  totalTime: number;
}

export const SongGuessGame = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const playTokenRef = useRef(0);
  
  const [gameState, setGameState] = useState<GameState>({
    currentSong: null,
    isPlaying: false,
    userAnswer: '',
    isCorrect: null,
    showHint: false,
    score: 0,
    round: 1,
    maxRounds: 5,
    encouragement: '',
    usedHints: 0,
    completedSongs: [],
    gameOver: false,
    audioLoading: false,
    audioError: null,
    volume: 70,
    timeLeft: 30,
    totalTime: 30,
  });

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const initAudio = useCallback((song: Song) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current.load();
      audioRef.current = null;
    }
    clearTimer();

    setGameState(prev => ({
      ...prev,
      audioLoading: true,
      audioError: null,
      timeLeft: song.duration,
      totalTime: song.duration,
      isPlaying: false
    }));

    try {
      const audio = new Audio(song.audioUrl);
      audio.preload = 'auto';
      audio.volume = gameState.volume / 100;

      let loadTimeout: ReturnType<typeof setTimeout>;
      let hasResolved = false;

      const resolveLoad = (success: boolean, errorMsg?: string) => {
        if (hasResolved) return;
        hasResolved = true;
        clearTimeout(loadTimeout);

        if (success) {
          setGameState(prev => ({ ...prev, audioLoading: false }));
        } else {
          setGameState(prev => ({
            ...prev,
            audioLoading: false,
            audioError: errorMsg || '音频加载失败，请尝试跳过或重试'
          }));
        }
      };

      // 加载超时处理（8秒）
      loadTimeout = setTimeout(() => {
        resolveLoad(false, '音频加载超时，请检查网络或跳过');
      }, 8000);

      audio.oncanplaythrough = () => {
        resolveLoad(true);
      };

      audio.onloadeddata = () => {
        // 数据已加载，尝试设置起始时间
        try {
          audio.currentTime = song.startTime;
        } catch (e) {
          console.warn('设置播放时间失败:', e);
        }
      };

      audio.onerror = () => {
        const target = audio;
        let errorMsg = '音频加载失败';
        if (target.error) {
          switch (target.error.code) {
            case 1: errorMsg = '音频加载中断，请重试'; break;
            case 2: errorMsg = '网络错误，请检查连接'; break;
            case 3: errorMsg = '音频解码失败，格式不支持'; break;
            case 4: errorMsg = '音频文件不存在或路径错误'; break;
          }
        }
        resolveLoad(false, errorMsg);
      };

      audio.ontimeupdate = () => {
        if (audio.currentTime >= song.startTime + song.duration) {
          audio.pause();
          clearTimer();
          setGameState(prev => ({ ...prev, isPlaying: false, timeLeft: 0 }));
        }
      };

      audio.onended = () => {
        clearTimer();
        setGameState(prev => ({ ...prev, isPlaying: false, timeLeft: 0 }));
      };

      // 开始加载
      audio.load();
      audioRef.current = audio;
    } catch (err) {
      setGameState(prev => ({
        ...prev,
        audioLoading: false,
        audioError: '音频初始化失败，请刷新页面重试'
      }));
    }
  }, [gameState.volume, clearTimer]);

  const startTimer = useCallback(() => {
    clearTimer();
    
    timerRef.current = setInterval(() => {
      setGameState(prev => {
        const newTimeLeft = prev.timeLeft - 1;
        if (newTimeLeft <= 0) {
          clearTimer();
          if (audioRef.current) {
            audioRef.current.pause();
          }
          return { ...prev, isPlaying: false, timeLeft: 0 };
        }
        return { ...prev, timeLeft: newTimeLeft };
      });
    }, 1000);
  }, [clearTimer]);

  const playAudio = useCallback(() => {
    const currentToken = ++playTokenRef.current;

    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          if (playTokenRef.current === currentToken) {
            setGameState(prev => ({ ...prev, isPlaying: true }));
            startTimer();
          }
        }).catch((error) => {
          console.error('播放失败:', error);
          if (playTokenRef.current === currentToken) {
            setGameState(prev => ({
              ...prev,
              audioError: '播放失败，请点击重试'
            }));
          }
        });
      }
    }
  }, [startTimer]);

  const pauseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    clearTimer();
    setGameState(prev => ({ ...prev, isPlaying: false }));
  }, [clearTimer]);

  const startNewRound = useCallback(() => {
    pauseAudio();
    
    const song = getRandomSong(gameState.completedSongs);
    setGameState(prev => ({
      ...prev,
      currentSong: song,
      isPlaying: false,
      userAnswer: '',
      isCorrect: null,
      showHint: false,
      encouragement: '',
      audioLoading: true,
      audioError: null,
      timeLeft: song.duration,
      totalTime: song.duration,
    }));
    
    initAudio(song);
  }, [gameState.completedSongs, pauseAudio, initAudio]);

  const initGame = useCallback(() => {
    pauseAudio();
    
    const song = getRandomSong([]);
    setGameState({
      currentSong: song,
      isPlaying: false,
      userAnswer: '',
      isCorrect: null,
      showHint: false,
      score: 0,
      round: 1,
      maxRounds: 5,
      encouragement: '',
      usedHints: 0,
      completedSongs: [],
      gameOver: false,
      audioLoading: true,
      audioError: null,
      volume: 70,
      timeLeft: song.duration,
      totalTime: song.duration,
    });
    
    initAudio(song);
  }, [pauseAudio, initAudio]);

  useEffect(() => {
    initGame();

    return () => {
      pauseAudio();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, [initGame, pauseAudio]);

  const togglePlay = () => {
    if (gameState.isPlaying) {
      pauseAudio();
    } else {
      if (gameState.timeLeft > 0 && audioRef.current) {
        // 确保从正确的位置开始播放
        if (gameState.currentSong) {
          try {
            audioRef.current.currentTime = gameState.currentSong.startTime;
          } catch (e) {
            console.warn('设置播放时间失败:', e);
          }
        }
        playAudio();
      } else if (gameState.currentSong) {
        initAudio(gameState.currentSong);
        // 等待音频准备好后再播放
        const checkAndPlay = (attempts = 0) => {
          if (attempts > 50) return; // 最多等待5秒
          if (audioRef.current && audioRef.current.readyState >= 3) {
            if (gameState.currentSong) {
              try {
                audioRef.current.currentTime = gameState.currentSong.startTime;
              } catch (e) {}
            }
            playAudio();
          } else {
            setTimeout(() => checkAndPlay(attempts + 1), 100);
          }
        };
        setTimeout(() => checkAndPlay(), 300);
      }
    }
  };

  const handleVolumeChange = (volume: number) => {
    setGameState(prev => ({ ...prev, volume }));
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  };

  const handleAnswer = () => {
    if (!gameState.currentSong || !gameState.userAnswer.trim()) return;

    const isCorrect = gameState.userAnswer.trim() === gameState.currentSong.title;
    
    if (isCorrect) {
      const points = gameState.showHint ? 50 : 100;
      pauseAudio();
      setGameState(prev => {
        const newScore = prev.score + points;
        const newCompleted = [...prev.completedSongs, prev.currentSong!.id];
        const newRound = prev.round + 1;
        
        if (newRound > prev.maxRounds) {
          return {
            ...prev,
            isCorrect: true,
            score: newScore,
            completedSongs: newCompleted,
            gameOver: true,
          };
        }
        
        return {
          ...prev,
          isCorrect: true,
          score: newScore,
          completedSongs: newCompleted,
          round: newRound,
        };
      });
    } else {
      setGameState(prev => ({
        ...prev,
        isCorrect: false,
        encouragement: getRandomEncouragement(),
      }));
    }
  };

  const skipSong = () => {
    pauseAudio();
    if (gameState.currentSong) {
      setGameState(prev => {
        const newCompleted = [...prev.completedSongs, prev.currentSong!.id];
        const newRound = prev.round + 1;
        
        if (newRound > prev.maxRounds) {
          return {
            ...prev,
            completedSongs: newCompleted,
            round: newRound,
            gameOver: true,
          };
        }
        
        return {
          ...prev,
          completedSongs: newCompleted,
          round: newRound,
        };
      });
      
      setTimeout(() => startNewRound(), 300);
    }
  };

  const showHintToggle = () => {
    setGameState(prev => ({
      ...prev,
      showHint: true,
      usedHints: prev.usedHints + 1,
    }));
  };

  const nextRound = () => {
    pauseAudio();
    if (!gameState.isCorrect) {
      if (gameState.currentSong) {
        setGameState(prev => ({
          ...prev,
          completedSongs: [...prev.completedSongs, prev.currentSong!.id],
        }));
      }
    }
    startNewRound();
  };

  const getProgressPercentage = () => {
    return (gameState.timeLeft / gameState.totalTime) * 100;
  };

  if (gameState.gameOver) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[500px] glass-card rounded-3xl p-8"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-8xl mb-6"
        >
          🎉
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">游戏结束！</h2>
        <div className="flex items-center gap-2 mb-6">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <span className="text-3xl font-bold text-gray-800">{gameState.score}</span>
          <span className="text-gray-600">分</span>
        </div>
        <div className="text-gray-600 mb-6 text-center">
          <p>共回答 {gameState.maxRounds} 题</p>
          <p>使用提示 {gameState.usedHints} 次</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={initGame}
          className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium shadow-lg"
        >
          再玩一次
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-[500px]">
      {/* Score Board */}
      <div className="flex items-center gap-6 mb-6 w-full justify-center">
        <div className="glass-card rounded-full px-6 py-2 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="font-bold text-gray-800">{gameState.score}</span>
        </div>
        <div className="glass-card rounded-full px-6 py-2">
          <span className="text-gray-600">第 </span>
          <span className="font-bold text-gray-800">{gameState.round}</span>
          <span className="text-gray-600"> / {gameState.maxRounds} 题</span>
        </div>
      </div>

      {/* Audio Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-8 mb-6 text-center w-full max-w-md"
      >
        {/* Loading State */}
        {gameState.audioLoading && (
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="text-4xl mb-2"
            >
              ⏳
            </motion.div>
            <p className="text-gray-500">正在加载音频...</p>
          </div>
        )}

        {/* Error State */}
        {gameState.audioError && !gameState.audioLoading && (
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-2">❌</div>
            <p className="text-red-500 text-sm">{gameState.audioError}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={gameState.currentSong ? () => initAudio(gameState.currentSong!) : initGame}
              className="mt-4 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm"
            >
              重新加载
            </motion.button>
          </div>
        )}

        {/* Play Button */}
        {!gameState.audioLoading && !gameState.audioError && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 transition-all shadow-lg ${
                gameState.isPlaying
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {gameState.isPlaying ? (
                <Pause className="w-12 h-12" />
              ) : (
                <Play className="w-12 h-12" />
              )}
            </motion.button>
            
            <p className="text-gray-600 mb-4">
              {gameState.isPlaying ? '🎵 正在播放高潮部分...' : '点击播放按钮听歌曲高潮'}
            </p>

            {/* Time Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  剩余 {gameState.timeLeft} 秒
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: `${getProgressPercentage()}%` }}
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                />
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3">
              {gameState.volume === 0 ? (
                <VolumeX className="w-5 h-5 text-gray-400" />
              ) : gameState.volume < 50 ? (
                <Volume1 className="w-5 h-5 text-gray-400" />
              ) : (
                <Volume2 className="w-5 h-5 text-gray-400" />
              )}
              <input
                type="range"
                min="0"
                max="100"
                value={gameState.volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="text-sm text-gray-500 w-8">{gameState.volume}%</span>
            </div>
          </>
        )}
      </motion.div>

      {/* Hint */}
      <AnimatePresence>
        {gameState.showHint && gameState.currentSong && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card rounded-xl px-6 py-3 mb-4 flex items-center gap-2"
          >
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-700">提示：{gameState.currentSong.hint}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Answer Input */}
      <div className="w-full max-w-md space-y-4">
        <input
          type="text"
          value={gameState.userAnswer}
          onChange={(e) => setGameState(prev => ({ ...prev, userAnswer: e.target.value }))}
          onKeyPress={(e) => e.key === 'Enter' && handleAnswer()}
          placeholder="输入歌名..."
          className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-lg text-gray-800"
        />
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={showHintToggle}
            disabled={gameState.showHint}
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Lightbulb className="w-5 h-5" />
            提示
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={skipSong}
            className="flex-1 px-4 py-3 bg-orange-100 text-orange-600 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-orange-200 transition-colors"
          >
            <SkipForward className="w-5 h-5" />
            跳过
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAnswer}
            disabled={!gameState.userAnswer.trim()}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            提交答案
          </motion.button>
        </div>
      </div>

      {/* Result Feedback */}
      <AnimatePresence>
        {gameState.isCorrect !== null && gameState.currentSong && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 px-6 py-4 rounded-xl text-center ${
              gameState.isCorrect
                ? 'bg-green-100 text-green-700'
                : 'bg-orange-100 text-orange-700'
            }`}
          >
            {gameState.isCorrect ? (
              <>
                <div className="text-3xl mb-2">🎉</div>
                <p className="font-bold text-lg">回答正确！</p>
                <p className="text-sm opacity-80 mt-1">+{gameState.showHint ? 50 : 100} 分</p>
                <p className="text-sm opacity-80 mt-1">{gameState.currentSong.artist} - {gameState.currentSong.title}</p>
              </>
            ) : (
              <>
                <div className="text-3xl mb-2">💪</div>
                <p className="font-bold">{gameState.encouragement}</p>
                <p className="text-sm opacity-80 mt-2">正确答案：{gameState.currentSong.artist} - {gameState.currentSong.title}</p>
              </>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextRound}
              className="mt-4 px-6 py-2 bg-white/50 rounded-lg font-medium hover:bg-white/80 transition-colors"
            >
              {gameState.round >= gameState.maxRounds ? '查看结果' : '下一题'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={initGame}
        className="fixed bottom-6 left-6 glass-card rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
      >
        <RotateCcw className="w-5 h-5 text-gray-600" />
        <span className="text-gray-700 font-medium">重新开始</span>
      </motion.button>
    </div>
  );
};
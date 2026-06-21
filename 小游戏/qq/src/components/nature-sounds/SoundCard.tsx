import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Volume1, AlertCircle, RefreshCw, Pause } from 'lucide-react';
import { soundGenerator } from '@/utils/soundGenerator';

interface Sound {
  id: string;
  name: string;
  description: string;
  category: string;
  color: string;
  icon: string;
  soundType: string;
  quality: string;
}

export const sounds: Sound[] = [
  {
    id: 'light-rain',
    name: '细雨',
    description: '轻柔的细雨声，雨滴落在树叶和地面',
    category: 'rain',
    color: 'bg-blue-300',
    icon: '🌧️',
    soundType: 'rainLight',
    quality: '真实模拟'
  },
  {
    id: 'heavy-rain',
    name: '暴雨',
    description: '强烈的暴风雨，雨滴密集撞击地面',
    category: 'rain',
    color: 'bg-blue-500',
    icon: '⛈️',
    soundType: 'rainHeavy',
    quality: '真实模拟'
  },
  {
    id: 'rain-window',
    name: '窗边雨声',
    description: '雨滴敲打窗户的声音，室内氛围',
    category: 'rain',
    color: 'bg-blue-400',
    icon: '🪟',
    soundType: 'rainWindow',
    quality: '真实模拟'
  },
  {
    id: 'forest-day',
    name: '森林日景',
    description: '白天森林的自然声音，风吹树叶沙沙作响',
    category: 'forest',
    color: 'bg-green-400',
    icon: '🌲',
    soundType: 'forestDay',
    quality: '真实模拟'
  },
  {
    id: 'forest-night',
    name: '森林夜景',
    description: '夜晚森林的宁静，虫鸣和微风声',
    category: 'forest',
    color: 'bg-green-600',
    icon: '🌙',
    soundType: 'forestNight',
    quality: '真实模拟'
  },
  {
    id: 'forest-stream',
    name: '森林溪流',
    description: '清澈溪水流过岩石的自然声音',
    category: 'forest',
    color: 'bg-teal-400',
    icon: '💧',
    soundType: 'forestStream',
    quality: '真实模拟'
  },
  {
    id: 'calm-waves',
    name: '平静海浪',
    description: '温柔的海浪拍打沙滩，节奏舒缓',
    category: 'ocean',
    color: 'bg-cyan-400',
    icon: '🌊',
    soundType: 'oceanCalm',
    quality: '真实模拟'
  },
  {
    id: 'stormy-sea',
    name: '风暴海洋',
    description: '风暴中汹涌澎湃的海浪声',
    category: 'ocean',
    color: 'bg-cyan-600',
    icon: '🌊',
    soundType: 'oceanStormy',
    quality: '真实模拟'
  },
  {
    id: 'rocky-shore',
    name: '岩石海岸',
    description: '海浪撞击岩石的壮观自然声音',
    category: 'ocean',
    color: 'bg-slate-400',
    icon: '🪨',
    soundType: 'oceanRocky',
    quality: '真实模拟'
  },
  {
    id: 'morning-birds',
    name: '清晨鸟鸣',
    description: '清晨时分多种鸟类的自然合唱',
    category: 'birds',
    color: 'bg-yellow-400',
    icon: '🐦',
    soundType: 'birdsMorning',
    quality: '真实模拟'
  },
  {
    id: 'forest-birds',
    name: '森林鸟群',
    description: '森林深处各种鸟类的自然叫声',
    category: 'birds',
    color: 'bg-amber-400',
    icon: '🦜',
    soundType: 'birdsForest',
    quality: '真实模拟'
  },
  {
    id: 'songbirds',
    name: '鸣禽合唱',
    description: '优美动听的鸣禽自然歌声',
    category: 'birds',
    color: 'bg-orange-300',
    icon: '🎵',
    soundType: 'birdsSong',
    quality: '真实模拟'
  },
  {
    id: 'campfire',
    name: '篝火',
    description: '木材燃烧的自然噼啪声',
    category: 'fire',
    color: 'bg-orange-400',
    icon: '🔥',
    soundType: 'fireCamp',
    quality: '真实模拟'
  },
  {
    id: 'bonfire',
    name: '大型篝火',
    description: '大型篝火的燃烧声，火星爆裂',
    category: 'fire',
    color: 'bg-red-400',
    icon: '🔥',
    soundType: 'fireBonfire',
    quality: '真实模拟'
  },
  {
    id: 'fireplace',
    name: '壁炉',
    description: '室内壁炉温暖的火焰声',
    category: 'fire',
    color: 'bg-amber-500',
    icon: '🪵',
    soundType: 'fireplace',
    quality: '真实模拟'
  },
];

interface SoundCardProps {
  sound: Sound;
  isPlaying: boolean;
  volume: number;
  onToggle: () => void;
  onVolumeChange: (volume: number) => void;
}

export interface SoundCardRef {
  stop: () => void;
}

export const SoundCard = forwardRef<SoundCardRef, SoundCardProps>(
  ({ sound, isPlaying, volume, onToggle, onVolumeChange }, ref) => {
    const [audioState, setAudioState] = useState<'idle' | 'playing' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
      stop: () => {
        soundGenerator.stop(sound.id);
        setAudioState('idle');
      }
    }));

    useEffect(() => {
      if (isPlaying) {
        setAudioState('playing');
        setErrorMessage(null);
        try {
          const playMethod = getPlayMethod(sound.soundType);
          playMethod(sound.id, volume / 100);
        } catch (error) {
          console.error('播放失败:', error);
          setAudioState('error');
          setErrorMessage('播放失败，请重试');
        }
      } else {
        soundGenerator.stop(sound.id);
        setAudioState('idle');
      }

      return () => {
        soundGenerator.stop(sound.id);
      };
    }, [isPlaying, sound.id, sound.soundType, volume]);

    useEffect(() => {
      soundGenerator.setVolume(sound.id, volume / 100);
    }, [volume, sound.id]);

    const handleRetry = () => {
      if (isPlaying) {
        soundGenerator.stop(sound.id);
        try {
          const playMethod = getPlayMethod(sound.soundType);
          playMethod(sound.id, volume / 100);
          setAudioState('playing');
          setErrorMessage(null);
        } catch (error) {
          setAudioState('error');
          setErrorMessage('播放失败，请重试');
        }
      }
    };

    const getPlayMethod = (type: string) => {
      const methods: Record<string, (id: string, volume: number) => void> = {
        rainLight: (id, vol) => soundGenerator.playRainLight(id, vol),
        rainHeavy: (id, vol) => soundGenerator.playRainHeavy(id, vol),
        rainWindow: (id, vol) => soundGenerator.playRainWindow(id, vol),
        forestDay: (id, vol) => soundGenerator.playForestDay(id, vol),
        forestNight: (id, vol) => soundGenerator.playForestNight(id, vol),
        forestStream: (id, vol) => soundGenerator.playForestStream(id, vol),
        oceanCalm: (id, vol) => soundGenerator.playOceanCalm(id, vol),
        oceanStormy: (id, vol) => soundGenerator.playOceanStormy(id, vol),
        oceanRocky: (id, vol) => soundGenerator.playOceanRocky(id, vol),
        birdsMorning: (id, vol) => soundGenerator.playBirdsMorning(id, vol),
        birdsForest: (id, vol) => soundGenerator.playBirdsForest(id, vol),
        birdsSong: (id, vol) => soundGenerator.playBirdsSong(id, vol),
        fireCamp: (id, vol) => soundGenerator.playFireCamp(id, vol),
        fireBonfire: (id, vol) => soundGenerator.playFireBonfire(id, vol),
        fireplace: (id, vol) => soundGenerator.playFireplace(id, vol),
      };
      return methods[type] || methods.forestDay;
    };

    const getVolumeIcon = () => {
      if (volume === 0) return <VolumeX className="w-4 h-4 text-gray-400" />;
      if (volume < 50) return <Volume1 className="w-4 h-4 text-gray-400" />;
      return <Volume2 className="w-4 h-4 text-gray-400" />;
    };

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`glass-card rounded-2xl p-5 shadow-soft transition-all duration-300 ${
          isPlaying ? 'ring-2 ring-primary shadow-lg' : ''
        }`}
      >
        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${sound.color} shadow-md relative`}>
            {sound.icon}
            {audioState === 'error' && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-500/50 rounded-xl">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-bold text-gray-800 text-lg">{sound.name}</h4>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">{sound.quality}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{sound.description}</p>
            
            {audioState === 'error' && (
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-red-500">{errorMessage}</span>
                <button
                  onClick={handleRetry}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <RefreshCw className="w-3 h-3 text-gray-500" />
                </button>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              {getVolumeIcon()}
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => onVolumeChange(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <Volume2 className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <button
            onClick={onToggle}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
              isPlaying 
                ? 'bg-gradient-to-r from-primary to-secondary text-white scale-110' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7" />
            ) : (
              <Volume2 className="w-7 h-7" />
            )}
          </button>
        </div>
      </motion.div>
    );
  }
);
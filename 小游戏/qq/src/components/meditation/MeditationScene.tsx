import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==================== 类型定义 ====================

interface SceneElement {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  variant: number;
}

export interface SceneConfig {
  id: string;
  name: string;
  description: string;
  bgGradient: string;
  clickHint: string;
  elementColors: string[];
  icon: string;
}

// ==================== 场景配置 ====================

export const scenes: SceneConfig[] = [
  {
    id: 'withered-forest',
    name: '枯树林',
    description: '秋意渐浓，枯叶飘零。点击屏幕收集落叶，感受季节的轮回。',
    bgGradient: 'linear-gradient(180deg, #2C1810 0%, #4A2C1A 40%, #5D3A1A 100%)',
    clickHint: '点击屏幕收集落叶',
    elementColors: ['#8B4513', '#A0522D', '#CD853F', '#D2691E', '#B8860B', '#8B6914'],
    icon: '🍂',
  },
  {
    id: 'meadow',
    name: '草地',
    description: '微风轻拂，花草摇曳。点击屏幕播种花草，让大地绽放生机。',
    bgGradient: 'linear-gradient(180deg, #1B4D3E 0%, #2D6B4F 40%, #3D8B5F 100%)',
    clickHint: '点击屏幕播种花草',
    elementColors: ['#FF69B4', '#9370DB', '#FFD700', '#FF6347', '#FF1493', '#DA70D6'],
    icon: '🌸',
  },
  {
    id: 'sky',
    name: '天空',
    description: '夜幕降临，繁星点点。点击屏幕点亮星辰，让心愿飞向宇宙。',
    bgGradient: 'linear-gradient(180deg, #0B0B2B 0%, #1A1A4E 40%, #2D1B69 100%)',
    clickHint: '点击屏幕点亮星辰',
    elementColors: ['#FFFFFF', '#FFE4B5', '#FFD700', '#E6E6FA', '#B0E0E6', '#FFFACD'],
    icon: '✨',
  },
];

// ==================== SVG 元素组件 ====================

const LeafSvg = ({ color, variant }: { color: string; variant: number }) => {
  const shapes = [
    // 枫叶形状
    <path d="M50 5 L60 35 L90 25 L70 50 L85 80 L50 65 L15 80 L30 50 L10 25 L40 35 Z" />,
    // 柳叶形状
    <ellipse cx="50" cy="50" rx="15" ry="45" />,
    // 银杏叶形状
    <path d="M50 5 Q70 30 70 50 Q70 75 50 95 Q30 75 30 50 Q30 30 50 5 Z" />,
  ];
  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
      <g fill={color} opacity={0.9}>
        {shapes[variant % shapes.length]}
      </g>
    </svg>
  );
};

const FlowerSvg = ({ color, variant }: { color: string; variant: number }) => {
  const shapes = [
    // 五瓣花
    <>
      <circle cx="50" cy="25" r="15" />
      <circle cx="75" cy="45" r="15" />
      <circle cx="65" cy="75" r="15" />
      <circle cx="35" cy="75" r="15" />
      <circle cx="25" cy="45" r="15" />
      <circle cx="50" cy="50" r="12" fill="#FFD700" />
    </>,
    // 三叶草
    <>
      <circle cx="50" cy="30" r="18" />
      <circle cx="30" cy="60" r="18" />
      <circle cx="70" cy="60" r="18" />
      <path d="M50 50 L50 85" stroke="#228B22" strokeWidth="6" fill="none" />
    </>,
    // 雏菊
    <>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const cx = 50 + 20 * Math.cos(angle);
        const cy = 50 + 20 * Math.sin(angle);
        return <ellipse key={i} cx={cx} cy={cy} rx="8" ry="16" transform={`rotate(${i * 45} ${cx} ${cy})`} />;
      })}
      <circle cx="50" cy="50" r="12" fill="#FFD700" />
    </>,
  ];
  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
      <g fill={color} opacity={0.95}>
        {shapes[variant % shapes.length]}
      </g>
    </svg>
  );
};

const StarSvg = ({ color, variant }: { color: string; variant: number }) => {
  const shapes = [
    // 四角星
    <path d="M50 5 L60 40 L95 50 L60 60 L50 95 L40 60 L5 50 L40 40 Z" />,
    // 五角星
    <path d="M50 5 L61 39 L97 39 L68 60 L79 95 L50 74 L21 95 L32 60 L3 39 L39 39 Z" />,
    // 六角星
    <path d="M50 5 L58 35 L88 25 L65 48 L88 72 L58 62 L50 95 L42 62 L12 72 L35 48 L12 25 L42 35 Z" />,
  ];
  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', filter: `drop-shadow(0 0 8px ${color})` }}>
      <g fill={color} opacity={1}>
        {shapes[variant % shapes.length]}
      </g>
    </svg>
  );
};

const ElementRenderer = ({ element, sceneId }: { element: SceneElement; sceneId: string }) => {
  const { color, variant } = element;

  if (sceneId === 'withered-forest') {
    return <LeafSvg color={color} variant={variant} />;
  }
  if (sceneId === 'meadow') {
    return <FlowerSvg color={color} variant={variant} />;
  }
  return <StarSvg color={color} variant={variant} />;
};

// ==================== 主组件 ====================

export const MeditationScene = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(() =>
    Math.floor(Math.random() * scenes.length)
  );
  const [elements, setElements] = useState<SceneElement[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);

  const currentScene = scenes[currentSceneIndex];

  // 清理过期的元素
  useEffect(() => {
    const interval = setInterval(() => {
      setElements((prev) => {
        const now = Date.now();
        return prev.filter((el) => now - el.id < 8000);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newElement: SceneElement = {
        id: Date.now() + idCounter.current++,
        x,
        y,
        rotation: Math.random() * 360,
        scale: 0.6 + Math.random() * 0.8,
        color: currentScene.elementColors[Math.floor(Math.random() * currentScene.elementColors.length)],
        variant: Math.floor(Math.random() * 3),
      };

      // 直接更新状态，延迟 < 200ms
      setElements((prev) => [...prev, newElement]);
      setClickCount((prev) => prev + 1);
    },
    [currentScene]
  );

  const switchScene = useCallback(() => {
    setElements([]);
    setClickCount(0);
    setCurrentSceneIndex((prev) => {
      let next;
      do {
        next = Math.floor(Math.random() * scenes.length);
      } while (next === prev && scenes.length > 1);
      return next;
    });
  }, []);

  const getElementClassName = () => {
    switch (currentScene.id) {
      case 'withered-forest':
        return 'meditation-element leaf-element';
      case 'meadow':
        return 'meditation-element flower-element';
      case 'sky':
        return 'meditation-element star-element';
      default:
        return 'meditation-element';
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* 场景信息栏 */}
      <div className="flex items-center justify-between glass-card rounded-2xl px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{currentScene.icon}</span>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">{currentScene.name}</h3>
            <p className="text-sm text-gray-500">{currentScene.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            已点击 {clickCount} 次
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={switchScene}
            className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-sm font-medium shadow-md"
          >
            切换场景
          </motion.button>
        </div>
      </div>

      {/* 互动画布 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          ref={containerRef}
          onClick={handleClick}
          className="relative w-full h-[600px] rounded-3xl overflow-hidden cursor-pointer select-none"
          style={{ background: currentScene.bgGradient }}
        >
          {/* 场景装饰背景 */}
          <SceneBackground sceneId={currentScene.id} />

          {/* 生成的互动元素 */}
          {elements.map((element) => (
            <div
              key={element.id}
              className={getElementClassName()}
              style={{
                left: element.x,
                top: element.y,
                transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`,
                width: 40,
                height: 40,
                '--el-scale': element.scale,
              } as React.CSSProperties}
            >
              <ElementRenderer element={element} sceneId={currentScene.id} />
            </div>
          ))}

          {/* 点击提示文字 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.p
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-white/40 text-lg font-medium tracking-wide"
            >
              {currentScene.clickHint}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 场景选择快捷栏 */}
      <div className="flex justify-center gap-3">
        {scenes.map((scene, index) => (
          <motion.button
            key={scene.id}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              if (index !== currentSceneIndex) {
                setElements([]);
                setClickCount(0);
                setCurrentSceneIndex(index);
              }
            }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              index === currentSceneIndex
                ? 'bg-white text-gray-800 shadow-lg ring-2 ring-primary'
                : 'bg-white/30 text-white hover:bg-white/50'
            }`}
          >
            <span>{scene.icon}</span>
            {scene.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// ==================== 场景背景装饰 ====================

const SceneBackground = ({ sceneId }: { sceneId: string }) => {
  if (sceneId === 'withered-forest') {
    return <ForestBackground />;
  }
  if (sceneId === 'meadow') {
    return <MeadowBackground />;
  }
  return <SkyBackground />;
};

const ForestBackground = () => {
  return (
    <>
      {/* 远景树干 */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none opacity-20">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-4 bg-gradient-to-t from-[#3D2914] to-transparent"
            style={{
              left: `${10 + i * 16}%`,
              height: `${30 + Math.random() * 40}%`,
              transform: `rotate(${-3 + Math.random() * 6}deg)`,
            }}
          />
        ))}
      </div>
      {/* 地面落叶 */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#4A2C1A]/60 to-transparent pointer-events-none" />
    </>
  );
};

const MeadowBackground = () => {
  return (
    <>
      {/* 远景山丘 */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none">
        <div
          className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#1B4D3E]/40 to-transparent"
          style={{ borderRadius: '50% 50% 0 0 / 100% 100% 0 0' }}
        />
        <div
          className="absolute bottom-0 left-[-20%] w-[140%] h-24 bg-gradient-to-t from-[#1B5E3E]/30 to-transparent"
          style={{ borderRadius: '50% 50% 0 0 / 100% 100% 0 0' }}
        />
      </div>
      {/* 小草装饰 */}
      <div className="absolute bottom-0 left-0 w-full h-12 pointer-events-none opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-0.5 bg-[#90EE90]"
            style={{
              left: `${i * 5 + Math.random() * 3}%`,
              height: `${8 + Math.random() * 20}px`,
              transform: `rotate(${-5 + Math.random() * 10}deg)`,
            }}
          />
        ))}
      </div>
    </>
  );
};

const SkyBackground = () => {
  return (
    <>
      {/* 星星背景 */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              opacity: 0.2 + Math.random() * 0.4,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      {/* 月亮 */}
      <div
        className="absolute top-8 right-12 w-16 h-16 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #FFFACD, #F0E68C)',
          boxShadow: '0 0 40px rgba(255,250,205,0.3)',
          opacity: 0.6,
        }}
      />
    </>
  );
};

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, SkipForward, RefreshCw, ChevronRight, X } from 'lucide-react';
import { 
  TruthQuestion, 
  getRandomQuestion, 
  categoryNames, 
  categoryColors, 
  categoryIcons 
} from './truthQuestions';

interface AnsweredQuestion {
  question: TruthQuestion;
  answer: string;
  timestamp: number;
}

export const TruthBox = () => {
  const [currentQuestion, setCurrentQuestion] = useState<TruthQuestion | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [answer, setAnswer] = useState('');
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);
  const [skippedIds, setSkippedIds] = useState<number[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const openBox = useCallback(() => {
    setIsOpening(true);
    setShowQuestion(false);
    setAnswer('');
    
    // 模拟开盒动画
    setTimeout(() => {
      const question = getRandomQuestion(skippedIds);
      setCurrentQuestion(question);
      setIsOpening(false);
      setShowQuestion(true);
    }, 1000);
  }, [skippedIds]);

  const skipQuestion = useCallback(() => {
    if (currentQuestion) {
      setSkippedIds(prev => [...prev, currentQuestion.id]);
    }
    setShowQuestion(false);
    setAnswer('');
    // 自动打开下一个
    setTimeout(() => {
      openBox();
    }, 300);
  }, [currentQuestion, openBox]);

  const submitAnswer = useCallback(() => {
    if (currentQuestion && answer.trim()) {
      const answered: AnsweredQuestion = {
        question: currentQuestion,
        answer: answer.trim(),
        timestamp: Date.now(),
      };
      setAnsweredQuestions(prev => [...prev, answered]);
      setShowQuestion(false);
      setAnswer('');
      setCurrentQuestion(null);
    }
  }, [currentQuestion, answer]);

  const resetGame = useCallback(() => {
    setCurrentQuestion(null);
    setShowQuestion(false);
    setAnswer('');
    setSkippedIds([]);
    setShowHistory(false);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] relative">
      {/* Main Box Area */}
      <AnimatePresence mode="wait">
        {!currentQuestion && !isOpening && (
          <motion.div
            key="box"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="flex flex-col items-center"
          >
            {/* Mystery Box */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
              whileTap={{ scale: 0.95 }}
              onClick={openBox}
              className="relative cursor-pointer"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg flex items-center justify-center transform perspective-1000">
                <motion.div
                  animate={{ 
                    rotateY: [0, 10, -10, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-6xl"
                >
                  🎁
                </motion.div>
              </div>
              {/* Sparkles */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-2 -right-2 text-2xl"
              >
                ✨
              </motion.div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-2 -left-2 text-2xl"
              >
                ✨
              </motion.div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-white/80 text-lg font-medium"
            >
              点击盲盒抽取真心话
            </motion.p>
            
            {/* Stats */}
            <div className="mt-4 flex gap-4 text-white/60 text-sm">
              <span>已回答: {answeredQuestions.length}</span>
              <span>已跳过: {skippedIds.length}</span>
            </div>
          </motion.div>
        )}

        {isOpening && (
          <motion.div
            key="opening"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1.5, 2], rotate: [0, 180, 360] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-8xl"
          >
            🎁
          </motion.div>
        )}

        {showQuestion && currentQuestion && (
          <motion.div
            key="question"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="glass-card rounded-3xl p-6 shadow-lg max-w-md w-full"
          >
            {/* Category Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${categoryColors[currentQuestion.category]}`}>
                {categoryIcons[currentQuestion.category]} {categoryNames[currentQuestion.category]}
              </span>
            </div>
            
            {/* Question */}
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-bold text-gray-800 mb-6 leading-relaxed"
            >
              {currentQuestion.question}
            </motion.h3>
            
            {/* Answer Input */}
            <div className="mb-4">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="写下你的真心话..."
                className="w-full h-24 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none resize-none text-gray-700"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={skipQuestion}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
              >
                <SkipForward className="w-5 h-5" />
                跳过
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={submitAnswer}
                disabled={!answer.trim()}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
                回答
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History Button */}
      {answeredQuestions.length > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowHistory(true)}
          className="fixed bottom-20 right-6 glass-card rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
        >
          <Gift className="w-5 h-5 text-primary" />
          <span className="text-gray-700 font-medium">查看记录</span>
        </motion.button>
      )}

      {/* Reset Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={resetGame}
        className="fixed bottom-6 right-6 glass-card rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
      >
        <RefreshCw className="w-5 h-5 text-gray-600" />
        <span className="text-gray-700 font-medium">重新开始</span>
      </motion.button>

      {/* History Modal */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
            onClick={() => setShowHistory(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-3xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">我的真心话记录</h3>
                <button
                  onClick={() => setShowHistory(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <div className="space-y-4">
                {answeredQuestions.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-white/50"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${categoryColors[item.question.category]}`}>
                        {categoryIcons[item.question.category]}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleString('zh-CN', { 
                          month: 'numeric', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="font-medium text-gray-800 mb-2">{item.question.question}</p>
                    <p className="text-gray-600 text-sm">{item.answer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
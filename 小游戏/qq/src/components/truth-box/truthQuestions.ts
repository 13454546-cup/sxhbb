export interface TruthQuestion {
  id: number;
  question: string;
  category: 'self' | 'dream' | 'friend' | 'family' | 'school' | 'future' | 'fun';
  difficulty: 'easy' | 'medium' | 'deep';
}

export const truthQuestions: TruthQuestion[] = [
  // 自我认知类
  { id: 1, question: '你最喜欢自己身上的哪个优点？', category: 'self', difficulty: 'easy' },
  { id: 2, question: '你最想改变自己的哪个习惯？', category: 'self', difficulty: 'medium' },
  { id: 3, question: '你觉得三年后的自己会是什么样子？', category: 'self', difficulty: 'deep' },
  { id: 4, question: '最近让你感到开心的一件小事是什么？', category: 'self', difficulty: 'easy' },
  { id: 5, question: '你觉得自己最大的缺点是什么？', category: 'self', difficulty: 'medium' },
  { id: 6, question: '你最害怕失去什么？', category: 'self', difficulty: 'deep' },
  
  // 梦想与目标类
  { id: 7, question: '你小时候的梦想是什么？现在还想实现吗？', category: 'dream', difficulty: 'easy' },
  { id: 8, question: '如果可以学会一项新技能，你最想学什么？', category: 'dream', difficulty: 'easy' },
  { id: 9, question: '你最想去的地方是哪里？为什么？', category: 'dream', difficulty: 'medium' },
  { id: 10, question: '你觉得成功对你来说意味着什么？', category: 'dream', difficulty: 'deep' },
  { id: 11, question: '如果有一天你成为了名人，你希望是因为什么？', category: 'dream', difficulty: 'medium' },
  { id: 12, question: '你最想完成的一个小目标是什么？', category: 'dream', difficulty: 'easy' },
  
  // 朋友关系类
  { id: 13, question: '你最好的朋友是谁？为什么你们会成为好朋友？', category: 'friend', difficulty: 'easy' },
  { id: 14, question: '你觉得什么样的朋友才是真正的朋友？', category: 'friend', difficulty: 'medium' },
  { id: 15, question: '你最近和朋友发生过矛盾吗？怎么解决的？', category: 'friend', difficulty: 'medium' },
  { id: 16, question: '你最欣赏朋友的哪个特质？', category: 'friend', difficulty: 'easy' },
  { id: 17, question: '如果朋友背叛了你，你会怎么做？', category: 'friend', difficulty: 'deep' },
  { id: 18, question: '你希望朋友怎么对待你？', category: 'friend', difficulty: 'easy' },
  
  // 家庭关系类
  { id: 19, question: '你最想对爸爸妈妈说的一句话是什么？', category: 'family', difficulty: 'easy' },
  { id: 20, question: '你觉得家人最不理解你的是什么？', category: 'family', difficulty: 'medium' },
  { id: 21, question: '你最珍惜和家人在一起的哪个时刻？', category: 'family', difficulty: 'easy' },
  { id: 22, question: '如果可以和家人一起做一件事，你最想做什么？', category: 'family', difficulty: 'easy' },
  { id: 23, question: '你觉得家庭对你来说意味着什么？', category: 'family', difficulty: 'deep' },
  { id: 24, question: '你最想感谢家人的什么？', category: 'family', difficulty: 'medium' },
  
  // 学校生活类
  { id: 25, question: '你最喜欢的科目是什么？为什么喜欢？', category: 'school', difficulty: 'easy' },
  { id: 26, question: '你在学校最难忘的一次经历是什么？', category: 'school', difficulty: 'medium' },
  { id: 27, question: '你觉得学习最大的压力是什么？', category: 'school', difficulty: 'medium' },
  { id: 28, question: '你最想在学校改变的一件事是什么？', category: 'school', difficulty: 'medium' },
  { id: 29, question: '你觉得什么样的老师是好老师？', category: 'school', difficulty: 'easy' },
  { id: 30, question: '你在学校最开心的一天是哪天？发生了什么？', category: 'school', difficulty: 'easy' },
  
  // 未来展望类
  { id: 31, question: '你对未来最大的期待是什么？', category: 'future', difficulty: 'medium' },
  { id: 32, question: '你最担心未来会发生什么？', category: 'future', difficulty: 'deep' },
  { id: 33, question: '十年后，你希望自己在哪里做什么？', category: 'future', difficulty: 'deep' },
  { id: 34, question: '你觉得什么是最重要的人生价值？', category: 'future', difficulty: 'deep' },
  { id: 35, question: '你希望未来的自己记住现在的什么？', category: 'future', difficulty: 'medium' },
  { id: 36, question: '如果可以给未来的自己写一封信，你会写什么？', category: 'future', difficulty: 'deep' },
  
  // 轻松趣味类
  { id: 37, question: '如果可以拥有超能力，你最想拥有什么？', category: 'fun', difficulty: 'easy' },
  { id: 38, question: '你最喜欢的电影或动漫是什么？为什么？', category: 'fun', difficulty: 'easy' },
  { id: 39, question: '如果可以和任何一个名人共进晚餐，你会选择谁？', category: 'fun', difficulty: 'easy' },
  { id: 40, question: '你最想尝试的美食是什么？', category: 'fun', difficulty: 'easy' },
  { id: 41, question: '如果可以穿越时空，你最想去哪个时代？', category: 'fun', difficulty: 'easy' },
  { id: 42, question: '你觉得最酷的职业是什么？', category: 'fun', difficulty: 'easy' },
  { id: 43, question: '你最想养什么宠物？给它取个名字吧！', category: 'fun', difficulty: 'easy' },
  { id: 44, question: '如果可以发明一样东西，你会发明什么？', category: 'fun', difficulty: 'medium' },
  { id: 45, question: '你最想拥有的神奇道具是什么？', category: 'fun', difficulty: 'easy' },
];

export const categoryNames: Record<string, string> = {
  self: '自我认知',
  dream: '梦想与目标',
  friend: '朋友关系',
  family: '家庭关系',
  school: '学校生活',
  future: '未来展望',
  fun: '轻松趣味',
};

export const categoryColors: Record<string, string> = {
  self: 'bg-pink-400',
  dream: 'bg-purple-400',
  friend: 'bg-blue-400',
  family: 'bg-orange-400',
  school: 'bg-green-400',
  future: 'bg-indigo-400',
  fun: 'bg-yellow-400',
};

export const categoryIcons: Record<string, string> = {
  self: '💭',
  dream: '🌟',
  friend: '👫',
  family: '🏠',
  school: '📚',
  future: '🔮',
  fun: '🎉',
};

export const getRandomQuestion = (excludeIds: number[] = []): TruthQuestion => {
  const availableQuestions = truthQuestions.filter(q => !excludeIds.includes(q.id));
  if (availableQuestions.length === 0) {
    return truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
  }
  return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
};
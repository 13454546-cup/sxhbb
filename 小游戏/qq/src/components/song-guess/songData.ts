export interface Song {
  id: number;
  title: string;
  artist: string;
  audioUrl: string;
  hint: string;
  genre: string;
  duration: number;
  startTime: number;
}

export const songs: Song[] = [
  {
    id: 1,
    title: '恋爱告急',
    artist: '鞠婧祎',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    hint: '忽然间全世界只有你，初恋的魔法...',
    genre: '流行',
    duration: 30,
    startTime: 0
  },
  {
    id: 2,
    title: '特别的人',
    artist: '方大同',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    hint: '我们是对方，特别的人...',
    genre: '流行',
    duration: 30,
    startTime: 0
  },
  {
    id: 3,
    title: '水星记',
    artist: '郭顶',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    hint: '还要多远才能进入你的心，还要多久才能和你接近...',
    genre: '流行',
    duration: 30,
    startTime: 0
  },
  {
    id: 4,
    title: '我们俩',
    artist: '郭顶',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    hint: '你在左边，我紧靠右...',
    genre: '流行',
    duration: 30,
    startTime: 0
  },
  {
    id: 5,
    title: '淘汰',
    artist: '陈奕迅',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    hint: '只能说我输了，也许是你怕了...',
    genre: '流行',
    duration: 30,
    startTime: 0
  },
  {
    id: 6,
    title: '素颜',
    artist: '许嵩',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    hint: '如果再看你一眼，是否还会有感觉...',
    genre: '流行',
    duration: 30,
    startTime: 0
  },
  {
    id: 7,
    title: '清明雨上',
    artist: '许嵩',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    hint: '又是清明雨上，折菊寄到你身旁...',
    genre: '流行',
    duration: 30,
    startTime: 0
  },
  {
    id: 8,
    title: '可惜不是你',
    artist: '梁静茹',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    hint: '可惜不是你，陪我到最后...',
    genre: '流行',
    duration: 30,
    startTime: 0
  },
  {
    id: 9,
    title: '我怀念的',
    artist: '孙燕姿',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    hint: '我怀念的，是无话不说...',
    genre: '流行',
    duration: 30,
    startTime: 0
  },
  {
    id: 10,
    title: '偏爱',
    artist: '张芸京',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    hint: '我说过我不闪躲，我非要这么做...',
    genre: '流行',
    duration: 30,
    startTime: 0
  },
  {
    id: 11,
    title: 'Love Song',
    artist: '方大同',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    hint: '我写了这首歌，是一首简单的...',
    genre: '流行',
    duration: 30,
    startTime: 0
  },
  {
    id: 12,
    title: '背叛',
    artist: '曹格',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    hint: '紧紧相依的心如何Say goodbye...',
    genre: '流行',
    duration: 30,
    startTime: 0
  },
  {
    id: 13,
    title: '半壶纱',
    artist: '刘珂矣',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
    hint: '倘若我心中的山水，你眼中都看到...',
    genre: '流行',
    duration: 30,
    startTime: 0
  },
  {
    id: 14,
    title: '出现又离开',
    artist: '梁博',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
    hint: '我和你，本应该，各自好，各自坏...',
    genre: '流行',
    duration: 30,
    startTime: 0
  },
  {
    id: 15,
    title: '空空如也',
    artist: '任然',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
    hint: '我懵懵懂懂过了一年，这一年似乎没有改变...',
    genre: '流行',
    duration: 30,
    startTime: 0
  },
];

export const encouragementMessages = [
  '别灰心，这首歌很火的，再想想！',
  '加油！这首歌在抖音上超多人用！',
  '没关系，多听几遍就能想起来！',
  '继续努力，这首歌你一定听过！',
  '别放弃，这首歌是热门神曲哦！',
  '提示一下：这首歌最近很火~',
  '相信自己，再试一次吧！',
  '很好的尝试！继续加油！',
];

export const getRandomSong = (excludeIds: number[] = []): Song => {
  const availableSongs = songs.filter(s => !excludeIds.includes(s.id));
  if (availableSongs.length === 0) {
    return songs[Math.floor(Math.random() * songs.length)];
  }
  return availableSongs[Math.floor(Math.random() * availableSongs.length)];
};

export const getRandomEncouragement = (): string => {
  return encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
};
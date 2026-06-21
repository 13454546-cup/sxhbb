export interface JournalEntry {
  date: string;
  mood: 'happy' | 'calm' | 'anxious' | 'sad';
  note: string;
  timestamp: number;
}

export const STORAGE_KEY = 'relax_game_journal';

export const loadJournal = (): JournalEntry[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveJournal = (entries: JournalEntry[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const addJournalEntry = (entry: JournalEntry): void => {
  const entries = loadJournal();
  const existingIndex = entries.findIndex(e => e.date === entry.date);
  if (existingIndex >= 0) {
    entries[existingIndex] = entry;
  } else {
    entries.push(entry);
  }
  saveJournal(entries);
};

export const getTodayEntry = (): JournalEntry | null => {
  const entries = loadJournal();
  const today = new Date().toISOString().split('T')[0];
  return entries.find(e => e.date === today) || null;
};

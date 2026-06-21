import { create } from 'zustand';
import { JournalEntry, loadJournal, addJournalEntry } from '@/utils/storage';

interface AppStore {
  journalEntries: JournalEntry[];
  currentMood: 'happy' | 'calm' | 'anxious' | 'sad' | null;
  loadEntries: () => void;
  addEntry: (entry: JournalEntry) => void;
  setMood: (mood: 'happy' | 'calm' | 'anxious' | 'sad') => void;
}

export const useStore = create<AppStore>((set) => ({
  journalEntries: [],
  currentMood: null,
  loadEntries: () => {
    const entries = loadJournal();
    set({ journalEntries: entries });
    const today = new Date().toISOString().split('T')[0];
    const todayEntry = entries.find(e => e.date === today);
    if (todayEntry) {
      set({ currentMood: todayEntry.mood });
    }
  },
  addEntry: (entry) => {
    addJournalEntry(entry);
    const entries = loadJournal();
    set({ journalEntries: entries, currentMood: entry.mood });
  },
  setMood: (mood) => {
    set({ currentMood: mood });
    const today = new Date().toISOString().split('T')[0];
    addJournalEntry({
      date: today,
      mood,
      note: '',
      timestamp: Date.now(),
    });
  },
}));

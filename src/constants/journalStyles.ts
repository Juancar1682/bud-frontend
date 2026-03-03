export type JournalStyle = 'friendly' | 'direct' | 'coach';

export const journalStyleOptions: Array<{ value: JournalStyle; label: string; description: string }> = [
  {
    value: 'friendly',
    label: 'Friendly',
    description: 'Warm and supportive tone with gentle language.'
  },
  {
    value: 'direct',
    label: 'Direct',
    description: 'Clear and concise responses with practical next steps.'
  },
  {
    value: 'coach',
    label: 'Coach',
    description: 'Encouraging and action-oriented guidance.'
  }
];

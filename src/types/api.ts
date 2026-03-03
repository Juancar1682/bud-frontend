import type { JournalStyle } from '../constants/journalStyles';

export type ApiSuccess<T> = {
  success: true;
  data: T;
  meta: {
    timestamp: string;
  };
};

export type ApiError = {
  success: false;
  error: {
    code: string;
    message: string;
  };
  meta: {
    timestamp: string;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export type MoodEntryDto = {
  id: string;
  score: number;
  tags: string[];
  note?: string;
  createdAt: string;
};

export type MoodListResponse = {
  entries: MoodEntryDto[];
};

export type InsightResponse = {
  insight: {
    date: string;
    yesterdayReflection: string;
    todayPrediction: string;
    explanation: string;
  };
  todayMood: number;
  windowDays: number;
};

export type JournalMessageDto = {
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
};

export type JournalTurnResponse = {
  sessionId: string;
  messages: JournalMessageDto[];
  disclaimer: string;
  escalationSuggested?: boolean;
};

export type SettingsResponse = {
  user: {
    id: string;
    displayName: string;
    journalStyle: JournalStyle;
  };
};

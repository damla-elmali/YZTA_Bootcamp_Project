export type LearningStyle = 'detailed' | 'technical' | 'concise';
export type VisualsPreference = 'always' | 'necessary' | 'none';
export type TimePreference = 'short' | 'medium' | 'long';
export type ExamplesPreference = 'many' | 'basic' | 'none';

export interface UserPreferences {
  learningStyle: LearningStyle;
  visualsPreference: VisualsPreference;
  timePreference: TimePreference;
  examplesPreference: ExamplesPreference;
  topic?: string;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ConversationContext {
  messages: Message[];
  preferences: UserPreferences;
}
export interface ChatSession {
    id: string;
    createdAt: Date;
    history: {
      role: 'user' | 'assistant';
      content: string;
    }[];
  }
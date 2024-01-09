export interface Message {
    id?: number;
    role: string;
    content: string;
    type?: 'text' | 'image';
}

export interface User {
    id?: number;
    avatarUrl: string;
    username: string;
    balance: number;
}
  
  
export interface Conversation {
    id?: number;
    messages: Message[];
    name: string;
    totalTokens?: number;
}
export interface Message {
    id?: number;
    role: string;
    content: string;
    type?: 'text' | 'image';
}
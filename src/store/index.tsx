import { Conversation, Message, User } from "../models";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthState {
    jwt: string | null;
    setJwt: (jwt: string) => void;
}

interface StoreState {
    user: User | null;
    conversations: Conversation[];
    currentConversationId: number | null;
    setCurrentConversationId: (conversationId: number) => void;
    setUser: (user: User) => void;
    addConversation: (conversation: Conversation) => void;
    delConversation: (conversationId: number) => void;
    updateConversation: (conversationId: number, conversation: Conversation) => void;
    setConversations: (conversations: Conversation[]) => void;
    addMessage: (conversationId: number, message: Message) => void;
}

export const useStore = create<StoreState>()(
    persist(
        (set) => ({
            user: null,
            conversations: [],
            currentConversationId: null,
            setCurrentConversationId: (conversationId) => set({ currentConversationId: conversationId }),
            setUser: (user) => set({ user }),
            setConversations: (conversations) => set({ conversations }),
            addConversation: (conversation) =>
                set((state) => ({ conversations: [...state.conversations, conversation] })),
            delConversation: (conversationId) => set((state) => ({
                conversations: state.conversations.filter((conv) => conv.id !== conversationId),
            })),
            addMessage: (conversationId, message) =>
                set((state) => ({
                    conversations: state.conversations.map((conv) =>
                        conv.id === conversationId
                        // 检测最后一个消息是否是{{WAITING}}，如果是则替换，否则添加
                        ? { ...conv, messages: 
                            conv.messages && conv.messages.length > 1 && conv.messages[conv.messages.length - 1].content === "{{WAITING}}" 
                            ? [...conv.messages.slice(0, -1), message] 
                            : [...conv.messages, message] }
                        : conv
                    ),
                })),
            updateConversation: (conversationId, conversation) =>
                set((state) => ({
                    conversations: state.conversations.map((conv) =>
                        conv.id === conversationId ? conversation : conv
                    ),
                })),
        }),
        {
            name: 'store-storage',
            storage: createJSONStorage(() => localStorage),
        },
    )
);

export const useAuthStore = create<AuthState>()(
    persist((set) => ({
        jwt: null,
        setJwt: (jwt) => set({ jwt }),
    }), {
        name: 'auth-storage',
        getStorage: () => localStorage,
    }
    )
);
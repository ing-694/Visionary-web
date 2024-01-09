import axios, { AxiosResponse } from 'axios';
import { useAuthStore } from '../store';
import { Conversation, Message } from "../models";

class ApiService {
    private baseURL: string = 'https://api.ai2u.link';

    private getJwt() {
        return useAuthStore.getState().jwt;
    }

    public async login(username: string, password: string): Promise<AxiosResponse> {
        try {
            const response = await axios.post(`${this.baseURL}/user/login`, {
                username,
                password,
            });
            const jwt = response.data.token;
            useAuthStore.getState().setJwt(jwt);
            return jwt;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async register(username: string, password: string): Promise<AxiosResponse> {
        try {
            return await axios.post(`${this.baseURL}/user/register`, {
                username,
                password,
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async logout(): Promise<void> {
        try {
            useAuthStore.getState().setJwt("");
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async getConversations(): Promise<Conversation[]> {
        try {
            const response = await axios.get(`${this.baseURL}/api/conversations/`, {
                headers: {
                    Authorization: `Bearer ${this.getJwt()}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async addConversation(name: string): Promise<Conversation> {
        try {
            const response = await axios.post(`${this.baseURL}/api/conversations/`, {
                name,
            }, {
                headers: {
                    Authorization: `Bearer ${this.getJwt()}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async deleteConversation(conversationId: number): Promise<void> {
        try {
            await axios.delete(`${this.baseURL}/api/conversations/${conversationId}`, {
                headers: {
                    Authorization: `Bearer ${this.getJwt()}`,
                },
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async getMessages(conversationId: number): Promise<Message[]> {
        try {
            const response = await axios.get(`${this.baseURL}/api/conversations/${conversationId}/messages`, {
                headers: {
                    Authorization: `Bearer ${this.getJwt()}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async addMessage(conversationId: number, content: string, role: string): Promise<Message> {
        try {
            const response = await axios.post(`${this.baseURL}/api/conversations/${conversationId}/messages`, {
                content,
                role,
            }, {
                headers: {
                    Authorization: `Bearer ${this.getJwt()}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export const api = new ApiService();

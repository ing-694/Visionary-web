import { useEffect } from 'react';
import { useStore } from '../../store';
import ChatBox from './ChatBox';
import ChatManager from './ChatManager';
import { api } from '../../services/api';

const ChatPage = () => {
  const { conversations, setConversations, currentConversationId, setCurrentConversationId, updateConversation } = useStore();

  useEffect(() => {
    async function fetchConversations() {
      const newConversations = await api.getConversations();

      if (conversations.length === 0) {
        setConversations(newConversations);
        setCurrentConversationId(-1);
        return;
      }

      // 对比并更新会话列表
      const oldConversationIds = conversations.map((conv) => conv.id);
      const newConversationIds = newConversations.map((conv) => conv.id);
      const deletedConversationIds = oldConversationIds.filter((id) => !newConversationIds.includes(id));
      const addedConversations = newConversations.filter((conv) => !oldConversationIds.includes(conv.id));
      const remainingConversations = conversations.filter((conv) => !deletedConversationIds.includes(conv.id));
      setConversations([...remainingConversations, ...addedConversations]);

      // 对比并更新当前会话的消息列表
      if (currentConversationId && currentConversationId !== -1) {
        const messages = await api.getMessages(currentConversationId);
        const currentConversation = conversations.find((conv) => conv.id === currentConversationId)!;

        if (!currentConversation.messages) {
          console.log('No messages in current conversation. Update conversation...')
          updateConversation(currentConversationId, { ...currentConversation, messages: messages });
        } else {
          const newMessageContent = messages.map((message) => message.role + ':' + message.content);
          const oldMessageContent = currentConversation.messages.map((message) => message.role + ':' + message.content);
          if (newMessageContent.toString() !== oldMessageContent.toString()) {
            console.log('Messages changed. Update conversation...')
            updateConversation(currentConversationId, { ...currentConversation, messages: messages });
          }
        }
      }
    }

    fetchConversations();
  }, [currentConversationId]);

  return (
    <div className="p-10 w-screen h-screen flex flex-row justify-normal items-center">
      <div className='w-1/4 h-full'>
        <ChatManager />
      </div>
      <div className='w-3/4 h-full'>
        <ChatBox />
      </div>
    </div>
  );
};

export default ChatPage;

import React from 'react';
import { Textarea, Button, Avatar, Card, Spinner } from '@nextui-org/react';
import { Message } from '../../models';
import { useStore } from '../../store';
import { api } from '../../services/api';

interface InputBoxProps {
    onSubmit: (content: string) => void;
}

interface MessageListProps {
    messages: Message[];
}

interface MessageBlockProps {
    message: Message;
}

interface TitlebarProps {
    title: string;
}

const TitleBar: React.FC<TitlebarProps> = ({ title }) => {
    return (
        <div className="w-full h-16">
            <div className="text-3xl font-bold">{title}</div>
        </div>
    )
}

const MessageBlock: React.FC<MessageBlockProps> = ({ message }) => {
    if (message.role === 'user') {
        return (
            <div className="flex w-full justify-end items-start mb-4">
                <Card className="p-2 max-w-[90%]">
                    {message.content}
                </Card>
                <Avatar
                    src={'/emoji.png'}
                    size="md"
                    className="ml-2"
                    classNames={{base: "bg-transport"}}
                />
            </div>
        );
    } else {
        return (
            <div className="flex w-full justify-start items-start mb-4">
                <Avatar
                    src={'/chatgpt-logo.png'}
                    size="md"
                    className="mr-2"
                />
                <Card className="p-2 max-w-[90%]">
                    {message.content === "{{WAITING}}" ? (<span className='flex flex-row gap-1 items-center'><Spinner size="sm" />思考中...</span>) : message.content}
                </Card>
            </div>
        );
    }
};

const InputBox: React.FC<InputBoxProps> = ({ onSubmit }) => {
    const [value, setValue] = React.useState('');

    const handleSubmit = () => {
        onSubmit(value);
        setValue('');
    };

    return (
        <div className="flex w-full justify-between items-start">
            <Textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="请输入消息"
                width="80%"
                className="mr-2"
                minRows={2}
                maxRows={8}
                variant="bordered"
            />
            <Button
                color="primary"
                variant="ghost"
                onClick={handleSubmit}
                size='md'
            >
                Send
            </Button>
        </div>
    );
};

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    const messagesEndRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages]);

    return (
        <div className="p-3 w-full overflow-y-scroll flex-1">
            {messages.map((message: Message) => (
                <MessageBlock key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef}></div>
        </div>
    );
};

const ChatBox: React.FC = () => {
    const { conversations, currentConversationId, addMessage, addConversation, setCurrentConversationId } = useStore();

    const handleSubmit = async (content: string) => {
        let ccId = currentConversationId;

        if (!currentConversationId || currentConversationId === -1) {
            const newConversation = await api.addConversation("New Conversation");
            addConversation(newConversation);
            setCurrentConversationId(newConversation.id!)
            ccId = newConversation.id!;
        }
        addMessage(ccId!, { "role": "user", "content": content })
        addMessage(ccId!, { "role": "assistant", "content": "{{WAITING}}" })
        const newMessage = await api.addMessage(ccId!, content, "user");
        addMessage(ccId!, newMessage);
    }

    return (
        <div className="p-3 flex flex-col justify-between items-start gap-2 w-full h-full">
            <TitleBar title="AI Chat" />
            <MessageList messages={
                conversations.find((item) => item.id === currentConversationId)?.messages || []
            } />
            <InputBox onSubmit={handleSubmit} />
        </div>
    );
};

export default ChatBox;
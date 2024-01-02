// 一个聊天盒子，传入聊天记录列表和发送消息的方法，通过MessageBlock渲染一堆消息，通过InputBox渲染输入框，通过Button渲染发送按钮。
// 使用NextUI


// Path: src/components/ChatPage/InputBox.tsx
import React from 'react';
import { Textarea, Button, Avatar, Card } from '@nextui-org/react';
import { Message } from '../../models';

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
                    src={'/user.png'}
                    size="md"
                    className="ml-2"
                />
            </div>
        );
    } else {
        return (
            <div className="flex w-full justify-start items-center mb-4">
                <Avatar
                    src={'/robot.png'}
                    size="md"
                    className="mr-2"
                />
                <Card className="p-2 max-w-[90%]">
                    {message.content}
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
    return (
        <div className="p-3 w-full overflow-y-scroll">
            {messages.map((message: Message) => (
                <MessageBlock key={message.id} message={message} />
            ))}
        </div>
    );
};

const ChatBox: React.FC = () => {
    const messages: Message[] = [
        { id: 1, role: 'user', content: 'Hello' },
        { id: 2, role: 'robot', content: 'Hi' },
        { id: 3, role: 'user', content: 'How are you? If you pass the isRequired property to the input, it will have a danger asterisk at the end of the label and the textarea will be required. If you pass the isRequired property to the input, it will have a danger asterisk at the end of the label and the textarea will be required. If you pass the isRequired property to the input, it will have a danger asterisk at the end of the label and the textarea will be required. If you pass the isRequired property to the input, it will have a danger asterisk at the end of the label and the textarea will be required.' },
        { id: 4, role: 'robot', content: "aa" },
        { id: 5, role: 'user', content: 'How are you?' },
        { id: 6, role: 'robot', content: 'Hi' },
        { id: 7, role: 'user', content: 'How are you?' },
        { id: 8, role: 'robot', content: 'Hi' },
        { id: 9, role: 'user', content: 'How are you?' },
        { id: 10, role: 'robot', content: 'Hi' },
        { id: 11, role: 'user', content: 'How are you?' },
        { id: 12, role: 'robot', content: 'Hi' },
        { id: 13, role: 'user', content: 'How are you?' },
        { id: 14, role: 'robot', content: 'Hi' },
        { id: 15, role: 'user', content: 'How are you?' },
        { id: 16, role: 'robot', content: 'Hi' },
        { id: 17, role: 'user', content: 'How are you?' },
        { id: 18, role: 'robot', content: 'Hi' },
        { id: 19, role: 'user', content: 'How are you?' },
        { id: 20, role: 'robot', content: 'Hi' },
        { id: 21, role: 'user', content: 'How are you?' },
        { id: 22, role: 'robot', content: 'Hi' },
        { id: 23, role: 'user', content: 'How are you?' },
        { id: 24, role: 'robot', content: 'Hi' },
        { id: 25, role: 'user', content: 'How are you?' },
        { id: 26, role: 'robot', content: 'Hi' },
        { id: 27, role: 'user', content: 'How are you?' },
        { id: 28, role: 'robot', content: 'Hi' },
        { id: 29, role: 'user', content: 'How are you?' },
        { id: 30, role: 'robot', content: 'Hi' },
    ];


    const handleSubmit = (content: string) => {
        console.log(content);
    }
    
    return (
        <div className="p-3 flex flex-col justify-between items-start gap-2 w-full h-full">
            <TitleBar title="AI Chat" />
            <MessageList messages={messages} />
            <InputBox onSubmit={handleSubmit} />
        </div>
    );
};

export default ChatBox;
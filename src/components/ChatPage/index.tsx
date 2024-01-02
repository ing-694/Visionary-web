import ChatBox from './ChatBox';
import ChatManager from './ChatManager';

const ChatPage = () => {
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

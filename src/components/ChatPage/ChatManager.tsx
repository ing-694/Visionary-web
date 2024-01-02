// 最上方是标题，中间是一串对话的标题可供选择，最下面是用户头像和用户名信息

import { Avatar, Card } from "@nextui-org/react"

// const TitleBar: React.FC = () => {
//     return (
//         <div className="w-full h-16">
//             <div className="text-2xl font-bold">AI Chat</div>
//         </div>
//     )
// }

const ConversationList: React.FC = () => {
    const conversationList = [
        {
            name: 'Conversation 1',
            id: 1
        },
        {
            name: 'Conversation 2',
            id: 2
        },
        {
            name: 'Conversation 3',
            id: 3
        },
        {
            name: 'Conversation 4',
            id: 4
        },
        {
            name: 'Conversation 5',
            id: 5
        }, {
            name: 'Conversation 6',
            id: 6
        },
        {
            name: 'Conversation 7',
            id: 7
        },
        {
            name: 'Conversation 8',
            id: 8
        },
        {
            name: 'Conversation 9',
            id: 9
        },

    ]

    return (
        <div className="w-full flex flex-col flex-1">
            <div className="text-3xl font-bold mb-5 h-fit">Conversation</div>
            <div className="w-full mb-5 py-1">
                {conversationList.map((item) => {
                    return (
                        <Card
                            shadow="sm"
                            isHoverable
                            isPressable
                            className="w-full mb-3 p-3">
                            <div className="text-md">{item.name}</div>
                        </Card>
                    )
                })
                }
            </div>
        </div>
    )
}

const UserInfo: React.FC = () => {
    return (
        <Card className="w-full h-16 p-3 flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-center">
                <Avatar src={'/user.png'} size="sm" className="mr-2" />
                <div className="text-md">User Info</div>
            </div>
        </Card>
    )
}

const ChatManager: React.FC = () => {
    return (
        <div className="p-3 w-full h-full flex flex-col justify-center items-center">
            <ConversationList />
            <UserInfo />
        </div>
    )
}

export default ChatManager;

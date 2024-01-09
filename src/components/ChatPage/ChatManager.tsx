import { Avatar, Button, Card, Listbox, ListboxItem } from "@nextui-org/react"
import { useStore } from "../../store";
import { api } from "../../services/api";

const ConversationList: React.FC = () => {
    const { conversations, currentConversationId, setCurrentConversationId, delConversation } = useStore();

    return (
        <div className="w-full flex flex-col flex-1">
            <div className="text-3xl font-bold mb-5 h-fit">Conversation</div>
            <div className="w-full mb-5 py-1">
                <Listbox
                    aria-label="Conversation List"
                    variant="flat"
                    selectionMode="none"
                    selectedKeys={new Set([currentConversationId!])}
                    onSelectionChange={(keys) => {
                        setCurrentConversationId([...keys][0] as number);
                        console.log("Switch to Conversation " + [...keys][0]);
                    }}
                >
                    {conversations.map((item) => {
                        return (
                            <ListboxItem
                                key={item.id!}
                                onClick={() => { setCurrentConversationId(item.id!) }}
                                style={{ backgroundColor: item.id === currentConversationId ? '#e0e7ff' : '' }}
                            >
                                <div className="w-full h-full flex flex-row justify-between items-center">
                                    <div className="text-md">{item.name}</div>
                                    <Button
                                        isIconOnly
                                        className="text-md"
                                        color="primary"
                                        variant="light"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            api.deleteConversation(item.id!);
                                            delConversation(item.id!);
                                        }}
                                    >×</Button>
                                </div>
                            </ListboxItem>
                        )
                    })
                    }
                </Listbox>
            </div>
        </div>
    )
}

const UserInfo: React.FC = () => {
    const { user } = useStore();

    return (
        <Card className="w-full h-16 p-3 flex flex-row justify-between items-center">
            <div className="flex flex-row justify-between items-center w-full">
                <Avatar src={'/emoji.png'} size="sm" className="mr-2" classNames={{base: "bg-transport"}} />
                <div className="text-md flex-1">{user?.username}</div>
                <Button className="text-md" color="primary" variant="light" onClick={api.logout}>Logout</Button>
            </div>
        </Card>
    )
}

const ChatManager: React.FC = () => {
    const { addConversation, setCurrentConversationId } = useStore();

    return (
        <div className="p-3 w-full h-full flex flex-col justify-center items-center">
            <ConversationList />
            <Button className="w-full mb-3" color="primary" variant="ghost" onClick={async () => {
                const newConversation = await api.addConversation("New Conversation");
                addConversation(newConversation);
                setCurrentConversationId(newConversation.id!)
            }}>New Conversation</Button>
            <UserInfo />
        </div>
    )
}

export default ChatManager;

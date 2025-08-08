import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'
import { useState, useEffect, useRef } from 'react';
import { Button, Input, Flex } from '@aws-amplify/ui-react';

const client = generateClient<Schema>({
    authMode: 'apiKey',
});


function ChatSection(props: any) {
    const [chatMessages, setChatMessages] = useState<Schema['ChatUS']['type'][]>([]);
    const [room, setRoom] = useState<string>("");
    const chatRef = useRef<HTMLDivElement | null>(null);
    const [input, setInput] = useState('');

    useEffect(() => {
        console.log("start",props.userInfo);
        const fetchChatMessages = async () => {
            try {
                const result = await client.models.ChatUS.list({
                    filter: {
                        room_id: {
                            eq: room
                        }
                    }
                });
                setChatMessages(result.data);
            } catch (error) {
                console.error("Error fetching chat messages:", error);
            }
        };

        fetchChatMessages();

        const sub = client.models.ChatUS.observeQuery().subscribe({
            next: ({ items }) => {
                console.log("Chat messages updated:", room);
                items = items.filter((item) => item.room_id === room);
                setChatMessages([...items]);
            },
        });
        return () => sub.unsubscribe();
    }, [room]);


    const handleSend = async () => {
        if (!input.trim()) return;
        console.log(room);
        const newMessage = {
            room_id: room,
            id: String(Date.now()),
            user_id: props.userInfo?.sub || 'user',
            user_name: props.userInfo?.preferred_username || 'user',
            chat_content: input,
        };
        try {
            const result = await client.models.ChatUS.create(newMessage);
            if (result && result.data) {
                //setChatMessages(prev => [...prev, result.data]);
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
        
        setInput('');


    };

    const handleDone = () => {
        setRoom('');
    };

    const createRoom = () => {
        const data = Date.now();
        setRoom(data.toString());
    };

    

    return (
        <>
            <h1 className="text-xl font-semibold mb-4">Task spliter Assitant</h1>
        
            <Flex
                justifyContent="flex-start"
                alignContent="flex-start"
                
                >
                <Button
                loadingText=""
                onClick={createRoom}
                >
                    Create
                </Button>
                <Input value={room} onChange={(e) => setRoom(e.target.value)}
                    placeholder="Room number"
                />
            </Flex>
            

            

            {/* {chatMessages.map((message) => (
                <div key={message.id} className="chat-message">
                    <div className="chat-message-content">
                        <strong>{message.user_id}:</strong> {message.chat_content}
                    </div>  
                </div>
                ))} */}

                <h1 className="text-xl font-semibold mb-4">Task spliter Assitant</h1>
        
            <div  className="flex flex-col h-[500px] w-full max-w-md mx-auto bg-white shadow-lg rounded-xl border  border-gray-200">
                
                <div ref={chatRef} className="flex-1 p-4 overflow-y-auto space-y-3 scroll-smooth">
                    {chatMessages.map((msg) => {
                        const displayData = () => {
                            if(msg.user_id === 'assistant' && !msg.chat_content) {
                                return (
                                    <div className="bg-gray-100 text-gray-900 rounded-2xl px-4 py-3 max-w-lg shadow relative">
                              
                                    <div className="flex space-x-1">
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0ms]"></span>
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
                                    </div>
                                </div>
                                );
                            }

                            return (<div
                            className={`px-4 py-2 rounded-xl max-w-[70%] text-sm whitespace-pre-wrap text-base font-medium ${
                                msg.user_id !== 'assistant'
                                ? 'bg-blue-500 text-white rounded-br-none'
                                : 'bg-gray-200 text-gray-800 rounded-bl-none'
                            }`}
                            >

                            {(msg.user_name ?? "") + ": " + msg.chat_content}
                            </div>);
                        }

                        return (
                        <div
                            key={msg.id}
                            className={`flex ${msg.user_id === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {displayData()}
                        </div>
                        )
                    })}
                </div>

                <div className="p-3 border-t border-gray-300 flex gap-2">
                    <input
                    type="text"
                    className="flex-1 px-3 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                    onClick={handleDone}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-red-600 transition"
                    >
                    Done
                    </button>
                    <button
                    onClick={handleSend}
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-600 transition"
                    >
                    Send
                    </button>
                </div>
            </div>
        </>
    );
}

export default ChatSection;
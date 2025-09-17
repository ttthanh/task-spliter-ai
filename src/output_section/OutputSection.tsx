import { useRef, useEffect , useState } from 'react';
import type { Schema } from '../../amplify/data/resource'
// import ChatSection from '../chat_section/ChatSection';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
};



function OutputSection(props: any) {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: 'Hello! How can I help you?', sender: 'assistant' },
    ]);
    const chatRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);
    const [input, setInput] = useState('');
    const [threadId, setThreadId] = useState('');
    const handleSend = () => {
        if (!input.trim()) return;

        const newMsg: Message = {
            id: Date.now(),
            text: input,
            sender: 'user',
        };
        const newMsg11: Message = {
            id: Date.now(),
            text: '',
            sender: 'assistant',
        };
        setMessages([...messages, newMsg, newMsg11]);


        const base64Credentials = btoa("thanh:thanh");
        const bodyData = {
            question: input,
            tasks: props.taskDataList,
            userStoryName: props.userStoryDataList.length > 0 ? props.userStoryDataList[0].content : '',
        };
        
        
        fetch('https://split-task.app.n8n.cloud/webhook/3de89bcc-d50e-4578-aa18-1f66245a91fa', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${base64Credentials}`,
                    },
                    body: JSON.stringify(bodyData),
                    })
                    .then(async response => {
                        if (!response.ok) {
                            console.log(response);
                            throw new Error('Network response was not ok');
                        }

                        const reader = response.body?.getReader();
                        if (reader) {
                            const decoder = new TextDecoder();
                            let result = '';

                            while (true) {
                                const { done, value } = await reader.read();
                                if (done) break;
                                result += decoder.decode(value, { stream: true });
                                console.log('Chunk:', decoder.decode(value)); // Or update UI here
                            }
                            const jsObject = JSON.parse(result);
                            const htmlText = jsObject.output;
                            const newMsg1: Message = {
                                id: Date.now(),
                                text: htmlText,
                                sender: 'assistant',
                            };
                            //setThreadId(jsObject.thread_id);
                            console.log(newMsg);
                            console.log(newMsg1);
                            setMessages([...messages, newMsg, newMsg1]);
                        }

                

                       // return response.json();
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
        

        // const bodyData: { question: string; thread?: string; user_story: any; tasks: any } = {
        //     question: input,
        //     user_story: props.userStoryDataList,
        //     tasks: props.taskDataList
        // };

        // if (threadId) {
        //     console.log("why not go here" + threadId);
        //     bodyData['thread'] = threadId;
        // }
        setInput('');

        // fetch('https://il1rx6j6ba.execute-api.ap-southeast-1.amazonaws.com/prod/scrum-master', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(bodyData),
        // })
        // .then(async response => {
        //     if (!response.ok) {
        //         console.log(response.body);
        //         throw new Error('Network response was not ok');
        //     }

        //     const reader = response.body?.getReader();
        //     if (reader) {
        //         const decoder = new TextDecoder();
        //         let result = '';

        //         while (true) {
        //             const { done, value } = await reader.read();
        //             if (done) break;
        //             result += decoder.decode(value, { stream: true });
        //             console.log('Chunk:', decoder.decode(value)); // Or update UI here
        //         }
        //         const jsObject = JSON.parse(result);
        //         const htmlText = jsObject.message;
        //         const newMsg1: Message = {
        //             id: Date.now(),
        //             text: htmlText,
        //             sender: 'assistant',
        //         };
        //         setThreadId(jsObject.thread_id);
        //         setMessages([...messages, newMsg, newMsg1]);
                
                

        //         console.log('Full result:', result);
        //     }
            
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        // });

    };

    const storeTheChat = async (threadId: string, messages: Message[]) => {
        const bodyData: { user_id: string; thread_id: string; message: string } = {
            user_id: props.userId,
            thread_id: threadId,
            message: JSON.stringify(messages)
        };

        fetch('https://il1rx6j6ba.execute-api.ap-southeast-1.amazonaws.com/prod/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData),
        })
        .then(response => {
            if (!response.ok) {
                console.log(response.body);
                throw new Error('Network response was not ok');
            }

            console.log('Full result:', response);
            setMessages([
                { id: 1, text: 'Hello! How can I help you?', sender: 'assistant' },
            ]);
            setThreadId('');
            
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const updateTheTask = async (messages: Message[]) => {
        

        type UserStoryC = {
            name: string;
            tasks:  TaskC[];
        };

        type TaskC = {
            id: string;
            task: string;
            note: string;
            progress: string;
        };

        const dataSend = props.userStoryDataList.map((us: Schema['UserStory']['type']) => {
            const bodyData1: UserStoryC = { 
                name: us.content ?? '',
                tasks: props.taskDataList
                    .filter((task: Schema['Task']['type']) => task.user_story_id === us.id)
                    .map((task: Schema['Task']['type']) => ({
                        id: task.id,
                        task: task.title,
                        note: task.note ?? '',
                        progress: String(task.progress ?? 0),
                    }))
            };

            return bodyData1;
        });

        const bodyData: { user_id: string; messages: string; dataSend: string } = {
            user_id: props.userId,
            messages: JSON.stringify(messages),
            dataSend: JSON.stringify(dataSend)
        };

        fetch('https://thanhtt1.app.n8n.cloud/webhook/6e134316-2edd-421f-9ade-acf9bfda42ca', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        //'Authorization': `Basic ${base64Credentials}`,
                    },
                    body: JSON.stringify(bodyData),
                    })
                    .then(response => {
                        if (!response.ok) {
                            console.log(response);
                            throw new Error('Network response was not ok');
                        }

                        console.log(response);
                        return response.json();
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
        // You can use dataSend here as needed
    }

    const handleDone = () => { 
        storeTheChat(threadId, messages);
        updateTheTask(messages);


        setMessages([
            { id: 1, text: 'Hello! How can I help you?', sender: 'assistant' },
        ]);
        setThreadId('');
        setInput('');

    }

    return (
        <>  
            {/* <ChatSection userInfo={props.userInfo}/> */}
            <h1 className="text-xl font-semibold mb-4">Task spliter Assitant</h1>
        
            <div  className="flex flex-col h-[500px] w-full max-w-md mx-auto bg-white shadow-lg rounded-xl border  border-gray-200">
                
                <div ref={chatRef} className="flex-1 p-4 overflow-y-auto space-y-3 scroll-smooth">
                    {messages.map((msg) => {
                        const displayData = () => {
                            if(msg.sender === 'assistant' && !msg.text) {
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
                                msg.sender === 'user'
                                ? 'bg-blue-500 text-white rounded-br-none'
                                : 'bg-gray-200 text-gray-800 rounded-bl-none'
                            }`}
                            >
                            {msg.text}
                            </div>);
                        }

                        return (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
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

export default OutputSection
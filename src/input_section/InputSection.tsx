import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'
const client = generateClient<Schema>({
    authMode: 'apiKey',
});
import {  useState, useEffect } from 'react';


function InputSection(props: any) {
    const [userStory, setUserStory] = useState('');
    // const [userStoryM, setUserStoryM] = useState<Schema['UserStory']['type'][]>([]);
    // const [taskMs, setTaskMs] = useState<Schema['Task']['type'][]>([]);
    // const [userId, setUserId] = useState<string | null>(null);
    useEffect(() => {
        
        
        // async function getUserIdentifier() {
        //     try {
        //         const { userId } = await getCurrentUser();
        //         console.log("Current User ID:", userId);
        //         setUserId(userId);

        //         const resultData = await client.models.UserStory.list({
        //             filter: {
        //                 inCharge: {
        //                     eq: userId
        //                 }
        //             }
        //         });

        //         const taskTemp = []
        //         for (const usData of resultData.data) {
        //             const resultData1 = await client.models.Task.list({
        //                 filter: {
        //                     user_story_id: {
        //                         eq: String(usData.id)
        //                     }
        //                 }
        //             });
        //             taskTemp.push(...resultData1.data);
        //         }
                
        //         setTaskMs([...taskTemp]);
        //         setUserStoryM([...resultData.data]);
        //     } catch (error) {
        //         console.error("Error getting current user:", error);
        //         return null;
        //     }
        // }
        // getUserIdentifier();
       

        // client.models.Task.observeQuery({
        //         filter: {
                    
        //         },
        //     }).subscribe({
        //     next: ({ items, isSynced }) => {
        //         console.log("Task isSynced", isSynced);
        //         console.log("Task isSynced", items);

        //         const validItems = items.filter(task => task && task.id);
        //         setTaskMs([...validItems]);
        //     },
        //     error: (err) => console.error("Subscription error:", err),
        // });

        // client.models.Task.observeQuery().subscribe({
        //     next: ({ items, isSynced }) => {
        //         console.log("Task isSynced", isSynced);
        //         setTaskMs([...items]);
        //     },
        //     error: (err) => console.error("Subscription error:", err),
        // });

        

        // const loadNotes = async () => {
        //     try {
        //         //const result = await client.models.UserStory.list(); // 'note' is the model name
        //         //const resultData = await client.models.Task.list(); // 'note' is the model name
        //         // console.log(resultData)
        //         // console.log(resultData.data);
        //         // setTasks(resultData.data);
        //         // setUserStories(result.data);
        //     } catch (error) {
        //         console.error('Error loading notes:', error);
        //     } finally {
        //          console.error('Done');
        //     }
        // };
        // loadNotes();
    }, []);

    const createUserStory = async () => {
        const newStory = await client.models.UserStory.create({
            content: userStory,
            isDone: false,
            inCharge: props.userId
        });

        // if (newStory.data) {
        //     setUserStoryM([...userStoryM, newStory.data]);
        // }
        props.userStoryClickA(newStory.data?.id);
        console.log("Created UserStory ID:", newStory.data?.id);
        return newStory.data?.id;
    };

    const createTodo = () => {
        createUserStory()
        .then((userStoryId) => {
            if (userStoryId) {
                const base64Credentials = btoa("thanh:thanh");
                const bodyData = {
                    question: userStory,
                    userStoryId: userStoryId
                };
                setUserStory('');
        
                fetch('https://thanhtt1.app.n8n.cloud/webhook/3bfb25a6-8c3e-4204-842f-2202fa28f864', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${base64Credentials}`,
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
                    }
                });
    }

    return (
        <>
        <h1 className="text-xl font-semibold mb-4">Input Section</h1>
        <div className="bg-white pb-6 rounded shadow-md w-full max-w-md">
            <p>
                <span className="float-left">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                </span>
                Describe your user story or paste ticket content
            </p>
            
            <textarea value={userStory} onChange={(e) => setUserStory(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
            placeholder="As a user, i want to automatically handle consumer"
            ></textarea>

            <div className="flex justify-center">
                <button
                    type="button" onClick={createTodo}
                    className="bg-blue-600 text-white text-lg px-8 py-3 rounded hover:bg-blue-700 transition duration-200"
                >
                    Action
                </button>
            </div>
        </div>

        {/* <ul>
            {userStories.map((userStory) => (
            <li key={userStory.id}>{userStory.content}</li>
            ))}
        </ul>
        <div className='mt-4 border-t pt-4 border-gray-300'>
            <ul>
            {tasks.map((task) => (
                <li key={task.id}>{task.title}</li>
            ))}
            </ul>
        </div> */}

        {/* <div className='mt-4 border-t pt-4 border-gray-300'>
            <ul>
            {userStoryM.map((us) => (
                <li key={us.id}>
                    <p className='font-bold'>{us.content}</p>
                    <ul>{taskMs.filter(task => task.user_story_id == us.id).sort((a, b) =>
                            (parseInt(a.order ?? '0')) - (parseInt(b.order ?? '0'))
                                        ).map(task => task && (
                            <li key={task.id}>{task.order} -- {task.title} -- { task.estimate}</li>
                        ))}
                    </ul> 
                
                </li>
            ))}
            </ul>
        </div> */}
        </>
    );
}

export default InputSection
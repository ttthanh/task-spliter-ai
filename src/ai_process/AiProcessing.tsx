import { useEffect } from 'react';
import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'

const client = generateClient<Schema>({
    authMode: 'apiKey',
});

function AiProcessing(props: any) {
    // const [userStoryM, setUserStoryM] = useState<Schema['UserStory']['type'][]>([]);
    // const [taskMs, setTaskMs] = useState<Schema['Task']['type'][]>([]);

    useEffect(() => {
        const getUserIdentifier = async () => {
            const resultData = await client.models.UserStory.list({
                    filter: {
                        inCharge: {
                            eq: props.userId
                        }
                }
            });

            const taskTemp = [];
            for (const usData of resultData.data) {
                    const resultData1 = await client.models.Task.list({
                        filter: {
                            user_story_id: {
                                eq: String(usData.id)
                            }
                        }
                    });
                    taskTemp.push(...resultData1.data);
            }
                
            props.updateTaskDataList([...taskTemp]);

            props.updateUserStoryDataList([...resultData.data]);
        }
        getUserIdentifier();
        // const sub = client.models.Task.observeQuery().subscribe({
        //     next: ({ items, isSynced }) => {
        //         console.log("Task isSynced", isSynced);
        //         setTaskMs([...items]);
        //     },
        //     error: (err) => console.error("Subscription error:", err),
        // });
        // return () => sub.unsubscribe();
        console.log("props.userId call many times");
        const setup = () => {
            const sub = client.models.Task.observeQuery().subscribe({
                next: ({ items }) => props.updateTaskDataList([...items]),
            });
            return () => sub.unsubscribe();
        };
        setup();
        
    }, [props.userStoryData]);

    const deleteAllUS = (tasks: string[], us_id: string) => {
        for (const taskId of tasks) {
            const toBeDeletedTodo = {
                id: taskId
            }
            client.models.Task.delete(toBeDeletedTodo);
        }

        const toBeDeletedTodo = {
            id: us_id
        }
        client.models.UserStory.delete(toBeDeletedTodo);

    }

    const subTaskDisplay = (task: Schema['Task']['type'], index: number) => {
        return (
            <li key={task.id} className="border border-gray-200 p-2 mb-2">
                <div className="my-1">
                    <div>
                        <span className="inline-block">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <span className="ml-1">
                            <span className="font-bold">Task {index + 1}:</span> {task.title}
                        </span>
                    </div>
                    <div className="my-1">

                        <span className="inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        </span>
                        <span className="ml-1 mr-2">
                            {task.estimate} hours
                        </span>

                        <span className="inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
                        </svg>
                        </span>
                        <span className="ml-1 mr-2">
                            Progress: {task.progress}%
                        </span>
                    </div>  
                    {task.note && (<div className="my-1"> <span className="font-bold">Note:</span> {task.note} </div>)}
                    
                    <div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-2 py-1 mx-1 rounded hover:bg-blue-700 transition duration-200"
                            >
                                Edit
                            </button>
                            <button
                                type="submit"
                                className="bg-black text-white px-2 py-1 mx-1 rounded hover:bg-black transition duration-200"
                            >
                                Recorder
                            </button>
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-2 py-1 mx-1 rounded hover:bg-green-700 transition duration-200"
                            >
                                Update Status
                            </button>
                            <button
                                onClick={() => props.deleteOneTask(task.id)}
                                className="bg-purple-600 text-white px-2 py-1 mx-1 rounded hover:bg-purple-700 transition duration-200"
                            >
                                Delete
                            </button>
                        </div>
                </div>
            </li>
        );
    };

    return <>
        <h1 className="text-xl font-semibold mb-4">Ai Analysis in Progress</h1>

        <div className='mt-4 border-t pt-4 border-gray-300'>
            <ul>
                {props.userStoryDataList.map((us: Schema['UserStory']['type']) => {
                    const filteredTasks = props.taskDataList
                    .filter((task: Schema['Task']['type']) => task.user_story_id === us.id)
                    .sort((a: Schema['Task']['type'], b: Schema['Task']['type']) => (parseInt(a.order ?? '0') - parseInt(b.order ?? '0')));

                    return (
                    <li key={us.id}>
                        <p className="font-bold text-red-500">
                            <span onClick={() => deleteAllUS(filteredTasks.map((taskData: Schema['Task']['type']) => taskData.id), us.id)}>
                                User Story:</span> {us.content}
                            </p>

                        {filteredTasks.length === 0 ? (
                        <div className="flex items-center justify-center py-4">
                            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="ml-2 text-gray-500 text-sm">Loading tasks...</span>
                        </div>
                        ) : (
                        <ul>
                            {filteredTasks.map((task: Schema['Task']['type'], index: number ) => (
                            task && subTaskDisplay(task, index)
                            ))}
                        </ul>
                        )}
                    </li>
                    );
                })}
                </ul>

        </div>
    </>
}

export default AiProcessing
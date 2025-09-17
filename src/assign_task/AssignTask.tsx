import { Heading, Divider, Accordion } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'

const client = generateClient<Schema>({
    authMode: 'apiKey',
});

function AssignTask(props: {selectedTeam: string}) {
    const [userStoryData, setUserStoryData] = useState<Schema['UserStory']['type'][]>([]);
    const [taskDatas, setTaskDatas] = useState<Map<string, Schema['Task']['type'][]>>(new Map());

    useEffect(() => {
            const getUserIdentifier = async () => {
                const resultData = await client.models.UserStory.list(
                    {
                        filter: {
                            team_assigned: {
                                eq: props.selectedTeam
                            }
                        }
                    }
                );
                const listUSdata = resultData.data;

                // Fetch tasks for each user story
                for (const usData of listUSdata) {   
                    const resultDataTask = await usData.tasks();
                    setTaskDatas(prev => {
                        const newMap = new Map(prev);
                        return newMap.set(usData.id, resultDataTask.data);
                    });
                }
    
                setUserStoryData([...listUSdata]);
            }
            getUserIdentifier();
        }, [props.selectedTeam]);


    return (
        <>
            <Heading
                width='30vw'
                level={6} 
                >
                Assign US
            </Heading>
            <Divider orientation="horizontal" />
            <Accordion allowMultiple 
                items={
                    userStoryData.map(dataUS => { 
                        const tasks = taskDatas.get(dataUS.id) || [];
                        const taskSort =  tasks.sort((a, b) => (a?.order ?? '').localeCompare(b?.order ?? ''));

                        return ({
                            trigger: dataUS.content,
                            value: dataUS.id,
                            content: taskSort.map(task => (
                                <div key={task.id}>{task.title}</div>
                            )),
                        }) 
                    })
                }
            />
        </>
    );
}

export default AssignTask;
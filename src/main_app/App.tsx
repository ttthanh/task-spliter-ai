import InputSection from '../input_section/InputSection';
import AiProcessing from '../ai_process/AiProcessing';
import OutputSection from '../output_section/OutputSection';
import { useState } from 'react';
import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'

const client = generateClient<Schema>({
    authMode: 'apiKey',
});

function App(props: any) {
  console.log(props.userInfo);
  const [userStory, setUserStory] = useState('');
  const [userStoryM, setUserStoryM] = useState<Schema['UserStory']['type'][]>([]);
  const [taskMs, setTaskMs] = useState<Schema['Task']['type'][]>([]);

  const deleteOneTask = (taskId: string) => {
    const toBeDeletedTodo = {
      id: taskId
    }
    setTaskMs(taskMs.filter((task) => task.id !== taskId));
    console.log("toBeDeletedTodo", toBeDeletedTodo);
    client.models.Task.delete(toBeDeletedTodo)
  }

  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-20">
          <div className="bg-white p-6 rounded shadow">
              <InputSection userStoryClickA={setUserStory} userId={props.userInfo?.userId}/>
          </div>
          <div className="bg-white p-6 rounded shadow">
              <AiProcessing userId={props.userInfo?.userId} userStoryData={userStory} 
                userStoryDataList={userStoryM} taskDataList={taskMs}
                updateUserStoryDataList={setUserStoryM} updateTaskDataList={setTaskMs}
                deleteOneTask={deleteOneTask}/>
          </div>
          <div className="bg-white p-6 rounded shadow">
              <OutputSection userId={props.userInfo?.userId} userStoryDataList={userStoryM} taskDataList={taskMs}/>
          </div>
        </div>
    </>
  )
}

export default App

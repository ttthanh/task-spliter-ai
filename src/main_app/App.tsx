import InputSection from '../input_section/InputSection';
import AiProcessing from '../ai_process/AiProcessing';
import OutputSection from '../output_section/OutputSection';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useState, useEffect } from 'react';



function App(props: any) {
  console.log(props.userInfo);
  const [username, setUsername] = useState<string>('User');

  useEffect(() => {
    const getUserAttributes = async () => {
      try {
        const user = await fetchUserAttributes();;
        setUsername(user.preferred_username || user.email || 'User');
      } catch (error) {
        console.error('Error fetching user attributes:', error);
        return {};
      }
    }
    getUserAttributes();
  }, []);

  
  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-20">
          <div className="bg-white p-6 rounded shadow">
              <main>
                <h1>Hello {props.userInfo?.userId}</h1>
                <h1>Hello {username}</h1>
                <button onClick={props.signOutEvent}>Sign out</button>
              </main>
              <InputSection />
          </div>
          <div className="bg-white p-6 rounded shadow">
              <AiProcessing />
          </div>
          <div className="bg-white p-6 rounded shadow">
              <OutputSection />
          </div>
        </div>
    </>
  )
}

export default App

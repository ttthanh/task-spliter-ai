import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import outputs from "../../amplify_outputs.json";

import InputSection from '../input_section/InputSection';
import AiProcessing from '../ai_process/AiProcessing';
import OutputSection from '../output_section/OutputSection';

Amplify.configure(outputs);

function App() {

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-20">
          <div className="bg-white p-6 rounded shadow">
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
      )}
    </Authenticator>
  )
}

export default App

import InputSection from '../input_section/InputSection';
import AiProcessing from '../ai_process/AiProcessing';
import OutputSection from '../output_section/OutputSection';



function App(props: any) {

  return (
    <>
        <main>
          <h1>Hello {props.userInfo.user?.username}</h1>
          <button onClick={props.signOutEvent}>Sign out</button>
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
  )
}

export default App

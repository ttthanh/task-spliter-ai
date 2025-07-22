// import type { Schema } from '../../amplify/data/resource'
// import { generateClient } from 'aws-amplify/data'
// const client = generateClient<Schema>({
//     authMode: 'apiKey',
// });

function InputSection() {

    const createTodo = () => {
        // const result = await client.models.UserStory.create({
        //     content: window.prompt("Todo content?"),
        //     isDone: false,
        //     inCharge: "Thanh"
        // });
        // console.log(result);
        

        const base64Credentials = btoa("thanh:thanh");
        const bodyData = {
            question: "Where is the USA",
        };
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

    return (
        <>
        <h1 className="text-xl font-semibold mb-4">Input Section</h1>
        <form className="bg-white pb-6 rounded shadow-md w-full max-w-md">
            <p>
                <span className="float-left">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                </span>
                Describe your user story or paste ticket content
            </p>
            
            <textarea
            className="w-full h-32 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
            placeholder="As a user, i want to automatically handle consumer"
            ></textarea>

            <div className="flex justify-center">
                <button
                    type="submit" onClick={createTodo}
                    className="bg-blue-600 text-white text-lg px-8 py-3 rounded hover:bg-blue-700 transition duration-200"
                >
                    Action
                </button>
            </div>
        </form>
        </>
    );
}

export default InputSection
function Output(props:any) {
    return (
        <div className="border border-gray-200 p-5 mb-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-red-500">
                    <span className="float-left"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                    </span>
                    <h2 className="font-semibold">HIGH</h2>
                </div>
                <div className="md:col-span-2">
                    <h2 className="font-semibold">{props.text}</h2>
                </div>
            </div>
                
            <div className="my-5">
                <span className="inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </span>
                <span className="ml-1 mr-2">
                    3 hours
                </span>
                <span className="inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                    </svg>
                </span>
                <span className="ml-1">
                    Suggested: ThanhTT1
                </span>
                <p>Create lambda to handle tickets, receive email address, check DynamoDB/Cognito..</p>
            </div>
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
                    type="submit"
                    className="bg-purple-600 text-white px-2 py-1 mx-1 rounded hover:bg-purple-700 transition duration-200"
                >
                    Export
                </button>
            </div>
        </div>
    );
}

export default Output
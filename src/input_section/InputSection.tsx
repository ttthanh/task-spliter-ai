import { useState } from 'react'

function InputSection() {
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
                    type="submit"
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
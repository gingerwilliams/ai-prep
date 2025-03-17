"use client";

import { askQuestion } from "@/utils/api";
import { useState } from "react";

const Question = () => {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(false)

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const answer = await askQuestion(value)
        setResponse(answer)
        setValue("")
        setLoading(false)
    }

    return (
        <div>
            {/* server component it would be action */}
            <form onSubmit={onSubmit}>
                <input
                    disabled={loading}
                    onChange={onChange}
                    type='text'
                    value={value}
                    placeholder='Ask a question'
                    className='border border-black/20 px-4 py-2 text-lg rounded-lg'
                />
                <button
                    disabled={loading}
                    type='submit'
                    className='bg-blue-400 px-4 py-2 rounded-lg text-lg'
                >
                    Ask
                </button>
            </form>
            {loading && <div>loading...</div>}
            {response && <div>{ response }</div>}
        </div>
    );
};

export default Question;

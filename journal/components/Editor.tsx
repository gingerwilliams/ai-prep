"use client"

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({ entry }) => {
    const [value, setValue] = useState(entry.content)
    const [isLoading, setIsLoading] = useState(false)
    const [analysis, setAnalysis] = useState(entry.analysis)
    const { summary, subject, color, mood, positive} = analysis;

    const analysisData = [
        {name: "Summary", value: summary},
        {name: "Subject", value: subject},
        {name: "Mood", value: mood},
        {name: "Positive", value: JSON.stringify(positive)}
    ]

    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true)
            const { analysis } = await updateEntry(entry.id, _value) // is _value the current or prevValue
            console.log("updated", analysis)
            setAnalysis(analysis)
            setIsLoading(false)
        } 
    })

    return (
        <div className="w-full h-full grid grid-cols-3">
            <div className="col-span-2">
                {isLoading && <div>Loading... </div>}
                <textarea
                    className="w-full h-full p-8 text-xl"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <div className="border-l border-black/10" >
                <div 
                    className="px-6 py-10"
                    style={{ backgroundColor: color }}
                >
                    <h2 className="text-2xl">Analysis</h2>
                </div>
                <div>
                    <ul>
                        {
                            analysisData.map(item => (
                                <li
                                    className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
                                    key={item.name}
                                >
                                    <span className="text-lg font-semibold">{ item.name }</span>
                                    <span>{ item.value }</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Editor;
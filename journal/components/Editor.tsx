"use client"

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({ entry }) => {
    const [value, setValue] = useState(entry.content)
    const [isLoading, setIsLoading] = useState(false)
    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true)
            const updated = await updateEntry(entry.id, _value) // is _value the current or prevValue
            setIsLoading(false)
        } 
    })
    return (
        <div className="w-full h-full">
            {isLoading && <div>Loading... </div>}
            <textarea
                className="w-full h-full p-8 text-xl"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}
export default Editor;
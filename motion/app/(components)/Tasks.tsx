
"use client"

import { deleteItem, updateStatus } from "@/utils/actions";

const Task = ( params ) => {
    const { task } = params;
    return <li className="flex">
        <div 
            onClick={() => updateStatus(task.id, task.complete)}
            className={`${task.complete === true ? "line-through text-red-600": ""}`}
        >
            { task.title }
        </div>
        <button onClick={() => deleteItem(task.id)}>➖</button>
    </li>
}

export default Task;
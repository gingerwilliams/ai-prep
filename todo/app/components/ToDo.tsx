"use client"
import { useTransition } from "react";
import { completeTodo } from "@/utils/actions";

const ToDo = ({ todo }) => {
    const [isPending, startTransition] = useTransition()
    
    return (
        <div 
            className={`border border-black/25 cursor-pointer ${todo.complete ? 'line-through text-red-900': ""}`}
            onClick={() => startTransition(() => completeTodo(todo.id))}>
                { todo.content }
        </div>
    )
}

export default ToDo;
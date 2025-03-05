"use server"
import { read } from "@/utils/actions";
import Task from "./Tasks";

const TaskList = async () => {
    const tasks = await read();

    return tasks.map(task => (
        <Task key={task.id} task={task} />
    ))  
}

export default TaskList;
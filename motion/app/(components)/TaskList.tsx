"use server"
import { getAll } from "@/utils/actions";
import Task from "./Tasks";

const TaskList = async () => {
    const tasks = await getAll();

    return tasks.map(task => (
        <Task key={task.id} task={task} />
    ))  
}

export default TaskList;
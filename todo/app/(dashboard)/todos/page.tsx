import ToDoList from "@/app/components/ToDoList"
import db from "@/utils/db"

const getData = async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 2000))
    const todos = await db.todo.findMany({})
    return todos
}

const ToDoPage = async () => {
    const todos = await getData()
    return <div>
        <ToDoList todos={todos}></ToDoList>
    </div>
}

export default ToDoPage;
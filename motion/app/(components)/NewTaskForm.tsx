import { create } from "@/utils/actions";


const NewTaskForm = () => {
    return (
        <form action={create}>
            <input name="title" type="text" className="border" />
            <input name="content" type="text" className="border" />
            <button type="submit">➕ add task</button>
        </form>
    )
}

export default NewTaskForm;

"use client"
const Task = ( params ) => {
    const { task } = params;
    return <li>{ task.title }</li>
}

export default Task;
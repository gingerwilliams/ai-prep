import NewTaskForm from "../(components)/NewTaskForm";
import TaskList from "../(components)/TaskList";

const DashboardPage = () => {
    return (
        <div>
            <div>Dashboard</div>
            <NewTaskForm />
            <TaskList />
        </div>
    )
}

export default DashboardPage;
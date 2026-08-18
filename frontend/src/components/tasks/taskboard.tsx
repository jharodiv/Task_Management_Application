import type { Task, UpdateTaskInput } from "@type/tasks/tasks.type";
import TaskColumn from "@components/tasks/taskcolumn";

interface TaskBoardProps {
    tasks: Task[];

    onUpdate: (
        id: string,
        data: UpdateTaskInput
    ) => Promise<unknown>;

    onDelete: (
        id: string
    ) => Promise<unknown>;
}

export default function TaskBoard({
    tasks,
    onUpdate,
    onDelete,
}: TaskBoardProps) {
    const incompleteTasks = tasks.filter(
        (task) => !task.completed
    );

    const completedTasks = tasks.filter(
        (task) => task.completed
    );

    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <TaskColumn
                title="Incomplete"
                count={incompleteTasks.length}
                tasks={incompleteTasks}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />

            <TaskColumn
                title="Completed"
                count={completedTasks.length}
                tasks={completedTasks}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />

        </div>
    );
}
import type {
    Task,
    UpdateTaskInput,
} from "@type/tasks/tasks.type";

import TaskCard from "@components/tasks/taskcard";

interface TaskColumnProps {
    title: string;
    count: number;
    tasks: Task[];

    onUpdate: (
        id: string,
        data: UpdateTaskInput
    ) => Promise<unknown>;

    onDelete: (
        id: string
    ) => Promise<unknown>;
}

export default function TaskColumn({
    title,
    count,
    tasks,
    onUpdate,
    onDelete,
}: TaskColumnProps) {
    return (
        <section className="rounded-lg bg-gray-100 p-4">

            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-gray-700">
                        {title}
                    </h2>

                    <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                        {count}
                    </span>
                </div>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
                {tasks.length === 0 ? (
                    <div className="rounded-md border border-dashed border-gray-300 p-6 text-center">
                        <p className="text-xs text-gray-400">
                            No tasks
                        </p>
                    </div>
                ) : (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
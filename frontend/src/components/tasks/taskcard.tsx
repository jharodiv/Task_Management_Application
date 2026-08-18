import {
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react";

import { useState } from "react";

import type {
    Task,
    UpdateTaskInput,
} from "@type/tasks/tasks.type";

import TaskModal from "@components/tasks/taskModal";

interface TaskCardProps {
    task: Task;

    onUpdate: (
        id: string,
        data: UpdateTaskInput
    ) => Promise<unknown>;

    onDelete: (
        id: string
    ) => Promise<unknown>;
}

export default function TaskCard({
    task,
    onUpdate,
    onDelete,
}: TaskCardProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    return (
        <>
            <article className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow-md">

                {/* Top */}
                <div className="mb-3 flex items-start justify-between gap-3">
                    <span className="text-xs font-medium text-gray-400">
                        TASK-{task.id}
                    </span>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() =>
                                setMenuOpen(
                                    (current) => !current
                                )
                            }
                            className="rounded p-1 text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <MoreHorizontal size={16} />
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 top-8 z-20 w-32 rounded-md border border-gray-200 bg-white py-1 shadow-lg">

                                {/* Update */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        setUpdateModalOpen(true);
                                    }}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    <Pencil size={14} />
                                    Update
                                </button>

                                {/* Delete */}
                                <button
                                    type="button"
                                    onClick={async () => {
                                        setMenuOpen(false);
                                        await onDelete(task.id);
                                    }}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    <Trash2 size={14} />
                                    Delete
                                </button>

                            </div>
                        )}
                    </div>
                </div>

                {/* Title */}
                <h3 className="mb-2 text-sm font-medium leading-5 text-gray-800">
                    {task.title}
                </h3>

                {/* Description */}
                <p className="mb-4 text-sm leading-5 text-gray-500">
                    {task.description || "No description provided."}
                </p>

                {/* Bottom */}
                <div className="flex items-center justify-between">
                    <span className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600">
                        {task.completed
                            ? "Completed"
                            : "Incomplete"}
                    </span>

                    <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                        {new Date(task.createdAt).toLocaleDateString(
                            "en-US",
                            {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            }
                        )}
                    </span>
                </div>
            </article>

            {/* Update Modal */}
            <TaskModal
                open={updateModalOpen}
                task={task}
                onClose={() => setUpdateModalOpen(false)}
                onCreate={async () => {
                    // Not used in update mode
                }}
                onUpdate={onUpdate}
            />
        </>
    );
}
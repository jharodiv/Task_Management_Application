import {
    useEffect,
    useState,
    type FormEvent,
} from "react";

import { X } from "lucide-react";

import type {
    CreateTaskInput,
    Task,
    UpdateTaskInput,
} from "@type/tasks/tasks.type";

interface TaskModalProps {
    open: boolean;
    task?: Task | null;

    onClose: () => void;

    onCreate: (
        data: CreateTaskInput
    ) => Promise<unknown>;

    onUpdate: (
        id: string,
        data: UpdateTaskInput
    ) => Promise<unknown>;
}

export default function TaskModal({
    open,
    task,
    onClose,
    onCreate,
    onUpdate,
}: TaskModalProps) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const isEditing = task !== null && task !== undefined;

    /*
     * When the modal opens:
     *
     * Create:
     *     empty fields
     *
     * Update:
     *     populate fields from the selected task
     */
    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description ?? "");
            setCompleted(task.completed);
        } else {
            setTitle("");
            setDescription("");
            setCompleted(false);
        }
    }, [task, open]);

    if (!open) {
        return null;
    }

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        if (!trimmedTitle) {
            return;
        }

        try {
            setSubmitting(true);

            /*
             * UPDATE
             */
            if (isEditing && task) {
                await onUpdate(task.id, {
                    title: trimmedTitle,
                    description: trimmedDescription,
                    completed,
                });
            }

            /*
             * CREATE
             */
            else {
                await onCreate({
                    title: trimmedTitle,
                    description: trimmedDescription,
                });
            }

            onClose();

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

            <div className="w-full max-w-md rounded-lg bg-white shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">

                    <div>
                        <h2 className="text-base font-semibold text-gray-900">
                            {isEditing
                                ? "Update Task"
                                : "Create Task"}
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                            {isEditing
                                ? "Update the details of this task."
                                : "Add a new task to your task board."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={submitting}
                        className="rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-5"
                >

                    {/* Title */}
                    <div>

                        <label
                            htmlFor="task-title"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>

                        <input
                            id="task-title"
                            type="text"
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                            placeholder="Enter task title"
                            disabled={submitting}
                            className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50"
                        />

                    </div>

                    {/* Description */}
                    <div>

                        <label
                            htmlFor="task-description"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>

                        <textarea
                            id="task-description"
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                            rows={4}
                            placeholder="Enter task description"
                            disabled={submitting}
                            className="w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50"
                        />

                    </div>

                    {/* Status - Update only */}
                    {isEditing && (
                        <div>

                            <label
                                htmlFor="task-status"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Status
                            </label>

                            <select
                                id="task-status"
                                value={
                                    completed
                                        ? "completed"
                                        : "incomplete"
                                }
                                onChange={(event) =>
                                    setCompleted(
                                        event.target.value === "completed"
                                    )
                                }
                                disabled={submitting}
                                className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50"
                            >
                                <option value="incomplete">
                                    Incomplete
                                </option>

                                <option value="completed">
                                    Completed
                                </option>
                            </select>

                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={submitting}
                            className="h-9 rounded-md border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={
                                submitting ||
                                !title.trim()
                            }
                            className="h-9 rounded-md bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {submitting
                                ? isEditing
                                    ? "Updating..."
                                    : "Creating..."
                                : isEditing
                                    ? "Update Task"
                                    : "Create Task"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}
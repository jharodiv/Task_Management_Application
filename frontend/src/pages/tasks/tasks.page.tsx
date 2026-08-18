import {
    Search,
    SlidersHorizontal,
} from "lucide-react";

import { useState } from "react";

import { useTasks } from "@hooks/tasks/useTasks";
import TaskBoard from "@components/tasks/taskboard";
import TaskModal from "@components/tasks/taskModal";

export default function TasksPage() {
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const {
        loading,
        error,

        search,
        setSearch,

        filter,
        setFilter,

        filteredTasks,

        createTask,
        updateTask,
        deleteTask,
    } = useTasks();

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50">
                <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
                    <div className="flex flex-col items-center gap-3">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-700" />

                        <p className="text-sm text-gray-500">
                            Loading tasks...
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-gray-50">
                <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
                    <div className="w-full max-w-md rounded-lg border border-red-200 bg-white p-6 text-center shadow-sm">
                        <h2 className="text-sm font-semibold text-gray-900">
                            Unable to load tasks
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            {error}
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 py-8">

                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Task Management
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Review, organize, and monitor your tasks.
                    </p>
                </header>

                <section>

                    {/* Search & Filter */}
                    <div className="mb-5 flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

                        {/* Search */}
                        <div className="relative w-full sm:max-w-md">
                            <Search
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search tasks..."
                                className="h-10 w-full rounded-md border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                            />
                        </div>

                        {/* Filter & Create */}
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal
                                size={16}
                                className="text-gray-400"
                            />

                            <select
                                value={filter}
                                onChange={(event) =>
                                    setFilter(
                                        event.target.value as typeof filter
                                    )
                                }
                                className="h-10 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                            >
                                <option value="all">
                                    All Tasks
                                </option>

                                <option value="incomplete">
                                    Incomplete
                                </option>

                                <option value="completed">
                                    Completed
                                </option>
                            </select>

                            <button
                                type="button"
                                onClick={() => setCreateModalOpen(true)}
                                className="h-10 rounded-md bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800"
                            >
                                Create
                            </button>
                        </div>
                    </div>

                    {/* Board */}
                    {filteredTasks.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-gray-300 bg-white py-12 text-center">
                            <p className="text-sm font-medium text-gray-700">
                                No tasks found
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                                Try changing your search or filter.
                            </p>
                        </div>
                    ) : (
                        <TaskBoard
                            tasks={filteredTasks}
                            onUpdate={updateTask}
                            onDelete={deleteTask}
                        />
                    )}
                </section>
            </div>

            {/* CREATE MODAL */}
            <TaskModal
                open={createModalOpen}
                task={null}
                onClose={() => setCreateModalOpen(false)}
                onCreate={createTask}
                onUpdate={updateTask}
            />
        </main>
    );
}
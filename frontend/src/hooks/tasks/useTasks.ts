import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    createTask as createTaskRequest,
    deleteTask as deleteTaskRequest,
    getTasks,
    updateTask as updateTaskRequest,
} from "@service/tasks/tasks.service";

import type {
    CreateTaskInput,
    Task,
    UpdateTaskInput,
    TaskFilter,
} from "@type/tasks/tasks.type";

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<TaskFilter>("all");

    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getTasks();

            setTasks(data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to fetch tasks"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    const createTask = useCallback(
        async (data: CreateTaskInput) => {
            try {
                setError(null);

                const task = await createTaskRequest(data);

                setTasks((current) => [
                    task,
                    ...current,
                ]);

                return task;
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to create task"
                );

                throw error;
            }
        },
        []
    );

    const updateTask = useCallback(
        async (
            id: string,
            data: UpdateTaskInput
        ) => {
            try {
                setError(null);

                const updatedTask =
                    await updateTaskRequest(id, data);

                setTasks((current) =>
                    current.map((task) =>
                        task.id === id
                            ? updatedTask
                            : task
                    )
                );

                return updatedTask;
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to update task"
                );

                throw error;
            }
        },
        []
    );

    const deleteTask = useCallback(
        async (id: string) => {
            try {
                setError(null);

                await deleteTaskRequest(id);

                setTasks((current) =>
                    current.filter(
                        (task) => task.id !== id
                    )
                );
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to delete task"
                );

                throw error;
            }
        },
        []
    );

    const filteredTasks = useMemo(() => {
        const searchValue = search.trim().toLowerCase();

        return tasks.filter((task) => {
            const matchesSearch =
                task.title
                    .toLowerCase()
                    .includes(searchValue) ||
                task.description
                    ?.toLowerCase()
                    .includes(searchValue);

            const matchesFilter =
                filter === "all" ||
                (filter === "incomplete" && !task.completed) ||
                (filter === "completed" && task.completed);

            return matchesSearch && matchesFilter;
        });
    }, [tasks, search, filter]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return {
        tasks,
        loading,
        error,

        search,
        setSearch,

        filter,
        setFilter,

        filteredTasks,

        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
    };
}
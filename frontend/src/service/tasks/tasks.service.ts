import type {
    CreateTaskInput,
    Task,
    UpdateTaskInput,
} from "@type/tasks/tasks.type";

import { API_URL } from "@lib/api";

const TASKS_URL = `${API_URL}/tasks`;

export async function getTasks(): Promise<Task[]> {
    const response = await fetch(TASKS_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    const result = await response.json();

    return result.data;
}

export async function createTask(
    data: CreateTaskInput
): Promise<Task> {
    const response = await fetch(TASKS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to create task");
    }

    const result = await response.json();

    return result.data;
}

export async function updateTask(
    id: string,
    data: UpdateTaskInput
): Promise<Task> {
    const response = await fetch(`${TASKS_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to update task");
    }

    const result = await response.json();

    return result.data;
}

export async function deleteTask(
    id: string
): Promise<void> {
    const response = await fetch(`${TASKS_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete task");
    }
}
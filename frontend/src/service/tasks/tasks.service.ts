import type {
    CreateTaskInput,
    Task,
    UpdateTaskInput,
} from "@type/tasks/tasks.type";

import { API_URL, apiRequest } from "@lib/api";

const TASKS_URL = `${API_URL}/tasks`;

export async function getTasks(): Promise<Task[]> {
    return apiRequest<Task[]>(TASKS_URL);
}

export async function createTask(
    data: CreateTaskInput
): Promise<Task> {
    return apiRequest<Task>(TASKS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

export async function updateTask(
    id: string,
    data: UpdateTaskInput
): Promise<Task> {
    return apiRequest<Task>(`${TASKS_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

export async function deleteTask(
    id: string
): Promise<void> {
    await apiRequest<void>(`${TASKS_URL}/${id}`, {
        method: "DELETE",
    });
}
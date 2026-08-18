import { Request, Response } from "express";

import {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} from "@services/tasks/task.service";

export async function getAllTasks(
    req: Request,
    res: Response
) {
    const tasks = await getTasks();

    res.json({
        data: tasks,
    });
}

export async function getSingleTask(
    req: Request<{ id: string }>,
    res: Response
) {
    const { id } = req.params;

    const task = await getTaskById(id);

    if (!task) {
        res.status(404).json({
            message: "Task not found",
        });

        return;
    }

    res.json({
        data: task,
    });
}

export async function createNewTask(
    req: Request,
    res: Response
) {
    const { title, description } = req.body;

    const task = await createTask({
        title,
        description,
    });

    res.status(201).json({
        message: "Task created successfully",
        data: task,
    });
}

export async function updateExistingTask(
    req: Request<{ id: string }>,
    res: Response
) {
    const { id } = req.params;

    const {
        title,
        description,
        completed,
    } = req.body;

    const task = await updateTask(id, {
        title,
        description,
        completed,
    });

    res.json({
        message: "Task updated successfully",
        data: task,
    });
}

export async function removeTask(
    req: Request<{ id: string }>,
    res: Response
) {
    const { id } = req.params;

    await deleteTask(id);

    res.json({
        message: "Task deleted successfully",
    });
}
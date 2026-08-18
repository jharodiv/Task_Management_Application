import prisma from "@src/lib/prisma";
import type { CreateTaskInput, UpdateTaskInput } from "@src/type/task.type";

export async function getTasks() {
    return prisma.task.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function getTaskById(id: string) {
    return prisma.task.findUnique({
        where: {
            id,
        },
    });
}

export async function createTask(
    data: CreateTaskInput
) {
    return prisma.task.create({
        data: {
            title: data.title,
            description: data.description,
        },
    });
}

export async function updateTask(
    id: string,
    data: UpdateTaskInput
) {
    return prisma.task.update({
        where: {
            id,
        },
        data
    });
}

export async function deleteTask(id: string) {
    return prisma.task.delete({
        where: {
            id,
        },
    });
}
import { Router } from "express";

import {
    getAllTasks,
    createNewTask,
    updateExistingTask,
    removeTask,
} from "@src/controllers/tasks.controller";

const router = Router();

router.get("/", getAllTasks);

router.post("/", createNewTask);

router.patch("/:id", updateExistingTask);

router.delete("/:id", removeTask);

export default router;  
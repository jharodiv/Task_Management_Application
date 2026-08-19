import express from "express";
import cors from "cors";

import errorMiddleware from "@middleware/error/error.middleware";
import taskRoutes from "@routes/tasks.routes";

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
    })
);

app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.use(errorMiddleware);

export default app;
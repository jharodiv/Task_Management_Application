import express from "express";
import errorMiddleware from "@middleware/error/error.middleware";
import taskRoutes from "@routes/tasks.routes";

const app = express();

app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use(errorMiddleware);

export default app;
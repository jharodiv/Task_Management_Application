import "dotenv/config";
import app from "@src/app";

const PORT = process.env.PORT;

if (!PORT) {
    console.error("Port variable is not define");
    process.exit(1);
}

const server = app.listen(PORT, () => {
    console.log(
        `Server is running on http://localhost:${PORT}`
    );
});

server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use.`);
    } else {
        console.error("Failed to start server:", error);
    }
    process.exit(1);
});
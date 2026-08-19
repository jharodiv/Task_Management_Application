# Task Management Application

A full-stack task management application built with React and Node.js.

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL

---

## Prerequisites

Make sure you have installed:

* Node.js 18+
* npm
* PostgreSQL

---

## Setup

Clone the repository:

```bash
git clone <repository-url>
cd Task_Management_Application
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend`:

```env
PORT = 3000
DATABASE_URL="postgresql://postgres:dracarys@localhost:5432/task_api"
FRONTEND_URL=http://localhost:5173
```

Generate Prisma Client and set up the database:

```bash
npx prisma generate
npx prisma migrate dev
```

Start the backend:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:3000
```

---

### Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend`:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Running the Application

Run both applications simultaneously:

**Terminal 1 — Backend**

```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend**

```bash
cd frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

> Make sure PostgreSQL is running and the `DATABASE_URL` is correctly configured before starting the backend.

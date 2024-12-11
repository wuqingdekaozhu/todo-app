# To-do Application Project

This project is a full-stack application for managing tasks, featuring a backend built with NestJS, a frontend built with Next.js, and a MySQL database. The entire stack is containerized using Docker for seamless development and deployment.

---

## Project Structure

### Backend (NestJS)
- **Location**: `./backend`
- Provides CRUD APIs for task management.
- Connects to the MySQL database.

### Frontend (Next.js)
- **Location**: `./frontend`
- A user-friendly interface for managing tasks.
- Communicates with the NestJS backend.

### Database (MySQL)
- Stores task information.
- Schema includes fields for `id`, `title`, `description`, `status`, `created_at`, and `updated_at`.

### Docker Compose
- Defines services for MySQL, NestJS, and Next.js.

---

## Prerequisites

1. **Docker**: Install Docker and Docker Compose on your system.
2. **Node.js**: For local development, ensure Node.js 23+ is installed.

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/wuqingdekaozhu/todo-app.git
cd to-do app
```

### 2. Directory Structure
```
<project-root>
|-- backend/         # NestJS backend
|-- frontend/        # Next.js frontend
|-- database/        # SQL initialization
|-- docker-compose.yaml
```

---

## Running the Application

### 1. Build and Start the Containers
Run the following command to start the containers:
```bash
docker-compose up --build
```

### 2. Access the Application
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:3001](http://localhost:3001)

---

## API Endpoints (NestJS)

### Base URL: `http://localhost:3001/tasks`

#### Create a Task
- **Endpoint**: `POST /tasks`
- **Body**:
```json
{
  "title": "new task",
  "description": "new description"
}
```

#### Get All Tasks
- **Endpoint**: `GET /tasks`
- **Query Parameters**:
  - `status` (optional): `Pending` or `Completed`

#### Update a Task
- **Endpoint**: `PUT /tasks/:id`
- **Body**:
```json
{
  "title": "updated task",
  "description": "updated description",
  "status": "completed"
}
```

#### Delete a Task
- **Endpoint**: `DELETE /tasks/:id`

---

## Frontend Features (Next.js)

- Task listing in a responsive table.
- Create, update, and delete tasks.
- Filter tasks by status.

---

## Docker Compose Configuration

### Services
- **MySQL**:
  - Port: `3306`
  - Data persistence using `mysql_data` volume.
- **NestJS Backend**:
  - Port: `3001`
  - Depends on MySQL.
- **Next.js Frontend**:
  - Port: `3000`
  - Depends on NestJS.

### Volumes
- `mysql_data`: Ensures persistent storage for MySQL.

---

## Useful Commands

### Stop All Containers
```bash
docker-compose down
```

### Rebuild Containers
```bash
docker-compose up --build
```

---



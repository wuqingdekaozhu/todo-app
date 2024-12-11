// task interface
export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// task initiator
export const emptyTask = () => {
  const task: Task = {
    id: "",
    title: "",
    description: "",
    status: "",
    createdAt: "",
    updatedAt: "",
  }
  return task;
}
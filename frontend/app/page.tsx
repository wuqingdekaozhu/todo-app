"use client"
import React, { useState } from 'react';

const Home = () => {
  const [taskData, setTaskData] = useState(null);
  const [status, setStatus] = useState('');

  // POST request to create a task
  const createTask = async () => {
    const task = {
      title: 'Complete NestJS Tutorial',
      description: 'Learn how to build APIs with NestJS and MySQL',
    };

    const response = await fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const data = await response.json();
    setTaskData(data);
    setStatus('Task Created!');
  };

  // GET request to fetch all tasks
  const getAllTasks = async () => {
    const response = await fetch('http://localhost:3001/tasks');
    const data = await response.json();
    setTaskData(data);
    setStatus('Fetched all tasks');
  };

  // PUT request to update a task
  const updateTask = async () => {
    const taskId = 1; // Example task ID, replace as needed
    const updatedData = {
      title: 'Updated Task Title',
      status: 'Completed',
    };

    const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();
    setTaskData(data);
    setStatus('Task Updated!');
  };

  // DELETE request to delete a task
  const deleteTask = async () => {
    const taskId = 1; // Example task ID, replace as needed

    const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setTaskData(null);
      setStatus('Task Deleted!');
    } else {
      setStatus('Error deleting task');
    }
  };

  return (
    <div>
      <h1>Task Management</h1>
      <div>
        <button onClick={createTask}>Create Task</button>
        <button onClick={getAllTasks}>Get All Tasks</button>
        <button onClick={updateTask}>Update Task</button>
        <button onClick={deleteTask}>Delete Task</button>
      </div>

      <div>
        <h2>Status: {status}</h2>
        <pre>{taskData ? JSON.stringify(taskData, null, 2) : 'No data yet'}</pre>
      </div>
    </div>
  );
};

export default Home;

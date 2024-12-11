"use client";
import React, { useEffect, useState } from "react";
import { Task, emptyTask } from "./interfaces";
import NewTask from "./(components)/newTask";
import TaskTable from "./(components)/taskTable";
import EditTask from "./(components)/editTask";

const API_ENDPOINT = "http://localhost:3001";


const Home: React.FC = () => {                                                          // home page component
  const [taskData, setTaskData] = useState<Task[]>([]);                                 // store tasks
  const [openNew, setOpenNew] = useState<boolean>(false);                               // store new task panel flag
  const [openEdit, setOpenEdit] = useState<boolean>(false);                             // store edit task panel flag
  const [filter, setFilter] = useState<number>(0);                                      // store filter flag
  const [editingTask, setEditingTask] = useState<Task>(emptyTask())                     // store current editing task

  const createTask = (
    title: string,                                                                      // new task title
    description: string                                                                 // new task description
  ) => {                                                                                // create new task function
    const task = {                                                                      // create a task object
      title: title,
      description: description,
    };

    fetch(`${API_ENDPOINT}/tasks`, {                                                    // send post request to /tasks
      method: "POST",                                                                   // http method
      headers: {                                                                        // set content header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),                                                       // task object as body
    }).then((response) => {
      getAllTasks();                                                                    // update task state
      if (!response.ok) {                                                               // if not success response
        alert("error in creating task");                                                // alert error
      }
    });
  };

  const getAllTasks = async () => {                                                     // fetch tasks from api function
    let url;                                                                            // store url variable
    if (filter === 1) {                                                                 // if filter pending
      url = `${API_ENDPOINT}/tasks/?status=Pending`                                     // set url to fetch pending tasks
    } else if (filter === 2) {                                                          // if filter completed
      url = `${API_ENDPOINT}/tasks/?status=Completed`                                   // set url to fetch completed
    } else {                                                                            // default
      url = `${API_ENDPOINT}/tasks`                                                     // set url to fetch all
    }
    const response = await fetch(url);                                                  // send get request to /tasks
    const data = await response.json();                                                 // parse return response
    setTaskData(data);                                                                  // update task state
  };

  const editTask = (updatedData: Task) => {                                             // edit task function
    fetch(`${API_ENDPOINT}/tasks/${updatedData.id}`, {                                  // send put request to /tasks/:id
      method: 'PUT',                                                                    // http method
      headers: {                                                                        // set content header
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({                                                            // set content body
        title: updatedData.title,
        description: updatedData.description,
        status: updatedData.status
      }),
    }).then((response) => {
      getAllTasks();                                                                    // update task state
      if (!response.ok) {                                                               // if not success response
        alert("error in editing task");                                                 // alert error
      }
    });
  };

  const deleteTask = (taskId: string) => {                                              // delete a task function
    fetch(`${API_ENDPOINT}/tasks/${taskId}`, {                                          // send delete request to /task/:id
      method: 'DELETE',                                                                 // http method
    }).then((response) => {
      getAllTasks();                                                                    // update task state
      if (!response.ok) {                                                               // if not success response
        alert("error in deleting task");                                                // alert error
      }
    });
  };

  const closeNewTask = () => setOpenNew(false);                                         // close new task panel function

  const handleChangeFilter = () => {                                                    // change filter button clicked function
    setFilter((prev) => (prev + 1) % 3);                                                // change between 0 ~ 2
  }

  const renderFilter = () => {                                                          // change filter to string function
    if (filter === 1) return "pending tasks";                                           // pending flag
    if (filter === 2) return "completed tasks";                                         // completed flag
    return "all tasks";                                                                 // default
  }

  const openEditTask = (editingTask: Task) => {                                         // open edit task panel function
    setOpenEdit(true);                                                                  // open edit task panel
    setEditingTask(editingTask);                                                        // set current editing task
  }

  const closeEditTask = () => setOpenEdit(false);                                       // close edit task panel function

  useEffect(() => {                                                                     // when component mounts
    getAllTasks();                                                                      // fetch tasks from api
  },[filter]);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full m-0 p-0">
        <h1 className="pt-10 pb-10">TODO LIST</h1>
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex justify-end w-4/5 md:w-3/5 m-2">
            <button
              className="bg-yellow-400 rounded-lg px-4 py-2 mr-2 text-white hover:bg-yellow-600 transition-colors duration-300 ease-in-out"
              onClick={handleChangeFilter}
            >
              {renderFilter()}
            </button>
            <button
              className="bg-green-500 rounded-lg px-4 py-2 text-white disabled:hover:bg-green-500 hover:bg-green-700 transition-colors duration-300 ease-in-out"
              onClick={()=>setOpenNew(true)}
            >
              create
            </button>
          </div>
          <TaskTable taskData={taskData} deleteTaskFunction={deleteTask} openEditFunction={openEditTask}/>
        </div>
      </div>

      {openNew && <NewTask closeFunction={closeNewTask} newTaskFunction={createTask}/>}
      {openEdit && <EditTask closeFunction={closeEditTask} editTaskFunction={editTask} editingTask={editingTask}/>}
    </>
  );
};

export default Home;

"use client";
import React from "react";
import { Task } from "../interfaces";

export interface TaskTableProps {                                                       // task table props interface
  taskData: Task[];                                                                     // all tasks
  deleteTaskFunction: (taskId: string) => void;                                         // delete task function
  openEditFunction: (editingTask: Task) => void;                                        // open edit panel function
}
const TaskTable: React.FC<TaskTableProps> = ({
  taskData,
  deleteTaskFunction,
  openEditFunction
}) => {
  return (
    <table className="w-4/5 md:w-3/5 border border-gray-300 bg-white shadow-lg">
      <thead className="bg-gray-200">
        <tr>
          <th className="border border-gray-300 px-4 py-2 text-left">Task</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {taskData.map((item)=>(
          <tr key={item.id}>
            <td className="border border-gray-300 px-4 py-2">{item.title}</td>
            <td className="border border-gray-300 px-4 py-2">{item.status}</td>
            <td className="border border-gray-300 px-4 py-2">{item.description}</td>
            <td className="px-4 py-2 flex flex-col md:flex-row">
              <button
                className="bg-blue-300 rounded-lg px-4 py-2 mr-2 mb-1 md:mb-0 text-white hover:bg-blue-500 transition-colors duration-300 ease-in-out"
                onClick={()=>openEditFunction(item)}
              >
                edit
              </button>
              <button
                className="bg-red-300 rounded-lg px-4 py-2 text-white disabled:hover:bg-red-300 hover:bg-red-500 transition-colors duration-300 ease-in-out"
                onClick={()=>deleteTaskFunction(item.id)}
                disabled={item.status !== "Completed"}
              >
                delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;
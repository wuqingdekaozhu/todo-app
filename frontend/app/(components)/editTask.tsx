"use client";
import React, { useState } from "react";
import { Task } from "../interfaces";


interface EditTaskProps {																																// edit task props interface
	closeFunction : () => void;																														// close the panel function
	editTaskFunction : (updatedData: Task) => void;																				// edit task function
	editingTask: Task;																																		// current editing task
}

const EditTask: React.FC<EditTaskProps> = ({																						// edit task modal component
	closeFunction,
	editTaskFunction,
	editingTask
}) => {
	const [task, setTask] = useState<Task>(editingTask);																	// store task

	const handleChange = (
		value: string,																																			// input value
		action: string																																			// changed variable
	) => {																																								// handle value change function
		if (action === "title") {
			setTask((prev) => ({
				...prev,
				title: value,
			}));																																							// update title of the task
		} else if (action === "description") {
			setTask((prev) => ({
				...prev,
				description: value,
			}));																																							// update description of the task
		} else if (action === "status") {
			setTask((prev) => ({
				...prev,
				status: value,
			}));																																							// update status of the task
		}
	}

	const handleConfirm = () => {																													// handle confirm button clicked function
		editTaskFunction(task);																							  							// call api to edit function
		closeFunction();																																		// close the panel
	}

	if (!task) {																																					// task is null
		return <></>
	}

  return (
		<>
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
				<div className="bg-white rounded-lg shadow-lg p-6 w-4/5 md:w-1/3">
					<h2 className="mb-4">EDIT TASK</h2>
					<div className="mb-6 flex flex-col">
						<input
							type="text"
							value={task.title}
							onChange={(e) => handleChange(e.target.value, "title")}
							placeholder="Task Title"
							className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2"
						/>
						<input
							type="text"
							value={task.description}
							onChange={(e) => handleChange(e.target.value, "description")}
							placeholder="Task Description"
							className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
						/>
						<div className="flex items-center mt-2">
							<input
								type="checkbox"
								checked={task.status === "Completed"}
								onChange={(e) => handleChange(e.target.checked ? "Completed" : "Pending", "status")}
								className="w-4 h-4 mr-2"
							/>
							<label>mark as completed</label>
						</div>
					</div>
					<div className="w-full flex justify-end">
						<button
							onClick={()=>closeFunction()}
							className="bg-red-300 text-white px-4 py-2 mr-2 rounded-lg hover:bg-red-500 transition-colors duration-300"
						>
							Cancel
						</button>
						<button
							onClick={handleConfirm}
							className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:hover:bg-green-500"
							disabled={!(task.title && task.description)}
						>
							Confirm
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default EditTask;
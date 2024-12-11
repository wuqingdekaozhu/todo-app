"use client";
import React, { useState } from "react";


interface NewTaskProps {																																// new task props interface
	closeFunction : () => void;																														// close the panel function
	newTaskFunction : (title: string, description: string) => void;												// add new task function
}

const NewTask: React.FC<NewTaskProps> = ({																							// new task modal component
	closeFunction,
	newTaskFunction
}) => {
	const [title, setTitle] = useState<string>("");																				// store title input
	const [description, setDescription] = useState<string>("")														// store description input

	const handleConfirm = () => {																													// handle confirm button clicked
		newTaskFunction(title, description);																								// call api to add function
		closeFunction();																																		// close the panel
	}

  return (
		<>
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
				<div className="bg-white rounded-lg shadow-lg p-6 w-4/5 md:w-1/3">
					<h2 className="mb-4">CREATE NEW TASK</h2>
					<div className="mb-6 flex flex-col">
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Task Title"
							className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2"
						/>
						<input
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Task Description"
							className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
						/>
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
							disabled={!(title && description)}
						>
							Confirm
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default NewTask;
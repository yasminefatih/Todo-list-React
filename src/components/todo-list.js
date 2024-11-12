import React, { useState } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editTask, setEditTask] = useState('');
  const [editDueDate, setEditDueDate] = useState('');

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTaskItem = {
        task: newTask,
        dueDate: dueDate,
      };
      setTasks([...tasks, newTaskItem]);
      setNewTask('');
      setDueDate('');
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setEditTask(tasks[index].task);
    setEditDueDate(tasks[index].dueDate);
  };

  const handleUpdateTask = () => {
    if (editTask.trim() !== '') {
      const updatedTasks = tasks.map((task, index) =>
        index === editingIndex
          ? { task: editTask, dueDate: editDueDate }
          : task
      );
      setTasks(updatedTasks);
      setEditingIndex(-1);
      setEditTask('');
      setEditDueDate('');
    }
  };

  const formatDate = (date) => {
    const [month, day, year] = new Date(date).toLocaleDateString().split('/');
    return `${day}-${month}-${year.slice(-2)}`;
  };

  return (
    <>
      <div className="max-w-lg mx-auto mt-10 p-4 border rounded shadow-lg">
        <h1 className="text-2xl mb-4 text-center">Todo List</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newTask}
            onChange={handleInputChange}
            placeholder="Enter new task..."
            className="flex-grow px-2 py-1 border border-[#06b6d4] focus:outline-[#06b6d4] rounded"
          />
          <input
            type="date"
            value={dueDate}
            onChange={handleDueDateChange}
            placeholder="Due date"
            className="px-2 py-1 border border-[#06b6d4] focus:outline-[#06b6d4] rounded"
          />
          <button
            onClick={handleAddTask}
            className="bg-[#06b6d4] text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-10 p-2 border rounded shadow-lg border-[#06b6d4]">
        <table className="w-full table-auto">
          <thead>
            <tr className="flex w-full">
              <th className="text-lg text-left w-1/3 pl-4">Tasks</th>
              <th className="text-lg text-left w-1/3 pl-4">Due Date</th>
              <th className="text-lg text-left w-1/3 pl-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className="flex w-full border-b">
                <td className="pl-4 w-1/3">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editTask}
                      onChange={(e) => setEditTask(e.target.value)}
                      className="w-full px-2 py-1 border rounded border-[#06b6d4] focus:outline-[#06b6d4]"
                    />
                  ) : (
                    <div className="truncate">{task.task}</div>
                  )}
                </td>
                <td className="pl-4 w-1/3">
                  {editingIndex === index ? (
                    <input
                      type="date"
                      value={editDueDate}
                      onChange={(e) => setEditDueDate(e.target.value)}
                      className="px-2 py-1 border border-[#06b6d4] focus:outline-[#06b6d4] rounded"
                    />
                  ) : (
                    <div>{formatDate(task.dueDate)}</div>
                  )}
                </td>
                <td className="pl-4 w-1/3 flex gap-1">
                  {editingIndex === index ? (
                    <button
                      onClick={handleUpdateTask}
                      className="bg-green-600 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditTask(index)}
                      className="bg-[#15803d] text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveTask(index)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>
        {`
          @media (max-width: 640px) {
            table, thead, tbody, th, td, tr {
              display: block;
              width: 100%;
            }
            table tr {
              margin-bottom: 1rem;
            }
            table td {
              display: flex;
              flex-direction: column;
              padding-left: 0.5rem;
              margin-bottom: 0.5rem;
            }
            table td input {
              width: 100%;
            }
            table td .bg-green-600, 
            table td .bg-[#15803d], 
            table td .bg-red-600 {
              margin-top: 0.5rem;
            }
            table td .bg-green-600 {
              margin-left: 0;
              margin-right: 0.5rem;
            }
            table td .bg-[#15803d] {
              margin-right: 0.5rem;
            }
          }
          @media (min-width: 641px) {
            table {
              display: table;
            }
            table th,
            table td {
              padding-left: 1rem;
            }
            table th {
              text-align: left;
            }
            table td {
              display: flex;
            }
            table td input {
              width: auto;
            }
          }
        `}
      </style>
    </>
  );
};

export default TodoList;

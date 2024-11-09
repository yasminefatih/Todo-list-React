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

        <h1 className="text-2xl mb-4 text-center ">Todo List</h1>

        <div className="flex">

          <input
            type="text"
            value={newTask}
            onChange={handleInputChange}
            placeholder="Enter new task..."
            className="flex-grow px-2 py-1 border border-[#06b6d4]  focus:outline-[#06b6d4] rounded mr-2"
          />

          <input
            type="date"
            value={dueDate}
            onChange={handleDueDateChange}
            placeholder="Due date"
            className="px-2 py-1 border border-[#06b6d4]  focus:outline-[#06b6d4] rounded mr-2"
          />

          <button
            onClick={handleAddTask}
            className="bg-[#06b6d4] text-white px-4 py-2 rounded"
          >
            Add Task
          </button>

        </div>

      </div>


      {/* Tasks Field */}

      <div className="max-w-2xl mx-auto mt-10 p-2 border rounded shadow-lg  border-[#06b6d4]">

        <tbody>

          <thead>
            <th className='text-lg pl-20'>Tasks</th>
            <th className='pl-52  text-lg'>Due Date</th>
            <th className='pl-28 text-lg'>Action</th>
          </thead>

        </tbody>

        <hr className=' border w-full mt-3' />

        {/* unordered list */}
        <ul className="mt-2">

          {tasks.map((task, index) => (

            <li key={index} className="flex items-center  border-b py-2 font-normal bullet-list-item list-items">

             {editingIndex === index ? (
                <>

                  <textarea name="text" id="" cols="1" rows="1"  
                  value={editTask} 
                  onChange={(e) => setEditTask(e.target.value)}
                   className="flex-grow px-2 py-1 border rounded mr-2
                   border-[#06b6d4] focus:outline-[#06b6d4]"
                  >
                  </textarea>

                  <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    className=" py-1 px-1 border border-[#06b6d4]  focus:outline-[#06b6d4] rounded "
                  />

                </>
              ) : (
                <>
                  <div className="overflow-hidden overflow-ellipsis w-72 pl-3 flex">{task.task}</div>
                  <div className='pl-10'>{formatDate(task.dueDate)}</div>
                </>
              )}

              <div className='ml-24'>

                {/* Save Button */}
                {editingIndex === index ? (

                  <button
                    onClick={handleUpdateTask}
                    className="bg-green-600 text-white px-2 py-1 rounded mr-3"
                  >
                    Save
                  </button>

                ) : (

                  // Edit Button
                  <button
                    onClick={() => handleEditTask(index)}
                    className="bg-[#15803d] text-white px-2 py-1 rounded mr-3"
                  >
                    Edit
                  </button>

                )}

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveTask(index)}
                  className="bg-red-600 text-white px-2 py-1 rounded mr-2"
                >
                  Remove
                </button>

              </div>

            </li>
          ))}

        </ul>

      </div>

    </>
  );
};

export default TodoList;
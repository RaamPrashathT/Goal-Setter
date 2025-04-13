import React, { useState } from 'react';

function ToDoList() {
    const[tasks, setTasks] = useState([]);
    const[task, setTask] = useState('');

    const addTask = () => {
        setTasks([...tasks, task]);
        setTask('');
    }

    const deleteAllTasks = () => {
        setTasks([]);
    }

    const deleteTask = (taskToBeDeleted) => {
        setTasks(newTasks = tasks.filter(t => t !== taskToBeDeleted));
    }


    return(
        <div>
            <ul>
                {
                    tasks.map((task, index) => (
                        <div key={index}>
                            <p>{task}</p>
                            <button onClick={() => deleteTask(task)}>Delete</button>
                        </div>
                    ))
                }
            </ul>
            <input type='text' placeholder='Add a task' value={task} onChange={(e) => setTask(e.target.value)}/>
            <button onClick={addTask}>Add</button>
            <button onClick={deleteAllTasks}>Delete All</button>
        </div>
    )
}

export default ToDoList;
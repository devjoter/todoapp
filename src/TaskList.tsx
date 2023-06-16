import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTaskTitle.trim() === '') return;

    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
    };

    setTaskList([...taskList, newTask]);
    setNewTaskTitle('');
  };

  const removeTask = (taskId: number) => {
    const updatedTaskList = taskList.filter((task) => task.id !== taskId);
    setTaskList(updatedTaskList);
  };

  return (
    <div>
      <ul>
        {taskList.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => removeTask(task.id)}>Usuń zadanie</button>
          </li>
        ))}
      </ul>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button type="submit">Dodaj zadanie</button>
      </form>
    </div>
  );
};

export default TaskList;

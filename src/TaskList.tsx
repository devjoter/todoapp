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
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');

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

  const startEditTask = (taskId: number) => {
    const taskToEdit = taskList.find((task) => task.id === taskId);
    if (taskToEdit) {
      setEditTaskId(taskId);
      setEditTaskTitle(taskToEdit.title);
    }
  };

  const cancelEditTask = () => {
    setEditTaskId(null);
    setEditTaskTitle('');
  };

  const saveTask = () => {
    if (editTaskId === null || editTaskTitle.trim() === '') return;

    const updatedTaskList = taskList.map((task) =>
      task.id === editTaskId ? { ...task, title: editTaskTitle } : task
    );

    setTaskList(updatedTaskList);
    setEditTaskId(null);
    setEditTaskTitle('');
  };

  return (
    <div>
      <ul>
        {taskList.map((task) => (
          <li key={task.id}>
            {editTaskId === task.id ? (
              <input
                type="text"
                value={editTaskTitle}
                onChange={(e) => setEditTaskTitle(e.target.value)}
              />
            ) : (
              task.title
            )}
            {editTaskId === task.id ? (
              <>
                <button onClick={saveTask}>Zapisz</button>
                <button onClick={cancelEditTask}>Anuluj</button>
              </>
            ) : (
              <>
                <button onClick={() => startEditTask(task.id)}>Edytuj zadanie</button>
                <button onClick={() => removeTask(task.id)}>Usuń zadanie</button>
              </>
            )}
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

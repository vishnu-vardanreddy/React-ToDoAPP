import { useState } from 'react'

// custom Hooks
import useLocalStorage from './hooks/useLocalStorage';

// Custom components
import { CustomForm } from './components/CustomForm';
import { EditForm } from './components/EditForm';
import TaskList from './components/TaskList';
import ThemeSwitcher from './components/ThemeSwitcher';
import PomoTimer from './components/PomoTimer';
import Clock from './components/Clock';

function App() {
    const [tasks, setTasks] = useLocalStorage('react-todo.tasks', []);
    const [PreviousFocusEl, setPreviousFocusEl] = useState(null);
    const [editedTask, setEditedTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const addTask = (task) => {
        setTasks(prevState => [...prevState, task])
    };

    const deleteTask = (id) => {
        setTasks(prevState => prevState.filter(task => task.id !== id));
    };

    const toggleTask = (id) => {
        setTasks(prevState => prevState.map(task => (
            task.id === id ? { ...task, checked: !task.checked} : task
        )))
    };

    const updateTask = (task) => {
        setTasks(prevState => prevState.map(t => (
            t.id === task.id ? { ...t, name: task.name } : t
        )));

        closeEditMode();
    };

    const closeEditMode = () => {
        setIsEditing(false);
        PreviousFocusEl.focus();
    };

    const enterEditMode = (task) => {
        setEditedTask(task);
        setIsEditing(true);
        setPreviousFocusEl(document.activeElement);
    };

    return (
        <div className="container">
            <header>
                {/* <h1>My Task List</h1> */}
                <Clock />
                <h1>Ready to get started?</h1>
            </header>
            <PomoTimer />
            {
                isEditing && (
                    <EditForm 
                        editedTask={editedTask}
                        updateTask={updateTask}
                        closeEditMode={closeEditMode}
                    />
                )
            }
            <CustomForm addTask={addTask} />
            {tasks && (
                <TaskList 
                    tasks={tasks}
                    deleteTask={deleteTask}
                    toggleTask={toggleTask}
                    enterEditMode={enterEditMode}
                />
            )}
            <ThemeSwitcher />
        </div>
    )
}

export default App

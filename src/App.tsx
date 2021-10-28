import React from 'react';
import './App.css';
import {TasksType, Todolist} from './components/Todolist';
import { useState } from 'react';
import { v1 } from 'uuid';
export type FilterValuesType = "all"| "active" | "completed";

function App() {


    let [tasks, setTasks] = useState<Array<TasksType>>([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false }
    ]);

    let [filter, setFilter] = useState<FilterValuesType>("all");
    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone ===false);

    }
    if (filter ==="completed") {
        tasksForTodolist = tasks.filter(t =>t.isDone === true);
    }
    const removeTask =(id: string) => {
        let filteredTasks = tasks.filter(t  => t.id != id);
        setTasks(filteredTasks);
        
    }

    const addtask =(title:string)=> {
        let task = {id:v1(), title: title, isDone:false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    const changeFilter=(value: FilterValuesType)=> {
        setFilter(value);
    }

    

    return (
        <div className="App">
            <Todolist 
            title="What to learn" 
            tasks={tasksForTodolist} 
            removeTask ={removeTask}
            addTask={addtask}
            changeFilter={changeFilter}
            />
            
        </div>
    );
}

export default App;

import React from 'react';
import './App.css';
import { TasksType, Todolist } from './components/Todolist';

import { useState } from 'react';
import { v1 } from 'uuid';
import { AddItemForm } from './components/addItemForm';


export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key:string]: Array<TasksType>
}

function App() {

    // КОМПОНЕНТА TODOLIST ////
    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolistId3 = v1();
//state тудулистов
    let [todolists, setTodolist] = useState<Array<TodoListType>>([
        { id: todolistId1, title: "What to learn", filter: "active" },
        { id: todolistId2, title: "What to buy",   filter: "completed" },
        { id: todolistId3, title: "What to see",   filter: "all" }
    ]);
    
    
// state начальный
    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false }
        ],
        [todolistId2]: [
             {id: v1(), title: "Картошка", isDone: true},
             {id: v1(), title: "Маркошка", isDone: true},
             {id: v1(), title: "Капуста", isDone: false},
             {id: v1(), title: "Пиво", isDone: false},
             {id: v1(), title: "Хлеб", isDone: false}
        ],
        [todolistId3]: [
            {id: v1(), title: "Териминатор", isDone: true},
             {id: v1(), title: "Человек паук", isDone: true},
             {id: v1(), title: "Форсаж", isDone: false},
             {id: v1(), title: "Железный человек", isDone: false},
             {id: v1(), title: "Тор", isDone: true}
        ]
    });
    // фильтрация "что учить"
    let [filter, setFilter] = useState<FilterValuesType>("all");
        
    const changeFilter = (value: FilterValuesType, TodolistID: string) => {
        let todolist:any = todolists.find( (tl:any) => tl.id === TodolistID);
        if(todolist) {
            todolist.filter = value;
            setTodolist([...todolist])
        }
    }
    // удалить "что учить"
    const removeTask = (id: any, TodolistID:string) => {
        let tasks = tasksObj[TodolistID];
        let filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[TodolistID] = filteredTasks;
        setTasks({...tasksObj});

    }
let removeTodolist =(TodolistID:string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== TodolistID )
    setTodolist(filteredTodolist);
    delete tasksObj[TodolistID];
    setTasks({...tasksObj});
}
    // добавить "что учить"
    const addtask = (title: string, TodolistID:string) => {
        let task = { id: v1(), title: title, isDone: false };
        let tasks = tasksObj[TodolistID];
        let newTasks = [task, ...tasks];
        tasksObj[TodolistID] = newTasks;
        setTasks({...tasksObj});
    }
    // изменить статус чек-бокса
    const changeStatus = (taskId: string, isDone: boolean, TodolistID:string) => {
        let tasks = tasksObj[TodolistID];
        let task = tasks.find(t => t.id === taskId);  // находим ту задачу на которой поменяли чек-бокс
        if (task) {
            task.isDone = !task.isDone // меняем статус чек-бокса на противоположный
            setTasks({...tasksObj}); //меняем
        }
        
    }
const addTodolist =(title:string) => {
    let todolist:TodoListType = {
        id: v1(),
        filter: "all",
        title: title
    }
    setTodolist([todolist, ...todolists]);
    setTasks({...tasksObj, 
                [todolist.id]: []
    });
}
    


    return (
        <div className="App">
            <AddItemForm 
            addItem={addTodolist}
            
            />
            {
                todolists.map((tl:any) => {
                    let tasksForTodolist = tasksObj[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter((t:any) => t.isDone === false);

                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter((t:any) => t.isDone === true);
                    }
                    return <Todolist  //отрисовываем компоненту Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}   //передаём заголовок
                        tasks={tasksForTodolist} //передаём основной массив
                        removeTodolist={removeTodolist}
                        removeTask={removeTask} //передаём функцию удаления
                        addTask={addtask} //передаём функцию добавления


                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        changeFilter={changeFilter}
                    />
                })
            }


           

        </div>
    );
}

export default App;

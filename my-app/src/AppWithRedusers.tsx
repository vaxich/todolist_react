import React, {useReducer} from 'react';
import './App.css';
import { TasksType, Todolist } from './components/Todolist';
import { useState } from 'react';
import { v1 } from 'uuid';
import { AddItemForm } from './components/addItemForm';
import { AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    removeTodolistAC,
    todolistsReduser
} from "./state/todolists-reduser";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReduser} from "./state/tasks-reduser";
import any = jasmine.any;


export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithRedusers() {

    // КОМПОНЕНТА TODOLIST ////
    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolistId3 = v1();
    //state тудулистов
    let [todolists, dispatchToTodolistsReducer] = useReducer( todolistsReduser , [
        { id: todolistId1, title: "What to learn", filter: "active" },
        { id: todolistId2, title: "What to buy", filter: "completed" },
        { id: todolistId3, title: "What to see", filter: "all" }
    ]);


    // state начальный
    let [tasksObj, dispatchToTaskReduser] = useReducer( tasksReduser, {
        [todolistId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false }
        ],
        [todolistId2]: [
            { id: v1(), title: "Картошка", isDone: true },
            { id: v1(), title: "Маркошка", isDone: true },
            { id: v1(), title: "Капуста", isDone: false },
            { id: v1(), title: "Пиво", isDone: false },
            { id: v1(), title: "Хлеб", isDone: false }
        ],
        [todolistId3]: [
            { id: v1(), title: "Териминатор", isDone: true },
            { id: v1(), title: "Человек паук", isDone: true },
            { id: v1(), title: "Форсаж", isDone: false },
            { id: v1(), title: "Железный человек", isDone: false },
            { id: v1(), title: "Тор", isDone: true }
        ]
    });
    // фильтрация "что учить"
    

    const changeFilter = ( TodolistID: string, filter: FilterValuesType) => {
        const action = ChangeTodolistFilterAC(TodolistID, filter )
        dispatchToTodolistsReducer(action)
    }
    // удалить "что учить"
    const removeTask = (id: string, TodolistID: string) => {
        const action = removeTaskAC(id, TodolistID)
        dispatchToTaskReduser(action)


    }
    let removeTodolist = (TodolistID: string) => {
        const action = removeTodolistAC(TodolistID)
        dispatchToTaskReduser(action)
        dispatchToTodolistsReducer(action)
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        const action = ChangeTodolistTitleAC(id, newTitle)
        dispatchToTodolistsReducer(action)
    }

    // добавить "что учить"
    const addtask = (title: string, TodolistID: string) => {
        const action = addTaskAC(title, TodolistID )
        dispatchToTaskReduser(action)

    }
    // изменить статус чек-бокса
    const changeStatus = (taskId: string, isDone: boolean, TodolistID: string) => {
        const action = changeTaskStatusAC(taskId, isDone, TodolistID)
        dispatchToTaskReduser(action)
    }
    const changeTaskTitle = (taskId: string, newTitle: string, TodolistID: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, TodolistID)
        dispatchToTaskReduser(action)
    }
    const addTodolist = (title: string) => {
        const action = AddTodolistAC(title)
        dispatchToTaskReduser(action)
        dispatchToTodolistsReducer(action)
    }



    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Photos
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
            <Grid container style={ {padding:"10px"} }>
            <AddItemForm
                addItem={addTodolist}

            />
            </Grid>
            <Grid container spacing={3}>
            {
                todolists.map((tl: any) => {
                    let tasksForTodolist = tasksObj[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter((t: any) => t.isDone === false);

                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter((t: any) => t.isDone === true);
                    }
                    return  <Grid item>
                        <Paper style={ {padding:"10px"}  }>
                    <Todolist  //отрисовываем компоненту Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}   //передаём заголовок
                        tasks={tasksForTodolist} //передаём основной массив
                        removeTodolist={removeTodolist}
                        removeTask={removeTask} //передаём функцию удаления
                        addTask={addtask} //передаём функцию добавления

                        changeTodolistTitle={changeTodolistTitle}
                        changeTaskStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
                        filter={tl.filter}
                        changeFilter={changeFilter}
                    />
                    </Paper>
                    </Grid>
                })
            }
            </Grid>


            </Container>
        </div>
    );
}

export default AppWithRedusers;

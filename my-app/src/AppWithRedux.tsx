import React, {useCallback} from 'react';
import './App.css';
import { TasksType, Todolist } from './components/Todolist';
import { AddItemForm } from './components/addItemForm';
import { AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reduser";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reduser";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, store} from "./state/store";


export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithRedux() {

    // КОМПОНЕНТА TODOLIST ////
    const dispatch = useDispatch()

    const todolists =  useSelector<AppRootStateType, TodoListType[]>( state => state.todolists)
    const tasks =  useSelector<AppRootStateType, TasksStateType>( state => state.tasks)
    console.log( tasks)


    // фильтрация
    const changeFilter = useCallback(( TodolistID: string, filter: FilterValuesType) => {
        const action = ChangeTodolistFilterAC(TodolistID, filter )
        dispatch(action)
    }, [dispatch])
    // удалить задачу
    const removeTask = useCallback((id: string, TodolistID: string) => {
        const action = removeTaskAC(TodolistID, id )
        dispatch(action)
    }, [dispatch])
    // удалить тудулист
    let removeTodolist = useCallback((TodolistID: string) => {
        const action = removeTodolistAC(TodolistID)
        dispatch(action)

    }, [dispatch])
    // изменить заголовок тудулиста
    const changeTodolistTitle = useCallback ((id: string, newTitle: string) => {
        const action = ChangeTodolistTitleAC(id, newTitle)
        dispatch(action)
    }, [dispatch])
    // добавить задачу
    const addtask = useCallback((title: string, TodolistID: string) => {
        const action = addTaskAC(TodolistID, title )
        dispatch(action)

    }, [dispatch])
    // изменить статус чек-бокса
    const changeStatus = useCallback((taskId: string, isDone: boolean, TodolistID: string) => {
        const action = changeTaskStatusAC(taskId, isDone, TodolistID)
        dispatch(action)
    }, [dispatch])
    // изменить название задачи
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, TodolistID: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, TodolistID)
        dispatch(action)
    }, [dispatch])
    // добавить тудулист
    const addTodolist = useCallback ((title: string) => {
        const action = AddTodolistAC(title)
        dispatch(action)

    } , [dispatch])

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
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks


                    return  <Grid item>
                        <Paper style={ {padding:"10px"}  }>
                    <Todolist  //отрисовываем компоненту Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}   //передаём заголовок
                        tasks={allTodolistTasks} //передаём основной массив
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

export default AppWithRedux;

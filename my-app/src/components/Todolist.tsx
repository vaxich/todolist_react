import {Delete} from '@mui/icons-material';
import {Button} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, {useCallback} from 'react';
import {FilterValuesType} from '../App';
import {AddItemForm} from './addItemForm';
import {EditableSpan} from './editableSpan';
import {Task} from "./Task";


export type TasksType = {
    id:string,
    title:string,
    isDone:boolean
}

type PropsType ={
    id:string
    title: string,
    tasks:Array<TasksType>,
    removeTask: (taskId:string, TodolistID:string) =>void
    addTask: (title:string, TodolistID:string) =>void
    changeFilter: (TodolistID:string, value: FilterValuesType) => void
    changeTaskStatus: (taskId: string, isDone: boolean, TodolistID:string) =>void
    changeTaskTitle: (taskId: string, newTitle:string, TodolistID:string) =>void
    filter:FilterValuesType
    removeTodolist:(TodolistID:string)=> void
    changeTodolistTitle:(id:string, newTitle:string)=> void
}


export const Todolist = React.memo( (props:PropsType)=> {

    const onAllClickHandler = useCallback( ()=> {
        props.changeFilter(props.id,"all" )
    }, [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback( ()=> {
        props.changeFilter(props.id, "active" )
    }, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback( ()=> {
        props.changeFilter(props.id, "completed")
    }, [props.changeFilter, props.id])

    const removeTodolist =() => {
    props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback ((newTitle:string) => {
    props.changeTodolistTitle(props.id, newTitle);
    }, [props.id, props.changeTodolistTitle])

    const addTask = useCallback ((title:string) => {
    props.addTask(title, props.id)
    }, [props.addTask, props.id])

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter((t: any) => t.isDone === false);

    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter((t: any) => t.isDone === true);
    }

    return(
        <div>
            
                <h2><EditableSpan  title={props.title} onChange={changeTodolistTitle}/>   </h2>
                <IconButton onClick={removeTodolist} >
                    <Delete fontSize="inherit" />
                </IconButton>
            
                <AddItemForm 
                addItem={addTask}
                />
                <div>
                    {
                    props.tasks.map(t => {
                            <Task
                                task={t}
                                changeTaskStatus={props.changeTaskStatus}
                                changeTaskTitle={props.changeTaskTitle}
                                removeTask={props.removeTask}
                                todolistId={props.id}
                                key={t.id}
                            />
                        })
                    }
                    
                </div>
                <div>
                    <Button variant={props.filter === 'all' ? "contained" : "text"}  onClick={onAllClickHandler}>All</Button>
                    <Button color={'primary'} variant={props.filter === 'active' ? "contained" : "text"} onClick={ onActiveClickHandler}>Active</Button>
                    <Button color={'secondary'} variant={props.filter === 'completed' ? "contained" : "text"} onClick={ onCompletedClickHandler}>Completed</Button>
                </div>
        </div>
    )
} )



import { Delete } from '@mui/icons-material';
import { Button, Checkbox } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { ChangeEvent, KeyboardEvent } from 'react';
import { useState } from 'react';
import { FilterValuesType } from '../App';
import { AddItemForm } from './addItemForm';
import { EditableSpan } from './editableSpan';


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
    changeFilter: (value: FilterValuesType, TodolistID:string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, TodolistID:string) =>void
    changeTaskTitle: (taskId: string, newTitle:string, TodolistID:string) =>void
    filter:FilterValuesType
    removeTodolist:(TodolistID:string)=> void
    changeTodolistTitle:(id:string, newTitle:string)=> void
}


export const Todolist =(props:PropsType)=> {

    const onAllClickHandler = ()=> {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = ()=> {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = ()=> {
        props.changeFilter("completed", props.id)
    }

    const removeTodolist =() => {
    props.removeTodolist(props.id);
    }
    const changeTodolistTitle =(newTitle:string) => {
    props.changeTodolistTitle(props.id, newTitle);
    }

    const addTask = (title:string) => {
    props.addTask(title, props.id)
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
                        const onRemoveHandler = ()=> {props.removeTask(t.id , props.id)}
                        const onChangeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked,  props.id);
                        }
                        const onChangeTitleHandler = (newValue:string) => {
                            props.changeTaskTitle(t.id, newValue,  props.id);
                        }
                    
                    return <div key={t.id} className={t.isDone ?"is-done" : ""}>
                        <Checkbox 
                                checked={t.isDone}
                                onChange={onChangeStatusHandler}/> 
                            <EditableSpan 
                            onChange={onChangeTitleHandler}
                            title={t.title}/>
                            
                        
                        <IconButton onClick={onRemoveHandler} size="small">
                            <Delete fontSize="inherit" />
                        </IconButton>
                    </div>
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
}


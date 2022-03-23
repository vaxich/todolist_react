import React, { ChangeEvent, KeyboardEvent } from 'react';
import { useState } from 'react';
import { FilterValuesType } from '../App';
import { AddItemForm } from './addItemForm';


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
    filter:FilterValuesType
    removeTodolist:(TodolistID:string)=> void
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

let removeTodolist =() => {
    props.removeTodolist(props.id);
}
const addTask = (title:string) => {
    props.addTask(title, props.id)
}
    return(
        <div>
                <h1>{props.title} <button onClick={removeTodolist}>X</button></h1>
                <AddItemForm 
                addItem={addTask}
                />
                <ul>
                    {
                    props.tasks.map(t => {
                        const onRemoveHandler = ()=> {props.removeTask(t.id , props.id)}
                        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked,  props.id);
                        }
                    
                    return <li key={t.id} className={t.isDone ?"is-done" : ""}>
                        <input  type="checkbox" 
                                checked={t.isDone}
                                onChange={onChangeHandler}/> <span>{t.title}</span>
                        <button onClick={onRemoveHandler }>x</button>
                    </li>
                        })
                    }
                    
                </ul>
                <div>
                    <button className={props.filter === 'all' ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                    <button className={props.filter === 'active' ? "active-filter" : ""} onClick={ onActiveClickHandler}>Active</button>
                    <button className={props.filter === 'completed' ? "active-filter" : ""} onClick={ onCompletedClickHandler}>Completed</button>
                </div>
        </div>
    )
}



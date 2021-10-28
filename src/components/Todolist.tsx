import React, { ChangeEvent, KeyboardEvent } from 'react';
import { useState } from 'react';
import { FilterValuesType } from '../App';


export type TasksType = {
    id:string,
    title:string,
    isDone:boolean
}

type PropsType ={
    title: string,
    tasks:Array<TasksType>,
    removeTask: (taskId:string) =>void
    addTask: (title:string) =>void
    changeFilter: (value: FilterValuesType) => void
}


export const Todolist =(props:PropsType)=> {

    let [title, setTitle] = useState("");
    
    const addTask =()=> {
        props.addTask(title)
        setTitle("");
    }
    
    const onNewTitleChangeHeadler =(e: ChangeEvent<HTMLInputElement>)=> {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler =(e:KeyboardEvent<HTMLInputElement>)=> {
        if (e.charCode ===13) {addTask();}
    }

    const onAllClickHandler = ()=> {
        props.changeFilter("all")
    }
    const onActiveClickHandler = ()=> {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = ()=> {
        props.changeFilter("completed")
    }
    return(
        <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title} 
                    onChange={onNewTitleChangeHeadler}
                    onKeyPress={onKeyPressHandler }
                    />
                    <button onClick={ addTask}>+</button>
                </div>
                <ul>
                    {
                    props.tasks.map(t => {
                        const onRemoveHandler = ()=> {props.removeTask(t.id)}
                    
                    
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} /> <span>{t.title}</span>
                        <button onClick={onRemoveHandler }>x</button>
                    </li>
                        })
                    }
                    
                </ul>
                <div>
                    <button onClick={onAllClickHandler}>All</button>
                    <button onClick={ onActiveClickHandler}>Active</button>
                    <button onClick={ onCompletedClickHandler}>Completed</button>
                </div>
        </div>
    )
}

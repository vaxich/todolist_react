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
    changeTaskStatus: (taskId: string, isDone: boolean) =>void
    filter:FilterValuesType
}


export const Todolist =(props:PropsType)=> {

    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);
    
    const addTask =()=> {
        if (title.trim() !== "") {
            props.addTask(title.trim())
            setTitle("");
        } else {
            setError("Обязательно к заполнению");
        }
        
    }
    
    const onNewTitleChangeHeadler =(e: ChangeEvent<HTMLInputElement>)=> {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler =(e:KeyboardEvent<HTMLInputElement>)=> {
        setError(null);
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
                <h1>{props.title}</h1>
                <div>
                    <input value={title} 
                    onChange={onNewTitleChangeHeadler}
                    onKeyPress={onKeyPressHandler }
                    className={error ? "error" : ""}                    />
                    <button onClick={ addTask}>+</button>
                    { error && <div className="error-message"> Обязательно к заполнению</div>}
                </div>
                <ul>
                    {
                    props.tasks.map(t => {
                        const onRemoveHandler = ()=> {props.removeTask(t.id)}
                        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked);
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


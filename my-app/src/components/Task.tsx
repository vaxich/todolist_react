import React, {ChangeEvent, useCallback} from "react";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./editableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {TasksType} from "./Todolist";

type TaskPropsType = {
    changeTaskStatus: (taskId: string, isDone: boolean, TodolistID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, TodolistID: string) => void
    removeTask: (taskId: string, TodolistID: string) => void
    task: TasksType
    todolistId: string
}
export const Task = React.memo ( (props: TaskPropsType) => {
    console.log(props)
    const onRemoveHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId);
    }
    const onChangeTitleHandler = useCallback ((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    },[props.task.id, props.changeTaskTitle, props.todolistId])

    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.task.isDone}
            onChange={onChangeStatusHandler}/>
        <EditableSpan
            onChange={onChangeTitleHandler}
            title={props.task.title}/>


        <IconButton onClick={onRemoveHandler} size="small">
            <Delete fontSize="inherit"/>
        </IconButton>
    </div>
})
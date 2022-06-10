import {FilterValuesType, TasksStateType} from './../App';
import { v1 } from "uuid";
import { TodoListType } from "../App";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reduser";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistID:string
    taskId:string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistID:string
    title:string
}
type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistID:string
    taskId:string
    isDone:boolean
}
type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistID:string
    taskId:string
    title:string
}

type ActionsTypes = RemoveTaskActionType | AddTaskActionType | changeTaskStatusActionType | changeTaskTitleActionType
    | AddTodolistActionType | RemoveTodolistActionType

export const tasksReduser =(state:TasksStateType, action:ActionsTypes): TasksStateType => {
    switch(action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistID]
            const filteredTasks = tasks.filter( t => t.id != action.taskId)
            stateCopy[action.todolistID] = filteredTasks
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistID]
            const newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            const newTasks = {newTask, ...tasks}
            stateCopy[action.todolistID] = newTasks
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistID]
            const task = tasks.find( t => t.id === action.taskId)
            if(task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistID]
            const task = tasks.find( t => t.id === action.taskId)
            if(task) {
                task.title = action.title
            }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error("I don`t now this action");
    }
}

export const removeTaskAC = ( todolistID:string, taskId:string): RemoveTaskActionType => {
    return {type:"REMOVE-TASK", todolistID, taskId}
}
export const addTaskAC = (todolistID:string, title:string, ): AddTaskActionType => {
    return {type:"ADD-TASK",  todolistID, title}
}
export const changeTaskStatusAC = (todolistID:string, taskId:string, isDone:boolean): changeTaskStatusActionType => {
    return {type:"CHANGE-TASK-STATUS",  todolistID, taskId, isDone}
}
export const changeTaskTitleAC = (todolistID:string, taskId:string, title:string): changeTaskTitleActionType => {
    return {type:"CHANGE-TASK-TITLE",  todolistID, taskId, title}
}

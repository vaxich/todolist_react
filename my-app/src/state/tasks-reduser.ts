import {TasksStateType} from './../App';
import { v1 } from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType
    } from "./todolists-reduser";

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
    taskId:string
    isDone:boolean
    todolistID:string
}
type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistID:string
    taskId:string
    title:string
}

type ActionsTypes = RemoveTaskActionType | AddTaskActionType | changeTaskStatusActionType | changeTaskTitleActionType
    | AddTodolistActionType | RemoveTodolistActionType

const initialState : TasksStateType = { }

export const tasksReduser =(state:TasksStateType = initialState, action:ActionsTypes): TasksStateType => {
    switch(action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistID]
            const filteredTasks = tasks.filter( t => t.id !== action.taskId)
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

            stateCopy[action.todolistID] = [newTask, ...tasks]

            return stateCopy
        }

        case "CHANGE-TASK-STATUS": {
            let todolistTasks = state[action.todolistID];
            state[action.todolistID] = todolistTasks.map(
                t => t.id === action.taskId
                ? {...t, isDone: action.isDone}
                : t ) ;
            return ({...state})
            // const stateCopy = {...state}
            // const tasks = stateCopy[action.todolistID]
            // const task = tasks.find( t => t.id === action.taskId)
            // if(task) {
            //     task.isDone = action.isDone
            // }
            // stateCopy[action.todolistID] = [... tasks]
            // return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            let todolistTasks = state[action.todolistID];
            state[action.todolistID] = todolistTasks.map(
                t => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t ) ;
            return ({...state})
            // const stateCopy = {...state}
            // const tasks = stateCopy[action.todolistID]
            // const task = tasks.find( t => t.id === action.taskId)
            // if(task) {
            //     task.title = action.title
            // }
            // return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todolistID]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = ( todolistID:string, taskId:string): RemoveTaskActionType => {
    return {type:"REMOVE-TASK", todolistID, taskId}
}
export const addTaskAC = (todolistID:string, title:string, ): AddTaskActionType => {
    return {type:"ADD-TASK",  todolistID, title}
}
export const changeTaskStatusAC = (taskId:string, isDone:boolean, todolistID:string): changeTaskStatusActionType => {
    return {type:"CHANGE-TASK-STATUS",  todolistID, taskId, isDone}
}
export const changeTaskTitleAC = (todolistID:string, taskId:string, title:string): changeTaskTitleActionType => {
    return {type:"CHANGE-TASK-TITLE",  todolistID, taskId, title}
}

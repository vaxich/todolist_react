import {FilterValuesType} from './../App';
import { v1 } from "uuid";
import { TodoListType } from "../App";
import {debug} from "util";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    todolistID:string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title:string
    todolistId: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id:string,
    title:string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    todolistID:string,
    filter:FilterValuesType
}
type ActionsTypes = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType


const initialState: TodoListType[] = [ ]

export const todolistsReduser = (state:TodoListType[] = initialState, action: ActionsTypes): Array<TodoListType> => {
    switch(action.type) {
        case `REMOVE-TODOLIST`: {
            return state.filter(tl => tl.id !== action.todolistID)
        }

        case `ADD-TODOLIST`: {
            console.log("todolist")
            console.log(action)
            return [
                {
                    id:action.todolistId,
                    title:action.title,
                    filter:"all"
                },
                ...state,
            ]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id)
                if (todolist) {
                todolist.title = action.title;
                }
            return [...state ]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.todolistID)
                if (todolist) {
                todolist.filter = action.filter;
                }
            return [...state ]
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistID:string): RemoveTodolistActionType => {
    return {type:"REMOVE-TODOLIST", todolistID:todolistID}
}
export const AddTodolistAC = (title:string): AddTodolistActionType => {
    return {type:"ADD-TODOLIST", title:title, todolistId: v1()}
}
export const ChangeTodolistTitleAC = (id:string, title:string): ChangeTodolistTitleActionType => {
    return {type:"CHANGE-TODOLIST-TITLE", id:id, title:title}
}
export const ChangeTodolistFilterAC = (todolistID:string, filter:FilterValuesType): ChangeTodolistFilterActionType => {
    return {type:"CHANGE-TODOLIST-FILTER", todolistID:todolistID, filter:filter}
}
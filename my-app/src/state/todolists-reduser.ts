import { FilterValuesType } from './../App';
import { v1 } from "uuid";
import { TodoListType } from "../App";

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id:string
}
type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title:string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id:string,
    title:string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id:string,
    filter:FilterValuesType
}
type ActionsTypes = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReduser =(state:Array<TodoListType>, action:ActionsTypes): Array<TodoListType> => {
    switch(action.type) {
        case `REMOVE-TODOLIST`: {
            return state.filter(tl => tl.id !== action.id)
        }
        case `ADD-TODOLIST`: {
            return [
                ...state, {
                    id:v1(),
                    title:action.title,
                    filter:"all"
                }
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
            const todolist = state.find(tl => tl.id === action.id)
                if (todolist) {
                todolist.filter = action.filter;
                }
            return [...state ]
        }
        default:
            throw new Error("I don`t now this action");
    }
}

export const RemoveTodolistAC = (todolistID:string): RemoveTodolistActionType => {
    return {type:"REMOVE-TODOLIST", id:todolistID}
}
export const AddTodolistAC = (title:string): AddTodolistActionType => {
    return {type:"ADD-TODOLIST", title:title}
}
export const ChangeTodolistTitleAC = (id:string, title:string): ChangeTodolistTitleActionType => {
    return {type:"CHANGE-TODOLIST-TITLE", id:id, title:title}
}
export const ChangeTodolistFilterAC = (id:string, filter:FilterValuesType): ChangeTodolistFilterActionType => {
    return {type:"CHANGE-TODOLIST-FILTER", id:id, filter:filter}
}
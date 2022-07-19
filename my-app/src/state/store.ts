import {combineReducers, createStore} from "redux";
import {tasksReduser} from "./tasks-reduser";
import {todolistsReduser} from "./todolists-reduser";
import {TasksStateType, TodoListType} from "../AppWithRedux";


const rootReduser = combineReducers({
    todolists: todolistsReduser,
    tasks: tasksReduser
})

export type AppRootStateType = {
    todolists: Array<TodoListType>,
    tasks: TasksStateType
}


export const store = createStore(rootReduser);




// @ts-ignore
window.store = store;
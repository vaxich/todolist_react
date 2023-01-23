import React, {useEffect, useState} from 'react'
import axios from "axios"
import {todolistsApi} from "../api/todolists-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials:true,
    headers: {
        "API-KEY": "4a93d057-d084-4a69-a91d-384fa34f59d8"
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsApi.getTodolists()
        .then( (res:any) => {
            setState(res.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: "vaxich"},  settings)
            .then( (res:any) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        axios.delete("https://social-network.samuraijs.com/api/1.1/todo-lists/",   settings)
            .then( (res:any) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        axios.put("https://social-network.samuraijs.com/api/1.1/todo-lists/", {title: "vaxich"},  settings)
            .then( (res:any) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

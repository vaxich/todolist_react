import axios from "axios"

const settings = {
    withCredentials:true,
    headers: {
        "API-KEY": "4a93d057-d084-4a69-a91d-384fa34f59d8"
    }
}

export const todolistsApi = {
    getTodolists() {
        const promise = axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
        return promise
    }
}
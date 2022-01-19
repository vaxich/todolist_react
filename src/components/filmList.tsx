import React from "react";
import {FilterValuesType} from "../App";


export type filmListType ={ //тип оновного массива
    id: string
    title: string
    isDone: boolean
}

export type filmListPropsType ={  // тип пропсов
    title:string
    //filmList:Array<filmListType>
    deleteFilm: (id:string) =>void
    changeFilterFilm: (value: FilterValuesType) => void
    filteredFilm:Array<filmListType>
    filter: FilterValuesType
}



export function FilmList(props:filmListPropsType) {
    const setAllFilm =() => props.changeFilterFilm("all")
    const setActiveFilm = () => props.changeFilterFilm("active")
    const setCompletedFilm =() => props.changeFilterFilm("completed")

    const visiblFilm = props.filteredFilm.map( film => {
        return (
            <li key={film.id}>
                <input type="checkbox" checked={film.isDone}/>
                <span>{film.title}</span>
                <button onClick={ ()=> {props.deleteFilm(film.id)} }>удалить</button>
            </li> //на onClik запускаем функцию deleteFilm. в параметрах передаём  элемент массива filmList на который нажали
        )
    })

    return (
        <div>
            <h1>{props.title}</h1>
            <input

            />
            <button>добавить</button>
            {visiblFilm}
            <button className={props.filter === 'all' ? "active-filter" : ""} onClick={setAllFilm}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""} onClick={setActiveFilm}>active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""} onClick={setCompletedFilm}>completed</button>
        </div>
    )

}
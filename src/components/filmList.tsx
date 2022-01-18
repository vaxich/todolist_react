import React from "react";


export type filmListType ={ //тип оновного массива
    id: string
    title: string
    isDone: boolean
}

export type filmListPropsType ={  // тип пропсов
    title:string
    filmList:Array<filmListType>
}



export function FilmList(props:filmListPropsType) {
    const visiblFilm = props.filmList.map( film => {
        return (
            <li><input type="checkbox" checked={film.isDone}/><span>{film.title}</span>    <button>удалить</button></li>
        )
    })

    return (
        <div>
            <h1>{props.title}</h1>
            {visiblFilm}
        </div>
    )

}
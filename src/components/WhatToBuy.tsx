import React, {ChangeEvent, MouseEventHandler, KeyboardEvent, useState} from "react";
import { FilterValuesType } from "../App";


export type whatToBuyType = {  //тип основного массива
    id: string
    title: string
    isDone: boolean
}

export type WhatToBuyPropsType = { //тип пропсов
    title: string
    //buy: Array<whatToBuyType>,
    addBuy: (title: string) => void
    removeBuy: (id: string) => void
    changeFilterBuy: (value: FilterValuesType) => void
    whatToBuy: Array<whatToBuyType> //основной массив из пропсов
    filter: FilterValuesType
    changeStatusBuy:(Id:string, isDone:boolean) => void
}

export function WhatToBuy(props: WhatToBuyPropsType) {

    const [title, setTitle] = useState<string>("") // ХУК инпута
    const [errorBuy, setErrorBuy] = useState<string | null>("")

    const addBuyClick = () => { //добавить покупку
        if(title.trim() !== "") {
            props.addBuy(title.trim())
            setTitle("")
        } else {
            setErrorBuy("Обязательно к заполнению")
        }



    }
    const setAllFilter =() => props.changeFilterBuy("all")
    const setActiveFilter = () => props.changeFilterBuy("active")
    const setCompletedFilter =() => props.changeFilterBuy("completed")



    const onKeyPressAddBuy =(e: KeyboardEvent<HTMLInputElement>) => {  //добавляем покупки при нажатии Энтер
        if (e.key ==="Enter") {
            addBuyClick()
        }
     }
    //мапим массив whatToBuy. каждый элемент массива buy рисуем в li-шке

    const whatToBuyComponent = props.whatToBuy.map(buy => {
        return (
            <li className={buy.isDone ?"is-done" : ""}><input type="checkbox" checked={buy.isDone} onChange={ (e)=> props.changeStatusBuy(buy.id, buy.isDone)}/><span>{buy.title}</span> <button onClick={() => { props.removeBuy(buy.id) }} > x</button> </li>//на onClik запускаем функцию removeBuy. в параметрах передаём  элемент массива buy на который нажали
        )
    })
    return (
        <div>
            <h1>{props.title}</h1>
            <div>
                <input
                    className={errorBuy ? "error" : ""}
                    value={title} //значение инпута
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setTitle((e.currentTarget.value))  }// при изменении записываем значение инпута// setErrorBuy("")
                    onKeyPress= {onKeyPressAddBuy}
                />
                <button onClick={addBuyClick }>+</button>
                { errorBuy && <div className="error-message"> Обязательно к заполнению</div>}
            </div>
            <ul>
                {whatToBuyComponent}

            </ul>
            <div>
                <button className={props.filter === 'all' ? "active-filter" : ""} onClick={setAllFilter}>All</button>
                <button className={props.filter === 'active' ? "active-filter" : ""} onClick={setActiveFilter}>active</button>
                <button className={props.filter === 'completed' ? "active-filter" : ""} onClick={setCompletedFilter}>completed</button>

            </div>
        </div>
    )
}

// функция находит макcимум в массиве
//функция находит два максимальный числа
//функция принимает массив чисел и кол-во max и возвращает массив с максимальными значениями


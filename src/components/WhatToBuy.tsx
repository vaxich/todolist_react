import React, {ChangeEvent, MouseEventHandler, KeyboardEvent, useState} from "react";
import { FilterValuesType } from "../App";

export type whatToBuyType = {  //тип основного массива
    id: string
    title: string
    isDone: boolean
}

export type WhatToBuyPropsType = { //тип пропсов
    title: string
    buy: Array<whatToBuyType>,
    addBuy: (title: string) => void
    removeBuy: (id: string) => void
    changeFilterBuy: (value: FilterValuesType) => void
    whatToBuy: Array<whatToBuyType> //основной массив из пропсов
}

export function WhatToBuy(props: WhatToBuyPropsType) {

    const [title, setTitle] = useState<string>("") // ХУК инпута

    const addBuyClick = () => { //добавить покупку
        props.addBuy(title)
        setTitle("")

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
            <li><input type="checkbox" checked={buy.isDone} /><span>{buy.title}</span> <button onClick={() => { props.removeBuy(buy.id) }} > x</button> </li>//на onClik запускаем функцию removeBuy. в параметрах передаём каждый элемент массива buy


        )

    })


    return (

        <div>
            <h1>{props.title}</h1>
            <div>
                <input
                    value={title} //значение инпута
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>setTitle((e.currentTarget.value))}// при изменении записываем значение инпута
                    onKeyPress= {onKeyPressAddBuy}
                />
                <button onClick={addBuyClick }>+</button>
            </div>
            <ul>
                {whatToBuyComponent}

            </ul>
            <div>
                <button onClick={setAllFilter}>All</button>
                <button onClick={setActiveFilter}>active</button>
                <button onClick={setCompletedFilter}>completed</button>

            </div>
        </div>
    )
}

// функция находит макcимум в массиве
//функция находит два максимальный числа
//функция принимает массив чисел и кол-во max и возвращает массив с максимальными значениями


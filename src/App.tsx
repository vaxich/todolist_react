import React from 'react';
import './App.css';
import {TasksType, Todolist} from './components/Todolist';
import { WhatToBuy, whatToBuyType} from './components/WhatToBuy';
import {useState} from 'react';
import {v1} from 'uuid';
import {FilmList, filmListType} from "./components/filmList";

export type FilterValuesType = "all" | "active" | "completed";


function App() {

// КОМПОНЕНТА TODOLIST ////

// массив "что учить"
    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ]);
// фильтрация "что учить"
    let [filter, setFilter] = useState<FilterValuesType>("all");
    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);

    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    }
// удалить "что учить"
const removeTask = (id: any) => {
    let filteredTasks = tasks.filter(t => t.id != id);
    
    setTasks(filteredTasks);

}

// добавить "что учить"
const addtask = (title: string) => {
    let task = {id: v1(), title: title, isDone: false};
    let newTasks = [task, ...tasks];
    setTasks(newTasks);
}
// изменить статус чек-бокса
    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId);  // находим ту задачу на которой поменяли чек-бокс
        if (task) {
            task.isDone = !task.isDone // меняем статус чек-бокса на противоположный
        }
        setTasks([...tasks]); //меняем
    }

// КОМПОНЕНТА WHAT TO BUY //////
// массив "что купить"
    let [whatToBuy, setBuy] = useState<Array<whatToBuyType>>([
        {id: v1(), title: "Картошка", isDone: true},
        {id: v1(), title: "Маркошка", isDone: true},
        {id: v1(), title: "Капуста", isDone: false},
        {id: v1(), title: "Пиво", isDone: false},
        {id: v1(), title: "Хлеб", isDone: false},
    ]);
    

    // удалить "что купить"
    const removeBuy =(id:string ) => { //функция удаления покупок

        let notRemovedBuy =  whatToBuy.filter( buy => buy.id !== id) // если ИД не равна ИД на которую нажали - запиываем в новый массив
        setBuy(notRemovedBuy);//отфильтрованый массив передаём в ХУК, который обновляем основной массив
    }

    ///фильтрация "что купить"
    let [filterBuy, setFilterBuy] = useState<FilterValuesType>("all");
    let filterStatusBuy = whatToBuy;

    if (filterBuy === "active") {
        filterStatusBuy = whatToBuy.filter(t => t.isDone === false);

    }
    if (filterBuy === "completed") {
        filterStatusBuy = whatToBuy.filter(t => t.isDone === true);
    }
    const changeFilterBuy = (value: FilterValuesType) => {
        setFilterBuy(value);
    }
        // добавление покупки
    const addBuy = (title: string)=> {
        const newBuy  = {id: v1(), title:title, isDone: false}
        const updateNewBuy = [newBuy, ... whatToBuy];
        setBuy(updateNewBuy)
        console.log(updateNewBuy)

    }



    // КОМПОНЕНТА FILMLIST ////
    // массив "что посмотреть"
    let [filmList, setFilm] = useState<Array<filmListType>>([
        {id: v1(), title: "Териминатор", isDone: true},
        {id: v1(), title: "Человек паук", isDone: true},
        {id: v1(), title: "Форсаж", isDone: false},
        {id: v1(), title: "Железный человек", isDone: false},
        {id: v1(), title: "Тор", isDone: true},
    ]);


    return (
        <div className="App">
            <Todolist  //отрисовываем компоненту Todolist
                title="Что учить"   //передаём заголовок
                tasks={tasksForTodolist} //передаём основной массив
                removeTask={removeTask} //передаём функцию удаления
                addTask={addtask} //передаём функцию добавления
                changeFilter={changeFilter}
                changeTaskStatus={changeStatus}
                filter={filter}
            />

            <WhatToBuy //отрисовываем компоненту WhatToBuy
                title="Что купить" //передаём заголовок
                buy={filterStatusBuy}
                whatToBuy = {filterStatusBuy} //передаём основной массив
                removeBuy={removeBuy} //передаём функцию удаления
                changeFilterBuy={changeFilterBuy}
                addBuy = {addBuy}
            />

            <FilmList //отрисовываем компоненту WhatToBuy
                title="Что помотреть" //передаём заголовок
                filmList={filmList} //передаём основной массив
            />


        </div>
    );
}

export default App;

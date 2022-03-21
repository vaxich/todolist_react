import React from 'react';
import './App.css';
import { TasksType, Todolist } from './components/Todolist';
import { WhatToBuy, whatToBuyType } from './components/WhatToBuy';
import { useState } from 'react';
import { v1 } from 'uuid';
import { FilmList, filmListType } from "./components/filmList";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    // КОМПОНЕНТА TODOLIST ////
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolist] = useState<Array<TodoListType>>([
        { id: todolistId1, title: "What to learn", filter: "active" },
        { id: todolistId2, title: "What to buy",   filter: "completed" }
    ]);
    // массив "что учить"
    

    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false }
        ],
        [todolistId2]: [
             {id: v1(), title: "Картошка", isDone: true},
             {id: v1(), title: "Маркошка", isDone: true},
             {id: v1(), title: "Капуста", isDone: false},
             {id: v1(), title: "Пиво", isDone: false},
             {id: v1(), title: "Хлеб", isDone: false}
        ]
    });
    // фильтрация "что учить"
    let [filter, setFilter] = useState<FilterValuesType>("all");
        
    const changeFilter = (value: FilterValuesType, TodolistID: string) => {
        let todolist = todolists.find( (tl:any) => tl.id === TodolistID);
        if(todolist) {
            todolist.filter = value;
            setTodolist([...todolist])
        }
    }
    // удалить "что учить"
    const removeTask = (id: any, TodolistID:string) => {
        let tasks = tasksObj[TodolistID];
        let filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[TodolistID] = filteredTasks;
        setTasks({...tasksObj});

    }
let removeTodolist =(TodolistID:string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== TodolistID )
    setTodolist(filteredTodolist);
    delete tasksObj[TodolistID];
    setTasks({...tasksObj});
}
    // добавить "что учить"
    const addtask = (title: string, TodolistID:string) => {
        let task = { id: v1(), title: title, isDone: false };
        let tasks = tasksObj[TodolistID];
        let newTasks = [task, ...tasks];
        setTasks({...tasksObj});
    }
    // изменить статус чек-бокса
    const changeStatus = (taskId: string, isDone: boolean, TodolistID:string) => {
        let tasks = tasksObj[TodolistID];
        let task = tasks.find(t => t.id === taskId);  // находим ту задачу на которой поменяли чек-бокс
        if (task) {
            task.isDone = !task.isDone // меняем статус чек-бокса на противоположный
            setTasks({...tasksObj}); //меняем
        }
        
    }

    // // КОМПОНЕНТА WHAT TO BUY //////
    // // массив "что купить"
    //     const [whatToBuy, setBuy] = useState<Array<whatToBuyType>>([
    //         {id: v1(), title: "Картошка", isDone: true},
    //         {id: v1(), title: "Маркошка", isDone: true},
    //         {id: v1(), title: "Капуста", isDone: false},
    //         {id: v1(), title: "Пиво", isDone: false},
    //         {id: v1(), title: "Хлеб", isDone: false},
    //     ]);


    //     // удалить "что купить"
    //     const removeBuy = (id: string) => { //функция удаления покупок

    //         let notRemovedBuy = whatToBuy.filter(buy => buy.id !== id) // если ИД не равна ИД на которую нажали - запиываем в новый массив
    //         setBuy(notRemovedBuy);//отфильтрованый массив передаём в ХУК, который обновляем основной массив
    //     }

    //     ///фильтрация "что купить"
    //     let [filterBuy, setFilterBuy] = useState<FilterValuesType>("all");
    //     let filterStatusBuy = whatToBuy;

    //     if (filterBuy === "active") {
    //         filterStatusBuy = whatToBuy.filter(buy => !buy.isDone);

    //     }
    //     if (filterBuy === "completed") {
    //         filterStatusBuy = whatToBuy.filter(buy => buy.isDone);
    //     }
    //     const changeFilterBuy = (value: FilterValuesType) => {
    //         setFilterBuy(value);
    //     }
    //     // добавление покупки
    //     const addBuy = (title: string) => {
    //         const newBuy = {id: v1(), title: title, isDone: false}
    //         const updateNewBuy = [newBuy, ...whatToBuy];
    //         setBuy(updateNewBuy)
    //     }

    // ////// изменить статус чекбокса покупки
    //     const changeStatusBuy =(Id:string , isDone:boolean)=> {
    //         let updatedBuy = whatToBuy.map(
    //             buy => {
    //                 if (buy.id === Id) {
    //                     const copyBuy = {...buy}
    //                     copyBuy.isDone = !isDone
    //                     return copyBuy
    //                 } else {
    //                     return buy
    //                 }
    //                 }
    //         )
    //         setBuy(updatedBuy);
    //     }


    //     // КОМПОНЕНТА FILMLIST ////
    //     // массив "что посмотреть"
    //     let [filmList, setFilm] = useState<Array<filmListType>>([
    //         {id: v1(), title: "Териминатор", isDone: true},
    //         {id: v1(), title: "Человек паук", isDone: true},
    //         {id: v1(), title: "Форсаж", isDone: false},
    //         {id: v1(), title: "Железный человек", isDone: false},
    //         {id: v1(), title: "Тор", isDone: true},
    //     ]);
    // //удаление фильма
    //     const deleteFilm = (id: string) => { //удаление фильма
    //         const newArrayFilm = filmList.filter(film => film.id !== id)
    //         setFilm(newArrayFilm)
    //     }

    //     // фильтр фильма
    //     let [filterFilm, setFilterFilm] = useState<FilterValuesType>("all");

    //     let filteredFilm = filmList;

    //     if (filterFilm === "active") {
    //         filteredFilm = filmList.filter(film => !film.isDone);

    //     }
    //     if (filterFilm === "completed") {

    //         filteredFilm = filmList.filter(film => film.isDone);
    //     }
    //     const changeFilterFilm = (value: FilterValuesType) => {
    //         setFilterFilm(value);
    //     }
    ///

    return (
        <div className="App">
            {
                todolists.map((tl:any) => {
                    let tasksForTodolist = tasksObj[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter((t:any) => t.isDone === false);

                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter((t:any) => t.isDone === true);
                    }
                    return <Todolist  //отрисовываем компоненту Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}   //передаём заголовок
                        tasks={tasksForTodolist} //передаём основной массив
                        removeTodolist={removeTodolist}
                        removeTask={removeTask} //передаём функцию удаления
                        addTask={addtask} //передаём функцию добавления


                        changeTaskStatus={changeStatus}
                        filter={filter}
                        changeFilter={setFilter}
                    />
                })
            }


            {/* <WhatToBuy //отрисовываем компоненту WhatToBuy
                title="Что купить" //передаём заголовок
                whatToBuy={filterStatusBuy} //передаём основной массив

                removeBuy={removeBuy} //передаём функцию удаления

                addBuy={addBuy}

                filter={filterBuy}
                changeFilterBuy={changeFilterBuy}
                changeStatusBuy={changeStatusBuy}
            />
            <FilmList //отрисовываем компоненту WhatToBuy
                title="Что помотреть" //передаём заголовок
                filteredFilm={filteredFilm}// отфитрованый массив

                deleteFilm={deleteFilm}//удалить фильм

                filter={filterFilm}
                changeFilterFilm={changeFilterFilm}//сменить фильтр
            /> */}


        </div>
    );
}

export default App;

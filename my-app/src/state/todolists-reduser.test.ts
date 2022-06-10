import { FilterValuesType } from './../App';
import { v1 } from "uuid";
import { TodoListType } from "../App";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    removeTodolistAC,
    todolistsReduser
} from "./todolists-reduser";



//тест удаления тудулиста
test(`correct todolist should be removed`, () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolistId3 = v1();

    let action = removeTodolistAC(todolistId1);

    const startState:Array<TodoListType> = [
        { id: todolistId1, title: "What to learn", filter: "active" },
        { id: todolistId2, title: "What to buy", filter: "completed" },
        { id: todolistId3, title: "What to see", filter: "all" }
    ]

    const endState = todolistsReduser(startState, action)

    expect(endState.length).toBe(2);
    expect(endState[0].id).toBe(todolistId2);
})
/// тест добавления тудулиста
test(`correct todolist should be added`, () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolistId3 = v1();

    let newTodolistTitle = "New Todolist";

    let action = AddTodolistAC(newTodolistTitle)

    const startState:Array<TodoListType> = [
        { id: todolistId1, title: "What to learn", filter: "active" },
        { id: todolistId2, title: "What to buy", filter: "completed" },
        { id: todolistId3, title: "What to see", filter: "all" }
    ]

    const endState = todolistsReduser(startState, action)

    expect(endState.length).toBe(4);
    expect(endState[3].title).toBe(newTodolistTitle);
    expect(endState[3].filter).toBe("all");
})
//тест изменения имени тудулиста
test(`correct todolist should change ist name`, () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolistId3 = v1();

    let newTodolistTitle = "New Todolist";


    const startState:Array<TodoListType> = [
        { id: todolistId1, title: "What to learn", filter: "active" },
        { id: todolistId2, title: "What to buy", filter: "completed" },
        { id: todolistId3, title: "What to see", filter: "all" }
    ]

    const action = ChangeTodolistTitleAC(todolistId2,newTodolistTitle)

    const endState = todolistsReduser(startState, action )

    
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
    
})
/// тест изменения фильтра тудулиста
test(`correct filter of todolist should be changed`, () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolistId3 = v1();

    

    let newFilter:FilterValuesType = "completed";

    const action = ChangeTodolistFilterAC(todolistId2, newFilter)

    const startState:Array<TodoListType> = [
        { id: todolistId1, title: "What to learn", filter: "active" },
        { id: todolistId2, title: "What to buy", filter: "completed" },
        { id: todolistId3, title: "What to see", filter: "all" }
    ]

    const endState = todolistsReduser(startState, action )

    
    expect(endState[2].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
})
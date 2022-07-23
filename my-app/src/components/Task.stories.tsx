
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";



export default  {
    title: "Task Component",
    component: Task
}

const changeTaskStatusCallback = action("статус изменён")
const changeTaskTitleCallback = action("title изменён")
const removeTaskCallback = action("укдаление сработало")

export const TaskBaseExample = () => {
    return <div>
        <Task
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={ removeTaskCallback}
            task={ {id:"1", isDone: true, title: "CSS"}}
            todolistId={"todolist1"}
        />
        <Task
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={ removeTaskCallback}
            task={ {id:"2", isDone: false, title: "JS"}}
            todolistId={"todolist2"}
        />
    </div>
}
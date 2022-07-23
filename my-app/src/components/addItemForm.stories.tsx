
import {AddItemForm} from "./addItemForm";
import {action} from "@storybook/addon-actions";



export default  {
    title: "AddItemForm Componen",
    component: AddItemForm
}

const callback = action("кнопка нажата в форме")

export const AddItemFormBaseExample = (props:any) => {
    return <AddItemForm addItem={callback}/>
}
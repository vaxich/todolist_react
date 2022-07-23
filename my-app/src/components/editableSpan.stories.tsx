import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./editableSpan";



export default  {
    title: "EditableSpan Component",
    component: EditableSpan
}

const EditableSpanCallback = action("значение изменёно")


export const EditableSpanBaseExample = () => {
    return <div>
        <EditableSpan title={"start value"} onChange={EditableSpanCallback} />
    </div>
}
import React, { ChangeEvent, useState, KeyboardEvent } from "react";

type AddItemFormPropsType = {
    addItem: (title:string) =>void
    
}
export const AddItemForm =(props:AddItemFormPropsType) => {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHeadler =(e: ChangeEvent<HTMLInputElement>)=> {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler =(e:KeyboardEvent<HTMLInputElement>)=> {
        setError(null);
        if (e.charCode ===13) {addTask();}
    }

    const addTask =()=> {
        if (title.trim() !== "") {
            props.addItem(title.trim())
            setTitle("");
        } else {
            setError("Обязательно к заполнению");
        }
        
    }
    

    return <div>
    <input value={title} 
    onChange={onNewTitleChangeHeadler}
    onKeyPress={onKeyPressHandler }
    className={error ? "error" : ""}                    />
    <button onClick={ addTask}>+</button>
    { error && <div className="error-message"> Обязательно к заполнению</div>}
</div>
}
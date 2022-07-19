import { ControlPoint } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, useState, KeyboardEvent } from "react";

type AddItemFormPropsType = {
    addItem: (title:string) =>void
    
}
export const AddItemForm = React.memo((props:AddItemFormPropsType) => {
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
    <TextField value={title} 
    variant={'outlined'}
    label={'Введите текст'}
    error={!!error}
    helperText={error}
    onChange={onNewTitleChangeHeadler}
    onKeyPress={onKeyPressHandler }
    className={error ? "error" : ""} 
    />
    <IconButton onClick={ addTask}  color={"success"}>
        <ControlPoint  />
    </IconButton>
    
</div>
})
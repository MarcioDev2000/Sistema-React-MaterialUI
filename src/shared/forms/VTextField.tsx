import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";

type TVTextFieldProps = TextFieldProps & {
    nome: string;
}

export const VTextField: React.FC<TVTextFieldProps> = ({nome, ...rest}) =>{
    const {fieldName, registerField, defaultValue, error, clearError} = useField(nome);
    
    const [value, setValue ] = useState(defaultValue || '');

    useEffect(() =>{
           registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (_, newValue)=> setValue(newValue),
           })
    }, [registerField, fieldName, value]);
    
    
    
    return (
        <TextField
            {...rest}
          
            error = {!!error}
            helperText={error}
            defaultValue= {defaultValue}

            value={value}
            onChange= {e => {setValue(e.target.value); rest.onChange?.(e); }}

            onKeyDown = {(e) => { error && clearError(); rest.onKeyDown?.(e); }}


         />
    );
};
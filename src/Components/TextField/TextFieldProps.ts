import {TypeBoolean, TypeSignal_MouseEvent, TypeSignal_String} from "@lab1/core";
import {TypeInputType} from "../../Codes/Types";
import {DebouncedInputProps, TextField} from "../../MaterialExports";

export interface TextFieldProps<T> extends DebouncedInputProps<T> {
    ref?: TextField
    /**Type of the input element. It should be a valid HTML5 input type.*/
    inputType?: TypeInputType
    /**Show clear button.*/
    clearable?: TypeBoolean

    //Signals
    onTextChange?: TypeSignal_String
    onClearButtonClick?: TypeSignal_MouseEvent
    onClick?: TypeSignal_MouseEvent
}

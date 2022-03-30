import {TypeBoolean} from "@lab1/core"
import {FormComponentProps} from "../FormComponent/FormComponentProps";

export interface BooleanInputProps<T> extends FormComponentProps<T> {
    disabled?: TypeBoolean
    readOnly?: TypeBoolean
    checked?: TypeBoolean
}

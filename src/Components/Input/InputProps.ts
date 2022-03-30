import {TypeBoolean, TypeString} from "@lab1/core";
import {BaseInputProps} from "../../Base/BaseInput/BaseInputProps";
import {TypeInputType} from "../../Codes/Types";

export interface InputProps<T> extends BaseInputProps<T> {
    inputType?: TypeInputType
    hideSpinButtons?: TypeBoolean
    clearable?: TypeBoolean
    clearIcon?: TypeString
    numericUpIcon?: TypeString
    numericDownIcon?: TypeString
}

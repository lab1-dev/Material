import {TypeBoolean, TypeSignal_Boolean, TypeString, TypeStringOrUndefined} from "@lab1/core";
import {BooleanInputProps} from "../../Base/BooleanInput/BooleanInputProps";
import {TypeColor, TypeSize} from "../../Codes/Types";
import {CheckBox} from "./CheckBox";

export interface CheckBoxProps<T> extends BooleanInputProps<T> {
    ref?:CheckBox<T>
    /**The color of the component. It supports the theme colors.*/
    color?: TypeColor
    /**If applied the text will be added to the component.*/
    text?: TypeStringOrUndefined
    /**If true, disables ripple effect.*/
    disableRipple?: TypeBoolean
    /**If true, compact padding will be applied.*/
    dense?: TypeBoolean
    /**The Size of the component.*/
    size?: TypeSize
    /**Custom checked icon, leave null for default.*/
    checkedIcon?: TypeString
    /**Custom unchecked icon, leave null for default.*/
    uncheckedIcon?: TypeString
    /**Custom indeterminate icon, leave null for default.*/
    indeterminateIcon?: TypeString
    /**Define if the checkbox can cycle again through indeterminate status.*/
    tristate?: TypeBoolean

    //Signals
    onChange?:TypeSignal_Boolean
}

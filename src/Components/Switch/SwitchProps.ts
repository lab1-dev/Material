import {TypeBoolean, TypeSignal_Boolean, TypeStringOrUndefined} from "@lab1/core";
import {BooleanInputProps} from "../../Base/BooleanInput/BooleanInputProps";
import {TypeColor} from "../../Codes/Types";
import {Switch} from "./Switch";

export interface SwitchProps<T> extends BooleanInputProps<T> {
    ref?: Switch
    /**The color of the component. It supports the theme colors.*/
    color?: TypeColor
    /**The text will be displayed next to the switch, if set.*/
    text?: TypeStringOrUndefined
    /**Shows an icon on Switch's thumb.*/
    thumbIcon?: TypeStringOrUndefined
    /**The color of the thumb icon. Supports the theme colors.*/
    thumbIconColor?: TypeColor
    /**If true, disables ripple effect.*/
    disableRipple?: TypeBoolean

    //Signals
    onChange?:TypeSignal_Boolean
}

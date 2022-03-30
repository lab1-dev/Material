import {TypeBoolean, TypeStringOrUndefined} from "@lab1/core"
import {BaseButtonProps} from "../../Base/BaseButton/BaseButtonProps";
import {TypeColor, TypeSize, TypeVariant} from "../../Codes/Types";
import {Button} from "./Button";

export interface ButtonProps extends BaseButtonProps {
    ref?:Button
    /**The text of this button*/
    text?: TypeStringOrUndefined
    /**The color of the button. It supports the theme colors.*/
    color?: TypeColor
    /**The variant to use.*/
    variant?: TypeVariant
    /**The Size of the button.*/
    size?: TypeSize
    /**Icon placed before the text if set.*/
    startIcon?: TypeStringOrUndefined
    /**Icon placed after the text if set.*/
    endIcon?: TypeStringOrUndefined
    /**The color of the icon. It supports the theme colors.*/
    iconColor?: TypeColor
    /**Icon class names, separated by space*/
    iconClass?: TypeStringOrUndefined
    /**If true, the button will take up 100% of available width.*/
    fullWidth?:TypeBoolean
}

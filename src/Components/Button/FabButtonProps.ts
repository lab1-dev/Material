import {TypeStringOrUndefined} from "@lab1/core";
import {BaseButtonProps} from "../../Base/BaseButton/BaseButtonProps";
import {TypeColor, TypeSize} from "../../Codes/Types";
import {FabButton} from "./FabButton";

export interface FabButtonProps extends BaseButtonProps {
    ref?:FabButton
    /**The color of the component. It supports the theme colors.*/
    color?: TypeColor
    /**The Size of the component.*/
    size?: TypeSize
    /**If applied Icon will be added at the start of the component.*/
    startIcon?: TypeStringOrUndefined
    /**If applied Icon will be added at the end of the component.*/
    endIcon?: TypeStringOrUndefined
    /**The color of the icon. It supports the theme colors.*/
    iconColor?: TypeColor
    /**The size of the icon.*/
    iconSize?: TypeSize
    /**If applied the text will be added to the component.*/
    text?: TypeStringOrUndefined
}

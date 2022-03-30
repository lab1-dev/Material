import {TypeStringOrUndefined} from "@lab1/core";
import {BaseButtonProps} from "../../Base/BaseButton/BaseButtonProps";
import {IconButton} from "./IconButton";
import {TypeColor, TypeEdgeOrUndefined, TypeSize, TypeVariant} from "../../Codes/Types";

export interface IconButtonProps extends BaseButtonProps {
    ref?:IconButton
    /**The Icon that will be used in the component.*/
    icon?: TypeStringOrUndefined
    /**Title of the icon used for accessibility.*/
    title?: TypeStringOrUndefined
    /**The color of the component. It supports the theme colors.*/
    color?: TypeColor
    /**The Size of the component.*/
    size?: TypeSize
    /**If set uses a negative margin.*/
    edge?: TypeEdgeOrUndefined
    /**The variant to use.*/
    variant?: TypeVariant
    /**Label of component, only shows if Icon is null or Empty.*/
    label?: TypeStringOrUndefined
}

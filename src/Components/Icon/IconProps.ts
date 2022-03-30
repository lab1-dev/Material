import {ComponentProps, TypeStringOrUndefined} from "@lab1/core";
import {TypeColor, TypeSize} from "../../Codes/Types";
import {MaterialComponentProps} from "../MaterialItem/MaterialComponentProps";

export interface IconProps extends MaterialComponentProps {
    /**Icon to be used can either be svg paths for font icons.*/
    icon?: TypeStringOrUndefined
    /**Title of the icon used for accessibility.*/
    title?: TypeStringOrUndefined
    /**The Size of the icon.*/
    size?: TypeSize
    /**The color of the component. It supports the theme colors.*/
    color?: TypeColor
    /**The viewbox size of an svg element.*/
    viewBox?: string
    focusable?: boolean
    addCommonClass?: boolean
}

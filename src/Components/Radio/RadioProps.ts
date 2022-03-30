import {TypeBoolean, TypeStringOrUndefined, TypeTOrUndefined} from "@lab1/core"
import {TypeColor, TypePlacement, TypeSize} from "../../Codes/Types";
import {MaterialComponentProps, Radio} from "../../MaterialExports";

export interface RadioProps<T> extends MaterialComponentProps {
    ref?:Radio
    /**The color of the component. It supports the theme colors.*/
    color?: TypeColor
    /**The position of the child content.*/
    placement?: TypePlacement
    /**If true, compact padding will be applied.*/
    dense?: TypeBoolean
    /**The Size of the component.*/
    size?: TypeSize
    /**If true, disables ripple effect.*/
    disableRipple?: TypeBoolean
    /**If true, the button will be disabled.*/
    disabled?: TypeBoolean
    /**The text of the Radio**/
    text?: TypeStringOrUndefined
    /**The value associated with the Radio**/
    option?: TypeTOrUndefined<T>
}


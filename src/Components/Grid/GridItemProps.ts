import {TypeNumber} from "@lab1/core";
import {MaterialComponentProps} from "../MaterialItem/MaterialComponentProps";

export interface GridItemProps extends MaterialComponentProps{
    xs?:TypeNumber
    sm?:TypeNumber
    md?:TypeNumber
    lg?:TypeNumber
    xl?:TypeNumber
    xxl?:TypeNumber
}

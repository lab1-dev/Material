import {TypeBoolean, TypeNumber} from "@lab1/core"
import {TypeColor, TypeMudTextOrUndefined, TypeSize} from "../../Codes/Types";
import {MaterialComponentProps} from "../MaterialItem/MaterialComponentProps";
import {ProgressLinear} from "./ProgressLinear";

export interface ProgressLinearProps extends MaterialComponentProps {
    ref?: ProgressLinear
    /**The color of the component. It supports the theme colors.*/
    color?: TypeColor
    /**The Size of the component.*/
    size?: TypeSize
    /**Constantly animates, does not follow any value.*/
    indeterminate?: TypeBoolean
    /**If true, the buffer value will be used.*/
    buffer?: TypeBoolean
    /**If true, border-radius is set to the themes default value.*/
    rounded?: TypeBoolean
    /**Adds stripes to the filled part of the linear progress.*/
    striped?: TypeBoolean
    /**If true, the progress bar  will be displayed vertically.*/
    vertical?: TypeBoolean
    /**Child content of component.*/
    text?: TypeMudTextOrUndefined
    /**The minimum allowed value of the linear prgoress. Should not be equal to max.*/
    min?: TypeNumber
    /**The maximum allowed value of the linear prgoress. Should not be equal to min.*/
    max?: TypeNumber
    /**The current value of the progress.*/
    value?: TypeNumber
    bufferValue?: TypeNumber
}

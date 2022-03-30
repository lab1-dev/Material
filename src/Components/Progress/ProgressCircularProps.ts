import {TypeBoolean, TypeNumber} from "@lab1/core";
import {TypeColor, TypeSize} from "../../Codes/Types";
import {MaterialComponentProps} from "../MaterialItem/MaterialComponentProps";
import {ProgressCircular} from "./ProgressCircular";

export interface ProgressCircularProps extends MaterialComponentProps {
    ref?: ProgressCircular
    /**The color of the component. It supports the theme colors.*/
    color?: TypeColor
    /**The size of the component.*/
    size?: TypeSize
    /**Constantly animates, does not follow any value.*/
    indeterminate?: TypeBoolean
    /**The minimum allowed value of the prgoress. Should not be equal to max.*/
    min?: TypeNumber
    /**The maximum allowed value of the prgoress. Should not be equal to min.*/
    max?: TypeNumber
    /**The current value of the progress.*/
    value?: TypeNumber
    strokeWidth?: TypeNumber
}

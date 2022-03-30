import {TypeBoolean, TypeNumber, TypeSignal_Number} from "@lab1/core";
import {MaterialComponentProps, Slider} from "../../MaterialExports";
import {TypeColor} from "../../Codes/Types";


export interface SliderProps extends MaterialComponentProps {
    ref?:Slider
    /**The minimum allowed value of the slider. Should not be equal to max.*/
    min?: TypeNumber
    /**The maximum allowed value of the slider. Should not be equal to min.*/
    max?: TypeNumber
    /**How many steps the slider should take on each move.*/
    step?: TypeNumber
    /**If true, the slider will be disabled.*/
    disabled?: TypeBoolean
    value?: TypeNumber
    /**The color of the component. It supports the Primary, Secondary and Tertiary theme colors.*/
    color?: TypeColor
    /**
     * If true, the dragging the slider will update the Value immediately.
     * If false, the Value is updated only on releasing the handle.
     */
    immediate?: TypeBoolean

    //Signals
    onChange?:TypeSignal_Number
}

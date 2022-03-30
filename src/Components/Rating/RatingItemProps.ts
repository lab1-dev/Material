import {TypeBoolean, TypeNumber, TypeSignal_Number, TypeSignal_NumberOrUndefined} from "@lab1/core";
import {MaterialComponentProps, Rating} from "../../MaterialExports";
import {TypeColor, TypeSize} from "../../Codes/Types";

export interface RatingItemProps extends MaterialComponentProps{
    ref?:Rating
    /**This rating component value*/
    itemValue?:TypeNumber
    /**The Size of the icon.*/
    size?:TypeSize
    /**The color of the component. It supports the theme colors.*/
    color?:TypeColor
    /**If true, disables ripple effect.*/
    disableRipple?:TypeBoolean
    /**If true, the controls will be disabled.*/
    disabled?:TypeBoolean
    /**If true, the component will be readonly.*/
    readOnly?:TypeBoolean

    //Signals
    /**Fires when element clicked.*/
    onItemClick?:TypeSignal_Number
    /**Fires when element hovered.*/
    onItemHover?:TypeSignal_NumberOrUndefined
}

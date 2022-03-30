import {TypeBoolean, TypeNumber, TypeSignal_Number, TypeSignal_NumberOrUndefined, TypeString, TypeStringOrUndefined} from "@lab1/core";
import {MaterialComponentProps} from "../MaterialItem/MaterialComponentProps";
import {TypeColor, TypeSize} from "../../Codes/Types";
import {Rating} from "./Rating";

export interface RatingProps extends MaterialComponentProps {
    ref?: Rating
    /**User class names for RatingItems, separated by space*/
    ratingItemsClass?: TypeStringOrUndefined
    /**User styles for RatingItems.*/
    ratingItemsStyle?: TypeStringOrUndefined
    /**Input name. If not initialized, name will be random guid.*/
    name?: TypeString
    /**Max value and how many elements to click will be generated. Default: 5*/
    maxValue?: TypeNumber
    /**Selected or hovered icon. Default @Icons.Material.Star*/
    fullIcon?: TypeString
    /**Non selected component icon. Default @Icons.Material.StarBorder*/
    emptyIcon?: TypeString
    /**The color of the component. It supports the theme colors.*/
    color?: TypeColor
    /**The Size of the icons.*/
    size?: TypeSize
    /**If true, disables ripple effect.*/
    disableRipple?: TypeBoolean
    /**If true, the controls will be disabled.*/
    disabled?: TypeBoolean
    /**If true, the ratings will show without interactions.*/
    readOnly?: TypeBoolean
    /**Selected value*/
    selectedValue?: TypeNumber

    //Signals
    /**Fires when SelectedValue changes.*/
    onSelectedValueChange?: TypeSignal_Number
    /**Fires when hovered value change. Value will be null if no rating component is hovered.*/
    onHoveredValueChange?: TypeSignal_NumberOrUndefined
}

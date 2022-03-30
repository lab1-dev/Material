import {Badge, MaterialComponentProps} from "../../MaterialExports";
import {TypeColor, TypeOrigin} from "../../Codes/Types";
import {TypeAny, TypeBoolean, TypeNumber, TypeSignal_MouseEvent, TypeStringOrUndefined} from "@lab1/core";

export interface BadgeProps extends MaterialComponentProps{
    ref?:Badge
    /**The placement of the badge.*/
    origin?:TypeOrigin
    /**The higher the number, the heavier the drop-shadow.*/
    elevation?:TypeNumber
    /**The color of the badge.*/
    color?:TypeColor
    /**Reduces the size of the badge and hide any of its content.*/
    dot?:TypeBoolean
    /**Overlaps the childcontent on top of the content.*/
    overlap?:TypeBoolean
    /**Applies a border around the badge.*/
    bordered?:TypeBoolean
    /**Sets the Icon to use in the badge.*/
    icon?:TypeStringOrUndefined
    /**Max value to show when content is integer type.*/
    max?:TypeNumber
    /**Content you want inside the badge. Supported types are string and integer.*/
    content?:TypeAny
    /**Badge class names, separated by space.*/
    badgeClass?:TypeStringOrUndefined

    //Signals
    /**Button click event if set.*/
    onClick?:TypeSignal_MouseEvent
}

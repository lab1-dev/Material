import {TypeBoolean, TypeNumber, TypeNumberOrUndefined, TypeNumberStringOrUndefined} from "@lab1/core";
import {MaterialComponentProps, Paper} from "../../MaterialExports";

export interface PaperProps extends MaterialComponentProps {
    ref?: Paper
    /**The higher the number, the heavier the drop-shadow.*/
    elevation?: TypeNumber
    /**If true, border-radius is set to 0.*/
    square?: TypeBoolean
    /**If true, card will be outlined.*/
    outlined?: TypeBoolean
    /**Max-Height of the component.*/
    maxHeight?: TypeNumberStringOrUndefined
    /**Max-Width of the component.*/
    maxWidth?: TypeNumberStringOrUndefined
    /**Min-Height of the component.*/
    minHeight?: TypeNumberStringOrUndefined
    /**Min-Width of the component.*/
    minWidth?: TypeNumberStringOrUndefined
}

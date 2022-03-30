import {ComponentProps, TypeBoolean, TypeStringOrUndefined} from "@lab1/core";

export interface TdProps extends ComponentProps{
    dataLabel?:TypeStringOrUndefined
    /**Hide cell when breakpoint is smaller than the defined value in table.*/
    hideSmall?:TypeBoolean
}

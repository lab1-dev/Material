import {ComponentProps, TypeBoolean, TypeSignal_MouseEvent, TypeStringOrUndefined} from "@lab1/core";
import {MenuItem} from "../../MaterialExports";

export interface MenuItemProps extends ComponentProps {
    ref?: MenuItem
    text?: TypeStringOrUndefined
    disabled?: TypeBoolean
    link?: TypeStringOrUndefined
    target?: TypeStringOrUndefined
    forceLoad?: TypeBoolean

    //Signals
    onClick?: TypeSignal_MouseEvent
}

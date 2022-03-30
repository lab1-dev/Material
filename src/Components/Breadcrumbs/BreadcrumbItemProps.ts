import {TypeBoolean, TypeString, TypeStringOrUndefined} from "@lab1/core";
import {MaterialComponentProps} from "../MaterialItem/MaterialComponentProps";

export interface BreadcrumbItemProps extends MaterialComponentProps{
    text?:TypeStringOrUndefined
    href?:TypeStringOrUndefined
    disabled?:TypeBoolean
    icon?:TypeStringOrUndefined
}

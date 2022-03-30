import {Component, ComponentProps} from "@lab1/core";
import {HorizontalAlignment} from "../../Enums/HorizontalAlignment";
import {Severity} from "../../Enums/Severity";
import {Variant} from "../../Enums/Variant";

export interface AlertProps extends ComponentProps{
    contentAlignment?:HorizontalAlignment
    closeIcon?:string
    showCloseIcon?:boolean
    elevation?:number
    square?:boolean
    dense?:boolean
    noIcon?:boolean
    severity?:Severity
    variant?:Variant
    childContent?:Component
    icon?:string

    label?:string //nao tinha no mud
}

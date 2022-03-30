import { ComponentProps } from "@lab1/core";
import {DialogOptions} from "./DialogOptions";
import {MaterialComponentProps} from "../MaterialItem/MaterialComponentProps";

export interface DialogProps extends MaterialComponentProps{
    title?:string
    /**Define the dialog title as a renderfragment (overrides Title)*/
    titleContent?:any
    content?:any;
    closeIcon?:string;
    options?:DialogOptions
}

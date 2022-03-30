import {TypeNumber} from "@lab1/core";
import {TypeJustify} from "../../Codes/Types";
import {MaterialComponentProps} from "../MaterialItem/MaterialComponentProps";

export interface GridProps extends MaterialComponentProps{
    spacing?:TypeNumber
    justify?:TypeJustify
}

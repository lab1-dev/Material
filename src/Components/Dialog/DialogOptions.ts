import {DialogPosition} from "../../Enums/DialogPosition";
import {MaxWidth} from "../../Enums/MaxWidth";

export class DialogOptions{
    position?:DialogPosition
    maxWidth?:MaxWidth
    disableBackdropClick?:boolean
    closeOnEscapeKey?:boolean
    noHeader?:boolean
    closeButton?:boolean
    fullScreen?:boolean
    fullWidth?:boolean
}

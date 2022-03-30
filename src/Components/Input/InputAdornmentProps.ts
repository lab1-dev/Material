import {ComponentProps, TypeStringOrUndefined} from "@lab1/core";
import {TypeColor, TypeEdgeOrUndefined, TypeSize} from "../../Codes/Types";

export interface InputAdornmentProps extends ComponentProps {
    text?: TypeStringOrUndefined
    icon?: TypeStringOrUndefined
    edge?: TypeEdgeOrUndefined
    size?: TypeSize
    color?: TypeColor
}

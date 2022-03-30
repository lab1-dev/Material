import {TypeBoolean} from "@lab1/core";
import {Divider, MaterialComponentProps} from "../../MaterialExports";
import {TypeDividerType} from "../../Codes/Types";

export interface DividerProps extends MaterialComponentProps{
    ref?:Divider
    /**Sets absolute position to the component.*/
    absolute?:TypeBoolean
    /**If true, a vertical divider will have the correct height when used in flex container.*/
    flexItem?:TypeBoolean
    /**If true, the divider will have a lighter color.*/
    light?:TypeBoolean
    /**If true, the divider is displayed vertically.*/
    vertical?:TypeBoolean
    /**The Divider type to use.*/
    dividerType?:TypeDividerType
}

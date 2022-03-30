import {TypeBoolean, TypeSignal_Boolean, TypeString} from "@lab1/core";
import {TypeColor} from "../../Codes/Types";
import {MaterialComponentProps} from "../MaterialItem/MaterialComponentProps";

export interface TreeViewItemToggleButtonProps extends MaterialComponentProps{
    /**If true, displays the button.*/
    visible?:TypeBoolean
    /**Determens when to flip the expanded icon.*/
    expanded?:TypeBoolean
    /**If true, displays the loading icon.*/
    loading?:TypeBoolean
    /**Called whenever expanded changed.*/
    onExpandedChange?:TypeSignal_Boolean
    /**The loading icon.*/
    loadingIcon?:TypeString
    /**The color of the loading. It supports the theme colors.*/
    loadingIconColor?:TypeColor
    /**The expand/collapse icon.*/
    expandedIcon?:TypeString
    /**The color of the expand/collapse. It supports the theme colors.*/
    expandedIconColor?:TypeColor
}

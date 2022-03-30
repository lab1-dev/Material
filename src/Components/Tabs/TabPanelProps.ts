import {ComponentProps, TypeAny, TypeBoolean, TypeString, TypeStringOrUndefined} from "@lab1/core";
import {TypeColor} from "../../Codes/Types";

export interface TabPanelProps extends ComponentProps{
    /**Text will be displayed in the TabPanel as TabTitle.*/
    text?:TypeStringOrUndefined
    /**Icon placed before the text if set.*/
    icon?:TypeStringOrUndefined
    /**If true, the tabpanel will be disabled.*/
    disabled?:TypeBoolean
    /**Optional information to be showed into a badge*/
    badgeData?:TypeAny
    /**Optional information to show the badge as a dot.*/
    badgeDot?:TypeBoolean
    /**The color of the badge.*/
    badgeColor?:TypeColor
    /**TabPanel Tooltip*/
    toolTip?:TypeStringOrUndefined
}

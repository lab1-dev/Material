import {TypeAny, TypeBoolean, TypeNumber, TypeString} from "@lab1/core";
import {TypeColor, TypePlacement} from "../../Codes/Types";
import {MaterialComponentProps, Tooltip} from "../../MaterialExports";

export interface TooltipProps extends MaterialComponentProps {
    ref?: Tooltip
    /**The color of the component. It supports the theme colors.*/
    color?: TypeColor
    /**Sets the text to be displayed inside the tooltip.*/
    text?: TypeString
    /**If true, a arrow will be displayed pointing towards the content from the tooltip.*/
    arrow?: TypeBoolean
    /**Sets the length of time that the opening transition takes to complete.*/
    duration?: TypeNumber
    /**Sets the amount of time to wait from opening the popover before beginning to perform the transition.*/
    delay?: TypeNumber
    /**Tooltip placement.*/
    placement?: TypePlacement
    /**Tooltip content. May contain any valid html*/
    tooltipContent?: TypeAny
    /**Determines if this component should be inline with it's surrounding (default) or if it should behave like a block element.*/
    inline?: TypeBoolean
}

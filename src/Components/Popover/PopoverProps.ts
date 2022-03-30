import {TypeBoolean, TypeNumber, TypeNumberOrUndefined} from "@lab1/core";
import {TypeOrigin, TypeOverflowBehavior} from "../../Codes/Types";
import {MaterialComponentProps, Popover} from "../../MaterialExports";

export interface PopoverProps extends MaterialComponentProps {
    ref?: Popover
    /**If true, will apply default MudPaper classes.*/
    paper?: TypeBoolean
    /**The higher the number, the heavier the drop-shadow.*/
    elevation?: TypeNumber
    /**If true, border-radius is set to 0.*/
    square?: TypeBoolean
    /**If true, the popover is visible.*/
    open?: TypeBoolean
    /**If true the popover will be fixed position instead of absolute.*/
    fixed?: TypeBoolean
    /**Sets the length of time that the opening transition takes to complete.*/
    duration?: TypeNumber
    /**Sets the amount of time to wait from opening the popover before beginning to perform the transition.*/
    delay?: TypeNumber
    /**
     * Set the anchor point on the element of the popover.
     * The anchor point will determinate where the popover will be placed.
     */
    anchorOrigin?: TypeOrigin
    /**
     * Sets the intersection point if the anchor element. At this point the popover will lay above the popover.
     * This property in conjunction with AnchorPlacement determinate where the popover will be placed.
     */
    transformOrigin?: TypeOrigin
    /**
     * Set the overflow behavior of a popover and controls how the element should react if there is not enough space for the element to be visible
     *Defaults to none, which doens't apply any overflow logic
     */
    overflowBehavior?: TypeOverflowBehavior
    /**If true, the popover will have the same width at its parent element, default to false*/
    relativeWidth?: TypeBoolean
}

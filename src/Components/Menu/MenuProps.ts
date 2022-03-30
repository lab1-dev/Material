import {TypeBoolean, TypeItemOrUndefined, TypeNumberOrUndefined, TypeStringOrUndefined} from "@lab1/core";
import {TypeColor, TypeMaterialMouseEvent, TypeOrigin, TypeSize, TypeVariant} from "../../Codes/Types";
import {MaterialComponentProps, Menu} from "../../MaterialExports";

export interface MenuProps extends MaterialComponentProps {
    ref?: Menu
    text?: TypeStringOrUndefined
    /**User class names for the list, separated by space*/
    listClass?: TypeStringOrUndefined
    /**User class names for the popover, separated by space*/
    popoverClass?: TypeStringOrUndefined
    /**Icon to use if set will turn the button into a MudIconButton.*/
    icon?: TypeStringOrUndefined
    /**The color of the icon. It supports the theme colors.*/
    iconColor?: TypeColor
    /**Icon placed before the text if set.*/
    startIcon?: TypeStringOrUndefined
    /**Icon placed after the text if set.*/
    endIcon?: TypeStringOrUndefined
    /**The color of the button. It supports the theme colors.*/
    color?: TypeColor
    /**The button Size of the component.*/
    size?: TypeSize
    /**The button variant to use.*/
    variant?: TypeVariant
    /** If true, compact vertical padding will be applied to all menu items.*/
    dense?: TypeBoolean
    /**If true, the list menu will be same width as the parent.*/
    fullWidth?: TypeBoolean
    /**Sets the maxheight the menu can have when open.*/
    maxListHeight?: TypeNumberOrUndefined
    /**
     * If true, instead of positioning the menu at the left upper corner, position at the exact cursor location.
     * This makes sense for larger activators
     */
    positionAtCursor?: TypeBoolean
    /**
     * Place a MudButton, a MudIconButton or any other component capable of acting as an activator. This will
     *override the standard button and all parameters which concern it.
     */
    activatorContent?: TypeItemOrUndefined
    /**Specify the activation event when ActivatorContent is set*/
    activationEvent?: TypeMaterialMouseEvent
    /**Set the anchor origin point to determen where the popover will open from.*/
    anchorOrigin?: TypeOrigin
    /**Sets the transform origin point for the popover.*/
    transformOrigin?: TypeOrigin
    /**Set to true if you want to prevent page from scrolling when the menu is open*/
    lockScroll?: TypeBoolean
    /**If true, menu will be disabled.*/
    disabled?: TypeBoolean
    /**If true, disables ripple effect.*/
    disableRipple?: TypeBoolean
    /**If true, no drop-shadow will be used.*/
    disableElevation?: TypeBoolean
}

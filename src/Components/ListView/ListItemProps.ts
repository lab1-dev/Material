import {Property, TypeAny, TypeBoolean, TypeSignal_Boolean, TypeSignal_MouseEvent, TypeString, TypeStringOrUndefined} from "@lab1/core";
import {ListView} from "./ListView";
import {TypeColor, TypeSize} from "../../Codes/Types";
import {ListItem, MaterialComponentProps} from "../../MaterialExports";

export interface ListItemProps extends MaterialComponentProps {
    ref?:ListItem
    /**The text to display*/
    text?: TypeStringOrUndefined
    value?: TypeAny
    /**Avatar to use if set.*/
    avatar?: TypeStringOrUndefined
    /**Link to a URL when clicked.*/
    href?: TypeStringOrUndefined
    /**If true, force browser to redirect outside component router-space.*/
    forceLoad?: TypeBoolean
    /**Avatar CSS Class to apply if Avatar is set.*/
    avatarClass?: TypeStringOrUndefined
    /**
     * If true, will disable the list component if it has onclick.
     * The value can be overridden by the parent list.
     */
    disabled?: TypeBoolean
    /**If true, disables ripple effect.*/
    disableRipple?: TypeBoolean
    /**Icon to use if set.*/
    icon?: TypeStringOrUndefined
    /**The color of the icon.*/
    iconColor?: TypeColor
    /**Sets the Icon Size.*/
    iconSize?: TypeSize
    /**The color of the adornment if used. It supports the theme colors.*/
    adornmentColor?: TypeColor
    /**Custom expand less icon.*/
    expandLessIcon?: TypeString
    /**Custom expand more icon.*/
    expandMoreIcon?: TypeString
    /**If true, the List Subheader will be indented.*/
    inset?: TypeBoolean
    /**If true, compact vertical padding will be used.*/
    dense?: TypeBoolean
    /**If true, the left and right padding is removed.*/
    disableGutters?: TypeBoolean
    /**
     * Expand or collapse nested list. Two-way bindable. Note: if you directly set this to
     * true or false (instead of using two-way binding) it will force the nested list's expansion state.
     */
    expanded?: TypeBoolean
    /**If true, expands the nested list on first display*/
    initiallyExpanded?: TypeBoolean
    /**Command parameter.*/
    commandParameter?: TypeAny
    /**Add child list items here to create a nested list.*/
    nestedList?: Property<ListView | undefined> | Property<ListView> | ListView

    //Signals
    onClick?:TypeSignal_MouseEvent
    onExpandedChange?:TypeSignal_Boolean
}

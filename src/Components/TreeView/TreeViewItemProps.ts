import {TypeBoolean, TypeComponentBaseOrUndefined, TypeItemList, TypeString, TypeStringOrUndefined, TypeTOrUndefined} from "@lab1/core";
import {TypeColor, TypeTypo} from "../../Codes/Types";
import {MaterialComponentProps} from "../MaterialItem/MaterialComponentProps";

export interface TreeViewItemProps<T> extends MaterialComponentProps {
    /**Custom checked icon, leave null for default.*/
    checkedIcon?: TypeString
    /**Custom unchecked icon, leave null for default.*/
    uncheckedIcon?: TypeString
    /**Value of the treeviewitem. Acts as the displayed text if no text is set.*/
    value?: TypeTOrUndefined<T>
    /**The text to display*/
    text?: TypeString
    /**Tyopography for the text.*/
    textTypo?: TypeTypo
    /** User class names for the text, separated by space.*/
    textClass?: TypeStringOrUndefined
    /**The text at the end of the component.*/
    endText?: TypeStringOrUndefined
    /**Typography for the endtext.*/
    endTextTypo?: TypeTypo
    /**User class names for the endtext, separated by space.*/
    endTextClass?: TypeStringOrUndefined
    /**If true, treeviewitem will be disabled.*/
    disabled?: TypeBoolean
    /**Content of the component, if used completly replaced the default rendering.*/
    content?:TypeComponentBaseOrUndefined
    items?: TypeItemList
    /**
     * Expand or collapse treeview component when it has children. Two-way bindable. Note: if you directly set this to
     * true or false (instead of using two-way binding) it will force the component's expansion state.
     */
    expanded?: TypeBoolean
    activated?: TypeBoolean
    selected?: TypeBoolean
    /**Icon placed before the text if set.*/
    icon?: TypeStringOrUndefined
    /**The color of the icon. It supports the theme colors.*/
    iconColor?: TypeColor
    /**Icon placed after the text if set.*/
    endIcon?: TypeStringOrUndefined
    /**The color of the icon. It supports the theme colors.*/
    endIconColor?: TypeColor
    /**The expand/collapse icon.*/
    expandedIcon?: TypeString
    /**The color of the expand/collapse button. It supports the theme colors.*/
    expandedIconColor?: TypeColor
    /**The loading icon.*/
    loadingIcon?: TypeString
    /**The color of the loading. It supports the theme colors.*/
    loadingIconColor?: TypeColor
}

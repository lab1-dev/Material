import {Property, TypeAnyList, TypeBoolean, TypeNumber, TypeString, TypeStringOrUndefined} from "@lab1/core";
import {TypeOrigin} from "../../Codes/Types";
import {BaseInputProps, Select} from "../../MaterialExports";

export interface SelectProps<T> extends BaseInputProps<T> {
    ref?: Select
    /**The collection of items within this select*/
    childContent?: TypeAnyList
    /**User class names for the popover, separated by space*/
    popoverClass?: TypeStringOrUndefined
    /**If true, compact vertical padding will be applied to all Select items.*/
    dense?: TypeBoolean
    /**The Open Select Icon*/
    openIcon?: TypeString
    /**The Close Select Icon*/
    closeIcon?: TypeString
    /**If set to true and the MultiSelection option is set to true, a "select all" checkbox is added at the top of the list of items.*/
    selectAll?: TypeBoolean
    /**Define the text of the Select All option.*/
    selectAllText?: TypeString
    /**Parameter to define the delimited string separator.*/
    delimiter?: TypeString
    /**Set of selected values. If MultiSelection is false it will only ever contain a single value. This property is two-way bindable.*/
    selectedValues?: Property<T[]> | T[]
    /**If true, multiple values can be selected via checkboxes which are automatically shown in the dropdown*/
    multiSelection?: TypeBoolean
    /**Sets the maxheight the Select can have when open.*/
    maxListHeight?: TypeNumber
    /**Set the anchor origin point to determen where the popover will open from.*/
    anchorOrigin?: TypeOrigin
    /**Sets the transform origin point for the popover.*/
    transformOrigin?: TypeOrigin
    /**
     * If true, the Select's input will not show any values that are not defined in the dropdown.
     * This can be useful if Value is bound to a variable which is initialized to a value which is not in the list
     * and you want the Select to show the label / placeholder instead.
     */
    strict?: TypeBoolean
    /**Show clear button.*/
    clearable?: TypeBoolean
    /**If true, prevent scrolling while dropdown is open.*/
    lockScroll?: TypeBoolean
    /**Custom checked icon.*/
    checkedIcon?: TypeString
    /**Custom unchecked icon.*/
    uncheckedIcon?: TypeString
    /**Custom indeterminate icon.*/
    indeterminateIcon?: TypeString
}

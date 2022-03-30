import {TypeAny, TypeBoolean, TypeNumber, TypeString, TypeStringOrUndefined} from "@lab1/core";
import {BaseInputProps} from "../../Base/BaseInput/BaseInputProps";
import {TypeOrigin} from "../../Codes/Types";

export interface AutoCompleteProps<T> extends BaseInputProps<T> {
    /**User class names for the popover, separated by space*/
    popoverClass?: TypeStringOrUndefined
    /**Set the anchor origin point to determen where the popover will open from.*/
    anchorOrigin?: TypeOrigin
    /**Sets the transform origin point for the popover.*/
    transformOrigin?: TypeOrigin
    /**If true, compact vertical padding will be applied to all Autocomplete items.*/
    dense?: TypeBoolean
    /**The Open Autocomplete Icon*/
    openIcon?: TypeString
    /**The Close Autocomplete Icon*/
    closeIcon?: TypeString
    /**The maximum height of the Autocomplete when it is open.*/
    maxListHeight?: TypeNumber
    /**
     * Maximum items to display, defaults to 10.
     * A null value will display all items.
     */
    maxItems?: TypeNumber
    /**Minimum characters to initiate a search*/
    minCharacters?: TypeNumber
    /**Reset value if user deletes the text*/
    resetValueOnEmptyText?: TypeBoolean
    /**Debounce interval in milliseconds.*/
    debounceInterval?: TypeNumber
    /**Optional presentation template for unselected items*/
    itemTemplate?: TypeAny
    /**Optional presentation template for the selected component*/
    itemSelectedTemplate?: TypeAny
    /**Optional presentation template for disabled component*/
    itemDisabledTemplate?: TypeAny
    /**
     * On drop-down close override Text with selected Value. This makes it clear to the user
     * which list value is currently selected and disallows incomplete values in Text.
     */
    coerceText?: TypeBoolean
    /**
     * If user input is not found by the search func and CoerceValue is set to true the user input
     * will be applied to the Value which allows to validate it and display an error message.
     */
    coerceValue?: TypeBoolean
    /**If true, the currently selected component from the drop-down (if it is open) is selected.*/
    selectValueOnTab?: TypeBoolean
    /**Show clear button.*/
    clearable?: TypeBoolean

    searchFunc?: (text: string) => T[]
}

import {TypeAny, TypeBoolean, TypeNumber, TypeString, TypeStringOrUndefined} from "@lab1/core";
import {FormComponentProps} from "../../Base/FormComponent/FormComponentProps";
import {TypeAdornment, TypeColor, TypeMargin, TypeOrientation, TypePickerVariant, TypeSize, TypeVariant} from "../../Codes/Types";

export interface PickerProps<T> extends FormComponentProps<T> {
    /**The color of the adornment if used. It supports the theme colors.*/
    adornmentColor?: TypeColor
    /**Sets the icon of the input text field*/
    adornmentIcon?: TypeString
    /**The short hint displayed in the input before the user enters a value.*/
    placeholder?: TypeStringOrUndefined
    /**The higher the number, the heavier the drop-shadow. 0 for no shadow set to 8 by default in inline mode and 0 in static mode.*/
    elevation?: TypeNumber
    /**If true, border-radius is set to 0 this is set to true automatically in static mode but can be overridden with Rounded bool.*/
    square?: TypeBoolean
    /**If true, no date or time can be defined.*/
    readOnly?: TypeBoolean
    /**If true, border-radius is set to theme default when in Static Mode.*/
    rounded?: TypeBoolean
    /**If string has value, HelperText will be applied.*/
    helperText?: TypeStringOrUndefined
    /**If true, the helper text will only be visible on focus.*/
    helperTextOnFocus?: TypeBoolean
    /**If string has value the label text will be displayed in the input, and scaled down at the top if the input has value.*/
    label?: TypeStringOrUndefined
    /**If true, the picker will be disabled.*/
    disabled?: TypeBoolean
    /**If true, the picker will be editable.*/
    editable?: TypeBoolean
    /**Hide toolbar and show only date/time views.*/
    disableToolBar?: TypeBoolean
    /**User class names for picker's ToolBar, separated by space*/
    toolBarClass?: TypeStringOrUndefined
    /**Picker container option*/
    pickerVariant?: TypePickerVariant
    /**Variant of the text input*/
    variant?: TypeVariant
    /**Sets if the icon will be att start or end, set to false to disable.*/
    adornment?: TypeAdornment
    /**What orientation to render in when in PickerVariant Static Mode.*/
    orientation?: TypeOrientation
    /**Sets the Icon Size.*/
    iconSize?: TypeSize
    /**The color of the toolbar, selected and active. It supports the theme colors.*/
    color?: TypeColor
    /**The currently selected string value (two-way bindable)*/
    text?: TypeStringOrUndefined
    /**CSS class that will be applied to the action buttons container*/
    classActions?: TypeStringOrUndefined
    /**Define the action buttons here*/
    pickerActions?: TypeAny
    /**Will adjust vertical spacing.*/
    marginType?: TypeMargin
}

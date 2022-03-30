import {TypeBoolean, TypeNumber, TypeNumberOrUndefined, TypeString, TypeStringOrUndefined} from "@lab1/core";
import {FormComponentProps} from "../FormComponent/FormComponentProps";
import {TypeAdornment, TypeColor, TypeInputMode, TypeMargin, TypeSize, TypeVariant} from "../../Codes/Types";

export interface BaseInputProps<T> extends FormComponentProps<T> {
    /**If true, the input element will be disabled.*/
    disabled?: TypeBoolean
    /**If true, the input will be read-only.*/
    readOnly?: TypeBoolean
    /**If true, the input will update the Value immediately on typing. If false, the Value is updated only on Enter.*/
    immediate?: TypeBoolean
    /**If true, the input will not have an underline.*/
    disableUnderline?: TypeBoolean
    /**The HelperText will be displayed below the text field.*/
    helperText?: TypeStringOrUndefined
    /**If true, the helper text will only be visible on focus.*/
    helperTextOnFocus?: TypeBoolean
    /**Icon that will be used if Adornment is set to Start or End.*/
    adornmentIcon?: TypeStringOrUndefined
    /**Text that will be used if Adornment is set to Start or End, the Text overrides Icon.*/
    adornmentText?: TypeStringOrUndefined
    /**The Adornment if used. By default, it is set to None.*/
    adornment?: TypeAdornment
    /**The color of the adornment if used. It supports the theme colors.*/
    adornmentColor?: TypeColor
    /**The Icon Size.*/
    iconSize?: TypeSize
    /**Variant to use.*/
    variant?: TypeVariant
    /**Will adjust vertical spacing.*/
    marginType?: TypeMargin
    /**The short hint displayed in the input before the user enters a value.*/
    placeholder?: TypeStringOrUndefined
    /**If set, will display the counter, value 0 will display current count but no stop count.*/
    counter?: TypeNumberOrUndefined
    /**Maximum number of characters that the input will accept*/
    maxLength?: TypeNumber
    /**If string has value the label text will be displayed in the input, and scaled down at the top if the input has value.*/
    label?: TypeStringOrUndefined
    /**If true the input will focus automatically.*/
    autoFocus?: TypeBoolean
    /**A multiline input (textarea) will be shown, if set to more than one line.*/
    lines?: TypeNumber
    /**The text to be displayed.*/
    text?: TypeStringOrUndefined
    /*FIXME remove this
     *
     * When TextUpdateSuppression is true (which is default) the text can not be updated by bindings while the component is focused in BSS (not WASM).
 *         /// This solves issue #1012: Textfield swallowing chars when typing rapidly
 *         /// If you need to update the input's text while it is focused you can set this parameter to false.
 *         /// Note: on WASM text update suppression is not active, so this parameter has no effect.
     */
    textUpdateSuppression?: TypeBoolean
    /**Hints at the type of data that might be entered by the user while editing the input*/
    inputMode?: TypeInputMode
    /**
     * The pattern attribute, when specified, is a regular expression which the input's value must match in order for the value to pass constraint validation. It must be a valid JavaScript regular expression
     * Not Supported in multline input
     */
    pattern?: TypeStringOrUndefined
    /**Prevent the default action for the KeyDown event.*/
    keyDownPreventDefault?: TypeBoolean
    /**Prevent the default action for the KeyPress event.*/
    keyPressPreventDefault?: TypeBoolean
    /**Prevent the default action for the KeyUp event.*/
    keyUpPreventDefault?: TypeBoolean
    /**Conversion format parameter for ToString(), can be used for formatting primitive types, DateTimes and TimeSpans*/
    format?: TypeStringOrUndefined
}

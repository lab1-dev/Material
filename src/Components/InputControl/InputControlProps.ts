import {ComponentProps, TypeBoolean, TypeDocumentFragment, TypeStringOrUndefined} from "@lab1/core";
import {TypeMargin, TypeVariant} from "../../Codes/Types";
import {MaterialComponentProps} from "../MaterialItem/MaterialComponentProps";

export interface InputControlProps extends MaterialComponentProps {
    /**Should be the Input*/
    inputContent?: TypeDocumentFragment
    /**Will adjust vertical spacing.*/
    marginType?: TypeMargin
    /**If true, will apply mud-input-required class to the output div*/
    required?: TypeBoolean
    /**If true, the label will be displayed in an error state.*/
    error?: TypeBoolean
    /**The ErrorText that will be displayed if Error true*/
    errorText?: TypeStringOrUndefined
    /**The HelperText will be displayed below the text field.*/
    helperText?: TypeStringOrUndefined
    /**If true, the helper text will only be visible on focus.*/
    helperTextOnFocus?: TypeBoolean
    /**The current character counter, displayed below the text field.*/
    counterText?: TypeStringOrUndefined
    /**If string has value the label text will be displayed in the input, and scaled down at the top if the input has value.*/
    label?: TypeStringOrUndefined
    /**Variant can be Text, Filled or Outlined.*/
    variant?: TypeVariant
    /**If true, the input element will be disabled.*/
    disabled?: TypeBoolean
}

import {ComponentProps, Property, TypeBoolean, TypeString, TypeStringOrUndefined} from "@lab1/core";
import {MaterialComponentProps} from "../../Components/MaterialItem/MaterialComponentProps";

export interface FormComponentProps<T> extends MaterialComponentProps {
    /** If true, this form input is required to be filled out.*/
    required?: TypeBoolean
    /**The error text that will be displayed if the input is not filled out but required.*/
    requiredError?: TypeString
    /**The ErrorText that will be displayed if Error true.*/
    errorText?: TypeStringOrUndefined
    /**If true, the label will be displayed in an error state.*/
    error?: TypeBoolean
    /**The value of this input element.*/
    value?: Property<T> | Property<T|undefined> | T

    validation?: (value: T|undefined) => string|undefined
}

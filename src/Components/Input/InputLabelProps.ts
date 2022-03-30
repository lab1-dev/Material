import {ComponentProps, TypeBoolean, TypeString} from "@lab1/core";
import {TypeMargin, TypeVariant} from "../../Codes/Types";
import {MaterialComponentProps} from "../MaterialItem/MaterialComponentProps";

export interface InputLabelProps extends MaterialComponentProps {
    /**If true, the input element will be disabled.*/
    disabled?: TypeBoolean
    /**If true, the label will be displayed in an error state.*/
    error?: TypeBoolean
    /**Variant to use.*/
    variant?: TypeVariant
    /** Will adjust vertical spacing.*/
    marginType?: TypeMargin
    label?: TypeString
}

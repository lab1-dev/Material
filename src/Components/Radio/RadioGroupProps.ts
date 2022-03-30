import {Property, TypeSignal_T, TypeTOrUndefined} from "@lab1/core"
import {FormComponentProps, RadioGroup} from "../../MaterialExports";

export interface RadioGroupProps<T> extends FormComponentProps<T> {
    ref?: RadioGroup
    /**The option value selected by the User**/
    selectedOption?: TypeTOrUndefined<T>

    //Signals
    onSelectedOptionChange?:TypeSignal_T<T>
}


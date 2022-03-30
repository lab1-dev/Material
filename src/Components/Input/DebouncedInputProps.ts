import {TypeNumber, TypeSignal_String} from "@lab1/core";
import {BaseInputProps} from "../../Base/BaseInput/BaseInputProps";

export interface DebouncedInputProps<T> extends BaseInputProps<T> {
    /**Interval to be awaited in milliseconds before changing the Text value*/
    debounceInterval?: TypeNumber

    //Signals
    onDebounceIntervalElapsed?:TypeSignal_String
}

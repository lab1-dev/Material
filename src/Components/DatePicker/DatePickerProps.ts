import {TypeBoolean, TypeDateTimeOrUndefined} from "@lab1/core";
import {BaseDatePickerProps} from "./BaseDatePickerProps";

export interface DatePickerProps extends BaseDatePickerProps {
    /**The currently selected date (two-way bindable). If null, then nothing was selected.*/
    date?: TypeDateTimeOrUndefined
    /**If AutoClose is set to true and PickerActions are defined, selecting a day will close the MudDatePicker.*/
    autoClose?: TypeBoolean
}

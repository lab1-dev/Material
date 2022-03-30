import {TimeSpan, TypeBoolean, TypeNumber, TypeString, TypeTimeSpanOrUndefined} from "@lab1/core";
import {PickerProps} from "../Picker/PickerProps";
import {TypeOpenTo, TypeTimeEditMode} from "../../Codes/Types";

export interface TimePickerProps extends PickerProps<TimeSpan | undefined> {
    /**First view to show in the MudDatePicker.*/
    openTo?: TypeOpenTo
    /**Choose the edition mode. By default, you can edit hours and minutes.*/
    timeEditMode?: TypeTimeEditMode
    /**Milliseconds to wait before closing the picker. This helps the user see that the time was selected before the popover disappears.*/
    closingDelay?: TypeNumber
    /**If AutoClose is set to true and PickerActions are defined, the hour and the minutes can be defined without any action.*/
    autoClose?: TypeBoolean
    /**If true, sets 12 hour selection clock.*/
    amPM?: TypeBoolean
    /**String Format for selected time view*/
    timeFormat?: TypeString
    /**The currently selected time (two-way bindable). If null, then nothing was selected.*/
    time?: TypeTimeSpanOrUndefined
}

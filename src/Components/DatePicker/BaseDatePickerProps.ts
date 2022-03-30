import {DateTime, TypeBoolean, TypeDateTimeOrUndefined, TypeDayOfWeekOrUndefined, TypeNumber, TypeNumberOrUndefined, TypeString, TypeStringOrUndefined} from "@lab1/core";
import {PickerProps} from "../Picker/PickerProps";
import {TypeOpenTo} from "../../Codes/Types";

export interface BaseDatePickerProps extends PickerProps<DateTime | undefined> {
    /**Max selectable date.*/
    maxDate?: TypeDateTimeOrUndefined
    /**Min selectable date.*/
    minDate?: TypeDateTimeOrUndefined
    /**First view to show in the DatePicker.*/
    openTo?: TypeOpenTo
    /**String Format for selected date view*/
    dateFormat?: TypeStringOrUndefined
    /**Defines on which day the week starts. */
    firstDayOfWeek?: TypeDayOfWeekOrUndefined
    /**
     * The current month of the date picker (two-way bindable). This changes when the user browses through the calendar.
     * The month is represented as a DateTime which is always the first day of that month. You can also set this to define which month is initially shown. If not set, the current month is shown.
     */
    pickerMonth?: TypeDateTimeOrUndefined
    /**Milliseconds to wait before closing the picker. This helps the user see that the date was selected before the popover disappears.*/
    closingDelay?: TypeNumber
    /**Number of months to display in the calendar*/
    displayMonths?: TypeNumber
    /**Maximum number of months in one row*/
    maxMonthColumns?: TypeNumberOrUndefined
    /**Start month when opening the picker.*/
    startMonth?: TypeDateTimeOrUndefined
    /**Display week numbers according to the Culture parameter. If no culture is defined, CultureInfo.CurrentCulture will be used.*/
    showWeekNumbers?: TypeBoolean
    /**
     * Format of the selected date in the title. By default, this is "ddd, dd MMM" which abbreviates day and month names.
     * For instance, display the long names like this "dddd, dd. MMMM".
     */
    titleDateFormat?: TypeString
    /**Custom previous icon.*/
    previousIcon?: TypeString
    /**Custom next icon.*/
    nextIcon?: TypeString
    /**Set a predefined fix year - no year can be selected*/
    fixYear?: TypeNumberOrUndefined
    /**Set a predefined fix month - no month can be selected*/
    fixMonth?: TypeNumberOrUndefined
    /**Set a predefined fix day - no day can be selected*/
    fixDay?: TypeNumberOrUndefined
}

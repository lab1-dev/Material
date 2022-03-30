import {Property, TypeBoolean, TypeStringOrUndefined, TypeTOrUndefined} from "@lab1/core";
import {BaseColumnProps} from "../../Base/BaseColumn/BaseColumnProps";

export interface SortableColumnProps<T,ModelType> extends BaseColumnProps{
    /**Specifies the name of the object's property bound to the column*/
    value?: TypeTOrUndefined<T>
    /** Specifies the name of the object's property bound to the footer*/
    footerValue?: TypeTOrUndefined<T>
    /**Used if no FooterValue is available*/
    footerText?:TypeStringOrUndefined
    /**Specifies which string format should be used.*/
    DataFormatString?:TypeStringOrUndefined
    /**Specifies if the column should be readonly even if the DataTable is in editmode.*/
    readOnly?:TypeBoolean
    sortLabel?:TypeStringOrUndefined
}

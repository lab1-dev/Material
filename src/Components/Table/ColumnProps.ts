import {Property, TypeBoolean, TypeStringOrUndefined, TypeTOrUndefined} from "@lab1/core";
import {BaseColumnProps} from "../../Base/BaseColumn/BaseColumnProps";

export interface ColumnProps<T> extends BaseColumnProps {
    /**Specifies the name of the object's property bound to the column*/
    value?: TypeTOrUndefined<T>
    footerValue?: TypeTOrUndefined<T>
    /**Used if no FooterValue is available*/
    footerText?: TypeStringOrUndefined
    /**Specifies which string format should be used.*/
    dataFormatString?: TypeStringOrUndefined
    readOnly?: TypeBoolean
}

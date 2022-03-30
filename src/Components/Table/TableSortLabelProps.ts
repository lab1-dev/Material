import {ComponentProps, TypeBoolean, TypeStringOrUndefined} from "@lab1/core";
import {TypeSortDirection} from "../../Codes/Types";

export interface TableSortLabelProps<T> extends ComponentProps{

    initialDirection?:TypeSortDirection
    /**Enable the sorting. Set to true by default.*/
    enabled?:TypeBoolean
    appendIcon?:TypeBoolean
    /**The Icon used to display sortdirection.*/
    sortDirection?:TypeSortDirection
    sortLabel?:TypeStringOrUndefined
}

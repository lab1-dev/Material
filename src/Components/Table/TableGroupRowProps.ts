import {ComponentProps, Property, TypeBoolean, TypeString, TypeStringOrUndefined} from "@lab1/core";
import {TableGroupDefinition} from "./TableGroupDefinition";

export interface TableGroupRowProps<T> extends ComponentProps{
    /**The group definition for this grouping level. It's recursive.*/
    groupDefinition?:Property<TableGroupDefinition<T>> | TableGroupDefinition<T>
    /**Inner Items List for the Group*/
    items?:any//todo ver
    /**Defines Group Header Data Template*/
    headerTemplate?:any
    /**Defines Group Header Data Template*/
    footerTemplate?:any
    /**Add a multi-select checkbox that will select/unselect every component in the table*/
    isCheckable?:TypeBoolean
    headerClass?:TypeStringOrUndefined
    footerClass?:TypeStringOrUndefined
    headerStyle?:TypeStringOrUndefined
    footerStyle?:TypeStringOrUndefined
    /**Custom expand icon.*/
    expandIcon?:TypeString
    /**Custom collapse icon.*/
    collapseIcon?:TypeString
}

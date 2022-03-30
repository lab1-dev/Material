import {ComponentProps, Property, TypeBoolean, TypeSetT, TypeStringOrUndefined, TypeTList, TypeTOrUndefined} from "@lab1/core";
import {TableBaseProps} from "./TableBaseProps";
import {TableGroupDefinition} from "./TableGroupDefinition";

export interface TableProps<T> extends TableBaseProps {
    /**Defines how a table row looks like. Use MudTd to define the table cells and their content.*/
    rowTemplate?: any
    /**Row Child content of the component.*/
    childRowContent?: any
    /**Defines how a table row looks like in edit mode (for selected row). Use MudTd to define the table cells and their content.*/
    rowEditingTemplate?: any
    /**Defines how a table column looks like. Columns components should inherit from MudBaseColumn*/
    columns?: any
    /**Comma separated list of columns to show if there is no templates defined*/
    quickColumns?: TypeStringOrUndefined
    /**Defines the table body content when there are no matching records found*/
    noRecordsContent?: any
    /**Defines the table body content  the table has no rows and is loading*/
    loadingContent?: any
    /**Defines if the table has a horizontal scrollbar.*/
    horizontalScrollBar?: TypeBoolean
    /**The data to display in the table. MudTable will render one row per component*/
    items?: TypeTList<T>
    /**Returns the component which was last clicked on in single selection mode (that is, if MultiSelection is false)*/
    selectedItem?: TypeTOrUndefined<T>
    /**If MultiSelection is true, this returns the currently selected items. You can bind this property and the initial content of the HashSet you bind it to will cause these rows to be selected initially.*/
    selectedItems?: TypeSetT<T>
    /**Defines data grouping parameters. It can has N hierarchical levels*/
    groupBy?: Property<TableGroupDefinition<T>> | TableGroupDefinition<T>
    /**Defines custom CSS classes for using on Group Header's Tr.*/
    groupHeaderClass?:TypeStringOrUndefined
    /**Defines custom styles for using on Group Header's Tr.*/
    groupHeaderStyle?:TypeStringOrUndefined
    /**Defines custom CSS classes for using on Group Footer's Tr.*/
    groupFooterClass?:TypeStringOrUndefined
    /**Defines custom styles for using on Group Footer's Tr.*/
    groupFooterStyle?:TypeStringOrUndefined

}

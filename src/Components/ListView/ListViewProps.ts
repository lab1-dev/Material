import {Property, TypeAny, TypeAnyList, TypeBoolean, TypeSignal_Any, TypeSignal_MouseEvent} from "@lab1/core";
import {TypeSignal_ListItem} from "../../Codes/Types";
import {ListItem, ListView, MaterialComponentProps} from "../../MaterialExports";

export interface ListViewProps extends MaterialComponentProps {
    ref?:ListView
    childContent?: TypeAnyList
    /**Set true to make the list items clickable. This is also the precondition for list selection to work.*/
    clickable?: TypeBoolean
    /**If true, vertical padding will be removed from the list.*/
    disablePadding?: TypeBoolean
    /**If true, compact vertical padding will be applied to all list items.*/
    dense?: TypeBoolean
    /**If true, the left and right padding is removed on all list items.*/
    disableGutters?: TypeBoolean
    /**If true, will disable the list component if it has onclick.*/
    disabled?: TypeBoolean
    /**
     * The current selected list component.
     * Note: make the list clickable for component selection to work.
     */
    selectedItem?: Property<ListItem | undefined> | ListItem
    /**
     * The current selected value.
     * Note: make the list clickable for component selection to work.
     */
    selectedValue?: TypeAny

    //Signals
    onSelectedValueChange?:TypeSignal_Any
    onSelectedItemChange?:TypeSignal_ListItem
    onItemClick?:TypeSignal_ListItem
    onMouseEnter?:TypeSignal_MouseEvent
    onMouseLeave?:TypeSignal_MouseEvent
}

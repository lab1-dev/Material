import {ComponentProps, TypeBoolean, TypeSignal_MouseEvent} from "@lab1/core";

export interface THeadRowProps extends ComponentProps{
    /**Add a multi-select checkbox that will select/unselect every component in the table*/
    isCheckable?:TypeBoolean
    /**Specify behavior in case the table is multi-select mode. If set to <code>true</code>, it won't render an additional empty column.*/
    ignoreCheckbox?:TypeBoolean
    /**Specify behavior in case the table is editable. If set to <code>true</code>, it won't render an additional empty column.*/
    ignoreEditable?:TypeBoolean

    isExpandable?:TypeBoolean

    onRowClick?:TypeSignal_MouseEvent
}

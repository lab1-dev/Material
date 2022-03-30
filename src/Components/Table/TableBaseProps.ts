import {ComponentProps, TypeBoolean, TypeNumber, TypeString, TypeStringOrUndefined} from "@lab1/core";
import {TypeBreakpoint, TypeColor} from "../../Codes/Types";

export interface TableBaseProps extends ComponentProps{
    /**When editing a row and this is true, the editing row must be saved/cancelled before a new row will be selected.*/
    isEditRowSwitchingBlocked?:TypeBoolean
    /**The higher the number, the heavier the drop-shadow. 0 for no shadow.*/
    elevation?:TypeNumber
    /**Set true to disable rounded corners*/
    square?:TypeBoolean
    /**If true, table will be outlined.*/
    outlined?:TypeBoolean
    /**If true, table's cells will have left/right borders.*/
    bordered?:TypeBoolean
    /**Set true for rows with a narrow height*/
    dense?:TypeBoolean
    /**Set true to see rows hover on mouse-over.*/
    hover?:TypeBoolean
    /**If true, striped table rows will be used.*/
    striped?:TypeBoolean
    /** At what breakpoint the table should switch to mobile layout. Takes None, Xs, Sm, Md, Lg and Xl the default behavior is breaking on Xs.*/
    breakpoint?: TypeBreakpoint
    /**When true, the header will stay in place when the table is scrolled. Note: set Height to make the table scrollable.*/
    fixedHeader?:TypeBoolean
    /**When true, the footer will be visible is not scrolled to the bottom. Note: set Height to make the table scrollable.*/
    fixedFooter?:TypeBoolean
    /**
     * Setting a height will allow to scroll the table. If not set, it will try to grow in height. You can set this to any CSS value that the
     * attribute 'height' accepts, i.e. 500px.
     */
    //height?:TypeStringOrUndefined
    /**If table is in smalldevice mode and uses any kind of sorting the text applied here will be the sort selects label.*/
    sortLabel?:TypeStringOrUndefined
    /**
     * If true allows table to be in an unsorted state through column clicks (i.e. first click sorts "Ascending", second "Descending", third "None").
     * If false only "Ascending" and "Descending" states are allowed (i.e. there always should be a column to sort).
     */
    allowUnsorted?:TypeBoolean
    /**
     * If the table has more items than this number, it will break the rows into pages of said size.
     * Note: requires a MudTablePager in PagerContent.
     */
    rowsPerPage?:TypeNumber
    /**
     * The page index of the currently displayed page (Zero based). Usually called by MudTablePager.
     * Note: requires a MudTablePager in PagerContent.
     */
    currentPage?:TypeNumber
    /**Set to true to enable selection of multiple rows with check boxes.*/
    multiSelection?:TypeBoolean
    /**Optional. Add any kind of toolbar to this render fragment.*/
    toolbarContent?:any
    /**Show a loading animation, if true. */
    loading?:TypeBoolean
    /**The color of the loading progress if used. It supports the theme colors.*/
    loadingProgressColor?:TypeColor
    /**Add MudTh cells here to define the table header. If <see cref="CustomHeader"/> is set, add one or more MudTHeadRow instead.*/
    headerContent?:any
    /**Specify if the header has multiple rows. In that case, you need to provide the MudTHeadRow tags.*/
    customHeader?:TypeBoolean
    /**Add a class to the thead tag*/
    headerClass?:TypeStringOrUndefined
    /**Add MudTd cells here to define the table footer. If<see cref="CustomFooter"/> is set, add one or more MudTFootRow instead.*/
    footerContent?:any
    /**Specify if the footer has multiple rows. In that case, you need to provide the MudTFootRow tags.*/
    customFooter?:TypeBoolean
    /**Add a class to the tfoot tag*/
    footerClass?:TypeStringOrUndefined
    /**
     * Specifies a group of one or more columns in a table for formatting.
     *          Ex:
     *          table
     *              colgroup
     *                 col span="2" style="background-color:red"
     *                 col style="background-color:yellow"
     *               colgroup
     *               header
     *               body
     *          table
     */
    colGroup?:any
    /**Add MudTablePager here to enable breaking the rows in to multiple pages.*/
    pagerContent?:any
    /**Locks Inline Edit mode, if true.*/
    readOnly?:TypeBoolean
    /**Command executed when the user clicks on the CommitEdit Button.*/
    commitEditCommand?:any//todo ver
    /**Command parameter for the CommitEdit Button. By default, will be the row level component model, if you won't set anything else.*/
    commitEditCommandParameter?:any
    /**Tooltip for the CommitEdit Button.*/
    commitEditTooltip?:any
    /**Tooltip for the CancelEdit Button.*/
    cancelEditTooltip?:TypeStringOrUndefined
    /**Sets the Icon of the CommitEdit Button.*/
    commitEditIcon?:TypeString
    /**Sets the Icon of the CancelEdit Button.*/
    cancelEditIcon?:TypeString
    /**Define if Cancel button is present or not for inline editing.*/
    canCancelEdit?:TypeBoolean
    /**The method is called before the component is modified in inline editing.*/
    rowEditPreview?:any//todo
    /**The method is called when the edition of the component has been committed in inline editing.*/
    rowEditCommit?:any
    /**The method is called when the edition of the component has been canceled in inline editing.*/
    rowEditCancel?:any
    /**Number of items. Used only with ServerData="true"*/
    totalItems?:number
    /**CSS class for the table rows. Note, many CSS settings are overridden by MudTd though*/
    rowClass?:TypeStringOrUndefined
    /**CSS styles for the table rows. Note, many CSS settings are overridden by MudTd though*/
    rowStyle?:TypeStringOrUndefined
    /**If true, the results are displayed in a Virtualize component, allowing a boost in rendering speed.*/
    virtualize?:TypeBoolean
}

import {ComponentProps, TypeBoolean, TypeNumberList, TypeString, TypeStringOrUndefined} from "@lab1/core";
import {TypeHorizontalAlignment} from "../../Codes/Types";

export interface TablePagerProps extends ComponentProps{
    /**Set true to hide the part of the pager which allows to change the page size.*/
    hideRowsPerPage?:TypeBoolean
    /**Set true to hide the number of pages.*/
    hidePageNumber?:TypeBoolean
    /**Set true to hide the pagination.*/
    hidePagination?:TypeBoolean
    /**Set the horizontal alignment position.*/
    horizontalAlignment?: TypeHorizontalAlignment
    /**Define a list of available page size options for the user to choose from*/
    pageSizeOptions?: TypeNumberList
    /**
     * Format string for the display of the current page, which you can localize to your language. Available variables are:
     * {first_item}, {last_item} and {all_items} which will replaced with the indices of the page's first and last component, as well as the total number of items.
     * Default: "{first_item}-{last_item} of {all_items}" which is transformed into "0-25 of 77".
     */
    infoFormat?:TypeString
    /**The localizable "Rows per page:" text.*/
    rowsPerPageString?:TypeString
    /**Custom first icon.*/
    firstIcon?:TypeString
    /**Custom before icon.*/
    beforeIcon?:TypeString
    /**Custom next icon.*/
    nextIcon?:TypeString
    /**Custom last icon.*/
    lastIcon?:TypeString
}

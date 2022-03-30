import {Property, TypeBoolean, TypeNumber, TypeReadOnlyArrayOrUndefined} from "@lab1/core";
import {MaterialComponentProps, SimpleTable} from "../../MaterialExports";

export interface SimpleTableProps extends MaterialComponentProps {
    ref?: SimpleTable
    /**The higher the number, the heavier the drop-shadow.*/
    elevation?: TypeNumber
    /**If true, the table row will shade on hover.*/
    hover?: TypeBoolean
    /**If true, border-radius is set to 0.*/
    square?: TypeBoolean
    /**If true, compact padding will be used.*/
    dense?: TypeBoolean
    /**If true, table will be outlined.*/
    outlined?: TypeBoolean
    /**If true, table's cells will have left/right borders.*/
    bordered?: TypeBoolean
    /**If true, striped table rows will be used.*/
    striped?: TypeBoolean
    /**When true, the header will stay in place when the table is scrolled. Note: set Height to make the table scrollable.*/
    fixedHeader?: TypeBoolean
    /**Header titles of the table. It's a not a Property, so this value cannot be changed later.*/
    readonly headers?: string[]
    /**Two-dimensional array contaning rows and cells.  It's a not a Property, so this value cannot be changed later. Use the methods addRow, insertRow and others instead.*/
    readonly rows?: string[][]
}

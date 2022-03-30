import {TypeBoolean, TypeNumber, TypeString} from "@lab1/core";
import {MaterialComponentProps, Pagination} from "../../MaterialExports";
import {TypeColor, TypeSignal_Page, TypeSize, TypeVariant} from "../../Codes/Types";

export interface PaginationProps extends MaterialComponentProps {
    ref?: Pagination
    /**The number of pages.*/
    count?: TypeNumber
    /**The number of items at the start and end of the pagination.*/
    boundaryCount?: TypeNumber
    /**The number of items in the middle of the pagination.*/
    middleCount?: TypeNumber
    /**The selected page number.*/
    selected?: TypeNumber
    /**The variant to use.*/
    variant?: TypeVariant
    /**The color of the component. It supports the theme colors.*/
    color?: TypeColor
    /**If true, the pagination buttons are displayed rectangular.*/
    rectangular?: TypeBoolean
    /**The size of the component.*/
    size?: TypeSize
    /**If true, no drop-shadow will be used.*/
    disableElevation?: TypeBoolean
    /**If true, the pagination will be disabled.*/
    disabled?: TypeBoolean
    /**If true, the navigate-to-first-page button is shown.*/
    showFirstButton?: TypeBoolean
    /**If true, the navigate-to-last-page button is shown.*/
    showLastButton?: TypeBoolean
    /**If true, the navigate-to-previous-page button is shown.*/
    showPreviousButton?: TypeBoolean
    /**If true, the navigate-to-next-page button is shown.*/
    showNextButton?: TypeBoolean
    /**Custom first icon.*/
    firstIcon?: TypeString
    /**Custom before icon.*/
    beforeIcon?: TypeString
    /**Custom next icon.*/
    nextIcon?: TypeString
    /**Custom last icon.*/
    lastIcon?: TypeString

    //Signals
    onControlButtonClick?: TypeSignal_Page
}

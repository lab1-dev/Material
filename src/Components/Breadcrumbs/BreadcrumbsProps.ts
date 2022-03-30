import {TypeAny, TypeNumberOrUndefined, TypeString} from "@lab1/core";
import {MaterialComponentProps} from "../MaterialItem/MaterialComponentProps";

export interface BreadcrumbsProps extends MaterialComponentProps{
    /**Specifies the separator between the items.*/
    separator?:TypeString
    /**Specifies a RenderFragment to use as the separator.*/
    separatorTemplate?:TypeAny
    /**Specifies a RenderFragment to use as the items' contents.*/
    itemTemplate?:TypeAny
    /**Controls when (and if) the breadcrumbs will automatically collapse.*/
    maxItems?:TypeNumberOrUndefined
    /**Custom expander icon.*/
    expanderIcon?:TypeString
}

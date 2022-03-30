import {ComponentProps, TypeBoolean, TypeNumberOrUndefined} from "@lab1/core";
import {MaterialComponentProps} from "../MaterialItem/MaterialComponentProps";

export interface CollapseProps extends MaterialComponentProps {
    /**If true, expands the panel, otherwise collapse it. Setting this prop enables control over the panel.*/
    expanded?: TypeBoolean
}

import {TypeBoolean, TypeItemList} from "@lab1/core";
import {MaterialComponentProps, ToolBar} from "../../MaterialExports";

export interface ToolBarProps extends MaterialComponentProps {
    ref?: ToolBar
    /**If true, compact padding will be used.*/
    dense?: TypeBoolean
    /**If true, disables gutter padding. Default value: true*/
    disableGutters?: TypeBoolean
}

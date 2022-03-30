import {ComponentProps, TypeBoolean, TypeItemList} from "@lab1/core";
import {TypeColor, TypeOrientation} from "../../Codes/Types";

export interface PickerToolBarProps extends ComponentProps {
    disableToolBar?: TypeBoolean
    orientation?: TypeOrientation
    color?: TypeColor
    items?: TypeItemList
}

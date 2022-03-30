import {ComponentProps, TypeAny, TypeBoolean} from "@lab1/core";

export interface TrProps extends ComponentProps{
    component?:TypeAny
    isCheckable?:TypeBoolean
    isEditable?:TypeBoolean
    isEditing?:TypeBoolean
    isEditSwitchBlocked?:TypeBoolean
    isExpandable?:TypeBoolean
    isHeader?:TypeBoolean
    isFooter?:TypeBoolean
    isChecked?:TypeBoolean
}

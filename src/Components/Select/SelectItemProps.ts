import {ComponentProps, Property} from '@lab1/core';
import {BaseSelectItemProps} from "../../Base/BaseSelectItem/BaseSelectItemProps";

export interface SelectItemProps<T> extends BaseSelectItemProps{
    value?: Property<T> | Property<T|undefined> | T
}

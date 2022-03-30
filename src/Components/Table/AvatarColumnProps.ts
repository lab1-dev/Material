import {Property, TypeTOrUndefined} from "@lab1/core";
import {BaseColumnProps} from "../../Base/BaseColumn/BaseColumnProps";

export interface AvatarColumnProps<T> extends BaseColumnProps{
    value?: TypeTOrUndefined<T>
}

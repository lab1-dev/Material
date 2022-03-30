import {TypeBoolean, TypeItemList, TypeNumberOrUndefined, TypeSignal_T, TypeStringOrUndefined, TypeTOrUndefined} from "@lab1/core";
import {TypeColor, TypeColorOrUndefined} from "../../Codes/Types";
import {TreeView} from "./TreeView";
import {MaterialComponentProps} from "../MaterialItem/MaterialComponentProps";

export interface TreeViewProps<T> extends MaterialComponentProps{
    /**The color of the selected treeviewitem.*/
    color?: TypeColor
    /**Check box color if multiselection is used.*/
    checkBoxColor?: TypeColorOrUndefined
    /**if true, multiple values can be selected via checkboxes which are automatically shown in the tree view.*/
    multiSelection?: TypeBoolean
    /**If true, clicking anywhere on the component will expand it, if it has childs.*/
    expandOnClick?: TypeBoolean
    /**Hover effect for component's on mouse-over.*/
    hover?: TypeBoolean
    /**If true, compact vertical padding will be applied to all treeview items.*/
    dense?: TypeBoolean
    /**
     * Setting a maximum height will allow to scroll the treeview. If not set, it will try to grow in height.
     * You can set this to any CSS value that the attribute 'height' accepts, i.e. 500px.
     */
    //maxHeight?: TypeStringOrUndefined
    /**If true, treeview will be disabled and all its childitems.*/
    disabled?: TypeBoolean
    items?: TypeItemList
    treeRoot?: TypeTOrUndefined<TreeView<T>>
    onSelectedValueChange?:   TypeSignal_T<T>
}

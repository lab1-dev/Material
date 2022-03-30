import {BreadcrumbsProps, MaterialComponent} from "../../MaterialExports";
import {component, Property} from "@lab1/core";
import {BreadcrumbItemProps} from "./BreadcrumbItemProps";

export class BreadcrumbItem extends MaterialComponent implements BreadcrumbItemProps{

    //region properties
    readonly text = new Property<string|undefined>(this, undefined);
    readonly href = new Property<string|undefined>(this, undefined);
    readonly disabled = new Property<boolean>(this,false);
    readonly icon = new Property<string|undefined>(this, undefined);
    //endregion

    constructor(props:BreadcrumbsProps) {
        super(props);
        this.readProperties(props,true);
    }
}

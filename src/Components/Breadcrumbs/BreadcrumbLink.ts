import { component } from "@lab1/core";
import {BreadcrumbsProps, MaterialComponent} from "../../MaterialExports";

@component
export class BreadcrumbLink extends MaterialComponent{



    constructor(props:BreadcrumbsProps) {
        super({...{element: document.createElement('li')}, ...props});
        this.readProperties(props,true);
        this.render(true);
    }
}

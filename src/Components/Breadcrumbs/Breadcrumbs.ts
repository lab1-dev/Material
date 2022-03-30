import {component, Property, StringHelper} from "@lab1/core";
import type {BreadcrumbsProps} from "./BreadcrumbsProps";
import {MaterialComponent} from "../../MaterialExports";

@component
export class Breadcrumbs extends MaterialComponent implements BreadcrumbsProps{

    //region properties
    readonly separator = new Property<string>(this, '/');
    readonly separatorTemplate = new Property<any>(this, undefined);
    readonly itemTemplate = new Property<any>(this, undefined);
    readonly maxItems = new Property<number|undefined>(this, undefined);
    //endregion

    constructor(props:BreadcrumbsProps) {
        super({...{element: document.createElement('ul')}, ...props});
        this.readProperties(props,true);
        this.render(true);
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);
        this.removeChildComponents();

        let className='mud-breadcrumbs';
        className+=' mud-typography-body1';
        if (!StringHelper.isNullOrEmpty(this.className.value)) className += ` ${this.className.value}`;
    }

    protected buildItems():void{

    }
}

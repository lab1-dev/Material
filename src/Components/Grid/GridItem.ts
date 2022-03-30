import {component, Property} from "@lab1/core";
import {MaterialComponent} from "../../MaterialExports";
import type {GridItemProps} from "./GridItemProps";

@component
export class GridItem extends MaterialComponent implements GridItemProps{

    //region properties
    readonly childContent = new Property<any>(this, undefined);
    readonly xs = new Property<number>(this, 0);
    readonly sm = new Property<number>(this, 0);
    readonly md = new Property<number>(this, 0);
    readonly lg = new Property<number>(this, 0);
    readonly xl = new Property<number>(this, 0);
    readonly xxl = new Property<number>(this, 0);
    //endregion

    constructor(props:GridItemProps) {
        super({...{element: document.createElement('div')}, ...props});
        this.readProperties(props,true);
        this.render(true);
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);

        let className='mud-grid-item';
        if(this.xs.value!=0)className+=` mud-grid-item-xs-${this.xs.value}`;
        if(this.sm.value!=0)className+=` mud-grid-item-sm-${this.sm.value}`;
        if(this.md.value!=0)className+=` mud-grid-item-md-${this.md.value}`;
        if(this.lg.value!=0)className+=` mud-grid-item-lg-${this.lg.value}`;
        if(this.xl.value!=0)className+=` mud-grid-item-xl-${this.xl.value}`;
        if(this.xxl.value!=0)className+=` mud-grid-item-xxl-${this.xxl.value}`;

        this.setClassAndStyle(className,true);

        this.setChildContent(this.childContent.value);
    }
}

import type {GridProps} from './GridProps';
import {component, Property} from "@lab1/core";
import {Justify} from "../../Enums/Justify";
import {MaterialComponent} from "../../MaterialExports";

@component
export class Grid extends MaterialComponent implements GridProps{

    //region properties
    readonly childContent = new Property<any>(this, undefined);
    readonly spacing = new Property<number>(this, 3);
    readonly justify = new Property<Justify>(this, Justify.FlexStart);
    //endregion

    constructor(props:GridProps) {
        super({...{element: document.createElement('div')}, ...props});
        this.readProperties(props,true);
        this.render(true);
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);

        let className='mud-grid';
        className+=` mud-grid-spacing-xs-${this.spacing}`;
        className+=` mud-grid-justify-xs-${this.justify}`;
        this.setClassAndStyle(className,true);

        this.setChildContent(this.childContent.value);
    }

}

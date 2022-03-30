import type {DividerProps} from './DividerProps';
import {component, Property} from "@lab1/core";
import {DividerType, MaterialComponent} from "../../MaterialExports";

@component
export class Divider extends MaterialComponent implements DividerProps{

    //region properties
    readonly absolute = new Property<boolean>(this, false);
    readonly flexItem = new Property<boolean>(this, false);
    readonly light = new Property<boolean>(this, false);
    readonly vertical = new Property<boolean>(this, false);
    readonly dividerType = new Property<DividerType>(this, DividerType.FullWidth);
    //endregion

    constructor(props:DividerProps) {
        super({...{element: document.createElement('hr')}, ...props});
        this.readProperties(props,true);
        this.render(true);
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);

        let className='mud-divider';
        if(this.absolute.value)className+=' mud-divider-absolute';
        if(this.flexItem.value)className+=' mud-divider-flexitem';
        if(this.light.value)className+=' mud-divider-light';
        if(this.vertical.value)className+=' mud-divider-vertical';
        if(this.dividerType.value!=DividerType.FullWidth)className+=` mud-divider-${this.dividerType}`;
        this.setClassAndStyle(className,true);
    }
}

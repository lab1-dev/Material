import type {ToolBarProps} from './ToolBarProps';
import {component, Property} from "@lab1/core";
import {MaterialComponent} from "../../MaterialExports";

@component
export class ToolBar extends MaterialComponent implements ToolBarProps {

    //region properties
    readonly dense = new Property<boolean>(this, false);
    readonly disableGutters = new Property<boolean>(this, true);
    readonly childContent = new Property<any>(this, []);
    //endregion

    constructor(props: ToolBarProps) {
        super({...{element: document.createElement('mat-toolbar')}, ...props});
        this.readProperties(props, true);
        this.render(true);
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);
        this.removeChildComponents();

        //Div
        let className = 'mud-toolbar';
        if (this.dense.value) className += ' mud-toolbar-dense';
        if (!this.disableGutters.value) className += ' mud-toolbar-gutters';
        this.setClassAndStyle(className, true);

        //ChildContent
        this.setChildContent(this.childContent.value);
    }
}

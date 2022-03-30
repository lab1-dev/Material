import {component, Property, StyleHelper} from "@lab1/core";
import type {PaperProps} from './PaperProps';
import {MaterialComponent} from "../../MaterialExports";

@component
export class Paper extends MaterialComponent implements PaperProps {

    //region properties
    readonly elevation = new Property<number>(this, 1);
    readonly square = new Property<boolean>(this, false);
    readonly outlined = new Property<boolean>(this, false);
    readonly maxWidth = new Property<number | string | undefined>(this, undefined);
    readonly maxHeight = new Property<number | string | undefined>(this, undefined);
    readonly minWidth = new Property<number | string | undefined>(this, undefined);
    readonly minHeight = new Property<number | string | undefined>(this, undefined);
    readonly childContent = new Property<any>(this, undefined);
    //endregion

    constructor(props: PaperProps) {
        super({...{element: document.createElement('div')}, ...props});
        this.readProperties(props, true);
        this.render(true);
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);

        let className = 'mud-paper';
        if (this.outlined.value) className += ' mud-paper-outlined';
        if (this.square.value) className += ' mud-paper-square';
        if (!this.outlined.value) className += ` mud-elevation-${this.elevation}`;
        this.setClassAndStyle(className, true);

        StyleHelper.setPixelAttr(this.element!, 'maxHeight', undefined, this.maxHeight.value);
        StyleHelper.setPixelAttr(this.element!, 'maxWidth', undefined, this.maxWidth.value);
        StyleHelper.setPixelAttr(this.element!, 'minHeight', undefined, this.minHeight.value);
        StyleHelper.setPixelAttr(this.element!, 'minWidth', undefined, this.minWidth.value);

        //ChildContent
        this.setChildContent(this.childContent.value);
    }
}

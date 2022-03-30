import type {OverlayProps} from './OverlayProps';
import {Div, component, Property, Signal} from "@lab1/core";
import {MaterialComponent} from "../../MaterialExports";

@component
export class Overlay extends MaterialComponent implements OverlayProps {

    //region properties
    readonly childContent = new Property<any>(this, undefined);
    readonly autoClose = new Property<boolean>(this, false);
    readonly lockScroll = new Property<boolean>(this, true);
    readonly lockScrollClass = new Property<string>(this, 'scroll-locked');
    readonly darkBackground = new Property<boolean>(this, false);
    readonly lightBackground = new Property<boolean>(this, false);
    readonly absolute = new Property<boolean>(this, false);
    //endregion

    //region DOM nodes and others
    public _z: number = 5;
    protected backGroundDiv?: Div
    protected childContentDiv?: Div
    readonly onClick = new Signal<(ev: MouseEvent) => void>();
    //endregion

    constructor(props: OverlayProps) {
        super(props);
        //Overlay properties
        this.readProperties(props, true);
        //Let's write the properties into the DOM
        this.render(true);
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);
        if (this.visible.value) {
            if (!this.element) {
                console.log('criando native');
                this.element = document.createElement('mat-overlay');
                this.parent?.element?.appendChild(this.element);
                this.element.onclick = (ev) => this.handleClick(ev);
            }
        } else {
            if (this.element) this.parent?.element?.removeChild(this.element!);
            this.element?.remove();
            //todo nao esta removendo
            this.element = undefined;
            return;
        }
        //Div
        let divClass = 'mud-overlay';
        if (this.absolute) divClass += ' mud-overlay-absolute';
        //todo add z-index
        this.setClassAndStyle(divClass, true);

        //Background Div
        let backgroundDivClass = 'mud-overlay-scrim';
        if (this.darkBackground) backgroundDivClass += ' mud-overlay-dark';
        if (this.lightBackground) backgroundDivClass += ' mud-overlay-light';
        if (this.darkBackground || this.lightBackground) {
            if (!this.backGroundDiv) this.backGroundDiv = new Div({parent: this, className: backgroundDivClass});
            this.backGroundDiv.className.value = backgroundDivClass;
        } else this.backGroundDiv = this.backGroundDiv?.delete();

        //ChildContent Div
        if (this.childContent.value) {
            if (!this.childContentDiv) this.childContentDiv = new Div({parent: this, className: 'mud-overlay-content'});
            this.childContentDiv.innerHTML = this.childContent.value.element
        } else this.childContentDiv = this.childContentDiv?.delete();
    }

    protected handleClick(ev: MouseEvent): void {
        ev.stopPropagation();
        if (this.autoClose) this.visible.value = false;
        this.onClick.emit(ev);
    }
}

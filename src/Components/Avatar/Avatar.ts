import type {AvatarProps} from './AvatarProps';
import {Component, Image, component, Property} from "@lab1/core";
import {Color, MaterialComponent, Size, Variant} from "../../MaterialExports"

@component
export class Avatar extends MaterialComponent implements AvatarProps {

    //region properties
    readonly elevation = new Property<number>(this, 0);
    readonly square = new Property<boolean>(this, false);
    readonly rounded = new Property<boolean>(this, false);
    readonly image = new Property<string | undefined>(this, undefined);
    readonly alt = new Property<string | undefined>(this, undefined);
    readonly color = new Property<Color>(this, Color.Default);
    readonly size = new Property<Size>(this, Size.Medium);
    readonly variant = new Property<Variant>(this, Variant.Filled);
    readonly text = new Property<string | undefined>(this, undefined);
    readonly childContent = new Property<any>(this, undefined);
    //endregion

    //region DOM nodes and others
    private imgItem?: Image
    //endregion

    constructor(props: AvatarProps) {
        super({...{element: document.createElement('mat-avatar')}, ...props});
        this.readProperties(props, true);
        this.render(true);
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);
        this.element!.innerHTML = '';
        if (this.text.value && this.childContent.value) console.warn('(Avatar)using label and childContent is not allowed');
        //Div
        let divClass = 'mud-avatar';
        divClass += ` mud-avatar-${this.size}`;
        if (this.rounded.value) divClass += ' mud-avatar-rounded';
        if (this.square.value) divClass += ' mud-avatar-square';
        divClass += ` mud-avatar-${this.variant}`;
        divClass += ` mud-avatar-${this.variant}-${this.color}`;
        divClass += ` mud-elevation-${this.elevation}`;
        this.setClassAndStyle(divClass, true);

        if (this.image.value) {
            if (!this.imgItem) this.imgItem = new Image({parent: this});
            this.imgItem.src = this.image.value;
            this.imgItem.alt = this.alt.value;
            this.imgItem.className.value = 'mud-avatar-img';
        } else this.image.value = this.imgItem?.delete();
        if (this.text.value) this.element!.innerText = this.text.value;
        //todo improve
        else if (this.childContent.value && (this.childContent.value instanceof Component)) this.childContent.value.parent = this;
    }
}

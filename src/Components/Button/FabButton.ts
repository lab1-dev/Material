import {component, Property, Span} from "@lab1/core"
import {BaseButton, Color, Size, Icon} from "../../MaterialExports";
import type {FabButtonProps} from "./FabButtonProps";

@component
export class FabButton extends BaseButton implements FabButtonProps {

    //region properties
    readonly color = new Property<Color>(this, Color.Default);
    readonly size = new Property<Size>(this, Size.Large);
    readonly startIcon = new Property<string | undefined>(this, undefined);
    readonly endIcon = new Property<string | undefined>(this, undefined);
    readonly iconColor = new Property<Color>(this, Color.Inherit);
    readonly iconSize = new Property<Size>(this, Size.Medium);
    readonly text = new Property<string | undefined>(this, undefined);
    //endregion

    constructor(props: FabButtonProps) {
        super({...{element: document.createElement('mat-fab-button')}, ...props});
        this.readBaseButtonProps(props);
        this.readProperties(props, true);
        this.render(true);
        this.wireBaseButtonEvents();
    }

    public render(firstRender: boolean = false) {
        super.render(firstRender);
        this.element!.innerHTML = ''

        //Element
        let elementClass = 'mud-button-root mud-fab';
        if (this.text.value != undefined && this.text.value.length > 0) elementClass += ' mud-fab-extended';
        elementClass += ` mud-fab-${this.color}`;
        elementClass += ` mud-fab-size-${this.size}`;
        if (!this.disableRipple.value && !this.disabled.value) elementClass += ` mud-ripple`;
        if (this.disableElevation.value) elementClass += ' mud-fab-disable-elevation';
        this.setClassAndStyle(elementClass, true);
        this.element!.setAttribute('disabled', this.disabled.value ? 'true' : 'false');
        this.element!.setAttribute('type', this.buttonType);

        //Icons
        if (this.startIcon.value != undefined) this.buildInnerSpanAndIcon(`mud-fab-label`, this.startIcon.value, true, this.endIcon.value != undefined);
        if (this.endIcon.value != undefined) this.buildInnerSpanAndIcon(`mud-fab-label`, this.endIcon.value, false, this.startIcon.value != undefined);
    }

    protected buildInnerSpanAndIcon(spanClass: string, iconContent: string, isStartIcon: boolean, usesBothIcons: boolean): void {
        let innerSpan = new Span({parent: this, className: spanClass})
        innerSpan.element!.style.position = 'static';
        innerSpan.element!.style.whiteSpace = 'nowrap'//to avoid line breaks when text contains spaces
        if (!isStartIcon && this.text.value && !usesBothIcons) innerSpan.element!.append(this.text.value);
        let icon = new Icon({parent: innerSpan, icon: iconContent, color: this.iconColor, size: this.iconSize});
        if (isStartIcon && this.text.value) innerSpan.element!.appendChild(document.createTextNode(this.text.value));
    }
}

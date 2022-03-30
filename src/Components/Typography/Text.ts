import {ElementHelper, component, Property} from "@lab1/core";
import type {TextProps} from "./TextProps";
import {MaterialAlign, Color, MaterialComponent, Typo} from "../../MaterialExports";

@component
export class Text extends MaterialComponent implements TextProps {

    //region properties
    readonly childContent = new Property<any>(this, undefined);
    readonly disabled = new Property<boolean>(this, false);
    readonly align = new Property<MaterialAlign>(this, MaterialAlign.Inherit);
    readonly typo = new Property<Typo>(this, Typo.body1);
    readonly color = new Property<Color>(this, Color.Inherit);
    readonly gutterBottom = new Property<boolean>(this, false);
    readonly inline = new Property<boolean>(this, false);
    //endregion

    constructor(props: TextProps) {
        super({...{element: document.createElement('span')}, ...props});
        this.readProperties(props, true);
        this.render(true);
    }

    public render(firstRender: boolean = false) {//full rebuild since User can change typo
        super.render(firstRender);
        let element: HTMLElement;
        switch (this.typo.value) {
            case Typo.h1:
                element = document.createElement('h1');
                break;
            case Typo.h2:
                element = document.createElement('h2');
                break;
            case Typo.h3:
                element = document.createElement('h3');
                break;
            case Typo.h4:
                element = document.createElement('h4');
                break;
            case Typo.h5:
                element = document.createElement('h5');
                break;
            case Typo.h6:
                element = document.createElement('h6');
                break;
            case Typo.subtitle1:
                element = document.createElement('h6');
                break;
            case Typo.subtitle2:
                element = document.createElement('h6');
                break;
            case Typo.body1:
                element = document.createElement('p');
                break;
            case Typo.body2:
                element = document.createElement('p');
                break;
            case Typo.button:
                element = document.createElement('span');
                break;
            case Typo.caption:
                element = document.createElement('span');
                break;
            case Typo.overline:
                element = document.createElement('span');
                break;
            case Typo.inherit:
                element = document.createElement('span');
                break;
        }
        //let's get the current style (if any) and apply to element
        let currentStyleText = this.element ? this.element.style.cssText : '';
        this.element?.replaceWith(element);
        this.element = element;
        this.element.style.cssText = currentStyleText;
        this.element.style.visibility = this.visible.value ? 'visible' : 'hidden';

        //Class
        let className = 'mud-typography';
        className += ` mud-typography-${Typo[this.typo.value]}`
        className += ` mud-${this.color}-text`
        if (this.gutterBottom.value) className += ` mud-typography-gutterbottom`;
        if (this.align.value != MaterialAlign.Inherit) className += ` mud-typography-align-${this.align}`;
        if (this.className.value) className += ` ${this.className}`;
        this.setClassAndStyle(className, true);

        if (this.tabIndex.value != undefined) this.element!.tabIndex = this.tabIndex.value;
        ElementHelper.toggleAttribute(this.element!, 'disabled', this.disabled.value);

        //ChildContent
        this.element!.innerHTML = this.childContent.value;
    }
}

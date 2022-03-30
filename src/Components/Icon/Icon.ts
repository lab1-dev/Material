import type {IconProps} from './IconProps';
import {Component,  component, Property, StringHelper} from "@lab1/core";
import {Color, MaterialComponent, Size} from "../../MaterialExports";

@component
export class Icon extends MaterialComponent implements IconProps {

    //region icon
    readonly icon = new Property<string | undefined>(this, undefined);
    readonly title = new Property<string | undefined>(this, undefined);
    readonly size = new Property<Size>(this, Size.Medium);
    readonly color = new Property<Color>(this, Color.Inherit);
    readonly style:Property<string | undefined> = new Property<string | undefined>(this, '', {
        customGetter: () => {
            if (this.isUsingSVG()) return this.svgElement?.style.cssText ?? '';
            else return this.element?.style.cssText ?? '';
        },
        customSetter: (value) => {
            this.style._value = value;
            if (this.isUsingSVG()) this.svgElement!.style.cssText = value ?? '';
            else this.element!.style.cssText = value ?? '';
        }
    });
    //endregion
    //region viewBox
    private _viewBox: string = "0 0 24 24"
    get viewBox(): string {
        return this._viewBox;
    }
    set viewBox(value: string) {
        if (this._viewBox === value) return;
        this._viewBox = value;
        this.render();
    }
    //endregion
    //region focusable
    private _focusable = false
    get focusable(): boolean {
        return this._focusable;
    }
    set focusable(value: boolean) {
        if (this._focusable === value) return;
        this._focusable = value;
        this.render();
    }
    //endregion
    //region addCommonClass
    private _addCommonClass = true;
    get addCommonClass(): boolean {
        return this._addCommonClass;
    }
    set addCommonClass(value: boolean) {
        this._addCommonClass = value;
        this.render();
    }
    //endregion
    //#region parentComponent
    get parent(): Component | undefined {
        return this._parent;
    }
    set parent(value: Component | undefined) {
        //if(this._parentItem===value)return;
        this._parent = value;
        this.clear();
        this.render();
    }
    //#endregion

    //region DOM nodes and others
    svgElement?: SVGElement
    //endregion

    constructor(props: IconProps) {
        super(props);
        //Icon properties
        this.readProperties(props, true);

        //Icon properties
        if (props.viewBox != undefined) this._viewBox = props.viewBox;
        if (props.focusable != undefined) this._focusable = props.focusable;
        if (props.addCommonClass != undefined) this._addCommonClass = props.addCommonClass;

        //Let's write the properties into the DOM
        this.render(true);
    }

    public render(firstRender: boolean = false) {
        super.render(firstRender);
        if (this.isUsingSVG()) this.buildSVG();
        else this.buildFontIcon();
    }

    protected buildSVG() {//using SVG node
        this.element?.remove();//not using native element for SVG. Using svgElement instead
        if (!this.parent) return;
        if (!this.svgElement) {
            this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
            if (this.id == 'radio') {
                //console.log('dentro do radio')
                //console.log(this.par)
            }
            this.parent?.element?.appendChild(this.svgElement);
        }
        //SVG node
        let svgClass = this.buildClassName();
        this.svgElement.setAttribute('focusable', this.focusable ? 'true' : 'false');
        this.svgElement.setAttribute('viewBox', this.viewBox);
        this.svgElement.setAttribute('aria-hidden', 'true');
        if (this.icon.value != undefined) this.svgElement!.innerHTML = this.icon.value;
        if (this.className.value) svgClass += ' ' + this.className.value;
        this.svgElement.setAttribute('class', svgClass);
    }

    protected buildFontIcon() {//using fontawesome (not svg node)
        this.svgElement?.remove();//not using svg
        if (!this.element) {
            this.element = document.createElement('span') as HTMLSpanElement;
            this.parent?.element?.appendChild(this.element);
        }
        //Span node
        let spanClass = this.buildClassName();
        spanClass += ` ${this.icon}`;
        this.setClassAndStyle(spanClass, true);
        if (this.title.value) this.element.setAttribute('title', this.title.value)
        if (this.tabIndex) this.element.tabIndex = this.tabIndex.value??0;
    }

    protected buildClassName() {
        let className = '';
        if (this.addCommonClass) {
            className += 'mud-icon-root';
            if (this.color.value == Color.Default) className += ' mud-icon-default';
            else className += ` mud-${this.color}-text`;
            if (!StringHelper.isNullOrEmpty(this.icon.value) && this.icon.value!.trim().startsWith(("<"))) className += ' mud-svg-icon';
            className += ` mud-icon-size-${this.size}`;
        }
        return className;
    }

    protected isUsingSVG(): boolean {
        if (!StringHelper.isNullOrEmpty(this.icon.value) && this.icon.value!.trim().startsWith('<')) return true;
        return false;
    }

    protected clear() {
        this.element?.remove();
        this.svgElement?.remove();
        delete this.svgElement;
    }
}

import {ElementHelper, Component, component, Property, Span} from "@lab1/core";
import {BaseButton, Icon,Color, Size, Variant} from "../../MaterialExports";
import type {ButtonProps} from "./ButtonProps";

//todo nao funciona o vma-button.
// class VMatButton extends HTMLButtonElement {
//     constructor() {
//         super();
//     }
// }
// customElements.define('mat-button', VMatButton, { extends: 'button' });

@component
export class Button extends BaseButton implements ButtonProps {

    //region properties
    readonly size = new Property<Size>(this,Size.Medium);
    readonly fullWidth = new Property<boolean>(this,false);
    readonly variant = new Property<Variant>(this,Variant.Text);
    readonly color = new Property<Color>(this,Color.Default);
    readonly text = new Property<string|undefined>(this,'');
    readonly startIcon = new Property<string|undefined>(this,undefined);
    readonly endIcon = new Property<string|undefined>(this,undefined);
    readonly iconColor = new Property<Color>(this,Color.Inherit);
    readonly iconClass = new Property<string|undefined>(this,'');
    readonly childContent = new Property<any>(this, undefined);
    //endregion

    //#region DOM nodes, events and others
    private span!: Span
    private startIconSpan?:Span
    private endIconSpan?:Span
    //#endregion

    constructor(props: ButtonProps) {
        super({...{element: document.createElement('button')}, ...props});
        this.readBaseButtonProps(props);
        this.readProperties(props,true);
        this.render(true);
        this.wireBaseButtonEvents();
        //console.log('button created');
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);
        this.element!.innerHTML = ''

        //Button
        this.element!.setAttribute('type', this.buttonType);
        ElementHelper.toggleAttribute(this.element!, 'disabled', this.disabled.value);
        let btnClass = "mud-button-root mud-button";
        if (this.disableElevation.value) btnClass += ` mud-button-disable-elevation`;
        btnClass += ` mud-button-${this.variant}`;
        btnClass += ` mud-button-${this.variant}-${this.color}`;
        btnClass += ` mud-button-${this.variant}-size-${this.size}`;
        if(this.fullWidth.value)btnClass+=' mud-width-full';
        if (!this.disableRipple.value) btnClass += ` mud-ripple`;
        this.setClassAndStyle(btnClass, true);

        //Span node
        this.span = new Span({parent: this, className: 'mud-button-label'});
        this.span.buildChild({holder: 'startIconSpan',builderFunction: ()=>this.buildStartIcon(),condition:this.startIcon.value!=undefined});
        if ((this.startIcon.value|| this.endIcon.value )&& this.text.value) this.span.element?.append(this.text.value);
        this.span.buildChild({holder: 'endIconSpan',builderFunction: ()=>this.buildEndIcon(),condition:this.endIcon.value!=undefined});
        if(!this.startIconSpan && !this.endIconSpan)this.span.element!.innerText = this.text.value??'';

        //ChildContent
        this.setChildContent(this.childContent.value);
    }

    protected buildStartIcon():Component{
        if(!this.startIconSpan){
            this.startIconSpan = new Span({});
            new Icon({parent: this.startIconSpan, icon: this.startIcon, color: this.iconColor});
        }
        this.startIconSpan.className.value=`mud-button-icon-start mud-button-icon-size-${this.size}`;
        return this.startIconSpan;
    }

    protected buildEndIcon():Component{
        if(!this.endIconSpan){
            this.endIconSpan = new Span({});
            new Icon({parent: this.endIconSpan, icon: this.endIcon, color: this.iconColor});
        }
        this.endIconSpan.className.value=`mud-button-icon-end mud-button-icon-size-${this.size}`;
        return this.endIconSpan;
    }
}


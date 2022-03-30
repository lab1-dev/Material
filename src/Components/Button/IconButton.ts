import {ElementHelper, component, Property, Span} from "@lab1/core";
import {BaseButton, Color, Size, Edge, Variant,Icon,Text, Typo} from "../../MaterialExports";
import type {IconButtonProps} from "./IconButtonProps";

@component
export class IconButton extends BaseButton implements IconButtonProps{

    //region properties
    readonly icon = new Property<string|undefined>(this,undefined);
    readonly title = new Property<string|undefined>(this,undefined);
    readonly color = new Property<Color>(this,Color.Default);
    readonly size = new Property<Size>(this,Size.Medium);
    readonly edge = new Property<Edge|undefined>(this,undefined);
    readonly variant = new Property<Variant>(this,Variant.Text);
    readonly label = new Property<string|undefined>(this,undefined);
    readonly childContent = new Property<any>(this, undefined);
    //endregion

    //region DOM nodes and others
    private get asButton():boolean{
        return this.variant.value!=Variant.Text;
    }
    private spanItem?:Span;
    private iconItem?:Icon;
    private textItem?:Text;
    //endregion

    constructor(props:IconButtonProps) {
        super({...{element: document.createElement('button')}, ...props});
        this.readBaseButtonProps(props);
        this.readProperties(props,true);
        this.render(true);
        this.wireBaseButtonEvents();
    }

    public render(firstRender:boolean=false): void {
        super.render(firstRender);
        //Button
        let btnClass='mud-button-root mud-icon-button';
        if(this.asButton)btnClass+=' mud-button';
        if(!this.asButton && this.color.value!=Color.Default)btnClass+=` mud-icon-button-color-${this.color}`;
        if(this.asButton)btnClass+=` mud-button-${this.variant}`;
        if(this.asButton)btnClass+=` mud-button-${this.variant}-${this.color}`;
        if(this.asButton)btnClass+=` mud-button-${this.variant}-size-${this.size}`;
        if(!this.disableRipple.value)btnClass+=' mud-ripple';
        if(!this.disableRipple.value && !this.asButton)btnClass+=' mud-ripple-icon';
        if(this.size.value!=Size.Medium)btnClass+=` mud-icon-button-size-${this.size}`;
        if(this.edge.value!=Edge.False)btnClass+=` mud-icon-button-edge-${this.edge}`;
        if(this.disableElevation.value)btnClass+=' mud-button-disable-elevation';
        this.setClassAndStyle(btnClass,true);
        this.element!.setAttribute('type',this.buttonType);
        ElementHelper.toggleAttribute(this.element!,'disabled',this.disabled.value);

        if(this.icon.value){
            this.textItem=this.textItem?.delete();
            if(!this.spanItem){
                this.spanItem=new Span({parent:this});
                this.iconItem=new Icon({parent:this.spanItem,icon:this.icon, size:this.size, title:this.title});
            }
            this.spanItem.className.value='mud-icon-button-label';
        }else {
            this.spanItem=this.spanItem?.delete();
            if(!this.textItem)this.textItem=new Text({parent:this, typo:Typo.body2, color:Color.Inherit});
            this.textItem.childContent.value=this.label.value??'';
        }
    }
}

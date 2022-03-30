import {component, Component, Property, Signal, Span, Input, Lab1, IComponent} from "@lab1/core";
import {Color, Icon, Material, MaterialComponent, Rating, Size} from "../../MaterialExports";
import type {RatingItemProps} from "./RatingItemProps";

@component
export class RatingItem extends MaterialComponent implements RatingItemProps{

    //region properties
    readonly itemValue= new Property<number>(this, 0);
    readonly size = new Property<Size>(this, Size.Medium);
    readonly color = new Property<Color>(this, Color.Default);
    readonly disableRipple = new Property<boolean>(this, false);
    readonly disabled = new Property<boolean>(this, false);
    readonly readOnly= new Property<boolean>(this, false);
    //endregion

    //region Events and others
    readonly onItemClick = new Signal<(value:number) => void>();
    readonly onItemHover = new Signal<(value:number|undefined) => void>();
    protected isActive=false;
    rating?:Rating//manually set by Rating
    protected itemIcon?:string
    readOnlySpan?:Span
    readOnlyIcon?:Icon
    span?:Span
    input?:Input<number>
    icon?:Icon
    protected get isChecked():boolean{
        return this.itemValue.value==this.rating?.selectedValue.value;
    }
    //endregion

    constructor(props:RatingItemProps) {
        super(props);
        this.readProperties(props,true);
        if(this.parent instanceof Rating)this.rating=this.parent
        this.render(true);
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);
        if(this.rating==undefined)return;

        this.itemIcon=this.selectIcon();
        let className=this.buildClassName();
        let managedContent;
        if(this.readOnly.value)managedContent=this.buildReadOnly(className);
        else managedContent=this.buildNormal(className);

        this.buildManaged(this,managedContent);
    }

    protected buildClassName():string{
        let className='mud-rating-item';
        if(!this.disableRipple.value)className+=' mud-ripple mud-ripple-icon';
        if(this.color.value==Color.Default)className+=' yellow-text.text-darken-3';
        if(this.color.value!=Color.Default)className+=` mud-${this.color}-text`;
        if(this.isActive)className+=' mud-rating-item-active';
        if(this.disabled.value)className+=' mud-disabled';
        if(this.readOnly.value)className+=' mud-readonly';
        if (this.className.value && this.className.value.length > 0) className += ' ' + this.className.value;
        return className;
    }

    protected buildReadOnly(className:string):IComponent{
        return Lab1.Span({
            className:className,
            style:this.style,
            childContent:Material.Icon({
                icon:this.itemIcon,
                size:this.size
            })
        });
    }

    protected buildNormal(className:string):IComponent{
        return Lab1.Span({
            className:className,
            style:this.style,
            onMouseOver:(ev)=>this.handleMouseOver(),
            onMouseOut:(ev)=>this.handleMouseOut(),
            onClick:(ev)=>this.handleClick(),
            childContent:[
                Lab1.Input<number>({
                    className:'mud-rating-input',
                    type:'radio',
                    tabIndex:-1,
                    value:this.itemValue,
                    name:this.rating?.name,
                    disabled:this.disabled,
                    checked:this.isChecked
                }),
                Material.Icon({
                    icon:this.itemIcon,
                    size:this.size
                })
            ]
        });
    }

    //Logic below====================================================

    //todo esse metodo abaixo deve ficar automatico no Lab1Manager
    public addChildComponent(component:Component):void{
        //console.log('(Chip)addChildItem:',component);
        this.element=component.element;
        this.parent?.addChildComponent(this);
        if (this.parent?.isLayout) this.parent.render();
    }

    protected selectIcon():string|undefined{
        if(this.rating==undefined)return undefined;
        if(this.rating.hoveredValue!=undefined && this.rating.hoveredValue>=this.itemValue.value)return this.rating.fullIcon.value;//// full icon when @RatingItem hovered
        else if(this.rating.selectedValue.value>=this.itemValue.value){
            if(this.rating.hoveredValue!=undefined && this.rating.hoveredValue<this.itemValue.value)return this.rating.emptyIcon.value;//// empty icon when equal or higher RatingItem value clicked, but less value hovered
            else return this.rating.fullIcon.value;// full icon when equal or higher RatingItem value clicked
        }else return this.rating.emptyIcon.value// empty icon when this or higher RatingItem is not clicked and not hovered
    }

    protected handleMouseOut():void{
        if(this.disabled.value || this.rating==undefined)return;
        this.isActive=false;
        this.onItemHover.emit(undefined);
    }

    protected handleMouseOver():void{
        if(this.disabled.value)return;
        this.isActive=true;
        this.onItemHover.emit(this.itemValue.value);
    }

    protected handleClick():void{
        if(this.disabled.value)return;
        this.isActive=false;
        if(this.rating?.selectedValue.value==this.itemValue.value)this.onItemClick.emit(0);
        else this.onItemClick.emit(this.itemValue.value);
    }
}

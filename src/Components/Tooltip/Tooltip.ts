import type {TooltipProps} from './TooltipProps';
import {Color, Material, MaterialComponent, Origin, Placement} from "../../MaterialExports";
import {component, IComponent, Component, Lab1, Property, StringHelper} from '@lab1/core';

@component
export class Tooltip extends MaterialComponent implements TooltipProps{

    //region properties
    readonly rightToLeft = new Property<boolean>(this, false);//todo
    readonly color = new Property<Color>(this, Color.Default);
    readonly text = new Property<string>(this, '');
    readonly arrow = new Property<boolean>(this, false);
    readonly duration = new Property<number>(this, 288);
    readonly delay = new Property<number>(this, 0);
    readonly placement = new Property<Placement>(this, Placement.Bottom);
    readonly childContent = new Property<any>(this, undefined);
    readonly tooltipContent = new Property<any>(this, undefined);
    readonly inline = new Property<boolean>(this, true);
    readonly visible = new Property<boolean>(this, false,{
        customGetter:()=>{
           return this._visible;
        },
        customSetter:(value)=>{
            this._visible=value;
            this.onVisibleChange.emit(value);
            if(!this.holdRender) this.render();
        }
    });
    //endregion

    //region Events and others
    protected _anchorOrigin?:Origin
    protected _transformOrigin?:Origin
    protected containerClassName='';
    protected popoverClassName='';
    protected _visible=false;
    //endregion

    constructor(props:TooltipProps) {
        //super({...{element: document.createElement('mat-card')}, ...props});
        super(props);
        this.readProperties(props,true);
        this.render(true);
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);
        console.log('(Tooltip)render');
        this.buildCss();

        let managedContent=Lab1.Div({
            className:this.containerClassName,
            onMouseEnter:()=>this.handleMouseOver(),
            onMouseLeave:()=>this.handleMouseOut(),
            onFocusOut:()=>this.handleMouseOut(),
            childContent:[
                this.childContent.value,
                this.buildPopover()
            ]
        })

        this.buildManaged(this,managedContent);
    }

    protected buildPopover():IComponent|null{
        if(this.tooltipContent.value!=undefined || (!StringHelper.isNullOrEmpty(this.text.value))){
            return Material.Popover({
                open:this._visible,
                duration:this.duration,
                delay:this.delay,
                anchorOrigin:this._anchorOrigin,
                transformOrigin:this._transformOrigin,
                className:this.popoverClassName,
                paper:false,
                childContent:[
                    this.tooltipContent.value!=undefined?this.tooltipContent.value:(!StringHelper.isNullOrEmpty(this.text.value))?this.text.value:null
                ]
            })
        }else return null;
    }

    protected buildCss():void{
        //containerClassName
        this.containerClassName='mud-tooltip-root';
        if(this.inline.value) this.containerClassName+=' mud-tooltip-inline';

        //popoverClassName
        this.popoverClassName='mud-tooltip';
        if(this.color.value==Color.Default)this.popoverClassName+=' mud-tooltip-default';
        this.popoverClassName+=` mud-tooltip-${this.convertPlacement()}`;
        if(this.arrow.value)this.popoverClassName+=' mud-tooltip-arrow';
        if(this.arrow.value && this.color.value!=Color.Default)this.popoverClassName+=` mud-border-${this.color}`;
        if(this.color.value!=Color.Default)this.popoverClassName+=` mud-theme-${this.color}`;
        if(this.tooltipContent.value!=undefined)this.popoverClassName+=' d-block';
        if(!StringHelper.isNullOrEmpty(this.text.value))this.popoverClassName+=' d-flex';
        if (!StringHelper.isNullOrEmpty(this.className.value)) this.popoverClassName += ` ${this.className.value}`;
        if(this.id=='tooltipBottom'){
            console.log('class:',this.popoverClassName)
            console.log('AnchorOrigim:',this._anchorOrigin)
            console.log('TransformOrigim:',this._transformOrigin)
        }
    }

    protected convertPlacement():Origin{
        if(this.placement.value==Placement.Bottom){
            this._anchorOrigin=Origin.BottomCenter;
            this._transformOrigin=Origin.TopCenter
            return Origin.BottomCenter;
        }else if(this.placement.value==Placement.Top){
            this._anchorOrigin=Origin.TopCenter;
            this._transformOrigin=Origin.BottomCenter;
            return Origin.TopCenter;
        }else if((this.placement.value==Placement.Left || this.placement.value==Placement.Start && !this.rightToLeft.value) || (this.placement.value==Placement.End && this.rightToLeft.value)){
            this._anchorOrigin=Origin.CenterLeft;
            this._transformOrigin=Origin.CenterRight;
            return Origin.CenterLeft;
        }else if((this.placement.value==Placement.Right || this.placement.value==Placement.End &&!this.rightToLeft.value)|| (this.placement.value==Placement.Start && this.rightToLeft.value)){
            this._anchorOrigin=Origin.CenterRight;
            this._transformOrigin=Origin.CenterLeft;
            return Origin.CenterRight;
        }else return Origin.BottomCenter;
    }

    protected handleMouseOver():void{
        console.log('showing');
        this.visible.value=true;
    }

    protected handleMouseOut():void{
        console.log('hiding');
        this.visible.value=false;
    }

    //todo remove this method. This should be done automatically by Lab1Manager
    public addChildComponent(component:Component):void{
        //console.log('(Chip)addChildItem:',component);
        this.element=component.element;
        this.parent?.addChildComponent(this);
        if (this.parent?.isLayout) this.parent.render();
    }
}

import {component, IComponent, Component, Lab1, Property, Signal, StringHelper} from "@lab1/core"
import type {BadgeProps} from "./BadgeProps";
import {Color, Material, MaterialComponent, Origin} from "../../MaterialExports";

@component
export class Badge extends MaterialComponent implements BadgeProps {

    //region properties
    readonly childContent = new Property<any>(this, undefined);
    readonly origin = new Property<Origin>(this, Origin.TopRight);
    readonly elevation = new Property<number>(this, 0);
    readonly color = new Property<Color>(this, Color.Default);
    readonly dot = new Property<boolean>(this, false);
    readonly overlap = new Property<boolean>(this, false);
    readonly bordered = new Property<boolean>(this, false);
    readonly icon = new Property<string | undefined>(this, undefined);
    readonly max = new Property<number>(this, 99);
    readonly content = new Property<any>(this, undefined);
    readonly badgeClass = new Property<string | undefined>(this, undefined);
    readonly visible = new Property<boolean>(this, true);
    //endregion

    //region Events and others
    readonly onClick = new Signal<(ev: MouseEvent) => void>();
    protected _content?:string
    protected wrapperClassName='';
    protected badgeClassName='';
    protected spanClassName='';
    //endregion

    constructor(props: BadgeProps) {
        super(props);
        this.readProperties(props,true);
        this.render(true);
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);

        this.buildCss();
        this.buildBadgeContent();

        let managedContent=Lab1.Span({
            className:this.spanClassName,
            style:this.style,
            childContent:[
                this.childContent.value,
                this.visible.value?this.buildWrapperSpan():null
            ]
        });

        this.buildManaged(this,managedContent);
    }

    protected buildBadgeContent():void{
        if(typeof this.content.value==='string')this._content=this.content.value;
        else if(typeof this.content.value==='number'){
            if(this.content.value>this.max.value)this._content=this.max.value+'+';
            else this._content=this.content.value.toString();
        }else this._content=undefined;
    }

    protected buildWrapperSpan():IComponent{
        return Lab1.Span({
            className:this.wrapperClassName,
            childContent: Lab1.Span({
               className:this.badgeClassName,
               onClick:(ev)=>this.onClick.emit(ev),
               childContent: (!this.dot.value)?this.buildBadgeIcon() :null
            })
        });
    }

    protected buildBadgeIcon():any{
        if(!StringHelper.isNullOrEmpty(this.icon.value)){
            return Material.Icon({
                icon:this.icon,
                className:'mud-icon-badge'
            });
        }else return this._content;
    }

    protected buildCss():void{
        //spanClassName
        this.spanClassName='mud-badge-root';
        if (!StringHelper.isNullOrEmpty(this.className.value)) this.spanClassName += ` ${this.className.value}`;

        //wrapperClassName
        this.wrapperClassName='mud-badge-wrapper';
        this.wrapperClassName+=` mud-badge-${StringHelper.replace(this.origin.value,'-',' ')}`;

        //badgeClassName
        this.badgeClassName='mud-badge';
        if(this.dot.value)this.badgeClassName+=' mud-badge-dot';
        if(this.bordered.value)this.badgeClassName+=' mud-badge-bordered';
        if(!StringHelper.isNullOrEmpty(this.icon.value) && !this.dot.value)this.badgeClassName+=' mud-badge-icon';
        this.badgeClassName+=` mud-badge-${StringHelper.replace(this.origin.value,'-',' ')}`;
        this.badgeClassName+=` mud-elevation-${this.elevation}`;
        if(this.color.value!=Color.Default)this.badgeClassName+=` mud-theme-${this.color}`;
        if(this.color.value==Color.Default)this.badgeClassName+=' mud-badge-default';
        if(this.overlap.value)this.badgeClassName+=' mud-badge-overlap';
        if (!StringHelper.isNullOrEmpty(this.badgeClass.value)) this.badgeClassName += ' ' + this.badgeClass.value;
    }

    //todo remove this method. This should be done automatically by Lab1Manager
    public addChildComponent(component:Component):void{
        //console.log('(Chip)addChildItem:',component);
        this.element=component.element;
        this.parent?.addChildComponent(this);
        if (this.parent?.isLayout) this.parent.render();
    }
}

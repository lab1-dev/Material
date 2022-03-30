import { component, Property, Signal, NumberHelper} from "@lab1/core"
import type {PopoverProps} from "./PopoverProps";
import {Direction, Origin, OverflowBehavior, StyleBuilder, PopoverService, MaterialComponent} from "../../MaterialExports";
import {container} from "tsyringe";

//Different from Dialog, Popover prerenders its'content even when not displayed to the User.
@component
export class Popover extends MaterialComponent implements PopoverProps{

    //region properties
    readonly paper = new Property<boolean>(this, true);
    readonly elevation = new Property<number>(this, 8);
    readonly square = new Property<boolean>(this, false);
    readonly open = new Property<boolean>(this, false);
    readonly fixed = new Property<boolean>(this, false);
    readonly duration = new Property<number>(this, 251);
    readonly delay = new Property<number>(this, 0);
    readonly anchorOrigin = new Property<Origin>(this, Origin.TopLeft);
    readonly transformOrigin = new Property<Origin>(this, Origin.TopLeft);
    readonly overflowBehavior = new Property<OverflowBehavior>(this, OverflowBehavior.FlipOnOpen);
    readonly relativeWidth = new Property<boolean>(this, false);
    readonly childContent = new Property<any>(this, undefined);
    //endregion

    //region DOM nodes and others
    private rightToLeft=false;//todo
    readonly onContextMenu = new Signal<(ev:MouseEvent) => void>();
    popoverService = container.resolve(PopoverService);
    handleID:string
    fakeDiv:any
    connectExecuted=false;
    //endregion

    constructor(props:PopoverProps /*protected popoverService:PopoverService*/) {
        super({...{element:document.createElement('div')}, ...props});
        this.readProperties(props,true);
        //Events
        this.element!.oncontextmenu=(ev)=>this.onContextMenu.emit(ev);

        //Let's add the popover into popover provider div
        this.handleID= this.popoverService.register(this);

        //let's add the popover- It will be the childcontent of the Popover
        let div=document.createElement('div');
        div.id=`popover-${this.handleID}`;
        div.className='mud-popover-cascading-value';
        this.parent?.element!.appendChild(div);
        this.fakeDiv=div;

        //let's run MudPopover connect
         if(this.parent&& this.parent.element) {
             this.popoverService.connect(this.handleID);
             this.connectExecuted=true;
         }

        //Let's write the properties into the DOM
        this.render(true);
    }

    public render(firstRender:boolean=false): void {//renders the popover content div inside popover-container div
        super.render(firstRender);
        console.log('popover maxHeight:',this.maxHeight.value,NumberHelper.toPixel(this.maxHeight.value))
        //console.log('popover render. Is Open:',this.open.value, '.ConnectExecuted:',this.connectExecuted,'.ParentItem:',this.parent?.completeID);
        if(this.parent&& this.parent.element && !this.connectExecuted){
            this.popoverService.connect(this.handleID);
            this.connectExecuted=true;
        }
        //let's clear the old popover first
        //if(this.handleID) this.popoverService.unregister(this.handleID);

        //Div
        let popoverClass='mud-popover';
        //popoverClass+=' white'//bruno hack pq o background do ComponentBase.ts está como undefined.
        if(this.fixed.value)popoverClass+=' mud-popover-fixed';
        if(this.open.value)popoverClass+='  mud-popover-open';
        popoverClass+=` mud-popover-${this.transformOrigin}`;
        popoverClass+=` mud-popover-anchor-${this.anchorOrigin}`;
        popoverClass+=` mud-popover-overflow-${this.overflowBehavior}`;
        if(this.relativeWidth.value)popoverClass+=' mud-popover-relative-width';
        if(this.paper.value)popoverClass+=' mud-paper';
        if(this.paper.value&&this.square.value)popoverClass+=' mud-paper-square';
        if(this.paper.value)popoverClass+=` mud-elevation-${this.elevation}`;
        if(this.maxHeight.value!=undefined)popoverClass+=' overflow-y-auto';
        let popoverStyles=new StyleBuilder()
            .addStyle('transition-duration',`${this.duration}ms`)
            .addStyle('transition-delay',`${this.delay}ms`)
            .addStyleWhen('max-height',NumberHelper.toPixel(this.maxHeight.value),this.maxHeight.value!=undefined)
            .addStyleString(this.style.value)
            .build();
        this.setClassAndStyle(popoverClass,false,popoverStyles);

        //ChildContent
        this.setChildContent(this.childContent.value);
    }

    protected convertDirection(direction:Direction):Direction{
        switch(direction){
            case Direction.Start:
                if(this.rightToLeft)return Direction.Right
                else return Direction.Left;
            case Direction.End:
                if(this.rightToLeft)return Direction.Left;
                else return Direction.Right;
        }
        return direction;
    }
}

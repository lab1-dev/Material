import {component, Component, Property, Signal, StringHelper} from "@lab1/core";
import {ListItem, Menu} from "../../MaterialExports";
import type {MenuItemProps} from "./MenuItemProps";

@component
export class MenuItem extends Component implements MenuItemProps{

    //region properties
    readonly text = new Property<string | undefined>(this, undefined);
    readonly disabled = new Property<boolean>(this, false);
    readonly link = new Property<string | undefined>(this, undefined);
    readonly target = new Property<string | undefined>(this, undefined);
    readonly forceLoad = new Property<boolean>(this, false);
    //endregion

    //region Events and others
    readonly onClick = new Signal<(ev:MouseEvent) => void>();
    menu?:Menu
    listItem:ListItem
    //endregion

    constructor(props:MenuItemProps) {
        super(props);
        this.readProperties(props,true);
        this.listItem=new ListItem({
            disabled:this.disabled,
            className:this.className,
            style:this.style,
            text:this.text,
            //onClick:(ev)=>this.handleClick(ev)
        });
        this.listItem.onClick.connect((ev)=>this.handleClick(ev));
        this.element=this.listItem.element;
        this.render(true);
    }

    public render(firstRender:boolean=false): void {
        super.render(firstRender);
        if(!this.menu)return;
    }

    protected handleClick(ev: MouseEvent):void {
        //super.handleClick(ev);
        console.log('(MenuItem)handleClick')
        if(this.disabled.value)return;
        if(!this.menu)return console.warn('menu not set');
        this.menu?.closeMenu();
        if(this.link.value){
            if(StringHelper.isNullOrWhiteSpace(this.target.value))window.open(this.link.value,'_self');
            else window.open(this.link.value,this.target.value);
        }else this.onClick.emit(ev);
    }
}

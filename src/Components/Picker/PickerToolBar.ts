import {component, Component, Property} from "@lab1/core";
import type {PickerToolBarProps} from "./PickerToolBarProps";
import {Orientation,Color,ToolBar, ToolBarProps} from "../../MaterialExports";

//no mud, nao extende componentbase
@component
export class PickerToolBar extends Component implements PickerToolBarProps{

    //region properties
    readonly disableToolBar = new Property<boolean>(this, false);
    readonly orientation = new Property<Orientation>(this, Orientation.Portrait);
    readonly color = new Property<Color>(this, Color.Inherit);
    readonly items = new Property<Component[]>(this, []);
    //endregion

    //region DOM nodes and others
    toolBar?:ToolBar
    //endregion

    constructor(props:PickerToolBarProps) {
        super(props);
        //PickerToolBar properties
        this.readProperties(props,true);
        //Let's write the properties into the DOM
        this.render(true);
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);
        this.removeChildComponents();

        //ToolBar
        if(!this.disableToolBar.value){
            let className='mud-picker-toolbar';
            className+=` mud-theme-${this.color}`;
            if(this.orientation.value==Orientation.Landscape)className+=` mud-picker-toolbar-landscape`;
            this.toolBar=new ToolBar({
                parent:this.parent,
                className:className,
                style:this.style,
                childContent:this.items
            });
            this.element=this.toolBar.element;
        }else this.toolBar=this.toolBar?.delete();
    }
}

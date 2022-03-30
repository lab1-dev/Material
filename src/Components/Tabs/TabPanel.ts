import {Component, component, Property, Signal} from "@lab1/core";
import type {TabPanelProps} from "./TabPanelProps";
import {Color} from "../../MaterialExports";

@component
export class TabPanel extends Component implements TabPanelProps{

    //region properties
    readonly text = new Property<string|undefined>(this, undefined);
    readonly icon = new Property<string|undefined>(this, undefined);
    readonly disabled = new Property<boolean>(this, false);
    readonly badgeData = new Property<any>(this, undefined);
    readonly badgeDot = new Property<boolean>(this, false);
    readonly badgeColor = new Property<Color>(this, Color.Primary);
    readonly toolTip = new Property<string|undefined>(this, undefined);
    //endregion

    //region DOM nodes, events and others
    _disposed=false;
    panelRef:any
    readonly onClick = new Signal<(ev:MouseEvent) => void>();
    //endregion

    constructor(props: TabPanelProps) {
        super({...{element: document.createElement('div')}, ...props});

        //Tabs properties
        this.readProperties(props,true);

        //Let's write the properties into the DOM
        this.render(true);
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);
    }

    protected onAfterRenderAsync(firstRender:boolean):void{

    }

    protected onInitialized():void{

    }

    protected disposeAsync():void{

    }
}

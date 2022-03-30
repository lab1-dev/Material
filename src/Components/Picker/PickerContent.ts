import {component, Property} from "@lab1/core";
import type {PickerContentProps} from "./PickerContentProps";
import {MaterialComponent} from "../../MaterialExports";

@component
export class PickerContent extends MaterialComponent implements PickerContentProps{

    //region properties
    readonly childContent = new Property<any>(this, undefined);
    //endregion

    constructor(props:PickerContentProps) {
        super({...{element: document.createElement('div')}, ...props});
        //PickerContent properties
        this.readProperties(props,true);
        //Let's write the properties into the DOM
        this.render(true);

        this.element!.onclick=(ev)=>ev.stopPropagation();
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);
        this.removeChildComponents();

        //Div
        let className='mud-picker-content';
        this.setClassAndStyle(className,false);

        //ChildContent
        if(this.childContent.value) this.setChildContent(this.childContent.value);
    }
}

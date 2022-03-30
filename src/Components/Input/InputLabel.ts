import {Component, component, Property} from "@lab1/core";
import type {InputLabelProps} from "./InputLabelProps";
import {Variant, Margin, MaterialComponent} from "../../MaterialExports";

@component
export class InputLabel extends MaterialComponent implements InputLabelProps{

    //region properties
    readonly disabled = new Property<boolean>(this, false);
    readonly error = new Property<boolean>(this, false);
    readonly variant = new Property<Variant>(this, Variant.Text);
    readonly marginType = new Property<Margin>(this, Margin.None);
    readonly label = new Property<string>(this, '');
    //endregion

    constructor(props:InputLabelProps) {
        super({...{element: document.createElement('label')}, ...props});
        //InputLabel properties
        this.readProperties(props,true);
        //Let's write the properties into the DOM
        this.render(true);
    }


    public render(firstRender:boolean=false): void {
        //console.log('(InputLabel)render. Tem erro:', this.error.value);
        super.render(firstRender);

        //Label
        let labelClass='mud-input-label mud-input-label-animated';
        labelClass+=` mud-input-label-${this.variant}`;
        if(this.marginType.value!=Margin.None)labelClass+=` mud-input-label-margin-${this.marginType}`;
        if(this.disabled.value)labelClass+=' mud-disabled';
        if(this.error.value)labelClass+=' mud-input-error';
        this.setClassAndStyle(labelClass,true);

        this.element!.innerText=this.label.value;
    }
}

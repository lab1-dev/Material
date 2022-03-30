import {component, Property, Signal} from "@lab1/core";
import type {SliderProps} from "./SliderProps";
import {Color, MaterialComponent} from "../../MaterialExports";

@component
export class Slider extends MaterialComponent implements SliderProps {

    //region min
    readonly min = new Property<number>(this,0);
    readonly max = new Property<number>(this,100);
    readonly step = new Property<number>(this,1);
    readonly disabled = new Property<boolean>(this,false);
    readonly value = new Property<number>(this,0);
    readonly color = new Property<Color>(this,Color.Primary);
    readonly immediate = new Property<boolean>(this,true);
    //endregion

    //region DOM nodes and others
    protected readonly inputNode = document.createElement('input') as HTMLInputElement;
    readonly onChange = new Signal<(value: number) => void>();
    //endregion

    constructor(props: SliderProps) {
        super({...{element: document.createElement('mat-slider')}, ...props});
        this.element!.appendChild(this.inputNode);
        this.readProperties(props,true);
        this.render(true);

        this.element!.oninput=(ev)=> this.handleChange(ev);
    }


    public render(firstRender:boolean=false): void {
        //Div
        let divClass = 'mud-slider';
        this.setClassAndStyle(divClass, false);

        //Input
        if(this.userAttributes!=undefined)Object.assign(this.inputNode!.attributes, this.userAttributes);
        this.inputNode.className= `mud-slider-${this.color}`;
        this.inputNode.ariaValueNow=this.value.value.toString();
        this.inputNode.ariaValueMin=this.min.toString();
        this.inputNode.ariaValueMax=this.max.toString();
        this.inputNode.setAttribute('role','slider');
        this.inputNode.type='range';
        this.inputNode.min=this.min.toString();
        this.inputNode.max=this.max.toString();
        this.inputNode.step=this.step.toString();
        this.inputNode.disabled=this.disabled.value;
        this.inputNode.value=this.value.value.toString();
    }

    protected handleChange(ev:any):void{
        this.value._value=(ev.target as any).value;
        this.onChange.emit(this.value.value);
    }
}

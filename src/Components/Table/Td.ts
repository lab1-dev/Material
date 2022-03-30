import {Component, component, Property} from "@lab1/core";
import type {TdProps} from "./TdProps";

@component
export class Td extends Component implements TdProps{

    readonly dataLabel= new Property<string|undefined>(this, undefined);

    constructor(props:TdProps) {
        super(props)
        //super({...{element:document.createElement('div')}, ...props});
    }
}

import {Component, component} from "@lab1/core";
import type {TrProps} from "./TrProps";

@component
export class Tr extends Component implements TrProps{

    constructor(props:TrProps) {
        super(props);
        //super({...{element:document.createElement('div')}, ...props});
    }
}

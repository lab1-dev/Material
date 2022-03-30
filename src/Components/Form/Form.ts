import { FormProps } from './FormProps';
import {Component} from "@lab1/core";
import {FormComponent} from "../../MaterialExports";


export class Form extends Component implements FormProps{

    constructor(props:FormProps) {
        super({...{element:document.createElement('form')}, ...props});
    }


    update(formControl:FormComponent<any>):void{

    }
}

import {Component} from "@lab1/core";
import {AlertProps} from "./AlertProps";

export class Alert extends Component implements AlertProps{

    constructor(props:AlertProps) {
        super({...{element:document.createElement('mat-alert') }, ...props});
    }

    public render(firstRender:boolean): void {
    }
}

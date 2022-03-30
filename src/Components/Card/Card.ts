import {Component,  Rectangle} from "@lab1/core"
import {CardProps} from "./CardProps";


function defaultProps(): Partial<CardProps> {
    return {
        element: document.createElement('mat-card') as HTMLButtonElement
    }
}
export class Card extends Rectangle implements CardProps{


    constructor(props:CardProps) {
        super({...defaultProps(), ...props});
    }

}

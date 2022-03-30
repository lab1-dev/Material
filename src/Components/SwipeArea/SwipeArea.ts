import { SwipeAreaProps } from './SwipeAreaProps';
import {Component} from "@lab1/core";


function defaultProps(): Partial<SwipeAreaProps> {
    return {
        element: document.createElement('mat-card') as HTMLDivElement
    }
}
export class SwipeArea extends Component implements SwipeAreaProps{

    constructor(props:SwipeAreaProps) {
        super({...defaultProps(), ...props});
    }

}

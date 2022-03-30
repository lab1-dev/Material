import { HiddenProps } from './HiddenProps';
import {Component} from "@lab1/core";


function defaultProps(): Partial<HiddenProps> {
    return {
        element: document.createElement('mat-card') as HTMLDivElement
    }
}
export class Hidden extends Component implements HiddenProps{

    constructor(props:HiddenProps) {
        super({...defaultProps(), ...props});
    }

}

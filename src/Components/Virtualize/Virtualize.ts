import { VirtualizeProps } from './VirtualizeProps';
import {Component} from "@lab1/core";


function defaultProps(): Partial<VirtualizeProps> {
    return {
        element: document.createElement('mat-card') as HTMLDivElement
    }
}
export class Virtualize extends Component implements VirtualizeProps{

    constructor(props:VirtualizeProps) {
        super({...defaultProps(), ...props});
    }

}

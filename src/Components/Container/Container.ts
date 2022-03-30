import { ContainerProps } from './ContainerProps';
import {Component} from "@lab1/core";


function defaultProps(): Partial<ContainerProps> {
    return {
        element: document.createElement('mat-card') as HTMLDivElement
    }
}
export class Container extends Component implements ContainerProps{

    constructor(props:ContainerProps) {
        super({...defaultProps(), ...props});
    }

}

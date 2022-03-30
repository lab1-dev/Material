import { LinkProps } from './LinkProps';
import {Component} from "@lab1/core";


function defaultProps(): Partial<LinkProps> {
    return {
        element: document.createElement('mat-card') as HTMLDivElement
    }
}
export class Link extends Component implements LinkProps{

    constructor(props:LinkProps) {
        super({...defaultProps(), ...props});
    }

}

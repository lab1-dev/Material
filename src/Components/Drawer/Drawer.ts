import { DrawerProps } from './DrawerProps';
import {Component} from "@lab1/core";


function defaultProps(): Partial<DrawerProps> {
    return {
        element: document.createElement('mat-card') as HTMLDivElement
    }
}
export class Drawer extends Component implements DrawerProps{

    constructor(props:DrawerProps) {
        super({...defaultProps(), ...props});
    }

}

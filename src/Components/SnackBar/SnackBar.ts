import { SnackBarProps } from './SnackBarProps';
import {Component} from "@lab1/core";


function defaultProps(): Partial<SnackBarProps> {
    return {
        element: document.createElement('mat-card') as HTMLDivElement
    }
}
export class SnackBar extends Component implements SnackBarProps{

    constructor(props:SnackBarProps) {
        super({...defaultProps(), ...props});
    }

}

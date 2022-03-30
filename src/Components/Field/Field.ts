import { FieldProps } from './FieldProps';
import {Component} from "@lab1/core";


function defaultProps(): Partial<FieldProps> {
    return {
        element: document.createElement('mat-card') as HTMLDivElement
    }
}
export class Field extends Component implements FieldProps{

    constructor(props:FieldProps) {
        super({...defaultProps(), ...props});
    }

}

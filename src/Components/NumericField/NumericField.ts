import { NumericFieldProps } from './NumericFieldProps';
import {Component} from "@lab1/core";


function defaultProps(): Partial<NumericFieldProps> {
    return {
        element: document.createElement('mat-card') as HTMLDivElement
    }
}
export class NumericField extends Component implements NumericFieldProps{

    constructor(props:NumericFieldProps) {
        super({...defaultProps(), ...props});
    }

}

import { FocusTrapProps } from './FocusTrapProps';
import {Component} from "@lab1/core";


function defaultProps(): Partial<FocusTrapProps> {
    return {
        element: document.createElement('mat-card') as HTMLDivElement
    }
}
export class FocusTrap extends Component implements FocusTrapProps{

    constructor(props:FocusTrapProps) {
        super({...defaultProps(), ...props});
    }

}

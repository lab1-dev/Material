import { ExpansionPanelProps } from './ExpansionPanelProps';
import {Component} from "@lab1/core";


function defaultProps(): Partial<ExpansionPanelProps> {
    return {
        element: document.createElement('mat-card') as HTMLDivElement
    }
}
export class ExpansionPanel extends Component implements ExpansionPanelProps{

    constructor(props:ExpansionPanelProps) {
        super({...defaultProps(), ...props});
    }

}

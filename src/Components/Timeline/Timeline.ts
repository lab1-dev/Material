import { TimelineProps } from './TimelineProps';
import {Component} from "@lab1/core";


function defaultProps(): Partial<TimelineProps> {
    return {
        element: document.createElement('mat-card') as HTMLDivElement
    }
}
export class Timeline extends Component implements TimelineProps{

    constructor(props:TimelineProps) {
        super({...defaultProps(), ...props});
    }

}

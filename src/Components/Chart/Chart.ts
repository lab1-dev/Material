import { ChartProps } from './ChartProps';
import {Component} from "@lab1/core";


function defaultProps(): Partial<ChartProps> {
    return {
        element: document.createElement('mat-card') as HTMLDivElement
    }
}
export class Chart extends Component implements ChartProps{

    constructor(props:ChartProps) {
        super({...defaultProps(), ...props});
    }

}

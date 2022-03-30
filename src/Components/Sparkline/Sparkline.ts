import { SparklineProps } from './SparklineProps';
import {Component} from "@lab1/core";


function defaultProps(): Partial<SparklineProps> {
    return {
        element: document.createElement('mat-card') as HTMLDivElement
    }
}
export class Sparkline extends Component implements SparklineProps{

    constructor(props:SparklineProps) {
        super({...defaultProps(), ...props});
    }

}

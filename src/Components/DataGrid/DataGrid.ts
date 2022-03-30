import { DataGridProps } from './DataGridProps';
import {Component} from "@lab1/core";


function defaultProps(): Partial<DataGridProps> {
    return {
        element: document.createElement('mat-card') as HTMLDivElement
    }
}
export class DataGrid extends Component implements DataGridProps{

    constructor(props:DataGridProps) {
        super({...defaultProps(), ...props});
    }

}

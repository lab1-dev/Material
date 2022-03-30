import { MessageBoxProps } from './MessageBoxProps';
import {Component} from "@lab1/core";


function defaultProps(): Partial<MessageBoxProps> {
    return {
        element: document.createElement('mat-card') as HTMLDivElement
    }
}
export class MessageBox extends Component implements MessageBoxProps{

    constructor(props:MessageBoxProps) {
        super({...defaultProps(), ...props});
    }

}

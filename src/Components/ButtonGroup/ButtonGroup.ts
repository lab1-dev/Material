import {Component} from "@lab1/core"
import {ButtonGroupProps} from "./ButtonGroupProps";

function defaultProps(): Partial<ButtonGroupProps> {
    return{
        element: document.createElement('mat-button-group') as HTMLButtonElement
    }
}
export class ButtonGroup extends Component implements ButtonGroupProps{

    constructor(props:ButtonGroupProps) {
        super({...defaultProps(), ...props});
    }

}

import {Component} from "@lab1/core";
import {AppBarProps} from "./AppBarProps";


function defaultProps(): Partial<AppBarProps> {
    return {
        element: document.createElement('mat-card') as HTMLDivElement
    }
}
export class AppBar extends Component implements AppBarProps{

    constructor(props:AppBarProps) {
        super({...defaultProps(), ...props});
    }

}

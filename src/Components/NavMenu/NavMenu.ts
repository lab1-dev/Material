import {Component} from "@lab1/core"
import {NavMenuProps} from "./NavMenuProps";

function defaultProps(): Partial<NavMenuProps> {
    return {
        element: document.createElement('mat-nav') as HTMLButtonElement
    }
}
export class NavMenu extends Component implements NavMenuProps{

    constructor(props:NavMenuProps) {
        super({...defaultProps(), ...props});
    }
}

import { ScrollToTopProps } from './ScrollToTopProps';
import {Component} from "@lab1/core";


function defaultProps(): Partial<ScrollToTopProps> {
    return {
        element: document.createElement('mat-card') as HTMLDivElement
    }
}
export class ScrollToTop extends Component implements ScrollToTopProps{

    constructor(props:ScrollToTopProps) {
        super({...defaultProps(), ...props});
    }

}

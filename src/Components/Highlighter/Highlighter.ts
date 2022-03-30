import { HighlighterProps } from './HighlighterProps';
import {Component} from "@lab1/core";


function defaultProps(): Partial<HighlighterProps> {
    return {
        element: document.createElement('mat-card') as HTMLDivElement
    }
}
export class Highlighter extends Component implements HighlighterProps{

    constructor(props:HighlighterProps) {
        super({...defaultProps(), ...props});
    }

}

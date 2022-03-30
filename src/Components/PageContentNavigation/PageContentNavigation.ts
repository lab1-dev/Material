import { PageContentNavigationProps } from './PageContentNavigationProps';
import {Component} from "@lab1/core";


function defaultProps(): Partial<PageContentNavigationProps> {
    return {
        element: document.createElement('mat-card') as HTMLDivElement
    }
}
export class PageContentNavigation extends Component implements PageContentNavigationProps{

    constructor(props:PageContentNavigationProps) {
        super({...defaultProps(), ...props});
    }

}

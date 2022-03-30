import { SkeletonProps } from './SkeletonProps';
import {Component} from "@lab1/core";


function defaultProps(): Partial<SkeletonProps> {
    return {
        element: document.createElement('mat-card') as HTMLDivElement
    }
}
export class Skeleton extends Component implements SkeletonProps{

    constructor(props:SkeletonProps) {
        super({...defaultProps(), ...props});
    }

}

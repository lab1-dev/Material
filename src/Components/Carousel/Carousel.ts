import {Component} from "@lab1/core";
import {CarouselProps} from "./CarouselProps";

function defaultProps(): Partial<CarouselProps> {
    return {
        element: document.createElement('mat-carousel') as HTMLButtonElement
    }
}
export class Carousel extends Component implements CarouselProps{

    constructor(props:CarouselProps) {
        super({...defaultProps(), ...props});
    }

}

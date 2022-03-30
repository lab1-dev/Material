import {component, Property} from "@lab1/core"
import type {ProgressCircularProps} from "./ProgressCircularProps";
import {Color, MaterialComponent, Size} from "../../MaterialExports";

@component
export class ProgressCircular extends MaterialComponent implements ProgressCircularProps {

    //region properties
    readonly color = new Property<Color>(this, Color.Default);
    readonly size = new Property<Size>(this, Size.Medium);
    readonly indeterminate = new Property<boolean>(this, false);
    readonly min = new Property<number>(this, 0);
    readonly max = new Property<number>(this, 100);
    readonly strokeWidth = new Property<number>(this, 3);
    readonly value = new Property<number>(this, 0);
    //endregion

    //region other fields
    protected svgValue = 0;
    protected magicNumber = 126;// weird, but required for the SVG to work
    //endregion

    constructor(props: ProgressCircularProps) {
        super({...{element: document.createElement('mat-progress-circular')}, ...props});
        this.readProperties(props, true);
        this.render(true);
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender)

        this.calculateSvgValue();
        //Div
        let divClass = 'mud-progress-circular';
        divClass += ` mud-${this.color}-text`;
        divClass += ` mud-progress-${this.size}`;
        if (this.indeterminate.value) divClass += ' mud-progress-indeterminate';
        else divClass += ' mud-progress-static';
        this.setClassAndStyle(divClass, true);
        this.element!.setAttribute('role', 'progressbar');
        if (this.value.value) this.element!.ariaValueNow = this.value.value.toString();
        this.element!.style.transform = 'rotate(-90deg)';

        //Svg
        let svgClass = 'mud-progress-circular-circle';
        if (this.indeterminate.value) svgClass += ' mud-progress-indeterminate';
        else svgClass += ' mud-progress-static';

        this.element!.innerHTML = `<svg class="mud-progress-circular-svg" viewBox="22 22 44 44">
        ${this.indeterminate.value ?
            `<circle class="${svgClass}" cx="44" cy="44" r="20" fill="none" stroke-width="${this.strokeWidth}"></circle>` :
            `<circle class="${svgClass}" cx="44" cy="44" r="20" fill="none" stroke-width="${this.strokeWidth}" style="stroke-dasharray: ${this.magicNumber}; stroke-dashoffset: ${this.svgValue};"></circle>`
        }
        </svg>`;
    }

    protected calculateSvgValue(): void {
        if (this.value.value == undefined) return;
        let value = Math.min(Math.max(this.min.value, this.value.value), this.max.value);
        // calculate fraction, which is a value between 0 and 1
        let fraction = (value - this.min.value) / (this.max.value - this.min.value);
        // now project into the range of the SVG value (126 .. 0)
        this.svgValue = Math.round(this.magicNumber - this.magicNumber * fraction);
    }
}

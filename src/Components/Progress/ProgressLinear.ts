import {Div, component, Property} from "@lab1/core"
import type {ProgressLinearProps} from "./ProgressLinearProps";
import {Color, Size, Text, MaterialComponent} from "../../MaterialExports";

@component
export class ProgressLinear extends MaterialComponent implements ProgressLinearProps {

    //region properties
    readonly color = new Property<Color>(this, Color.Default);
    readonly size = new Property<Size>(this, Size.Small);
    readonly indeterminate = new Property<boolean>(this, false);
    readonly buffer = new Property<boolean>(this, false);
    readonly rounded = new Property<boolean>(this, false);
    readonly striped = new Property<boolean>(this, false);
    readonly vertical = new Property<boolean>(this, false);
    readonly text = new Property<Text | undefined>(this, undefined);
    readonly min = new Property<number>(this, 0);
    readonly max = new Property<number>(this, 100);
    readonly bufferValue = new Property<number>(this, 0);
    readonly value = new Property<number>(this, 0);
    //endregion

    //#region other fields
    protected valuePercent = 0;
    protected bufferPercent = 0;
    protected childContentDiv?: Div
    protected linearBarsDiv: Div
    protected indeterminateDiv1?: Div
    protected indeterminateDiv2?: Div
    protected bufferDiv1?: Div
    protected bufferDiv2?: Div
    protected bufferDiv3?: Div
    protected innerDiv?: Div
    //#endregion

    constructor(props: ProgressLinearProps) {
        super({...{element: document.createElement('mat-progress-linear')}, ...props});
        this.linearBarsDiv = new Div({parent: this, className: 'mud-progress-linear-bars'});
        this.readProperties(props, true);
        this.render(true);
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);
        this.updatePercentages();
        //Div1
        let div1Class = 'mud-progress-linear';
        if (this.rounded.value) div1Class += ' mud-progress-linear-rounded';
        if (this.striped.value) div1Class += ' mud-progress-linear-striped';
        if (this.indeterminate.value) div1Class += ' mud-progress-indeterminate';
        if (this.buffer.value && !this.indeterminate.value) div1Class += ' mud-progress-linear-buffer';
        div1Class += ` mud-progress-linear-${this.size}`;
        div1Class += ` mud-progress-linear-color-${this.color}`;
        if (!this.vertical.value) div1Class += ' horizontal';
        if (this.vertical.value) div1Class += ' vertical';
        div1Class += ' mud-flip-x-rtl';
        this.setClassAndStyle(div1Class, true);
        this.element!.setAttribute('role', 'progressbar');
        if (this.value.value) this.element!.ariaValueNow = this.value.value!.toString();
        this.element!.ariaValueMin = this.min.toString();
        this.element!.ariaValueMax = this.max.toString();

        //ChildContent Div
        this.buildChildContentDiv();

        //Indeterminate Div1 and Div2
        this.buildIndeterminateDivs();

        //Buffer Div
        this.buildBufferDiv();

        //Inner Div
        this.buildInnerDiv();
    }

    protected buildChildContentDiv(): void {
        if (this.text.value != undefined) {
            if (!this.childContentDiv) {
                this.childContentDiv = new Div({parent: this, className: 'mud-progress-linear-content'});
                this.childContentDiv.element!.appendChild(this.text.value.element!);
            }
        } else this.childContentDiv = this.childContentDiv?.delete();
    }

    protected buildIndeterminateDivs(): void {
        if (this.indeterminate.value) {
            if (!this.indeterminateDiv1) this.indeterminateDiv1 = new Div({parent: this.linearBarsDiv, className: 'mud-progress-linear-bar'});
            if (!this.indeterminateDiv2) this.indeterminateDiv2 = new Div({parent: this.linearBarsDiv, className: 'mud-progress-linear-bar'});
        } else {
            this.indeterminateDiv1 = this.indeterminateDiv1?.delete();
            this.indeterminateDiv2 = this.indeterminateDiv2?.delete();
        }
    }

    protected buildBufferDiv(): void {
        if (this.buffer.value) {
            if (!this.bufferDiv1) this.bufferDiv1 = new Div({parent: this.linearBarsDiv, className: 'mud-progress-linear-bar'});
            if (!this.bufferDiv2) this.bufferDiv2 = new Div({parent: this.linearBarsDiv, className: 'mud-progress-linear-bar'});
            if (!this.bufferDiv3) this.bufferDiv3 = new Div({parent: this.linearBarsDiv, className: 'mud-progress-linear-bar last'});
            this.bufferDiv2.element!.style.transform = this.getStyledBar1Transform();
            this.bufferDiv3.element!.style.transform = this.getStyledBar2Transform();
        } else {
            this.bufferDiv1 = this.bufferDiv1?.delete();
            this.bufferDiv2 = this.bufferDiv2?.delete();
            this.bufferDiv3 = this.bufferDiv3?.delete();
        }
    }

    protected buildInnerDiv(): void {
        if (!this.indeterminate.value && !this.buffer.value) {
            if (!this.innerDiv) this.innerDiv = new Div({parent: this.linearBarsDiv, className: 'mud-progress-linear-bar'});
            this.innerDiv.element!.style.transform = this.getStyledBar1Transform();
        } else this.innerDiv = this.innerDiv?.delete();
    }

    protected getStyledBar1Transform(): string {
        return this.getStyledBarTransform(this.valuePercent);
    }

    protected getStyledBar2Transform(): string {
        return this.getStyledBarTransform(this.bufferPercent);
    }

    protected getStyledBarTransform(input: number): string {
        if (this.vertical.value) return `translateY(${Math.round(100 - input)}%)`
        else return `translateX(-${Math.round(100 - input)}%)`
    }

    protected updatePercentages(): void {
        this.valuePercent = this.getValuePercent();
        this.bufferPercent = this.getBufferPercent();
    }

    protected getValuePercent(): number {
        return this.getPercentage(this.value.value!);
    }

    protected getBufferPercent(): number {
        return this.getPercentage(this.bufferValue.value);
    }

    protected getPercentage(input: number): number {
        let total = Math.abs(this.max.value - this.min.value);
        let value = Math.max(0, Math.min(total, input - this.min.value));
        return value / total * 100;
    }
}

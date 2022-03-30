import {Div, component, Property, Signal, NumberHelper} from "@lab1/core";
import type {CollapseProps} from './CollapseProps';
import {MaterialComponent, StyleBuilder} from "../../MaterialExports";

enum CollapseState {Opening, Opened, Closing, Closed}

@component
export class Collapse extends MaterialComponent implements CollapseProps {

    //region properties
    readonly state = new Property<CollapseState>(this, CollapseState.Closed);
    readonly expanded = new Property<boolean>(this, false, {
        customSetter: (value) => {
            this.expanded._value = value;
            if (this._isRendered) {
                this.state._value = this.expanded.value ? CollapseState.Opening : CollapseState.Closing;
                this.updateHeight();
            } else if (this.expanded.value) this.state._value = CollapseState.Opened;
            this.onExpandedChange.emit(this.expanded.value);
            if (!this.holdRender) this.render();
        }
    });

    //endregion

    //region calculatedAnimationDuration
    get calculatedAnimationDuration(): string {
        if (this.maxHeight.value != undefined) {
            if (this.maxHeight.value <= 200) return '0.2s';
            else if (this.maxHeight.value <= 600) return '0.4s';
            else if (this.maxHeight.value <= 1400) return '0.6s';
        }
        if (typeof this.height.value === 'number') return Math.min(this.height.value ?? 0 / 800, 1).toString() + 's';
        else return Math.min(0 / 800, 1) + 's';
    }
    //endregion

    //region Dom nodes and others
    protected _updateHeight = false;
    protected _isRendered = false;
    readonly onAnimationEnd = new Signal<(expanded: boolean) => void>();
    readonly onExpandedChange = new Signal<(expanded: boolean) => void>();
    protected wrapperDiv: Div
    public innerDiv: Div
    //endregion

    constructor(props: CollapseProps) {
        super({...<Partial<CollapseProps>>{element: document.createElement('div')}, ...props});
        this.wrapperDiv = new Div({parent: this, className: 'mud-collapse-wrapper'});
        this.innerDiv = new Div({parent: this.wrapperDiv, className: 'mud-collapse-wrapper-inner'})
        this.readProperties(props, true);
        this.render(true);

        this._isRendered = true;
        this.updateHeight();
        this.element!.onanimationend = (ev) => this.handleAnimationEnd();
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);
        //console.log('(Collapse)render', 'Expanded:',this.expanded.value, '.State:', CollapseState[this.state.value]);
        //if(this.id=='collapse_inbox') console.log( '(Collapse)writePropsToDOM', '.Animation duration:',this.calculatedAnimationDuration);
        //Div
        let divClass = 'mud-collapse-container';
        this.element!.style.display = 'block';
        if (this.state.value == CollapseState.Opening) {
            //console.log('opening...');
            divClass += ' mud-collapse-entering';
        } else if (this.state.value == CollapseState.Opened) {
            //console.log('opened');
            divClass += ' mud-collapse-entered';
        } else if (this.state.value == CollapseState.Closing) {
            //console.log('closing...')
            divClass += ' mud-collapse-exiting';
        } else {
            //console.log('closed');
            this.element!.style.display = 'none';
            return;
        }

        let style = new StyleBuilder()
            .addStyleWhen('max-height', NumberHelper.toPixel(this.maxHeight.value), this.maxHeight.value != undefined)
            .addStyleWhen('height', 'auto', this.state.value == CollapseState.Opened)
            .addStyleWhen('animation-duration', this.calculatedAnimationDuration, this.state.value == CollapseState.Opening)
            //.addStyleString(this.style) isso estava sujando
            .build();
        //console.log(this._style);

        this.setClassAndStyle(divClass, true, style);
    }

    protected updateHeight(): void {
        //console.log('(Collapse)updateHeight:',this.wrapperDiv?.element?.offsetHeight,this.wrapperDiv.element!.getBoundingClientRect()?.height, '.State:',CollapseState[this.state]);
        this.element!.style.height = (this.wrapperDiv.element!.offsetHeight ?? 0).toString() + 'px';
        if (this.maxHeight.value != undefined && this.height.value != undefined && this.height.value > this.maxHeight.value) {
            this.height.value = this.maxHeight.value;
        }
        //console.log('(Collapse)updateHeight end:',this.height.value);
    }

    protected handleAnimationEnd(): void {
        //console.log('(Collapse)handleAnimationEnd');
        if (this.state.value == CollapseState.Opening) this.state.value = CollapseState.Opened;
        else if (this.state.value == CollapseState.Closing) this.state.value = CollapseState.Closed;
        this.onAnimationEnd.emit(this.expanded.value);
    }
}

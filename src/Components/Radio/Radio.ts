import {component, Property, Span} from "@lab1/core";
import {Color, Size, Icon, RadioGroup, Placement, MaterialComponent} from "../../MaterialExports";
import type {RadioProps} from "./RadioProps";

@component
export class Radio<T = string> extends MaterialComponent implements RadioProps<T> {

    //region properties
    readonly color = new Property<Color>(this, Color.Default);
    readonly placement = new Property<Placement>(this, Placement.Right);
    readonly dense = new Property<boolean>(this, false);
    readonly size = new Property<Size>(this, Size.Medium);
    readonly disableRipple = new Property<boolean>(this, false);
    readonly disabled = new Property<boolean>(this, false);
    readonly text = new Property<string | undefined>(this, undefined);
    readonly checked = new Property<boolean>(this, false);
    readonly option = new Property<T | undefined>(this, undefined);
    //endregion

    //region DOM nodes and other fields
    protected readonly inputNode = document.createElement('input') as HTMLInputElement;
    protected readonly firstSpan!: Span;
    protected readonly secondSpan!: Span;
    protected readonly thirdSpan!: Span;
    protected readonly fourthSpan!: Span;
    protected readonly radioGroup!: RadioGroup;
    protected firstIcon!: Icon;
    protected secondIcon!: Icon;
    protected uncheckedSVG = "<path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z\"/>";
    protected checkedSVG = "<path d=\"M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z\"/>";
    //endregion

    constructor(props: RadioProps<T>) {
        super({...{element: document.createElement('mat-radio')}, ...props});

        //DOM nodes
        this.firstSpan = new Span({parent: this, tabIndex: 0});
        this.secondSpan = new Span({parent: this.firstSpan});
        this.secondSpan.element!.appendChild(this.inputNode);
        this.thirdSpan = new Span({parent: this.secondSpan, tabIndex: 0});
        this.fourthSpan = new Span({parent: this});//(Radio Text)
        this.firstIcon = new Icon({parent: this.thirdSpan, icon: this.uncheckedSVG, addCommonClass: false});
        this.secondIcon = new Icon({parent: this.thirdSpan, icon: this.checkedSVG, addCommonClass: false});

        //Radio properties
        this.readProperties(props, true);

        //Let's write the properties into the DOM
        this.render(true);

        //Events
        this.element!.onkeydown = (ev) => this.handleKeyDown(ev)
        this.fourthSpan.onClick.connect((ev) => this.handleClick(ev));
        this.inputNode.onclick = (ev) => this.handleClick(ev);

        //Add this Radio into RadioGroup
        if (this.parent == undefined || (!(this.parent instanceof RadioGroup))) {
            console.error(this.completeID, 'RadioGroup not found as parentComponent');
            return;
        }
        this.radioGroup = this.parent as RadioGroup;
        this.radioGroup.appendRadio(this);
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);

        //Label
        let labelClass = 'mud-radio';
        if (this.disabled.value) labelClass += ' mud-disabled';
        labelClass += ` mud-radio-content-placement-${Placement[this.placement.value].toLowerCase()}`;
        this.setClassAndStyle(labelClass, false);

        //First Span
        let firstSpanClass = 'mud-button-root mud-icon-button';
        if (!this.disableRipple.value) firstSpanClass += ' mud-ripple mud-ripple-radio';
        firstSpanClass += ` mud-icon-button-color-${this.color.value}`;
        if (this.dense.value) firstSpanClass += ` mud-radio-dense`;
        if (this.disabled.value) firstSpanClass += ' mud-disabled';
        if (this.checked.value) firstSpanClass += ' mud-checked';
        this.firstSpan.element!.className = firstSpanClass;

        //Second Span
        this.secondSpan.element!.className = 'mud-radio-button';

        //Input
        this.inputNode.tabIndex = -1;
        if (this.userAttributes != undefined) Object.assign(this.inputNode!.attributes, this.userAttributes);
        this.inputNode.ariaChecked = this.checked.value ? 'true' : 'false';
        this.inputNode.ariaDisabled = this.disabled.value ? 'true' : 'false';
        this.inputNode.setAttribute('role', 'radio');
        this.inputNode.type = 'radio';
        this.inputNode.className = 'mud-radio-input';
        //TODO check this.inputNode.name
        this.inputNode.disabled = this.disabled.value;

        //Third Span
        let thirdSpanClass = 'mud-radio-icons';
        if (this.checked.value) thirdSpanClass += ' mud-checked';
        this.thirdSpan.element!.className = thirdSpanClass;

        //First Icon
        let firstIconClass = 'mud-icon-root mud-svg-icon';
        firstIconClass += ` mud-icon-size-${this.size.value}`
        this.firstIcon.className.value = firstIconClass;//icon does not have element

        //Second Icon
        let secondIconClass = 'mud-icon-root mud-svg-icon mud-radio-icon-checked';
        secondIconClass += ` mud-icon-size-${this.size.value}`;
        this.secondIcon.className.value = secondIconClass;

        //Fourth Span
        this.fourthSpan.className.value = 'mud-radio-content mud-typography mud-typography-body1';
        if (this.text.value != undefined) this.fourthSpan.innerHtml.value = this.text.value;
        else this.fourthSpan.innerHtml.value = '';
    }

    protected handleKeyDown(ev: KeyboardEvent): void {
        if (this.disabled.value) return;
        switch (ev.key) {
            case 'Backspace':
                this.checked.value = !this.checked.value;
                break;
        }
    }

    protected handleClick(ev: MouseEvent): void {
        if (this.disabled.value) return;
        this.radioGroup.setSelectedRadio(this);
    }
}

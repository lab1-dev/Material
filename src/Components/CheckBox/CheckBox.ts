import {component, Property, Signal, Span} from "@lab1/core"
import {BooleanInput, Color, Material, Size,Icon,Text} from "../../MaterialExports";
import type {CheckBoxProps} from "./CheckBoxProps";

@component
export class CheckBox<T> extends BooleanInput<T> implements CheckBoxProps<T> {

    //region properties
    readonly color = new Property<Color>(this, Color.Default);
    readonly text = new Property<string | undefined>(this, undefined);
    readonly disableRipple = new Property<boolean>(this, false);
    readonly dense = new Property<boolean>(this, false);
    readonly size = new Property<Size>(this, Size.Medium);
    readonly checkedIcon = new Property<string>(this, Material.Icons.Filled.CheckBox);
    readonly uncheckedIcon = new Property<string>(this, Material.Icons.Filled.CheckBoxOutlineBlank);
    readonly indeterminateIcon = new Property<string>(this, Material.Icons.Filled.IndeterminateCheckBox);
    readonly triState = new Property<boolean>(this, false);
    readonly childContent = new Property<any>(this, undefined);
    //endregion

    //#region DOM nodes, events and others
    protected readonly inputNode = document.createElement('input') as HTMLInputElement;
    protected readonly spanItem!: Span;
    protected textItem?: Text
    protected iconItem!: Icon;
    readonly onChange = new Signal<(checked: boolean) => void>();
    //#endregion

    constructor(props: CheckBoxProps<T>) {
        super({...{element: document.createElement('mat-checkbox')}, ...props});
        if (!this.element) return;

        //DOM nodes
        this.spanItem = new Span({ parent: this, tabIndex: 0});//Span Node
        this.spanItem.element!.appendChild(this.inputNode);//Input Node
        this.iconItem = new Icon({parent: this.spanItem})//Icon Node

        //CheckBox properties
        this.readProperties(props,true);

        //Let's write the properties into the DOM
        this.render(true);

        //Events
        this.element.onclick = (ev) => this.handleLabelClick(ev);
        this.element.onkeydown = (ev) => this.handleKeyDown(ev)
        this.inputNode.onchange = (ev: any) => this.handleOnChange(ev.target.checked);
        this.inputNode.onclick = (ev) => ev.stopPropagation();
    }

    public render(firstRender: boolean = false) {
        super.render(firstRender);

        //Label
        let labelClass = 'mud-checkbox';
        if (this.disabled.value) labelClass += ' mud-disabled';
        if (this.readOnly.value) labelClass += ' mud-readonly';
        this.setClassAndStyle(labelClass);

        //Span
        let spanClass = 'mud-button-root mud-icon-button';
        spanClass += ` mud-icon-button-color-${this.color}`
        if (this.dense.value) spanClass += ' mud-checkbox-dense';
        if (!this.disableRipple.value) spanClass += ' mud-ripple mud-ripple-checkbox';
        if (this.disabled.value) spanClass += ' mud-disabled';
        if (this.readOnly.value) spanClass += ' mud-readonly';
        this.spanItem.className.value = spanClass;

        //Input
        let inputClass = 'mud-checkbox-input';
        this.inputNode.checked = this.checked.value ?? false;
        this.inputNode.disabled = this.disabled.value;
        this.inputNode.tabIndex = -1;
        this.inputNode.type = 'checkbox';
        this.inputNode.className = inputClass;

        //Icon
        this.iconItem.icon.value = this.getIcon().value;
        this.iconItem.size.value = this.size.value;

        //Text
        if (this.text.value&& this.text.value.length > 0) {
            if (this.textItem == undefined) this.textItem = new Text({parent: this, childContent: this.text.value});
            else this.textItem.childContent.value = this.text.value;
            this.textItem.element!.style.whiteSpace = 'nowrap';//to avoid line breaks when text contains spaces
        } else if (this.textItem != undefined) {//let's remove the textItem from DOM
            this.textItem.onDestroy();
            this.textItem = undefined;
        }
    }

    protected handleOnChange(value: boolean): void {
        if (this.disabled.value || this.readOnly.value) return;
        this.onChange.emit(value);
        this.checked.value = value;
    }

    protected handleKeyDown(ev: KeyboardEvent): void {
        if (this.disabled.value || this.readOnly.value) return;
        switch (ev.key) {
            case 'Backspace':
                this.checked.value = !this.checked.value;
                break;
        }
    }

    protected handleLabelClick(ev: MouseEvent): void {
        if (this.disabled.value || this.readOnly.value) return;
        this.checked.value = !this.checked.value;
    }

    protected getIcon(): Property<string> {
        if (this.checked.value) return this.checkedIcon;
        else return this.uncheckedIcon;
    }
}

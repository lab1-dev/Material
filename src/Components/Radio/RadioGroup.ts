import {component, Property, Signal} from "@lab1/core"
import {FormComponent, Radio} from "../../MaterialExports";
import type {RadioGroupProps} from "./RadioGroupProps";

@component
export class RadioGroup<T = string> extends FormComponent<T> implements RadioGroupProps<T> {

    //region properties
    readonly childContent = new Property<any>(this, undefined);
    readonly selectedOption = new Property<T | undefined>(this, undefined);
    //endregion

    //Events and others
    protected radios: Radio[] = [];
    readonly onSelectedOptionChange = new Signal<(option:T) => void>();
    //endregion

    constructor(props: RadioGroupProps<T>) {
        super({...{element: document.createElement('div')}, ...props});
        this.readFormComponentProperties(props);
        this.render(true);
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);
        let className = '';
        this.setClassAndStyle(className);
        this.element!.setAttribute('role', 'radiogroup');
    }

    public appendRadio(radio: Radio<any>): void {
        this.radios.push(radio);
    }

    public setSelectedRadio(radio: Radio<any>): void {
        for (let rd of this.radios) {
            if (rd != radio) rd.checked.value = false;
        }
        radio.checked.value = true;
        this.selectedOption.value = radio.option.value;
        this.onSelectedOptionChange.emit(radio.option.value);
    }
}

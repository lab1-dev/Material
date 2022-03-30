import {component, Property} from "@lab1/core";
import {BooleanInputProps, FormComponent} from "../../MaterialExports";

export abstract class BooleanInput<T> extends FormComponent<T> implements BooleanInputProps<T>{

    //region properties
    readonly checked=new Property<boolean>(this,false);
    readonly disabled=new Property<boolean>(this,false);
    readonly readOnly=new Property<boolean>(this,false);
    //endregion

    protected get boolValue():boolean{
        return this.checked.value;//todo arrumar para usar converter no booleaninput
    }
}

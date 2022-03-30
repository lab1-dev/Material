import {Property, Signal} from "@lab1/core";
import {BaseInput} from "../../MaterialExports";
import {DebouncedInputProps} from "./DebouncedInputProps";

export abstract class DebouncedInput<T> extends BaseInput<T> implements DebouncedInputProps<T>{

    readonly debounceInterval = new Property<number>(this,0);

    //region Events and others
    readonly onDebounceIntervalElapsed = new Signal<(text:string) => void>();
    //endregion

    protected onChange():void{
        //todo
    }
}

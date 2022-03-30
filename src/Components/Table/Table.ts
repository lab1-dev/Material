import {component, Signal} from "@lab1/core";
import type {TableProps} from "./TableProps";
import {TableBase} from "./../../MaterialExports";

@component
export class Table<T> extends  TableBase implements TableProps<T>{


    constructor(props:TableProps<T>) {
        super({...{element:document.createElement('div')}, ...props});
    }
}

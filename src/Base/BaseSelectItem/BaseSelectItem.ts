import {Component, Property, Signal} from "@lab1/core";
import { BaseSelectItemProps} from "../../MaterialExports";

export abstract class BaseSelectItem extends Component implements BaseSelectItemProps {

    //region properties
    readonly disabled = new Property<boolean>(this, false);
    readonly disabledRipple = new Property<boolean>(this, false);
    readonly href = new Property<string | undefined>(this, undefined);
    readonly forceLoad = new Property<boolean>(this, false);
    readonly childContent = new Property<any>(this, undefined);
    //endregion

    //region Events and others
    readonly onClick = new Signal<(ev: MouseEvent) => void>();
    //endregion

    protected handleClick(ev: MouseEvent): void {
        if (this.disabled.value) return;
        if (this.href != undefined) window.open(this.href.value, '_self');
        else {
            this.onClick.emit(ev);
            //todo add command
        }
    }
}

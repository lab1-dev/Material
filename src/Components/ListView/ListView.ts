import {component, Property, Signal} from "@lab1/core";
import type {ListViewProps} from "./ListViewProps";
import {ListItem, MaterialComponent} from "./../../MaterialExports";

@component
export class ListView extends MaterialComponent implements ListViewProps {

    //region properties
    readonly disableGutters = new Property<boolean>(this, false);
    readonly disablePadding = new Property<boolean>(this, false);
    readonly disabled = new Property<boolean>(this, false);
    readonly selectedItem = new Property<ListItem | undefined>(this, undefined);
    readonly selectedValue = new Property<any>(this, undefined);
    readonly dense = new Property<boolean>(this, false, {
        customSetter: (value) => {
            this.dense._value = value;
            this.updateItems();
        }
    });
    readonly clickable = new Property<boolean>(this, false, {
        customSetter: (value) => {
            this.clickable._value = value;
            this.updateItems();//ListItem writeProps checks if list is clickable
        }
    });
    readonly childContent = new Property<any[]>(this, [], {
        customSetter: (value) => {
            for (let component of value) {
                this.registerItem(component);
            }
            if (!this.holdRender) this.render();
        }
    });
    //endregion

    //#region DOM nodes and others
    readonly onSelectedValueChange = new Signal<(value: any) => void>();
    readonly onSelectedItemChange = new Signal<(listItem: ListItem) => void>();
    readonly onItemClick = new Signal<(listItem: ListItem) => void>();
    readonly onMouseEnter = new Signal<(ev: MouseEvent) => void>();
    readonly onMouseLeave = new Signal<(ev: MouseEvent) => void>();
    protected isActionList: boolean = false;//todo nao usado ainda
    protected canSelect = true//todo utilizar no futuro
    protected _childList = new Set<ListView>();//todo nao usado ainda
    public parentList?: ListView;//todo nao usado ainda
    //#endregion

    constructor(props: ListViewProps) {
        super({...{element: document.createElement('div')}, ...props});
        this.readProperties(props, true);
        this.render(true);
        if (this.parentList != undefined) {
            this.parentList.registerList(this);
            this.canSelect = this.parentList.canSelect;
        } else {
            //Todo check this.canSelect=t
        }
        //Events
        this.element!.onmouseenter = (ev) => this.onMouseEnter.emit(ev);
        this.element!.onmouseleave = (ev) => this.onMouseLeave.emit(ev);
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);

        let className = 'mud-list';
        if (!this.disablePadding) className += ' mud-list-padding';
        this.setClassAndStyle(className, true);
    }

    protected updateItems(): void {
        let items = this.childContent.value as ListItem[];
        for (let component of items) {
            component.render();
        }
    }

    public registerItem(item: any): void {
        this.element?.appendChild(item.element!);
        this.childContent.value.push(item);
        item.parent = this;
        if (item instanceof ListItem) {
            item.list.value = this;
            if (this.canSelect && this.selectedValue.value != undefined && (item.value.value == this.selectedValue.value)) {
                item.setSelected(true);
                this.selectedItem._value = item;
                this.onSelectedItemChange.emit(item);
            }
        }
    }

    public registerList(child: ListView): void {
        this._childList.add(child);
    }

    public setSelectedValue(value: any, force: boolean = true): void {//todo no mud está boolean=false
        if ((!this.canSelect || !this.clickable.value) && !force) return;
        if (this.selectedValue.value == value) return;
        this.selectedValue._value = value;
        this.onSelectedValueChange.emit(value);
        this.selectedItem._value = undefined; // <-- for now, we'll see which component matches the value below
        let items = this.childContent.value as any[];
        for (let listItem of items) {
            if (!(listItem instanceof ListItem)) continue;
            let isSelected = value != null && (value == listItem.value.value);
            listItem.setSelected(isSelected);
            if (isSelected) this.selectedItem._value = listItem;
        }
        for (let childList of this._childList) {
            childList.setSelectedValue(value);
            if (childList.selectedItem != null) this.selectedItem._value = childList.selectedItem.value;
        }
        if (this.selectedItem.value) this.onSelectedItemChange.emit(this.selectedItem.value);
        this.parentList?.setSelectedValue(value);
    }

    public emitItemClick(component: ListItem): void {
        this.onItemClick.emit(component);
        this.parentList?.emitItemClick(component);
    }
}

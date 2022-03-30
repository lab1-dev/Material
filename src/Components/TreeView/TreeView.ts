import {Component,  List, component, Property, Signal, StringHelper} from "@lab1/core";
import type {TreeViewProps} from './TreeViewProps';
import {Color, MaterialComponent, StyleBuilder, TreeViewItem} from "../../MaterialExports";

@component
export class TreeView<T> extends MaterialComponent implements TreeViewProps<T> {

    //region properties
    readonly color = new Property<Color>(this, Color.Primary);
    readonly checkBoxColor = new Property<Color | undefined>(this, undefined);
    readonly multiSelection = new Property<boolean>(this, false);
    readonly expandOnClick = new Property<boolean>(this, false);
    readonly hover = new Property<boolean>(this, false);
    readonly dense = new Property<boolean>(this, false);
    //todo read from component readonly maxHeight = new Property<string | undefined>(this, undefined);
    readonly disabled = new Property<boolean>(this, false);
    readonly items = new Property<Component[]>(this, []);
    readonly treeRoot = new Property<TreeView<T>|undefined>(this, undefined);
    //endregion

    //region DOM nodes, events and others
    protected _selectedValue?: TreeViewItem<T>
    protected _selectedValues = new Set<TreeViewItem<T>>();
    protected _childItems: TreeViewItem<T>[] = [];
    public isSelectable = false;
    readonly onSelectedValueChange = new Signal<(value: T) => void>();
    readonly onSelectedValuesChange = new Signal<(value: Set<T>) => void>();
    //endregion

    constructor(props: TreeViewProps<T>) {
        super({...{element: document.createElement('ul')}, ...props});

        //todo implementar o razor

        //DOM nodes
        this.treeRoot.value = this;

        //TreeView properties
        this.readProperties(props, true);

        //Let's write the properties into the DOM
        this.render(true);
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);

        //Let's check if treeview can be selected
        this.isSelectable = this.onSelectedValueChange.hasConnections();

        //UL
        let className = 'mud-treeview';
        if (this.dense.value) className += ' mud-treeview-dense';
        if (this.hover.value) className += ' mud-treeview-hover';
        className += ` mud-treeview-selected-${this.color}`;
        className += ` mud-treeview-checked-${this.checkBoxColor}`;
        let styleName = new StyleBuilder()
            .addStyleWhen('width', this.width.value!.toString(), !StringHelper.isNullOrWhiteSpace(this.width.value))
            .addStyleWhen('height', this.height.value!.toString(), !StringHelper.isNullOrWhiteSpace(this.height.value))
            .addStyleWhen('max-height', this.maxHeight.value!.toString(), !StringHelper.isNullOrWhiteSpace(this.maxHeight.value))
            .build();
        this.setClassAndStyle(className, true, styleName);

        if (firstRender && this.treeRoot.value == this) {
            this.updateSelectedItems();
        }
    }

    public updateSelected(component: TreeViewItem<T>, requestedValue: boolean): void {
        if ((this._selectedValue == component && requestedValue) || (this._selectedValue != component && !requestedValue)) return;
        if (this._selectedValue == component && !requestedValue) {
            //todo set default this._selectedValue=d
            component.select(requestedValue);
            this.onSelectedValueChange.emit('default' as any as T)//todo ver para emitir default
            return;
        }
        if(this._selectedValue!=undefined){
            this._selectedValue.select(false);
        }
        this._selectedValue=component;
        component.select(requestedValue);
        this.onSelectedValueChange.emit(component.value.value!)
    }

    public updateSelectedItems(): void {
        this._selectedValues??=new Set<TreeViewItem<T>>();
        this._selectedValues.clear();
        for(let component of this._childItems){
            for(let selectedItem of  component.getSelectedItems()){
                this._selectedValues.add(selectedItem);
            }
        }
        let valuesList=new List(Array.from(this._selectedValues.values()));
        let selectedValues=valuesList.Select(i=>i.value.value!).ToArray();
        return this.onSelectedValuesChange.emit(new Set<T>(selectedValues))
    }

    //todo era addChild, mas tem o metodo addchild no ComponentBase
    protected addChildTreeViewItem(component: TreeViewItem<T>): void {
        this._childItems.push(component);
    }

}

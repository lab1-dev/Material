import {Component, Div, Else, If,   Li, component, Property, Signal, StringHelper, tsx} from "@lab1/core";
import {CheckBox, Collapse, Icon, Text, TreeView, TreeViewItemToggleButton, Color, Typo, Material, MaterialComponent} from "../../MaterialExports";
import type {TreeViewItemProps} from "./TreeViewItemProps";

@component
export class TreeViewItem<T> extends MaterialComponent implements TreeViewItemProps<T> {

    //region properties
    readonly checkedIcon = new Property<string>(this, Material.Icons.Filled.CheckBox);
    readonly uncheckedIcon = new Property<string>(this, Material.Icons.Filled.CheckBoxOutlineBlank);
    readonly value = new Property<T | undefined>(this, undefined);
    readonly text = new Property<string>(this, '');
    readonly textTypo = new Property<Typo>(this, Typo.body1);
    readonly textClass = new Property<string | undefined>(this, undefined);
    readonly endText = new Property<string | undefined>(this, undefined);
    readonly endTextTypo = new Property<Typo>(this, Typo.body1);
    readonly endTextClass = new Property<string | undefined>(this, undefined);
    readonly disabled = new Property<boolean>(this, false);
    readonly content = new Property<Component | undefined>(this, undefined);
    readonly items = new Property<Component[]>(this, []);
    readonly expanded = new Property<boolean>(this, false);
    readonly activated = new Property<boolean>(this, false);
    readonly selected = new Property<boolean>(this, false);
    readonly icon = new Property<string | undefined>(this, undefined);
    readonly iconColor = new Property<Color>(this, Color.Default);
    readonly endIcon = new Property<string | undefined>(this, undefined);
    readonly endIconColor = new Property<Color>(this, Color.Default);
    readonly expandedIcon = new Property<string>(this, Material.Icons.Filled.ChevronRight);
    readonly expandedIconColor = new Property<Color>(this, Color.Default);
    readonly loadingIcon = new Property<string>(this, Material.Icons.Filled.Loop);
    readonly loadingIconColor = new Property<Color>(this, Color.Default);

    readonly childContent = new Property<any>(this, undefined);
    //endregion

    //region DOM nodes, events and others
    public loading = false;
    protected _text?: string
    protected _disabled?: boolean
    protected _isChecked = false
    protected _isSelected = false
    protected _isServerLoaded = false
    protected textClassName = '';
    protected _childItems: TreeViewItem<T>[] = [];
    public treeRoot?: TreeView<T>//todo o treeview deve setar isso
    protected get hasChild(): boolean {
        return (this.childContent.value != undefined ||
            this.treeRoot != undefined && this.items.value.length > 0)
    }
    get isChecked(): boolean {
        return this.selected.value;
    }
    set isChecked(value: boolean) {
        this.selectItem(value, this);
    }
    private _arrowExpanded: boolean = false
    get arrowExpanded(): boolean {
        return this.expanded.value;
    }
    set arrowExpanded(value: boolean) {
        if (value == this.expanded.value) return;
        this.expanded.value = value;//todo talvez nao usar setter
        this.onExpandedChange.emit(value);
    }
    onExpandedChange = new Signal<(expanded: boolean) => void>();
    onActivatedChange = new Signal<(activated: boolean) => void>();
    onClick = new Signal<(ev: MouseEvent) => void>();
    //endregion

    constructor(props: TreeViewItemProps<T>) {
        super(props);
        //super({...{element: document.createElement('li')}, ...props});
        //TreeViewItem properties
        this.readProperties(props);
        this.onInitialized();
        //Let's write the properties into the DOM
        this.render(true);
    }

    protected onInitialized() {
        //todo
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);
        if (!this.treeRoot) return;

        //Li
        let className = 'mud-treeview-item';
        this.setClassAndStyle(className, true);
        //Div
        let divClassName = 'mud-treeview-item-content';
        if (this.treeRoot.isSelectable || this.treeRoot.expandOnClick.value && this._childItems.length > 0) divClassName += ' cursor-pointer';
        if (this._isSelected) divClassName += ' mud-treeview-item-selected';
        //Text
        this.textClassName = 'mud-treeview-item-label';
        if (this.textClass.value) this.textClassName += ' ' + this.textClass.value;

        this.buildTSX(divClassName);

        //afterrender
        if (firstRender && this._isSelected) {
            this.treeRoot.updateSelected(this, this._isSelected);
        }
        super.onAfterRender(firstRender);
    }

    protected buildTSX(divClassName: string) {
        let managedContent =
            <Li className='mud-treeview-item'>
                <Div className={divClassName} onClick={(ev) => this.handleItemClick(ev)}>
                    <If condition={this.content.value != undefined}>
                        {this.content.value}
                    </If>
                    <Else>
                        {/*//todo adicionar treeviewitemtooglebutton*/}
                        <TreeViewItemToggleButton loading={this.loading} expanded={this.expanded} onExpandedChange={(expanded)=>this.handleItemExpand(expanded)}
                                                  visible={this.hasChild} expandedIcon={this.expandedIcon} expandedIconColor={this.expandedIconColor}
                                                  loadingIcon={this.loadingIcon} loadingIconColor={this.loadingIconColor}/>
                        <If condition={this.treeRoot != undefined && this.treeRoot.multiSelection.value}>
                            <CheckBox className='mud-treeview-item-checkbox' color={Color.Inherit} checkedIcon={this.checkedIcon.value} uncheckedIcon={this.uncheckedIcon.value} checked={this.isChecked} disabled={this.disabled.value}/>
                            <If condition={!StringHelper.isNullOrEmpty(this.icon.value)}>
                                <Div className='mud-treeview-item-icon'>
                                    <Icon icon={this.icon} color={this.iconColor}/>
                                </Div>
                            </If>
                            <Text typo={this.textTypo} className={this.textClassName}>
                                {this.text.value}
                            </Text>
                            <If condition={!StringHelper.isNullOrEmpty(this.endText.value)}>
                                <Text typo={this.endTextTypo} className={this.endTextClass}>
                                    {this.endText.value}
                                </Text>
                            </If>
                            <If condition={!StringHelper.isNullOrEmpty(this.endIcon.value)}>
                                <Div className='mud-treeview-item-icon'>
                                    <Icon icon={this.endIcon} color={this.endIconColor}/>
                                </Div>
                            </If>
                        </If>
                    </Else>
                </Div>
                <If condition={this.hasChild}>
                    {/*//todo ver o cascading value e itemTemplate*/}
                    <Collapse expanded={this.expanded}>
                        <TreeView items={this.items}  className='mud-treeview-group' treeRoot={this.treeRoot}>
                            {this.childContent}
                        </TreeView>
                    </Collapse>
                </If>
            </Li>

        this.buildManaged(this.parent!, managedContent);
    }

    protected handleItemClick(ev: MouseEvent): void {
        ev.stopPropagation();
        if (this.treeRoot?.isSelectable ?? false) {
            this.treeRoot?.updateSelected(this, !this._isSelected);
        }
        if (this.hasChild && (this.treeRoot?.expandOnClick.value ?? false)) {
            this.expanded.value = !this.expanded.value;
            //nao precisa this.tryInvokeServerLoadFunc();
            this.onExpandedChange.emit(this.expanded.value);
        }
        this.onClick.emit(ev);
        //todo adicionar command
    }

    protected handleItemExpand(expanded: boolean): void {
        if (expanded == this.expanded.value) return;
        this.expanded.value = expanded;
        //nao precisa this.tryInvokeServerLoadFunc();
        this.onExpandedChange.emit(expanded);
    }

    public select(value: boolean): void {
        if (this._isSelected == value) return;
        this._isSelected = value;
        //todo statehaschanged
        this.onActivatedChange.emit(this._isSelected);
    }

    protected selectItem(value: boolean, source: TreeViewItem<T> | undefined = undefined) {
        if (value == this._isChecked) return;
        this._isChecked = value;
        for (let childItem of this._childItems) {
            childItem.selectItem(value, source);
        }
        //todo statehaschanged
        if (source == this) {
            if (this.treeRoot != undefined) {
                this.treeRoot?.updateSelectedItems();
            }
        }
    }

    protected addChildItemaddChildTreeViewItem(item: TreeViewItem<T>): void {
        this._childItems.push(item);
    }

    public getSelectedItems(): TreeViewItem<T>[] {
        //todo ver if(this._isChecked)yield return this;
        let result = [];
        for (let treeItem of this._childItems) {
            for (let selected of treeItem.getSelectedItems()) {
                result.push(selected);
            }
        }
        return result;
    }
}

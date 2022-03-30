import {Div, Lab1, component, Property, Signal} from "@lab1/core"
import {Avatar, Collapse, Icon, ListView, Text, Color, Size, Typo, Material, MaterialComponent} from "../../MaterialExports";
import type {ListItemProps} from "./ListItemProps";

@component
export class ListItem extends MaterialComponent implements ListItemProps {

    //region properties
    readonly childContent = new Property<any>(this, undefined);
    readonly text = new Property<string | undefined>(this, undefined);
    readonly value = new Property<any>(this, Lab1.newID());
    readonly avatar = new Property<string | undefined>(this, undefined);
    readonly href = new Property<string | undefined>(this, undefined);
    readonly forceLoad = new Property<boolean>(this, false);
    readonly avatarClass = new Property<string | undefined>(this, undefined);
    readonly disabled = new Property<boolean>(this, false);
    readonly disableRipple = new Property<boolean>(this, false);
    readonly icon = new Property<string | undefined>(this, undefined);
    readonly iconColor = new Property<Color>(this, Color.Inherit);
    readonly iconSize = new Property<Size>(this, Size.Medium);
    readonly adornmentColor = new Property<Color>(this, Color.Default);
    readonly expandLessIcon = new Property<string>(this, Material.Icons.Filled.ExpandLess);
    readonly expandMoreIcon = new Property<string>(this, Material.Icons.Filled.ExpandMore);
    readonly inset = new Property<boolean>(this, false);
    readonly dense = new Property<boolean>(this, false);
    readonly disableGutters = new Property<boolean>(this, false);
    readonly initiallyExpanded = new Property<boolean>(this, false);
    readonly commandParameter = new Property<any>(this, undefined);
    readonly nestedList = new Property<ListView | undefined>(this, undefined);
    readonly list = new Property<ListView | undefined>(this, undefined);
    readonly expanded = new Property<boolean>(this, false, {
        customSetter: (value) => {
            this.expanded._value = value;
            if (!this.holdRender) this.render();
            this.onExpandedChange.emit(value);
        }
    });
    //endregion

    //#region DOM nodes, events and others
    protected iconDiv?: Div
    protected avatarDiv?: Div
    protected avatarItem?: Avatar
    protected avatarIcon?: Icon
    protected textDiv?: Div
    protected iconItem?: Icon
    protected nestedIcon?: Icon
    protected txtItem?: Text
    protected collapseItem?: Collapse
    protected _selected = false;
    protected textTypo = Typo.body1
    readonly onClick = new Signal<(ev: MouseEvent) => void>();
    readonly onExpandedChange = new Signal<(expanded: boolean) => void>();
    //#endregion

    constructor(props: ListItemProps) {
        super({...{element: document.createElement('div')}, ...props});
        this.readProperties(props, true);
        this.render(true);
        this.element!.onclick = ev => this.handleClick(ev);
        //Add this ListItem into List
        if (this.parent == undefined || (!(this.parent instanceof ListView))) {
            //console.error(this.id, 'List no found as parentComponent');
            return;
        }
        this.list._value = this.parent as ListView;
        this.list.value!.registerItem(this);
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);
        if (this.list.value == undefined) return;//list not set for this component yet. Using list.items=
        //top div
        let divClass = 'mud-list-item';
        if (this.dense.value || this.list.value!.dense.value) divClass += ' mud-list-item-dense';
        if (!this.disableGutters.value && (!this.list.value!.disableGutters.value)) divClass += ' mud-list-item-gutters';
        if (this.list.value!.clickable.value) divClass += ' mud-list-item-clickable';
        if (this.list.value!.clickable.value && (!this.disableRipple.value) && (!this.disabled.value)) divClass += ' mud-ripple';
        if (this._selected && (!this.disabled.value)) divClass += ' mud-selected-item';
        this.setClassAndStyle(divClass, true);
        this.element!.tabIndex = 0;

        this.buildAvatar();
        this.buildIcon();
        this.buildText();
        this.buildNestedList();
    }

    protected buildAvatar(): void {
        if (this.avatar.value) {
            if (!this.avatarDiv) {
                this.avatarDiv = new Div({parent: this, className: 'mud-list-item-avatar'});
                this.avatarItem = new Avatar({parent: this.avatarDiv, className: this.avatarClass});
                this.avatarIcon = new Icon({parent: this.avatarItem,icon: this.avatar, color: this.iconColor, size: this.iconSize});
            }
        } else this.avatarDiv = this.avatarDiv?.delete();
    }

    protected buildIcon(): void {
        if (this.icon.value) {
            if (!this.iconDiv) {
                this.iconDiv = new Div({parent: this, className: 'mud-list-item-icon'});
                this.iconItem = new Icon({parent: this.iconDiv, icon: this.icon, color: this.iconColor, size: this.iconSize});
            }
        } else this.iconDiv = this.iconDiv?.delete();
    }

    protected buildText(): void {
        //TODO adicioanr childcontent
        this.textTypo = (this.dense.value || this.list.value!.dense.value) ? Typo.body2 : Typo.body1;
        if (!this.textDiv) {
            this.textDiv = new Div({parent: this});
            this.txtItem = new Text({parent: this.textDiv, typo: this.textTypo});
        }
        let divClass = 'mud-list-item-text';
        if (this.inset.value) divClass += ' mud-list-item-text-inset';
        this.textDiv.className.value = divClass;
        if (this.text.value) this.txtItem!.childContent.value = this.text.value;
    }

    protected buildNestedList(): void {
        if (this.nestedList.value != undefined) {
            if (!this.nestedIcon) this.nestedIcon = new Icon({parent: this, size: this.iconSize});
            this.nestedIcon.icon.value = this.expanded.value ? this.expandLessIcon.value : this.expandMoreIcon.value;
            this.nestedIcon.color.value = this.adornmentColor.value;
            if (this.list.value != undefined) this.nestedList.value!.clickable.value = this.list.value?.clickable.value;
            this.nestedList.value!.disablePadding.value = true;
            this.nestedList.value!.element!.className = 'mud-nested-list';
            this.nestedList.value!.disabled.value = this.disabled.value;
            if (!this.collapseItem) {
                this.collapseItem = new Collapse({internalID: 'collapse', parent: this.parent, expanded: this.expanded});
                this.nestedList.value!.parent = this.collapseItem;
                this.collapseItem.innerDiv.element?.appendChild(this.nestedList.value!.element!);//fixme do not use innerDiv directly.
                this.nestedList.value!.parentList = this.list.value;
                //this.parentComponent?.element!.appendChild(this.nestedList!.element!);
                this.list.value!.registerList(this.nestedList.value);
            }
            //this.collapseItem.expanded.value=this.expanded.value;
            // if(this.nestedList.parentComponent!=this){
            //     this.nestedList.parentComponent=this;
            //     this.nestedList.parentList=this.list;
            //     this.parentComponent?.element!.appendChild(this.nestedList!.element!);
            //     this.list?.registerList(this.nestedList);
            // }
        } else this.nestedIcon = this.nestedIcon?.delete();
    }

    protected handleClick(ev: MouseEvent): void {
        console.log('(ListItem)handleClick')
        ev.stopPropagation();
        if (this.disabled.value) return;
        //console.log('(ListItem)clicou no component',this.id)
        if (this.nestedList.value) this.expanded.value = !this.expanded.value;
        else if (this.href.value) {
            this.list.value?.setSelectedValue(this.value.value);
            this.onClick.emit(ev);
            window.open(this.href.value, '_self');
        } else {
            console.log('(ListItem)handleClick2')
            this.onClick.emit(ev);
            this.list.value?.emitItemClick(this);
            this.list.value?.setSelectedValue(this.value.value);
        }
    }

    public setSelected(selected: boolean): void {
        if (this.disabled.value) return;
        if (this._selected == selected) return;
        this._selected = selected;
        this.render();
    }
}

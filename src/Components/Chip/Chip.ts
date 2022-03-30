import {component, IComponent, Component, Lab1, Property, Signal, StringHelper} from "@lab1/core";
import {ChipSet, Color, Material, MaterialComponent, Size, Variant} from "../../MaterialExports";
import type {ChipProps} from './ChipProps';

@component
export class Chip extends MaterialComponent implements ChipProps {

    //region properties
    readonly color = new Property<Color>(this, Color.Default);
    readonly size = new Property<Size>(this, Size.Medium);
    readonly variant = new Property<Variant>(this, Variant.Filled);
    readonly selectedColor = new Property<Color>(this, Color.Inherit);
    readonly avatar = new Property<string | undefined>(this, undefined);
    readonly avatarClass = new Property<string | undefined>(this, undefined);
    readonly label = new Property<boolean>(this, false);
    readonly disabled = new Property<boolean>(this, false);
    readonly icon = new Property<string | undefined>(this, undefined);
    readonly checkedIcon = new Property<string>(this, Material.Icons.Filled.Check);
    readonly iconColor = new Property<Color>(this, Color.Inherit);
    readonly closeIcon = new Property<string | undefined>(this, undefined);
    readonly disableRipple = new Property<boolean>(this, false);
    readonly link = new Property<string | undefined>(this, undefined);
    readonly target = new Property<string | undefined>(this, undefined);
    readonly text = new Property<string | undefined>(this, undefined);
    readonly value = new Property<any>(this, undefined);
    readonly forceLoad = new Property<boolean>(this, false);
    readonly default = new Property<boolean | undefined>(this, undefined);
    //protected properties
    protected readonly isSelected = new Property<boolean>(this, false, {
        customGetter: () => {
            return this._isSelected
        }
    });
    //endregion

    //region Events and others
    readonly onClick = new Signal<(ev: MouseEvent) => void>();
    readonly onClose = new Signal<(chip: Chip) => void>();
    public chipSet?: ChipSet
    protected _isSelected = false;
    get isChecked(): boolean {
        return this._isSelected && this.chipSet?.filter.value == true
    }
    //endregion

    constructor(props: ChipProps) {
        super(props);
        this.readProperties(props, true);
        if (this.value.value == undefined) this.value.value = this;
        this.chipSet?.add(this);
        this.render(true);
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);
        let className = this.buildCssClasses();

        let content = Lab1.Div({
            tabIndex: 0,
            className: className,
            style: this.style,
            onClick: (ev) => this.handleClick(ev),
            childContent: [
                //first child
                (!StringHelper.isNullOrEmpty(this.avatar.value)) ? this.buildAvatar() :
                    (!StringHelper.isNullOrEmpty(this.icon.value)) && !this.isChecked ? this.buildIcon() :
                        this.isChecked ? this.buildCheckedIcon() : null,
                //second child
                Lab1.Span({
                    className:'mud-chip-content',
                    childContent:[
                        this.text.value,
                        //close icon
                        this.onClose.hasConnections() || this.chipSet?.allClosable?this.buildCloseIcon():null
                    ]
                })
            ]
        });

        this.buildManaged(this, content);
    }

    //todo esse metodo abaixo deve ficar automatico no Lab1Manager
    public addChildComponent(component:Component):void{
        //console.log('(Chip)addChildItem:',component);
        this.element=component.element;
        this.parent?.addChildComponent(this);
        if (this.parent?.isLayout) this.parent.render();
    }

    protected buildAvatar(): IComponent {
        return Material.Avatar({
            className: this.avatarClass,
            color:this.color,
            childContent:Material.Icon({
                icon:this.avatar
            })
        });
    }

    protected buildIcon(): IComponent {
        return Material.Icon({
            icon:this.icon,
            className:'mud-chip-icon',
            size:Size.Small,
            color:this.iconColor
        });
    }

    protected buildCheckedIcon(): IComponent {
        return Material.Icon({
            icon:this.checkedIcon,
            className:'mud-chip-icon',
            size:Size.Small
        });
    }

    protected buildCloseIcon():IComponent{
        return Material.IconButton({
            className:'mud-chip-close-button',
            icon:StringHelper.isNullOrEmpty(this.closeIcon.value)?Material.Icons.Filled.Cancel:this.closeIcon.value,
            onClick:(ev)=>this.handleClose(ev),
            size:Size.Small
        });
    }

    protected buildCssClasses(): string {
        let className = 'mud-chip';
        className += ` mud-chip-${this.getVariant()}`;
        className += ` mud-chip-size-${this.size}`;
        className += ` mud-chip-color-${this.getColor()}`;
        if (!this.chipSet?.readOnly.value && this.onClick.hasConnections()) className += ' mud-clickable';
        if (!this.chipSet?.readOnly.value && this.onClick.hasConnections() && !this.disableRipple.value) className += ' mud-ripple';
        if (this.label.value) className += ' mud-chip-label';
        if (this.disabled.value) className += ' mud-disabled';
        if (this.isSelected.value) className += ' mud-chip-selected';
        if (!StringHelper.isNullOrEmpty(this.className.value)) className += ' ' + this.className.value;
        return className;
    }

    //Logic==========================================

    protected getVariant(): Variant {
        switch (this.variant.value) {
            case Variant.Text:
                if (this.isSelected.value) return Variant.Filled;
                return Variant.Text;
            case Variant.Filled:
                if (this.isSelected.value) return Variant.Text;
                return Variant.Filled;
            case Variant.Outlined:
                return Variant.Outlined;
            default:
                return this.variant.value;
        }
    }

    protected getColor(): Color {
        if (this.isSelected.value && this.selectedColor.value != Color.Inherit) return this.selectedColor.value;
        else if (this.isSelected.value && this.selectedColor.value == Color.Inherit) return this.color.value;
        else return this.color.value;
    }

    protected handleClick(ev: MouseEvent): void {
        if (this.chipSet?.readOnly.value) return;
        this.chipSet?.handleChipClick(this);
        if (this.link.value && !this.disabled.value) window.open(this.link.value, this.target.value);
        this.onClick.emit(ev);
    }

    protected handleClose(ev: MouseEvent): void {
        if (this.chipSet?.readOnly.value) return;
        this.onClose.emit(this);
        this.chipSet?.handleChipDelete(this);
    }
}

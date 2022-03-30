import {Component, Div, component, Property, StringHelper, TypescriptHelper, NumberHelper} from "@lab1/core";
import type {MenuProps} from './MenuProps';
import {Color, Size, Variant, Origin, MaterialMouseEvent, Button, MenuItem, IconButton, Overlay, Popover, ListView, ListItem, MaterialComponent} from "../../MaterialExports";

@component
export class Menu extends MaterialComponent implements MenuProps {

    //region properties
    readonly text = new Property<string | undefined>(this, undefined);
    readonly listClass = new Property<string | undefined>(this, undefined);
    readonly popoverClass = new Property<string | undefined>(this, undefined);
    readonly icon = new Property<string | undefined>(this, undefined);
    readonly iconColor = new Property<Color>(this, Color.Inherit);
    readonly startIcon = new Property<string | undefined>(this, undefined);
    readonly endIcon = new Property<string | undefined>(this, undefined);
    readonly color = new Property<Color>(this, Color.Default);
    readonly size = new Property<Size>(this, Size.Medium);
    readonly variant = new Property<Variant>(this, Variant.Text);
    readonly dense = new Property<boolean>(this, false);
    readonly fullWidth = new Property<boolean>(this, false);
    readonly maxListHeight = new Property<number | undefined>(this, undefined);
    readonly positionAtCursor = new Property<boolean>(this, false);
    readonly activatorContent = new Property<Component | undefined>(this, undefined);
    readonly activationEvent = new Property<MaterialMouseEvent>(this, MaterialMouseEvent.LeftClick);
    readonly anchorOrigin = new Property<Origin>(this, Origin.TopLeft);
    readonly transformOrigin = new Property<Origin>(this, Origin.TopLeft);
    readonly lockScroll = new Property<boolean>(this, false);
    readonly disabled = new Property<boolean>(this, false);
    readonly disableRipple = new Property<boolean>(this, false);
    readonly disableElevation = new Property<boolean>(this, false);
    private readonly popoverStyle = new Property<string | undefined>(this, undefined);
    readonly isOpen = new Property<boolean>(this, false);
    readonly childContent = new Property<MenuItem[]>(this, [], {
        customSetter: (value) => {
            this.childContent._value = value;
            for (let component of value) {
                component.menu = this;
            }
            if (!this.holdRender) this.render();
        }
    });
    //endregion

    //region DOM nodes and others
    private activatorContentDiv?: Div
    private buttonItem?: Button
    private iconButtonItem?: IconButton
    private overlay?: Overlay
    private _isMouseOver = false;
    private popover!: Popover
    private list?: ListView
    //endregion

    constructor(props: MenuProps) {
        super({...{element: document.createElement('div')}, ...props});
        this.readProperties(props, true);
        this.render(true);
        //Events
        this.element!.onmouseenter = (ev) => {
            if (this.activationEvent.value == MaterialMouseEvent.MouseOver) this.openMenu(ev);
        };
        this.element!.onmouseleave = (ev) => this.mouseLeave();
        this.element!.oncontextmenu = (ev) => {
            if (this.activationEvent.value == MaterialMouseEvent.RightClick) ev.preventDefault();
        }
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);
        //Div
        this.setClassAndStyle('mud-menu', true);
        //ActivatorContent
        this.buildChild({holder: 'activatorContentDiv', builderFunction: () => this.buildActivationContent(), condition: this.activatorContent.value != undefined});
        //StartIcon
        this.buildChild({holder: 'buttonItem', builderFunction: () => this.buildButtonItem(), condition: this.activatorContent.value == undefined && StringHelper.isNullOrWhiteSpace(this.icon.value)});
        //Default Icon
        this.buildChild({holder: 'iconButtonItem', builderFunction: () => this.buildIconButton(), condition: !this.activatorContentDiv && !this.buttonItem});
        //Popover (always rendered)
        this.buildPopover();
        //Overlay (always rendered)
        this.buildOverlay();
    }

    protected buildActivationContent(): Component {
        if (!this.activatorContentDiv) {
            this.activatorContentDiv = new Div({parent: this, disabled: this.disabled});
            this.activatorContentDiv.onClick.connect((ev) => this.toggleMenu(ev));
            this.activatorContentDiv.onContextMenu.connect((ev) => {
                if (this.activationEvent.value == MaterialMouseEvent.RightClick) this.toggleMenu(ev);
            });
        }
        let className = 'mud-menu-activator';
        if (this.disabled.value) className += ' mud-disabled';
        this.activatorContentDiv.className.value = className;
        if (this.activatorContent.value) this.activatorContentDiv.addChildComponent(this.activatorContent.value);
        return this.activatorContentDiv;
    }

    protected buildButtonItem(): Component {//no activatorContent and no icon set.
        if (!this.buttonItem) {
            this.buttonItem = new Button({
                parent: this,
                startIcon: this.startIcon,
                endIcon: this.endIcon,
                iconColor: this.iconColor,
                color: this.color,
                size: this.size,
                variant: this.variant,
                disabled: this.disabled,
                disableRipple: this.disableRipple,
                disableElevation: this.disableElevation,
                text: this.text
            });
            this.buttonItem.onClick.connect((ev) => this.toggleMenu(ev));
            this.buttonItem.onContextMenu.connect((ev) => {
                if (this.activationEvent.value == MaterialMouseEvent.RightClick) this.toggleMenu(ev);
            })
        }
        return this.buttonItem;
    }

    protected buildIconButton(): Component {//when using icon and no activationContent
        if (!this.iconButtonItem) {
            this.iconButtonItem = new IconButton({
                parent: this,
                variant: this.variant,
                icon: this.icon,
                color: this.color,
                size: this.size,
                disabled: this.disabled,
                disableRipple: this.disableRipple,
                disableElevation: this.disableElevation,
                label: this.text
            });
            this.iconButtonItem.onClick.connect((ev) => this.toggleMenu(ev));
            this.iconButtonItem.onContextMenu.connect((ev) => {
                if (this.activationEvent.value == MaterialMouseEvent.RightClick) this.toggleMenu(ev)
            });
        }
        return this.iconButtonItem;
    }

    protected buildPopover(): void {
        if (!this.popover) {
            //console.log('criando popover. Items:',this.items.value)
            this.popover = new Popover({
                parent: this,
                className: this.popoverClass,
                maxHeight: this.maxListHeight,
                anchorOrigin: this.anchorOrigin,
                transformOrigin: this.transformOrigin,
                relativeWidth: this.fullWidth,
                open: this.isOpen,
                style: this.popoverStyle,
                //childContent:list
            });
            this.popover.onContextMenu.connect((ev) => {
                if (this.activationEvent.value == MaterialMouseEvent.RightClick) ev.preventDefault();
            });
        }
        //Menu destroys the list when not open
        if (!this.list && this.isOpen.value) {
            //hack, mudar isso abaixo
            let items: ListItem[] = [];
            for (let component of this.childContent.value) {
                //console.log('criando listItem:',component.label.value, '.Dense:',this.dense.value)
                items.push(new ListItem({text: component.text, disabled: component.disabled, dense: this.dense}))
            }
            //mudar hack acima pq o ListView espera ListItem e nao MenuItem
            this.list = new ListView({parent: this.popover, className: this.listClass, clickable: true, dense: this.dense, childContent: items});
            this.list.onMouseEnter.connect((ev) => this.popoverMouseEnter());
            this.list.onMouseLeave.connect((ev) => {
                if (this.activationEvent.value == MaterialMouseEvent.MouseOver) this.closeMenu();
            })
        } else this.list = this.list?.delete();
    }

    protected buildOverlay(): void {
        if (!this.overlay) {
            this.overlay = new Overlay({parent: this, lockScroll: this.lockScroll});
            this.overlay.onClick.connect((ev) => this.toggleMenu(ev));
        }
        this.overlay.visible.value = this.isOpen.value && this.activationEvent.value != MaterialMouseEvent.MouseOver;
    }

    public closeMenu(): void {
        this.isOpen.value = false;
        this._isMouseOver = false;
        this.popoverStyle.value = undefined;
    }

    protected openMenu(args: any): void {
        if (this.disabled.value) return;
        if (this.positionAtCursor.value) this.setPopoverStyle(args);
        this.isOpen.value = true;
    }

    protected popoverMouseEnter(): void {
        this._isMouseOver = true;
    }

    // Sets the popover style ONLY when there is an activator
    protected setPopoverStyle(args: MouseEvent): void {
        this.anchorOrigin.value = Origin.TopLeft;
        this.popoverStyle.value = `margin-top: ${NumberHelper.toPixel(args?.offsetY)}; margin-left: ${NumberHelper.toPixel(args?.offsetX)};`
    }

    protected toggleMenu(args: MouseEvent): void {
        if (this.disabled.value) return;
        if (this.activationEvent.value == MaterialMouseEvent.LeftClick && args.button != 0 && !this.isOpen.value) return;
        if (this.activationEvent.value == MaterialMouseEvent.RightClick && args.button != 2 && !this.isOpen.value) return;
        if (this.isOpen.value) this.closeMenu();
        else this.openMenu(args);
    }

    //Implementation of IActivatable.Activate, toggles the menu.
    protected activate(activator: object, args: MouseEvent): void {
        this.toggleMenu(args);
    }

    protected async mouseLeave(): Promise<void> {
        await TypescriptHelper.delay(100);
        if (this.activationEvent.value == MaterialMouseEvent.MouseOver && !this._isMouseOver) this.closeMenu();
    }
}

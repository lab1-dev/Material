import {ArrayHelper, Lab1, component, Property, Signal, StringHelper} from "@lab1/core";
import {BaseInput, Input, InputControl, ListItem, ListView, Overlay, Popover, Adornment, InputType, Origin, Size, Material} from "../../MaterialExports";
import type {AutoCompleteProps} from "./AutoCompleteProps";

@component
export class AutoComplete<T=string> extends BaseInput<T> implements AutoCompleteProps<T> {

    //region properties
    readonly popoverClass = new Property<string | undefined>(this, undefined);
    readonly anchorOrigin = new Property<Origin>(this, Origin.BottomCenter);
    readonly transformOrigin = new Property<Origin>(this, Origin.TopCenter);
    readonly dense = new Property<boolean>(this, false);
    readonly openIcon = new Property<string>(this, Material.Icons.Filled.ArrowDropDown);
    readonly closeIcon = new Property<string>(this, Material.Icons.Filled.ArrowDropUp);
    readonly maxListHeight = new Property<number>(this, 300);
    readonly maxItems = new Property<number>(this, 10);
    readonly minCharacters = new Property<number>(this, 0);
    readonly resetValueOnEmptyText = new Property<boolean>(this, false);
    readonly debounceInterval = new Property<number>(this, 100);
    readonly itemTemplate = new Property<any>(this, undefined);
    readonly itemSelectedTemplate = new Property<any>(this, undefined);
    readonly itemDisabledTemplate = new Property<any>(this, undefined);
    readonly coerceText = new Property<boolean>(this, true);
    readonly coerceValue = new Property<boolean>(this, false);
    readonly selectValueOnTab = new Property<boolean>(this, false);
    readonly clearable = new Property<boolean>(this, false);
    protected readonly currentIcon=new Property<string|undefined>(this,undefined);
    protected readonly items=new Property<T[]|undefined>(this,undefined);
    protected readonly isOpen = new Property<boolean>(this, false,{
        customSetter:(value)=>{
            this.isOpen._value=value;
            this.updateIcon();
            this.onOpenChange.emit(value);
            console.log('(isOpen setter). Is Open:',value);
            if(!this.holdRender) this.render();
        }
    });
    searchFunc?: (text: string) => T[]
    //endregion

    //region DOM nodes, events and others
    readonly onClearButtonClick = new Signal<(ev: MouseEvent) => void>();
    readonly onOpenChange = new Signal<(isOpen:boolean) => void>();
    private _selectedListItemIndex = 0;
    private _enabledItemIndices: number[] = [];
    private inputControl?: InputControl
    private input?: Input<string>
    private popover?: Popover
    private listView?:ListView
    private overlay?: Overlay
    _componentId=Lab1.newID();//We need a random id for the year items in the year list so we can scroll to the component safely in every DatePicker.
    //endregion

    constructor(props: AutoCompleteProps<T>) {
        super({...{element: document.createElement('div')}, ...props});

        //AutoComplete properties
        this.readProperties(props, true);
        this.adornment.value = Adornment.End;
        this.iconSize.value = Size.Medium;
        //BaseInput
        this.afterPropertiesSet();
        //mud AutoComlete OnInitialized below
        this.updateIcon();
        let text = this.getItemString((this.value.value as any));
        if (!StringHelper.isNullOrWhiteSpace(text)) {
            this.text.value = text;
        }

        //Let's write the properties into the DOM
        this.render(true);
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);

        //Div
        this.setClassAndStyle('mud-select mud-autocomplete', false);

        this.buildInput(firstRender);
        this.buildPopover(firstRender);
        this.buildInputControl(firstRender);
        this.buildOverlay(firstRender);
    }

    protected buildInput(firstRender:boolean):void{
        if(!this.input){
            this.input = new Input<string>({
                inputType: InputType.Text,
                holdRender:true,
                //todo ver o key
                className: 'mud-select-input',
                marginType: this.marginType,
                variant: this.variant,
                textUpdateSuppression: this.textUpdateSuppression,
                value: this.text,
                disableUnderline: this.disableUnderline,
                disabled: this.disabled,
                readOnly: this.readOnly,
                error: this.error,
                adornment: this.adornment,
                adornmentColor: this.adornmentColor,
                iconSize: this.iconSize,
                adornmentText: this.adornmentText,
                clearable: this.clearable,
                placeholder: this.placeholder,
                immediate: true,
                inputMode: this.inputMode,
                pattern: this.pattern,
                adornmentIcon:this.currentIcon
            });
            this.input.onAdornmentClick.connect((ev) => this.onAdornmentClick.emit(ev));
            this.input.onClearButtonClick.connect((ev) => this.onClearButtonClick.emit(ev));
            //todo adicionar atributes no input
            this.input.onTextChange.connect((txt) => this.handleTextChange(txt));
            this.input.onBlur.connect((ev) => this.handleBlur(ev));
            this.input.onKeyDown.connect((ev) => this.handleKeyDown(ev));
            this.input.onKeyUp.connect((ev) => this.handleKeyUp(ev));
        }
        this.input.holdRender=true;
        this.input.element!.setAttribute('autocomplete', 'mud-disabled-' + Lab1.newID());
        this.input.render(firstRender);
    }

    protected buildPopover(firstRender:boolean):void{
        console.log('buildPopover')
        if(!this.popover){
            this.popover = new Popover({
                holdRender:true,
                open: this.isOpen,
                maxHeight: this.maxListHeight,
                anchorOrigin: this.anchorOrigin,
                transformOrigin: this.transformOrigin,
                className:this.popoverClass,
                relativeWidth: true
            });
        }
        this.popover.holdRender=true;
        this.buildPopoverItems();
        this.popover.render(firstRender);
    }

    protected buildPopoverItems():void{
        console.log('buildPopoverItems. Items:',this.items.value?.length);
        //We destroy the list when popover is not open
        if(this.listView)this.listView=this.listView?.delete();
        if (!ArrayHelper.isNullOrEmpty(this.items.value)) {
            let listItems:ListItem[]=[];
            for (let index = 0; index < this.items.value!.length; index++) {
                let component = this.items.value![index];
                let isSelected = index == this._selectedListItemIndex;
                let isDisabled = this._enabledItemIndices.indexOf(index) == -1
                let listItem = new ListItem({
                    id: this.getListItemID(index),
                    //todo disabled: isDisabled,
                });
                listItem.element?.setAttribute('key', (component as any).toString());
                listItem.onClick.connect((ev) => this.selectOption(component))
                let listItemChildContent;
                if (!this.itemTemplate.value) {
                    listItem.text.value= this.getItemString(component);
                } else if (isDisabled && this.itemDisabledTemplate.value != undefined) {
                    listItemChildContent = this.itemDisabledTemplate.value(component);
                } else if (isSelected) {
                    if (!this.itemSelectedTemplate.value) {
                        this.itemTemplate.value(component);
                    } else {
                        this.itemSelectedTemplate.value(component);
                    }
                } else {
                    this.itemTemplate.value(component);
                }
                if(listItemChildContent) listItem.childContent.value = listItemChildContent;
                listItems.push(listItem);
            }
            this.listView = new ListView({
                parent:this.popover,
                clickable: true,
                dense: this.dense,
                childContent:listItems
            });
        }
        // else {
        //     console.log('destroying listview')
        //     this.listView=this.listView?.destroy();
        // }
    }

    protected buildInputControl(firstRender:boolean):void{
        if(!this.inputControl){
            let renderFragment=new DocumentFragment();
            renderFragment.appendChild(this.input?.element!)
            renderFragment.appendChild(this.popover?.fakeDiv!);//we do not send the popover content

            this.inputControl = new InputControl({
                parent: this,
                label: this.label,
                variant: this.variant,
                helperText: this.helperText,
                helperTextOnFocus: this.helperTextOnFocus,
                marginType: this.marginType,
                className: 'mud-select',//todo adicionar o class tambem
                style: this.style,
                error: this.error,
                errorText: this.errorText,
                disabled: this.disabled,
                required: this.required,
                inputContent: renderFragment
            });
        }
        //hack to set the parentComponent of popover. todo talvez mudar
        this.popover!.parent=this.inputControl;
        this.popover?.render(true);
        this.inputControl.onClick.connect((ev) => this.toggleMenu());
    }

    protected buildOverlay(firstRender:boolean):void{
        //todo this.overlay = new Overlay({
        //     //todo
        //     //visible:this.isOpen
        //     //lockScroll:false
        // });
        // this.overlay.onClick.connect((ev) => this.toggleMenu());
    }

    public selectOption(value: T): void {
        this.holdRender=true;
        this.setValueAsync(value);
        if (this.items.value != undefined) this._selectedListItemIndex = this.items.value.indexOf(value);
        let optionText = this.getItemString(value);
        this.setTextAsync(optionText, false);
        this.isOpen.value = false;
        this.beginValidate();
        this.input?.setText(optionText);
        //todo ver se precisa chamar render novamente aqui.
        this.render();
        console.log('selectOption. Selected text:', this.text.value, '.Input Text:',this.input?.text.value,'.Optiontext:',optionText)
        this.input?.focusAsync();
    }

    public toggleMenu(): void {//Toggle the menu (if not disabled or not readonly, and is opened).
        if ((this.disabled.value || this.readOnly.value) && (!this.isOpen.value)) return;
        console.log('toggleMenu');
        this.changeMenu(!this.isOpen.value);
    }

    protected changeMenu(open: boolean): void {
        this.holdRender=true;//to avoid unnecessary render calls
        this.isOpen.value = open;
        console.log('(AutoComplete)changeMenu.IsOpen:',open);
        if (open) {
            this.input?.selectAsync();
            this.onSearchAsync();
        } else {
            this.restoreScrollPosition();
            this.coerceTextToValue();
        }
        console.log('(AutoComplete)changeMenu.Items:',this.items.value?.length);
        this.render();
    }

    protected updateIcon(): void {
        this.currentIcon.value = !StringHelper.isNullOrWhiteSpace(this.adornmentIcon.value) ? this.adornmentIcon.value : this.isOpen.value ? this.closeIcon.value : this.openIcon.value;
    }

    protected updateTextPropertyAsync(updateValue: boolean): void {
        //timer.dispose
        super.updateTextPropertyAsync(updateValue);
    }

    protected updateValuePropertyAsync(updateText: boolean): void {
        console.log('updatevaluepropertyasync',this.debounceInterval.value)
        //timer.dispose
        if (this.resetValueOnEmptyText.value && StringHelper.isNullOrWhiteSpace(this.text.value)) {
            this.setValueAsync(undefined, updateText);//todo alterar o undefined para default(t)
        }
        if (this.debounceInterval.value <= 0) {
            this.onSearchAsync();
        } else {
            setTimeout(()=>this.onTimerComplete(), this.debounceInterval.value);
        }
    }

    private onTimerComplete(): void {
        this.onSearchAsync();
    }

    protected onSearchAsync(): void {
        console.log('(onSearchAsync');
        if (this.minCharacters.value > 0 && (StringHelper.isNullOrWhiteSpace(this.text.value) || this.text.value!.length < this.minCharacters.value)) {
            this.isOpen.value = false;
            console.log('fechando popup')
            //todo ver se precisa fazer render
            return;
        }
        let searchedItems: T[] = [];
        if (this.searchFunc) searchedItems = this.searchFunc(this.text.value ?? '');
        if (this.maxItems.value) {
            searchedItems = searchedItems.slice(0, this.maxItems.value);
        }
        this.items.value = searchedItems;
        //todo ver o resto aqui
        if(ArrayHelper.isNullOrEmpty(this.items.value)){
            this.coerceValueToText();
            //todo statehaschanged
            return;
        }
        console.log('(onSearchAsync)items:',this.items.value?.length)
        this.isOpen.value=true;
    }

    public clear(): void {
        this.isOpen.value = false;
        this.setTextAsync('', false);
        this.coerceValueToText();
        this.input?.setText('');
        //todo ver se precisa chamar render
    }

    protected resetValue(): void {
        this.clear();
        super.resetValue();
    }

    protected getItemString(component: T): string {
        if (!component) return '';
        return component as any;
    }

    protected handleKeyDown(ev: KeyboardEvent): void {
        //super.handleKeyDown(ev);
        switch (ev.key.toLowerCase()) {
            case 'tab':
                if (!this.isOpen.value) return;
                if (this.selectValueOnTab.value) this.handleEnterKey();
                else this.isOpen.value = false;
                break;
        }
    }

    protected handleKeyUp(args: KeyboardEvent): void {
        if (this.keyUpPreventDefault.value) return;//todo ver se posso fazer isso ao inves de preventdefault.
        console.log('key up:',args.key.toLowerCase());
        switch (args.key.toLowerCase()) {
            case 'enter':
            case 'numpadenter':
                if (!this.isOpen.value) {
                    this.toggleMenu();
                } else {
                    this.handleEnterKey();
                }
                break;
            case 'arrowdown':
                if(!this.isOpen.value){
                    this.toggleMenu();
                }else{
                    let index=this._enabledItemIndices.indexOf(this._selectedListItemIndex);
                    console.log('selectedListItemIndex:',this._selectedListItemIndex, '.Index:',index)
                    let increment=0;
                    if(index>=0 && this._enabledItemIndices.length>index)increment=this._enabledItemIndices[index+1]-this._selectedListItemIndex;
                    this.selectNextItem(increment<0?1:increment);
                }
                break;
            case 'arrowup':
                if(args.altKey){
                    this.changeMenu(false);
                }else if(!this.isOpen.value){
                    this.toggleMenu();
                }else{
                    let index=this._enabledItemIndices.indexOf(this._selectedListItemIndex);
                    let decrement=0;
                    if(index>=0 && (index-1)>=0)decrement=this._enabledItemIndices[index-1]
                    this.selectNextItem(-(decrement<0?1:decrement));
                }
                break;
            case 'escape':
                this.changeMenu(false);
                break;
            case 'tab':
                //todo task.delay
                if(!this.isOpen.value)return;
                if(this.selectValueOnTab.value)this.handleEnterKey();
                else this.toggleMenu();
                break;
            case 'backspace':
                if(args.ctrlKey && args.shiftKey){
                    this.reset();
                }
                break;
        }

        super.handleKeyUp(args);
    }

    protected selectNextItem(increment: number): void {
        if(ArrayHelper.isNullOrEmpty(this.items.value) || this._enabledItemIndices.length==0)return;
        this._selectedListItemIndex=Math.max(0,Math.min(this.items.value!.length-1,this._selectedListItemIndex+increment));
        console.log('selectNextItem. SelectedListItemIndex:',this._selectedListItemIndex)
        this.scrollToListItem(this._selectedListItemIndex,increment);
        //todo ver se precisa do render aqui
    }

    //Scroll to a specific component in the Autocomplete list of items.
    public scrollToListItem(index: number, increment: number): void {
        let id=this.getListItemID(index);
        //id of the scrolled element
        //increment 1 down; -1 up
        //onEdges, last param, boolean. If true, only scrolls when elements reaches top or bottom of container.
        //If false, scrolls always
        //todo adicionar scrollmanager aqui e verificar se precisa de render
    }

    protected restoreScrollPosition(): void {
        if(this._selectedListItemIndex!=0)return;
        //todo usar scrollmanager
    }

    protected getListItemID(index: number): string {
        return `${this._componentId}_item${index}`;
    }

    protected handleEnterKey(): void {
        if(!this.isOpen.value)return;
        if(ArrayHelper.isNullOrEmpty(this.items.value))return;
        if(this._selectedListItemIndex>=0 && this._selectedListItemIndex<this.items.value!.length)return this.selectOption(this.items.value![this._selectedListItemIndex]);
    }

    protected handleBlur(ev: FocusEvent): void {
        this.onBlur.emit(ev);
        // we should not validate on blur in autocomplete, because the user needs to click out of the input to select a value,
        // resulting in a premature validation. thus, don't call base
        //super.handleBlur(ev);
    }

    protected coerceTextToValue(): void {
        if(!this.coerceText.value)return;
        if(!this.value.value){
            return this.setTextAsync('',false);
        }
        let actualvalueStr=this.getItemString(this.value.value);
        if(actualvalueStr.toLowerCase()!=this.text.value?.toLowerCase()){
            this.setTextAsync(actualvalueStr);
        }
    }

    protected coerceValueToText(): void {
        if(!this.coerceValue.value)return;
        let value=this.text.value;
        return this.setValueAsync(value,false);
    }

    public focusAsync(): void {//Focus the input in the Autocomplete component.
        this.input?.focusAsync();
    }

    public selectAsync(): void {//Select all text within the Autocomplete input.
        this.input?.selectAsync();
    }

    public selectRangeAsync(pos1: number, pos2: number): void {
        this.input?.selectRangeAsync(pos1,pos2);
    }

    protected handleTextChange(text: string): void {
        this.onTextChange.emit(text)
        if(!text)return;
        this.setTextAsync(text,true)
    }

    public getInputType(): InputType {
        return InputType.Text;
    }
}

import {ArrayHelper, Lab1, List, component, Property, Signal, StringHelper} from "@lab1/core";
import {BaseInput, Input, InputControl, ListItem, ListView, Overlay, Popover, SelectItem, Adornment, InputType, Origin, Size, Material} from "../../MaterialExports";
import type {SelectProps} from "./SelectProps";

@component
export class Select<T=string> extends  BaseInput<T> implements SelectProps<T>{

    //region properties
    readonly popoverClass = new Property<string|undefined>(this, undefined);
    readonly dense = new Property<boolean>(this, false);
    readonly openIcon = new Property<string>(this,Material.Icons.Filled.ArrowDropDown);
    readonly closeIcon = new Property<string>(this,Material.Icons.Filled.ArrowDropUp);
    readonly selectAll = new Property<boolean>(this,false);
    readonly selectAllText = new Property<string>(this,'Select all');
    readonly delimiter = new Property<string>(this,", ");
    readonly multiSelection = new Property<boolean>(this,false);
    readonly childContent = new Property<SelectItem<T>[]>(this,[]);
    readonly maxListHeight = new Property<number>(this,300);
    readonly anchorOrigin = new Property<Origin>(this,Origin.TopCenter);
    readonly transformOrigin = new Property<Origin>(this,Origin.TopCenter);
    readonly strict = new Property<boolean>(this,false);
    readonly clearable = new Property<boolean>(this,false);
    readonly lockScroll = new Property<boolean>(this,false);
    readonly checkedIcon = new Property<string>(this,Material.Icons.Filled.CheckBox);
    readonly uncheckedIcon = new Property<string>(this,Material.Icons.Filled.CheckBoxOutlineBlank);
    readonly indeterminateIcon = new Property<string>(this,Material.Icons.Filled.IndeterminateCheckBox);
    protected readonly currentIcon=new Property<string|undefined>(this,undefined);
    readonly selectedValues = new Property<T[]>(this,[],{//todo ver o getter
        customSetter:(value)=>{
            let set=new List(value);
            let selectedValuesList=new List(Array.from(this._selectedValues.values()));
            if(this.selectedValues.value.length==set.Count() && selectedValuesList.All(x=>set.Contains(x!)))return;
            this._selectedValues=new Set<T>(value);
            //todo selectionchangedFromOutside
            if(!this.multiSelection.value)this.setValueAsync(Array.from(this._selectedValues.values())[0])
            else{
                if(this.multiSelectionTextFunc!=undefined){
                    this.setCustomizedTextAsync(this.selectedValues.value.join(this.delimiter.value),true,
                        this.selectedValues.value as any as string[], this.multiSelectionTextFunc);
                }else{
                    this.setTextAsync(this.selectedValues.value.join(this.delimiter.value),false)
                }
            }
            this.selectedValuesChanged.emit(this.selectedValues.value);
            if(this.multiSelection.value /*todo ver typeoftypeof T=='string'*/){
                this.setValueAsync(this.text.value,false);
            }
            this.render(false);
    }});
    //endregion

    //region other getters and setters
    canRenderValue=false;//todo
    selectAllCheckBoxIcon:string=''//todo
    protected get isValueInList():boolean{
        if(this.value.value==undefined)return false;
        //todo shadown return this._shadowLookup
        return true;
    }
    //endregion

    //region DOM nodes, events and others
    private _selectedValues=new Set<T>();
    private _dense=false;
    private multiSelectionText?:string
    private _selectAllChecked?:boolean
    private inputControl?:InputControl
    private input?:Input<T>
    private popover?:Popover
    private list?:ListView
    private overlay?:Overlay
    private _isOpen=false;
    private _elementID='select_'+Lab1.newID();
    // protected get _items(){
    //     return this.items._value;
    // }
    protected _valueLookup= new Map<T, SelectItem<T>>();
    protected _shadowLookup= new Map<T, SelectItem<T>>();
    private _activeItemId:any;
    getInputType(): InputType {return InputType.Text};
    multiSelectionTextFunc?:(list:string[]|undefined, )=>string|undefined
    readonly selectedValuesChanged = new Signal<(values: T[]) => void>();
    readonly onClearButtonClick = new Signal<(ev:MouseEvent) => void>();
    //endregion

    //#region constructor
    constructor(props:SelectProps<T>) {
        super({...{element:document.createElement('div')}, ...props});
        //Select properties
        this.readProperties(props,true);
        //blazor constructor
        this.adornment.value=Adornment.End;
        this.iconSize.value=Size.Medium;
        //BaseInput
        this.afterPropertiesSet();

        //Let's write the properties into the DOM
        this.render(true);
        //Events
        this.wireBaseInputEvents();

        //blazor onInitialized
        this.updateIcon();
        //blazor onAfterRenderAsync
        //todo adicionar key interceptors
        //blazor onAfterRender
        this.updateSelectAllChecked();
    }
    //#endregion

    public render(firstRender: boolean=false): void {
        super.render(firstRender);

        //Div
        this.element!.className='mud-select';
        this.element!.id=this._elementID;

        this.buildInput(firstRender);
        this.buildPopover(firstRender);
        this.buildInputControl(firstRender);
        this.buildOverlay(firstRender);
    }

    protected buildInput(firstRender:boolean):void{
        if(!this.input) {
            this.input=new Input({
                holdRender:true,
                className:'mud-select-input',
                marginType:this.marginType,
                placeholder:this.placeholder,
                variant:this.variant,
                textUpdateSuppression:false,
                disableUnderline:this.disableUnderline,
                disabled:this.disabled,
                readOnly:true,//todo no mud estava this.readOnly nao sei pq
                error:this.error,
                adornment:this.adornment,
                adornmentColor:this.adornmentColor,
                iconSize:this.iconSize,
                adornmentText:this.adornmentText,
                clearable:this.clearable,
                adornmentIcon:this.currentIcon
                //todo adicionar userAtributes
            });
            this.input.onAdornmentClick.connect((ev)=>this.onAdornmentClick.emit(ev));
            this.input.onClearButtonClick.connect((ev)=>this.selectClearButtonClickHandlerAsync(ev));
            this.input.onBlur.connect((ev)=>this.handleLostFocus(ev));
            if(this.canRenderValue)this.input.childContent.value=this.getSelectedValuePresenter();
        }
        this.input.holdRender=true;
        this.input.inputType.value=this.canRenderValue || (this.strict.value && !this.isValueInList)?InputType.Hidden:InputType.Text
        //todo recolocar. Estava travando this.input.value.value=this.strict.value && !this.isValueInList?undefined:this.text.value as any
        this.input.render(firstRender)
    }

    protected buildPopover(firstRender:boolean):void{
        if(!this.popover) {
            this.popover=new Popover({
                holdRender:true,
                maxHeight:this.maxListHeight,
                anchorOrigin:this.anchorOrigin,
                transformOrigin:this.transformOrigin,
                className:this.popoverClass,
                relativeWidth:true,
            });
        }
        this.buildPopoverItems();
        this.popover.holdRender=true;
        if(this.multiSelection.value && this.selectAll.value){
            let listItem=new ListItem({
                icon:this.selectAllCheckBoxIcon,
                text:this.selectAllText.value,//todo listitem nao está suportando newproperty
                dense:this.dense.value,
                className:'mb-2'
            });
            listItem.onClick.connect((ev)=>this.selectAllClickAsync())
            if(this.list) this.list.childContent.value=[listItem];
        }
        this.popover.open.value=this._isOpen
        this.popover.render(firstRender);
    }

    protected buildPopoverItems():void{
        //We destroy the list when popover is not open
        if(!this.list && this._isOpen){
            //let's add all listItems
            let items:ListItem[]=[];
            for(let selectItem of this.childContent.value){
                selectItem.mudSelect=this;
                items.push(selectItem.listItem!);
            }
            this.list=new ListView({
                clickable:true,
                dense:this.dense,
                parent:this.popover,//todo ver se posso fazer assim
                childContent:items
            });
        }else this.list=this.list?.delete();
    }

    protected buildInputControl(firstRender:boolean):void{
        if(!this.inputControl){
            let renderFragment=new DocumentFragment();
            renderFragment.appendChild(this.input?.element!)
            renderFragment.appendChild(this.popover?.fakeDiv!);//we do not send the popover content

            this.inputControl=new InputControl({
                parent:this,
                label:this.label,
                variant:this.variant,
                helperText:this.helperText,
                helperTextOnFocus:this.helperTextOnFocus,
                marginType:this.marginType,
                className:'mud-select',//todo add adicional classes
                style:this.style,
                error:this.error,
                errorText:this.errorText,
                disabled:this.disabled,
                required:this.required,
                inputContent:renderFragment
            });
            //hack to set the parentComponent of popover. todo talvez mudar
            this.popover!.parent=this.inputControl;
            this.popover?.render(true);
            this.inputControl.onClick.connect((ev)=>this.toggleMenu())
        }
    }

    protected buildOverlay(firstRender:boolean):void{
        // if(!this.overlay){
        //     this.overlay=new Overlay({//todo adicionar suporte a newproperty no overlay
        //         lockScroll:this.lockScroll,
        //         holdRender:true
        //     });
        // }
        // this.overlay.holdRender=true;
        // this.overlay.visible.value=this._isOpen;
        // //todo recolocar this.overlay.element!.onmousedown=(ev)=>this.closeMenu(false);
        // //todo recolocar this.overlay.element!.ontouchstart=(ev)=>this.closeMenu(false);
        // this.overlay.render(firstRender);
    }

    protected selectNextItem():void{
        this.selectAdjacentItem(+1);
    }

    protected selectPreviousItem():void{
        this.selectAdjacentItem(-1);
    }

    protected selectAdjacentItem(direction:number):void{
        if(this.childContent.value==undefined || this.childContent.value.length==0)return;
        //let items=new List(this.items.value);
        let index=this.findActivatedIndex();
        if(direction<0 && index<0)index=0;
        let component:SelectItem<T>|undefined=undefined;
        for(let i=0;i<this.childContent.value.length;i++){
            index+=direction;
            if(index<0)index=0;
            if(index>=this.childContent.value.length)index=this.childContent.value.length-1;
            if(this.childContent.value[index].disabled.value)continue;
            component=this.childContent.value[index];
            if(!this.multiSelection.value){
                this._selectedValues.clear();
                if(component.value.value) this._selectedValues.add(component.value.value);//todo ver se pode tirar if
                this.highlightItem(component);
                break;
            }else{
                // in multiselect mode don't select anything, just hilight.
                // selecting is done by Enter
                this.highlightItem(component);
                break;
            }
        }
        this.input?.setText(this.text.value??'');
        //todo scrollmanager if(component!=undefined)
    }

    private selectFirstItem(startChar?:string):void{
        if(this.childContent.value==undefined || this.childContent.value.length==0)return;
        let items=new List<SelectItem<T>>(this.childContent.value).Where(x=>!x?.disabled.value);
        if(!StringHelper.isNullOrWhiteSpace(startChar)){
            let currentItem=items.FirstOrDefault(x=>x?.itemID==this._activeItemId);
            if(currentItem!=undefined && currentItem.value.value && (currentItem.value.value as any).toString().toLowerCase().startsWith(startChar!)){
                // this will step through all items that start with the same letter if pressed multiple times
                items=items.SkipWhile(x=>x!=currentItem).Skip(1);
            }
            items=items.Where(x=>(x?.value.value as any).toString().toLowerCase().startsWith(startChar!))
        }
        let component=items.FirstOrDefault();
        if(component==undefined)return;
        if(!this.multiSelection){
            this._selectedValues.clear();
            if(component.value.value) this._selectedValues.add(component.value.value)
            this.setValueAsync(component.value.value,true);
            this.highlightItem(component);
        }else{
            this.highlightItem(component);
        }
        this.input?.setText(this.text.value??"");
        //todo add scrollmanager
    }

    protected selectLastItem():void{
        if(this.childContent.value==undefined || this.childContent.value.length==0)return;
        let items=new List(this.childContent.value);
        let component=items.LastOrDefault(x=>!x?.disabled.value)
        if(component==undefined)return;
        if(!this.multiSelection.value){
            this._selectedValues.clear();
            if(component.value.value) this._selectedValues.add(component.value.value);
            this.setValueAsync(component.value,true);
            this.highlightItem(component);
        }else{
            this.highlightItem(component);
        }
         this.input?.setText(this.text.value??'');
        //todo scrollmanager
    }

    protected getSelectedValuePresenter():any{
        if(this.value.value==undefined)return undefined;
        if(this._shadowLookup.has(this.value.value)){
            return this._shadowLookup.get(this.value.value)?.childContent;
        }else return undefined;
    }

    protected updateValuePropertyAsync(updateText: boolean) :void{
        if(!this.multiSelection.value)//todo ver o typeof T
        super.updateValuePropertyAsync(updateText);
    }

    protected updateTextPropertyAsync(updateValue: boolean):void {
        if(this.multiSelectionTextFunc!=undefined){
            if(this.multiSelection.value){
                let selectedValues=this.selectedValues.value as any as string[];//todo ver converter
                this.setCustomizedTextAsync(selectedValues.join(this.delimiter.value), true, selectedValues, this.multiSelectionTextFunc);
            }else super.updateTextPropertyAsync(updateValue);
        }else{
            if(this.multiSelection.value){
                let selectedValues=this.selectedValues.value as any as string[];//todo ver converter
                this.setTextAsync(selectedValues.join(this.delimiter.value))
            }else super.updateTextPropertyAsync(updateValue);
        }
    }

    public add(component?:SelectItem<T>):boolean{
        if(!component)return false;
        let result=false;
        if(!this.childContent.value.find(x=>x.value.value==component.value.value)){
            this.childContent.value.push(component);
            if(component.value.value!=undefined){
                this._valueLookup.set(component.value.value, component);
                if(component.value.value==this.value.value && !this.multiSelection.value){
                    result=true;
                }
            }
        }
        this.updateSelectAllChecked();
        if(!result){
            result=component.value.value==this.value.value;
        }
        return result;
    }

    public remove(component:SelectItem<T>):void{
        this.childContent._value= ArrayHelper.removeItem(this.childContent.value,component);//todo ver se posso usar _value sempre que tiver _items
        if(component.value.value!=undefined)this._valueLookup.delete(component.value.value);
    }

    public selectOption(index:number):void{
        if(index<0 || index>=this.childContent.value.length){
            if(!this.multiSelection.value)this.closeMenu();
            return;
        }
        this.selectOptionValue(this.childContent.value[index].value.value)
    }

    public selectOptionValue(obj:T|undefined):void{//era selectOption também
        let value=obj as T;
        console.log('(Select)selectOptionValue:',value);
        if(this.multiSelection.value){// multi-selection: menu stays open
            if(!this._selectedValues.has(value)){
                this._selectedValues.add(value)
            }else{
                this._selectedValues.delete(value)
            }
            if(this.multiSelectionTextFunc!=undefined){
                let selectedValues=this._selectedValues.values() as any as string[];//todo ver converter
                this.setCustomizedTextAsync(selectedValues.join(this.delimiter.value),true,selectedValues,this.multiSelectionTextFunc);
            }else{
                let selectedValues=this._selectedValues.values() as any as string[];//todo ver converter
                this.setTextAsync(selectedValues.join(this.delimiter.value),false);
            }
            this.updateSelectAllChecked();
            this.beginValidate();
        }else{// single selection
            this._isOpen=false;
            this.updateIcon();
            if(this.value.value==value){
                //todo talvez chamar render
                return;
            }
            this.setValueAsync(value);
            this.input?.setText(this.text.value??'')
            this._selectedValues.clear();
            this._selectedValues.add(value);
            this.highlightItemForValue(value);
        }
        this.selectedValuesChanged.emit(this.selectedValues.value);
        if(this.multiSelection.value && typeof value==='string'){
            this.setValueAsync(this.text.value,false);
            //todo stateHasChanged
        }
    }

    private highlightItemForValue(value?:T):void{
        if(value==undefined){
            this.highlightItem(undefined);
            return;
        }
        //todo waitForRender
        if(this._valueLookup.has(value)){
            let component=this._valueLookup.get(value);
            this.highlightItem(component);
        }
    }

    private highlightItem(component?: SelectItem<T>):void{
        this._activeItemId=component?.itemID
        //todo waitforrender e task.delay
        //todo stateHasChanged
    }

    private highlightSelectedValue():void{
        //todo waitforRender
        if(this.multiSelection.value){
            this.highlightItem(this.childContent.value.find(x=>!x.disabled.value));
        }else this.highlightItemForValue(this.value.value);
    }

    private updateSelectAllChecked():void{
        if(this.multiSelection.value && this.selectAll.value){
            let oldState=this._selectAllChecked;
            if(this._selectedValues.size==0){
                this._selectAllChecked=false;
            }else if(this.childContent.value.length==this._selectedValues.size){
                this._selectAllChecked=true;
            }else{
                this._selectAllChecked=undefined;
            }
        }
    }

    public toggleMenu():void{
        if(this.disabled.value || this.readOnly.value)return;
        if(this._isOpen)this.closeMenu(true);
        else this.openMenu();
    }

    public openMenu():void{
        if(this.disabled.value || this.readOnly.value)return;
        this._isOpen=true;
        this.updateIcon();
        //todo statehaschanged
        this.highlightSelectedValue();
        //todo disable escape propagation
    }

    public closeMenu(focusAgain:boolean=true):void{
        this._isOpen=false;
        this.updateIcon();
        if(focusAgain){
            //todo statehasChanged
            this.onBlur.emit(null as any as FocusEvent)
            this.input?.focusAsync();
            //todo stateHasChanged
        }
        //todo enable escape propagation
    }

    private updateIcon():void{
        if(!StringHelper.isNullOrWhiteSpace(this.adornmentIcon.value))this.currentIcon.value=this.adornmentIcon.value;
        else{
            if(this._isOpen)this.currentIcon.value=this.closeIcon.value;
            else this.currentIcon.value=this.openIcon.value;
        }
    }

    public checkGenericTypeMatch(select_item:T|undefined):void{
        //todo
    }

    public focusAsync(): void {
        this.input?.focusAsync();
    }

    public selectAsync(): void {
        this.input?.selectAsync();
    }

    public selectRangeAsync(pos1: number, pos2: number): void {
        this.input?.selectRangeAsync(pos1,pos2);
    }

    protected selectClearButtonClickHandlerAsync(e:MouseEvent):void{// Extra handler for clearing selection.
        this.setValueAsync('',false);//todo ver default
        this.setTextAsync('',false);//todo ver default
        this._selectedValues.clear();
        this.beginValidate();
        //todo stateHasChanged
        let selectedValues=this._selectedValues.values();
        this.selectedValuesChanged.emit(Array.from(this._selectedValues.values()));
        this.onClearButtonClick.emit(e);
    }

    protected setCustomizedTextAsync(text:string, updateValue:boolean=true,
                                     selectedConvertedValues:string[]|undefined=undefined,
                                     multiSelectionTextFunc?:(list:string[]|undefined)=>string|undefined):void{
        if(multiSelectionTextFunc!=undefined){
            // The Text property of the control is updated
            this.text.value=multiSelectionTextFunc(selectedConvertedValues);
        }
        // The comparison is made on the multiSelectionText variable
        if(this.multiSelectionText!=this.text.value){
            if(StringHelper.isNullOrWhiteSpace(this.multiSelectionText)){
                this.touched=true;
            }
            if(updateValue)this.updateValuePropertyAsync(false);
            this.onTextChange.emit(this.multiSelectionText??'');
        }
    }

    protected handleKeyDown(ev: KeyboardEvent):void {
        if(this.disabled.value || this.readOnly.value)return;
        let key=ev.key.toLowerCase();
        console.log('(Select)handleKeyDown:',key);
        if(this._isOpen && key.length==1 && key!=' ' && !(ev.ctrlKey || ev.shiftKey||ev.altKey || ev.metaKey)){
            this.selectFirstItem(key);
            return;
        }
        switch(key){
            case 'tab':
                this.closeMenu(false);
                break;
            case 'arrowup':
                if(ev.altKey){
                    this.closeMenu();
                    break;
                }else if(!this._isOpen){
                    this.openMenu();
                    break;
                }else{
                    this.selectPreviousItem();
                    break;
                }
            case 'arrowdown':
                if(ev.altKey){
                    this.openMenu();
                    break;
                }else if(this._isOpen){
                    this.openMenu();
                    break;
                }else{
                    this.selectNextItem();
                    break;
                }
            case ' ':
                this.toggleMenu();
                break;
            case 'escape':
                this.closeMenu(true);
                break;
            case 'home':
                this.selectFirstItem();
                break;
            case 'end':
                this.selectLastItem();
                break;
            case 'enter':
            case 'numpadenter':
                let index=this.findActivatedIndex();
                if(!this.multiSelection.value){
                    if(!this._isOpen){
                        this.openMenu();
                        return;
                    }
                    this.selectOption(index);
                    break;
                }else{
                    if(!this._isOpen){
                        this.openMenu();
                        break;
                    }else{
                        this.selectOption(index);
                        this.input?.setText(this.text.value??'');
                        break;
                    }
                }
            case 'a':
                if(ev.ctrlKey){
                    if(this.multiSelection.value){
                        this.selectAllClickAsync();
                        //todo statehaschanged
                    }
                }
                break;
        }
        this.onKeyDown.emit(ev);
    }

    protected handleKeyUp(ev: KeyboardEvent):void {
        //blazor nao chama supersuper.handleKeyUp(ev);
        this.onKeyUp.emit(ev);
    }

    public clear():void{
        this.setValueAsync('',false)//todo ver default
        this.setTextAsync('',false);
        this._selectedValues.clear();
        this.beginValidate();
        //stateHasChanged
        this.selectedValuesChanged.emit(Array.from(this._selectedValues.values()));
    }

    protected selectAllClickAsync():void{
        if(this._selectAllChecked==undefined)this._selectAllChecked=true;
        else if(this._selectAllChecked)this._selectAllChecked=false;
        else this._selectAllChecked=true;
        // Define the items selection
        if(this._selectAllChecked)this.selectAllItems();
        else this.clear();
    }

    private selectAllItems():void{
        if(!this.multiSelection.value)return;
        let selectedValuesList=new List(this.childContent.value)
            .Where(x=>!x?.disabled.value && x?.value.value!=undefined)
            .Select(x=>x.value.value);
        this._selectedValues=new Set<T>(selectedValuesList.ToArray() as any[] as T[]);
        if(this.multiSelectionTextFunc!=undefined){
            this.setCustomizedTextAsync(this.selectedValues.value.join(this.delimiter.value),true,this.selectedValues.value as any as string[],this.multiSelectionTextFunc)
        }else{
            this.setTextAsync(this.selectedValues.value.join(this.delimiter.value),false)
        }
        this.updateSelectAllChecked();
        this.beginValidate();
        this.selectedValuesChanged.emit(this.selectedValues.value);
        if(this.multiSelection.value /*todo adicionar typeof*/){
            this.setValueAsync(this.text.value,false);
        }
    }

    public registerShadowItem(component?:SelectItem<T>):void{
        if(component==undefined || component.value.value==undefined)return;
        this._shadowLookup.set(component.value.value,component);
    }

    public unregisterShadownItem(component:SelectItem<T>):void{
        if(component==undefined || component.value.value==undefined)return;
        this._shadowLookup.delete(component.value.value);
    }

    protected handleLostFocus(ev:FocusEvent):void{
        if(this._isOpen){
            // when the menu is open we immediately get back the focus if we lose it (i.e. because of checkboxes in multi-select)
            // otherwise we can't receive key strokes any longer
            this.input?.focusAsync();
        }
    }

    protected findActivatedIndex():number{
        let index=-1
        for(let i=0;i<this.childContent.value.length;i++){
            if(this.childContent.value[i].itemID==this._activeItemId){
                index=i;
                break;
            }
        }
        return index;
    }

}

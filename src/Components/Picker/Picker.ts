import {BuilderState, Div, Lab1, component, Property, Signal} from "@lab1/core";
import {Adornment, Color, Margin, Orientation, Origin, OverflowBehavior, PickerVariant, Size, Variant, Paper, Popover, TextField, FormComponent, Material} from "../../MaterialExports";
import type {PickerProps} from './PickerProps';

@component
export class Picker<T> extends FormComponent<T> implements PickerProps<T>{

    //region properties
    readonly adornmentColor = new Property<Color>(this, Color.Default);
    readonly adornmentIcon = new Property<string>(this, Material.Icons.Filled.Event);
    readonly placeholder = new Property<string|undefined>(this, undefined);
    readonly elevation = new Property<number>(this, 8);
    readonly square = new Property<boolean>(this, false);
    readonly readOnly = new Property<boolean>(this, false);
    readonly rounded = new Property<boolean>(this, false);
    readonly helperText = new Property<string|undefined>(this, undefined);
    readonly helperTextOnFocus = new Property<boolean>(this, false);
    readonly label = new Property<string|undefined>(this, undefined);
    readonly disabled = new Property<boolean>(this, false);
    readonly editable = new Property<boolean>(this, false);
    readonly disableToolBar = new Property<boolean>(this, false);
    readonly toolBarClass = new Property<string|undefined>(this, undefined);
    readonly pickerVariant = new Property<PickerVariant>(this, PickerVariant.Inline);
    readonly variant = new Property<Variant>(this, Variant.Text);
    readonly adornment = new Property<Adornment>(this, Adornment.End);
    readonly orientation = new Property<Orientation>(this, Orientation.Portrait);
    readonly iconSize = new Property<Size>(this, Size.Medium);
    readonly color = new Property<Color>(this, Color.Primary);
    readonly classActions = new Property<string|undefined>(this, undefined);
    readonly pickerActions = new Property<any>(this, undefined);
    readonly marginType = new Property<Margin>(this, Margin.None);
    readonly text = new Property<string|undefined>(this, undefined,{
        customGetter:()=>{
            //console.warn('(Picker)text returning _text. ',this._text);
           return this._text;
        },
        customSetter:(value)=>{
            this.setTextAsync(value??'',true)
        }
        //todo acho que nao precisa chamar render aqui
    });

    protected readonly isOpen = new Property<boolean>(this, false);
    protected readonly pickerSquare = new Property<boolean>(this, false);
    //endregion

    //region DOM nodes, events and others
    _text?:string
    _elementID='picker'+Lab1.newID()
    _inputReference?:TextField
    _pickerInlineRef?:Div
    popover?:Popover
    popoverPaper?:Paper
    popoverPaperDiv?:Div
    staticPaper?:Paper
    _pickerElevation=0;
    pickerClass=''
    pickerPaperClass=''
    pickerInlineClass=''
    pickerContainerClass=''
    pickerInputClass=''
    actionClass=''
    readonly onTextChange = new Signal<(text:string) => void>();
    readonly onPickerOpen = new Signal<() => void>();
    readonly onPickerClose = new Signal<() => void>();
    pickerContent=new Div({id:'pickerContentHack'});//todo remover. é hack. deveria ser fragment
    //endregion

    constructor(props:PickerProps<T>) {
        super({...{element: document.createElement('div')}, ...props});
        this.text.name='text';//todo remover

        if(!this.isInherited(Picker)){
            this.readProperties(props,true);
            this.render(true);
        }
    }

    //todo chamar pela classe child
    protected onInitialized():void{
        if(this.pickerVariant.value==PickerVariant.Static){
            this.isOpen.value=true;
            if(this.elevation.value==8){
                this._pickerElevation=0;
            }else{
                this._pickerElevation=this.elevation.value;
            }
            if(!this.rounded.value){
                this.pickerSquare.value=true;
            }
        }else{
            this.pickerSquare.value=this.square.value;
            this._pickerElevation=this.elevation.value;
        }
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);
        //CSS classes
        this.buildCssClasses();
        //TextField
        this.buildTextField();
        this.buildChildFragment({holder: 'notStaticPicker',builderFragmentFunction: (state)=>this.buildNotStatic(state),condition:this.pickerVariant.value!=PickerVariant.Static});
        this.buildChildFragment({holder: 'inlinePicker',builderFragmentFunction: (state)=>this.buildInline(state),condition:this.isOpen.value && this.pickerVariant.value==PickerVariant.Inline});
        this.buildChildFragment({holder: 'staticPicker',builderFragmentFunction: (state)=>this.buildStatic(state),condition:this.pickerVariant.value==PickerVariant.Static});
        this.buildChildFragment({holder: 'dialogPicker',builderFragmentFunction: (state)=>this.buildDialog(state),condition:this.isOpen.value&& this.pickerVariant.value==PickerVariant.Dialog});
    }

    //todo chamar pela child
    protected onAfterRenderAsync(firstRender:boolean){
        if(firstRender){
            //todo adicionar keyinterceptor
        }
    }

    protected buildCssClasses(){
        //PickerClass
        this.pickerClass='mud-picker';
        if(this.pickerVariant.value!=PickerVariant.Static)this.pickerClass+=` mud-picker-inline`;
        if(this.pickerVariant.value==PickerVariant.Static)this.pickerClass+=` mud-picker-static`;
        if(this.pickerVariant.value==PickerVariant.Static && !this.pickerSquare.value)this.pickerClass+=' mud-rounded';
        if(this.pickerVariant.value==PickerVariant.Static)this.pickerClass+=` mud-elevation-${this._pickerElevation}`;
        if(this.pickerVariant.value!=PickerVariant.Static && !this.editable.value)this.pickerClass+=' mud-picker-input-button';
        if(this.pickerVariant.value!=PickerVariant.Static && this.editable.value)this.pickerClass+=' mud-picker-input-text';
        if(this.pickerVariant.value!=PickerVariant.Static && this.disabled.value)this.pickerClass+=' mud-disabled';
        this.id=this._elementID;
        this.setClassAndStyle(this.pickerClass,false);

        //PickerPaperClass
        this.pickerPaperClass='mud-picker';
        this.pickerPaperClass+=' mud-picker-paper';
        if(this.pickerVariant.value==PickerVariant.Inline)this.pickerPaperClass+=' mud-picker-view';
        if(this.pickerVariant.value==PickerVariant.Inline && this.isOpen.value)this.pickerPaperClass+=' mud-picker-open';
        if(this.pickerVariant.value==PickerVariant.Inline)this.pickerPaperClass+=' mud-picker-popover-paper';
        if(this.pickerVariant.value==PickerVariant.Dialog)this.pickerPaperClass+=' mud-dialog';

        //PickerInlineClass
        let pickerInlineClass='mud-picker-inline-paper';

        //PickerContainerClass
        this.pickerContainerClass='mud-picker-container';
        if(this.pickerSquare.value)this.pickerContainerClass+=' mud-paper-square';
        if(this.orientation.value==Orientation.Landscape && this.pickerVariant.value==PickerVariant.Static)this.pickerContainerClass+=' mud-picker-container-landscape';

        //PickerInputClass
        this.pickerInputClass='mud-input-input-control';
        if(this.className.value && this.className.value.length>0) this.pickerInputClass+=' '+this.className.value;

        //ActionClass
        this.pickerInputClass='mud-picker-actions';
        this.pickerInputClass+=' '+this.classActions.value;
    }

    protected buildTextField():void{
        console.log('(Picker)buildTextField. Text:',this.text.value);
        if(!this._inputReference){
            this._inputReference=new TextField<string>({
                label:this.label,
                text:this.text,
                helperText:this.helperText,
                helperTextOnFocus:this.helperTextOnFocus,
                variant:this.variant,
                style:this.style,
                disabled:this.disabled,
                adornment:this.adornment,
                adornmentIcon:this.adornmentIcon,
                adornmentColor:this.adornmentColor,
                iconSize:this.iconSize,
                marginType:this.marginType,
                placeholder:this.placeholder,
                required:this.required,
                requiredError:this.requiredError,
                error:this.error,
                errorText:this.errorText,
            });
            this._inputReference.onClick.connect((ev)=>{
                if(!this.editable.value)this.toggleState();
            })
            this._inputReference.onAdornmentClick.connect((ev)=>this.toggleState());
            this._inputReference.onKeyDown.connect((ev)=>this.handleKeyDown(ev));
        }
        console.log('enviando texto:',this.text.value)
        this._inputReference.setText(this.text.value);//todo nao precisa disso, e mesmo com isso não está alterando o valor do Input.
        //this._inputReference.value.value=(this.text.value);
        this._inputReference.readOnly.value=!this.editable.value ||this.readOnly.value;
    }

    protected buildNotStatic(state:BuilderState):DocumentFragment|undefined{
        console.log('(Picker)buildNotStatic. State:',BuilderState[state]);
        switch(state){
            case BuilderState.FirstRender:
                let fragment=new DocumentFragment();
                fragment.appendChild(this._inputReference!.element!)
                return fragment;
            case BuilderState.Render:
                return;
            case BuilderState.Destroy:
                return;
        }
    }

    protected buildInline(state:BuilderState):DocumentFragment|undefined{
        console.log('(Picker)buildInline. State:',BuilderState[state]);
        switch(state){
            case BuilderState.FirstRender:
                let fragment=new DocumentFragment();
                //todo ver como colocar o pickerContent e pickerActions
                this.popover=new Popover({
                    id:'popover',
                    holdRender:true,
                    open:this.isOpen,
                    fixed:true,
                    anchorOrigin:Origin.TopLeft,
                    transformOrigin:Origin.TopLeft,
                    overflowBehavior: OverflowBehavior.FlipOnOpen,
                    paper:false,
                });
                this.popoverPaper=new Paper({
                    parent:this.popover,
                    className:this.pickerPaperClass,//todo tornar property
                    elevation:this._pickerElevation,//tambem
                    square:this.pickerSquare
                });
                this.popoverPaperDiv=new Div({parent:this.popoverPaper, className:this.pickerContainerClass,childContent:this.pickerContent});
                this.popover.render();
                fragment.appendChild(this.popover!.element!);
                return fragment;
            case BuilderState.Render:
                return;
            case BuilderState.Destroy:
                this.popover=this.popover?.delete();
                return;
        }
    }

    protected buildStatic(state:BuilderState):DocumentFragment|undefined{
        console.log('(Picker)buildStatic. State:',BuilderState[state]);
        switch(state){
            case BuilderState.FirstRender:
                let fragment=new DocumentFragment();
                this.staticPaper=new Paper({
                    className:this.pickerPaperClass,
                    elevation:this._pickerElevation,
                    square:this.pickerSquare
                });
                let div=new Div({parent:this.staticPaper,className:this.pickerContainerClass});
                //todo ver como colocar o pickerContent e pickerActions
                return fragment;
            case BuilderState.Render:
                return;
            case BuilderState.Destroy:
                this.staticPaper=this.staticPaper?.delete();
                return;
        }
    }

    protected buildDialog(state:BuilderState):DocumentFragment|undefined{
        //todo fazer o overlay
        return;
    }

    protected buildOverlay(state:BuilderState):DocumentFragment|undefined{
        return;
    }

    protected setTextAsync(value:string, callback:boolean):void{
        if(this._text!=value){
            console.log('(Picker)setTextAsync:',value);
            this._text=value;
            if(callback)this.stringValueChanged(this._text);
            this.onTextChange.emit(this._text);
        }
    }

    // Value change hook for descendants.
    protected stringValueChanged(value:string):void{
        return;
    }

    public toggleOpen():void{
        if(this.isOpen.value)this.close();
        else this.open();
    }

    public close(submit:boolean=true):void{
        console.log('(Picker)close. submit=',submit);
        this.isOpen.value=false;
        if(submit)this.submit();
        //todo statehaschanged
        this.handleClose();
    }

    public open():void{
        this.isOpen.value=true;
        //todo statehaschanged
        this.handleOpen();
    }

    protected closeOverlay():void{
        this.close(this.pickerActions.value!=undefined);
    }

    protected submit():void{

    }

    public clear(close:boolean=true):void{
        if(close && this.pickerVariant.value!=PickerVariant.Static){
            this.close(false);
        }
    }

    public focusAsync():void{
        this._inputReference?.focusAsync();
    }

    public selectAsync():void{
        this._inputReference?.selectAsync();
    }

    public selectRangeAsync(pos1:number, pos2:number):void{
        this._inputReference?.selectRangeAsync(pos1,pos2);
    }

    protected toggleState():void{
        if(this.disabled.value)return;
        if(this.isOpen.value){
            this.isOpen.value=false;
            this.handleClose();
        }else{
            this.isOpen.value=true;
            this.handleOpen();
            this.focusAsync();
        }
    }

    protected handleOpen():void{
        this.handlePickerOpen();
        if(this.pickerVariant.value==PickerVariant.Inline){
            if(this._pickerInlineRef) this._pickerInlineRef.className.value=this.pickerInlineClass
        }
        //todo keyinterceptor
    }

    protected handleClose():void{
        this.handlePickerClose();
        //todo keyinterceptor
    }

    protected handlePickerOpen():void{
        this.onPickerOpen.emit();
    }

    protected handlePickerClose():void{
        console.log('(Picker)handlePickerClose');
        this.onPickerClose.emit()
    }

    protected handleKeyDown(ev:KeyboardEvent):void{
        if(this.disabled.value || this.readOnly.value)return;
        switch(ev.key.toLowerCase()){
            case 'backspace':
                if(ev.ctrlKey && ev.shiftKey){
                    this.clear();
                    //todo setar default valuethis.value._value=
                    this.reset();
                }
                break;
            case 'escape':
            case 'tab':
                this.close(false);
                break;
        }
    }
}

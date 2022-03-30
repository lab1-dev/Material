import {Div, Component, component, Property, Signal, StringHelper, ElementHelper} from "@lab1/core";
import {Adornment, Color, Edge, InputType, Margin, Size, Variant, BaseInput, Button, IconButton, InputAdornment, InputCssHelper, Material} from "../../MaterialExports";
import type {InputProps} from './InputProps';

@component
export class Input<T> extends BaseInput<T> implements InputProps<T>{

    //region properties
    readonly inputType = new Property<InputType>(this, InputType.Text);
    readonly hideSpinButtons = new Property<boolean>(this, false);
    readonly clearable = new Property<boolean>(this, false);
    readonly clearIcon = new Property<string>(this, Material.Icons.Filled.Clear);
    readonly numericUpIcon = new Property<string>(this, Material.Icons.Filled.KeyboardArrowUp);
    readonly numericDownIcon = new Property<string>(this, Material.Icons.Filled.KeyboardArrowDown);
    private readonly showClearable = new Property<boolean>(this, false);
    readonly childContent = new Property<any>(this, undefined);
    //endregion

    //region DOM nodes and others
    startAdornment?:InputAdornment
    endAdornment?:InputAdornment
    incrementButton?:Button
    decrementButton?:Button
    spinButtonDiv?:Div
    outlinedDiv?:Div
    _internalText='';
    //_showClearable=false;
    input?:HTMLInputElement
    textArea?:HTMLTextAreaElement
    clearButton?:IconButton
    getInputType(): InputType {return this.inputType.value};
    readonly onWheel = new Signal<(ev: WheelEvent) => void>();
    readonly onInput = new Signal<(ev: Event) => void>();
    readonly onChange = new Signal<(ev: Event) => void>();
    readonly onClearButtonClick = new Signal<(ev: MouseEvent) => void>();
    readonly onIncrement = new Signal<() => void>();
    readonly onDecrement = new Signal<() => void>();
    //endregion

    constructor(props:InputProps<T>) {
        super({...{element: document.createElement('div'),readProps:false}, ...props});
        this.readProperties(props,true);
        this.afterPropertiesSet();
        this.render(true);
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);
        //console.log('(Input)render', this.hasErrors);
        //console.log('(Input)render. HasErrors:',this.error.value,this.validationErros.length > 0)
        //console.log('(Input)render. text:',this.text.value)

        this._internalText=this.text.value??'';//esta no setParamersAsync
        let shrink=(!StringHelper.isNullOrEmpty(this.text.value))|| this.adornment.value==Adornment.Start || (!StringHelper.isNullOrWhiteSpace(this.placeholder.value));
        let className=InputCssHelper.getClassName(this,shrink);
        this.setClassAndStyle(className,false);

        this.buildChild({holder: 'startAdornment',builderFunction: ()=>this.buildStartAdornment(),condition:this.adornment.value==Adornment.Start});
        this.buildTextArea();
        this.buildInput();
        this.buildChild({holder: 'clearButton',builderFunction: ()=>this.buildClearButton(),condition: this.showClearable.value && !this.disabled.value});
        this.buildChild({holder:'endAdornment',builderFunction: ()=>this.buildEndAdornment(),condition: this.adornment.value==Adornment.End});
        this.buildChild({holder:'outlinedDiv',builderFunction: ()=>this.buildOutlinedDiv(),condition: this.variant.value==Variant.Outlined});
        this.buildChild({holder:'spinButtonDiv',builderFunction: ()=>this.buildSpinButtons(),condition: !this.hideSpinButtons});
    }

    protected buildStartAdornment():Component{
        if(!this.startAdornment)this.startAdornment=new InputAdornment({
            internalID:'startAdornment',
            icon:this.adornmentIcon,
            color:this.adornmentColor,
            size:this.iconSize,
            text:this.adornmentText,
            edge:Edge.Start
        });
        this.startAdornment.className.value=InputCssHelper.getAdornmentClassname(this);
        return this.startAdornment;
    }

    protected buildTextArea():void{
        if(this.lines.value>1){
            if(!this.textArea){
                this.textArea=document.createElement('textarea') as HTMLTextAreaElement
                this.element!.appendChild(this.textArea);
            }
            this.textArea.className=InputCssHelper.getInputClassName(this);
            this.textArea.style.minWidth='100px';//b
            this.textArea.rows=this.lines.value;
            this.textArea.setAttribute('type',this.inputType.value);
            this.textArea.placeholder=this.placeholder.value??'';
            this.textArea.disabled=this.disabled.value;
            this.textArea.readOnly=this.readOnly.value;
            this.textArea.inputMode=this.inputMode.value;
            this.textArea.oninput=(ev)=>this.handleInput(ev);
            this.textArea.onchange=(ev)=>this.handleChange(ev);
            this.textArea.onblur=(ev)=>this.handleBlurred(ev);
            this.textArea.onkeydown=(ev)=>this.handleKeyDown(ev);
            this.textArea.onkeyup=(ev)=>this.handleKeyUp(ev);
            this.textArea.onpaste=(ev)=>this.handlePaste(ev);
            this.textArea.onwheel=(ev)=>this.handleMouseWheel(ev);
            this.textArea.value=this._internalText;
        }else {
            this.textArea?.remove();
            this.textArea=undefined;
        }
    }

    protected buildInput():void{
        if(this.lines.value<2){
            if(!this.input){
                this.input= document.createElement('input') as HTMLInputElement
                this.element!.appendChild(this.input);
            }
            this.input.className=InputCssHelper.getInputClassName(this);
            this.input.style.minWidth='100px';//b
            this.input.type=this.inputType.toString();
            this.input.value=this._internalText;
            this.input.oninput=(ev)=>this.handleInput(ev);
            this.input.onchange=(ev)=>this.handleChange(ev);
            this.input.placeholder=this.placeholder.value??'';
            this.input.disabled=this.disabled.value;
            this.input.readOnly=this.readOnly.value;
            this.input.onblur=(ev)=>this.handleBlurred(ev);
            this.input.inputMode=this.inputMode.value;
            if(this.pattern.value) this.input.pattern=this.pattern.value;
            this.input.onkeydown=(ev)=>this.handleKeyDown(ev);
            this.input.onkeypress=(ev)=>this.handleKeyPress(ev);
            this.input.onkeyup=(ev)=>this.handleKeyUp(ev);
            this.input.maxLength=this.maxLength.value;
            this.input.onwheel=(ev)=>this.handleMouseWheel(ev);
        }else {
            this.input?.remove();
            this.input=undefined;
        }
    }

    protected buildClearButton():Component{
        let clearButtonClass='';
        if(this.adornment.value==Adornment.End && !this.hideSpinButtons.value)clearButtonClass+=' me-n1';
        if(this.adornment.value==Adornment.End && this.hideSpinButtons.value)clearButtonClass+=' mud-icon-button-edge-end';
        if(this.adornment.value!=Adornment.End && !this.hideSpinButtons.value)clearButtonClass+=' me-6';
        if(this.adornment.value!=Adornment.End && this.hideSpinButtons.value)clearButtonClass+='mud-icon-button-edge-margin-end';

        if(!this.clearButton) {
            this.clearButton=new IconButton({internalID:'clearButton', color:Color.Default, icon:this.clearIcon, size:Size.Small});
            this.clearButton.onClick.connect((ev)=>this.clearButtonClickHandlerAsync(ev));
        }//else console.log('ja tinha clearbutton')
        this.clearButton.className.value=clearButtonClass;
        return this.clearButton;
    }

    protected buildEndAdornment():Component{
        if(!this.endAdornment)this.endAdornment=new InputAdornment({
            internalID:'endAdornment',
            icon:this.adornmentIcon,
            color:this.adornmentColor,
            size:this.iconSize,
            text:this.adornmentText,
            edge:Edge.End,
        });
        this.endAdornment.className.value=InputCssHelper.getAdornmentClassname(this);
        return this.endAdornment;
    }

    protected buildOutlinedDiv():Component{
        if(!this.outlinedDiv)this.outlinedDiv=new Div({className:'mud-input-outlined-border'});
        return this.outlinedDiv;
    }

    protected buildSpinButtons():Component{
        if(!this.spinButtonDiv){
            this.spinButtonDiv=new Div({internalID:'spinButtonDiv', className:'mud-input-numeric-spin'});
            //todo ver se posso usar starticon ou se tenho que adiiconar Icon
            this.incrementButton=new Button({parent:this.spinButtonDiv, variant:Variant.Text, startIcon:this.numericUpIcon})
            this.decrementButton=new Button({parent:this.spinButtonDiv, variant:Variant.Text, startIcon:this.numericDownIcon})
            this.incrementButton.onClick.connect((ev)=>this.onIncrement.emit());
            this.decrementButton.onClick.connect((ev)=>this.onDecrement.emit());
        }
        this.incrementButton!.disabled.value=this.decrementButton!.disabled.value= this.disabled.value||this.readOnly.value;
        this.incrementButton!.tabIndex.value=this.decrementButton!.tabIndex.value= -1;
        this.incrementButton!.size.value=this.decrementButton!.size.value= this.getButtonSize();
        return this.spinButtonDiv;
    }

    protected handleInput(ev:any):void{
        this.onInput.emit(ev);//todo ver se posso emitir mesmo
        if(!this.immediate.value)return;
        this._isFocused=true;
        //console.log('(Input)handleInput:',ev.target.value)
        this.setTextAsync(ev.target.value);
    }

    protected handleChange(ev:any):void{
        this.onChange.emit(ev);
        this._internalText=ev.target.value
        this.onInternalInputChange.emit(ev);
        //console.log('(Input)handleChange:',ev.target.value)
        if(!this.immediate.value){
            this.setTextAsync(ev.target.value);
        }
    }

    protected handleBlurred(ev:FocusEvent):void{
        this.onBlur.emit(ev);
    }

    protected handleKeyDown(ev:KeyboardEvent):void{
        if(this.keyDownPreventDefault.value)ev.preventDefault();
        this.onKeyDown.emit(ev);//talvez colocar um else. Nao sei se pode emtir o evento
    }

    protected handleKeyPress(ev:KeyboardEvent):void{
        if(this.keyPressPreventDefault.value)ev.preventDefault();
        this.onKeyPress.emit(ev);
    }

    protected handleKeyUp(ev:KeyboardEvent):void{
        if(this.keyUpPreventDefault.value)ev.preventDefault();
        else this.onKeyUp.emit(ev);
    }

    protected handleMouseWheel(ev:WheelEvent):void{
        this.onWheel.emit(ev);
    }

    protected handlePaste(ev: ClipboardEvent):void{

    }

    public selectAsync():void{
        if(this.textArea)this.textArea.select();
        else if(this.input)this.input.select();
    }

    selectRangeAsync(pos1:number, pos2:number): void {
        if(this.textArea)this.textArea.setSelectionRange(pos1,pos2);
        else if(this.input)this.input.setSelectionRange(pos1,pos2)
    }

    protected updateClearable(value:any):void{
        let showClearable=this.clearable.value && ((!StringHelper.isNullOrWhiteSpace(value) || (typeof value!=='string' && typeof value!='undefined')));
        if(this.showClearable.value!=showClearable)this.showClearable.value=showClearable;
    }

    protected updateTextPropertyAsync(updateValue: boolean):void {
        super.updateTextPropertyAsync(updateValue);
        if(this.clearable.value)this.updateClearable(this.text.value);
    }

    protected updateValuePropertyAsync(updateText:boolean):void{
        super.updateValuePropertyAsync(updateText);
        if(this.clearable.value)this.updateClearable(this.value.value);
    }

    protected clearButtonClickHandlerAsync(ev:MouseEvent):void{
        this.setTextAsync('',true);
        this.onClearButtonClick.emit(ev);
    }

    protected getButtonSize():Size{
        if(this.marginType.value==Margin.Dense)return Size.Small;
        else return Size.Medium;
    }

    public focusAsync():void{
        // if(this.inputType.value==InputType.Hidden && this.childContent.value!=undefined){
        //     //todo acho que nao precisa
        // }
        this.input?.focus();
    }

    public setText(text:string):void{
        console.log('(Input)setText:',text);
        this._internalText=text;
        this.setTextAsync(text);
    }

    protected resetValue():void{
        this.setTextAsync('',true);
    }
}

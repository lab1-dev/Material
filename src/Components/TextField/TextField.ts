import {component, Property, Signal, StringHelper} from "@lab1/core";
import {InputType,DebouncedInput, Input, InputControl} from "../../MaterialExports";
import type {TextFieldProps} from "./TextFieldProps";

@component
export class TextField<T=string> extends DebouncedInput<T> implements TextFieldProps<T>{

    //region properties
    readonly inputType = new Property<InputType>(this,InputType.Text);
    readonly clearable = new Property<boolean>(this,false);
    //endregion

    //#region DOM Nodes, events and others
    readonly onTextChange = new Signal<(text:string) => void>();
    readonly onClearButtonClick = new Signal<(ev:MouseEvent) => void>();
    readonly onClick = new Signal<(ev:MouseEvent) => void>();
    getInputType(): InputType {return this.inputType.value};
    protected inputControl:InputControl
    protected input:Input<string>
    //#endregion

    constructor(props:TextFieldProps<T>) {
        super(props);

        this.readProperties(props,true);
        this.afterPropertiesSet();

        //DOM nodes
        this.input=new Input<string>({
            internalID:'input',
            inputType:this.inputType,
            lines:this.lines,
            variant:this.variant,
            textUpdateSuppression:this.textUpdateSuppression,
            value:this.text,
            placeholder:this.placeholder,
            disabled:this.disabled,
            disableUnderline:this.disableUnderline,
            readOnly:this.readOnly,
            maxLength:this.maxLength,
            adornment:this.adornment,
            adornmentText:this.adornmentText,
            adornmentIcon:this.adornmentIcon,
            adornmentColor:this.adornmentColor,
            iconSize:this.iconSize,
            error:this.error,
            immediate:this.immediate,
            marginType:this.marginType,
            keyDownPreventDefault:this.keyDownPreventDefault,
            keyPressPreventDefault:this.keyPressPreventDefault,
            keyUpPreventDefault:this.keyUpPreventDefault,
            hideSpinButtons:true,
            clearable:this.clearable,
            pattern:this.pattern
        });

        let renderFragment=new DocumentFragment();
        renderFragment.appendChild(this.input?.element!)

        this.inputControl=new InputControl({
            internalID:'inputControl',
            parent:this.parent,
            label:this.label,
            variant:this.variant,
            helperText:this.helperText,
            helperTextOnFocus:this.helperTextOnFocus,
            disabled:this.disabled,
            marginType:this.marginType,
            required:this.required,
            inputContent:renderFragment
        });
        this.inputControl.onClick.connect((ev)=>this.onClick.emit(ev));
        this.element=this.inputControl.element;

        this.render(true);
    }

    public render(firstRender:boolean=false): void {
        super.render(firstRender);
        let className='mud-input-input-control';
        if(this.className.value)className+=` ${this.className}`;

        //InputControl properties
        this.inputControl.counterText.value=this.getCounterText();
        this.inputControl.className.value=className;
        this.inputControl.error.value=this.hasErrors;
        this.inputControl.errorText.value=this.getErrorText();

        //Input properties
        this.input.style.value=this.style.value;
        if(firstRender){
            this.input.onClearButtonClick.connect((ev)=>this.onClearButtonClick.emit(ev));
            this.input.onBlur.connect((ev)=>this.handleBlur(ev));
            this.input.onKeyDown.connect((ev)=>this.handleKeyDown(ev));
            this.input.onKeyPress.connect((ev)=>this.onKeyPress.emit(ev));
            this.input.onKeyUp.connect((ev)=>this.handleKeyUp(ev));
            this.input.onAdornmentClick.connect((ev)=>this.onAdornmentClick.emit(ev));
            this.input.onInternalInputChange.connect((ev)=>this.onChange());
            this.input.onValueChange.connect((txt)=>{
                //console.log('(TextField)input value changed')
                // if(this.text.value!=txt){
                //     this.text.value=txt;//to avoid rerender Input again when this.text changes
                //     this.onTextChange.emit(txt);
                // }
                // if(this.value.value!=txt){
                //     this.value._value=txt;
                //     this.onValueChanged.emit(txt);
                // }
                this.setTextAsync(txt as string);//Todo remover isso pq está gerando render do input 2 vezes. O problema é que se removo, o required nao funciona
                //this.render();//acho que nao precisa mais
            });
        }
    }

    protected getCounterText():string {
        if (!this.counter.value) return '';
        else if (this.counter.value == 0) {
            if (StringHelper.isNullOrEmpty(this.text.value)) return '0';
            return this.text.value!.length.toString();
        } else if (StringHelper.isNullOrEmpty(this.text.value)) return '0';
        return `${this.text.value!.length} / ${this.counter.value}`;
    }

    public focusAsync(): void {
    }

    public selectAsync(): void {
    }

    public selectRangeAsync(pos1: number, pos2: number): void {
    }

    public clear():void{
        if(this.input)this.input.setText('');
    }

    public setText(text:string|undefined):void{
        this.input.setText(text??'');
    }

}

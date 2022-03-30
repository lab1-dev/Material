import {Property, Signal, StringHelper} from "@lab1/core"
import {Adornment, Color, InputType, Margin, Size, Variant, InputMode, FormComponent, BaseInputProps} from "../../MaterialExports";

export abstract class BaseInput<T> extends FormComponent<T> implements BaseInputProps<T>{

    //region properties
    readonly disabled = new Property<boolean>(this,false);
    readonly disableUnderline = new Property<boolean>(this,false);
    readonly immediate = new Property<boolean>(this,false);
    readonly readOnly = new Property<boolean>(this,false);
    readonly textUnderLine = new Property<boolean>(this,false);
    readonly helperText = new Property<string|undefined>(this,undefined);
    readonly helperTextOnFocus = new Property<boolean>(this,false);
    readonly adornmentIcon = new Property<string|undefined>(this,undefined);
    readonly adornmentText = new Property<string|undefined>(this,undefined);
    readonly adornment = new Property<Adornment>(this,Adornment.None);
    readonly adornmentColor = new Property<Color>(this,Color.Default);
    readonly iconSize = new Property<Size>(this,Size.Medium);
    readonly variant = new Property<Variant>(this,Variant.Text);
    readonly marginType = new Property<Margin>(this,Margin.None);
    readonly placeholder = new Property<string|undefined>(this,undefined);
    readonly counter = new Property<number|undefined>(this,undefined);
    readonly maxLength = new Property<number>(this,524288);
    readonly label = new Property<string|undefined>(this,undefined);
    readonly autoFocus = new Property<boolean>(this,false);
    readonly lines = new Property<number>(this,1);
    readonly text = new Property<string|undefined>(this,undefined);
    readonly textUpdateSuppression= new Property<boolean>(this,true);
    readonly inputMode = new Property<InputMode>(this,InputMode.Text);
    readonly pattern = new Property<string|undefined>(this,undefined);
    readonly keyDownPreventDefault = new Property<boolean>(this,false);
    readonly keyPressPreventDefault = new Property<boolean>(this,false);
    readonly keyUpPreventDefault = new Property<boolean>(this,false);
    //passei o value daqui para o formcomponent. No mud está aqui.
    readonly format = new Property<string|undefined>(this,undefined);
    //endregion

    //region abstract methods
    abstract getInputType():InputType
    abstract selectAsync():void
    abstract focusAsync():void
    abstract selectRangeAsync(pos1:number, pos2:number):void
    //endregion

    //region Events and others
    touched=false;
    _forceTextUpdate=false;
    _isFocused=false;
    readonly onTextChange = new Signal<(text:string) => void>();
    readonly onAdornmentClick = new Signal<(ev:MouseEvent) => void>();
    readonly onBlur = new Signal<(ev: FocusEvent) => void>();
    readonly onInternalInputChange = new Signal<(ev: Event) => void>();
    readonly onKeyDown = new Signal<(ev: KeyboardEvent) => void>();
    readonly onKeyPress = new Signal<(ev: KeyboardEvent) => void>();
    readonly onKeyUp = new Signal<(ev: KeyboardEvent) => void>();
    readonly onValueChange = new Signal<(value:any/*era para ser T*/) => void>();
    //endregion

    afterPropertiesSet(){//from setParamersasync. We have to check after properties are set on the child constructor
        let hasText=this.text.value!=undefined;
        let hasValue=this.value.value!=undefined;
        //console.log('hasValue:',hasValue,'.hastext:',hasText)
        // Refresh Value from Text
        if(hasText && !hasValue)this.updateValuePropertyAsync(false);
        if(hasValue && !hasText)this.updateTextPropertyAsync(false);
    }

    protected wireBaseInputEvents():void{

    }

    protected setTextAsync(text:string, updateValue=true){
        let hasHoldRender=this.holdRender;
        if(this.text.value!=text){
            if(updateValue)this.holdRender=true;//needed to not render twice when modifying text and value properties
            this.text.value=text;
            if(updateValue &&!hasHoldRender)this.holdRender=false;
            //console.log(this.id, '(BaseInput)setTextAsync:',text);
            if(!StringHelper.isNullOrWhiteSpace(text))this.touched=true;
            if(updateValue)this.updateValuePropertyAsync(false);
            this.onTextChange.emit(text??'');
        }
    }

    protected updateTextPropertyAsync(updateValue:boolean):void{//sets the text from value
        //todo ver direito se é necessário
        let text='';
        if(this.value.value)text=this.value.toString();
        //console.log('(BaseInput)updateTextProperty',this.value.value)
        this.setTextAsync(text,updateValue);
    }

    protected setValueAsync(value:any, updateText=true):void{
        let hasHoldRender=this.holdRender;
        if(this.value.value!=value){
            if(updateText)this.holdRender=true;//needed to not render twice when modifying text and value properties
            this.value.value=value;
            if(updateText &&!hasHoldRender)this.holdRender=false;
            if(updateText)this.updateTextPropertyAsync(false);
            this.onValueChange.emit(value);
            this.beginValidate();
        }
    }

    protected updateValuePropertyAsync(updateText:boolean):void{//sets the value from text
        this.setValueAsync(this.text.value, updateText);
    }

    protected setFormat(value:string):void{
        //todo
    }

    protected validateValue():void{
        if(this.standalone)return super.validateValue();
    }

    protected handleBlur(ev:FocusEvent):void{
        this._isFocused=false;
        this.touched=true;
        this.onBlur.emit(ev);
    }

    protected handleKeyDown(ev:KeyboardEvent):void{
        this._isFocused=true;
        this.onKeyDown.emit(ev);
    }

    protected handleKeyUp(ev:KeyboardEvent):void{
        this._isFocused=true;
        this.onKeyUp.emit(ev);
    }
}

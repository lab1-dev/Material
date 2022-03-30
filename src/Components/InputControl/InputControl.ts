import { Div, component, Property, P, Signal, StringHelper} from "@lab1/core";
import type {InputControlProps} from './InputControlProps';
import {Margin, Variant, InputLabel, MaterialComponent} from "../../MaterialExports";

@component
export class InputControl extends MaterialComponent implements InputControlProps{

    //region properties
    readonly inputContent = new Property<DocumentFragment|undefined>(this,undefined);
    readonly marginType = new Property<Margin>(this,Margin.None);
    readonly required = new Property<boolean>(this,false);
    readonly error = new Property<boolean>(this,false);
    readonly errorText = new Property<string|undefined>(this,undefined);
    readonly helperText = new Property<string|undefined>(this,undefined);
    readonly helperTextOnFocus = new Property<boolean>(this,false);
    readonly counterText = new Property<string|undefined>(this,undefined);
    readonly label = new Property<string|undefined>(this,undefined);
    readonly variant = new Property<Variant>(this,Variant.Text);
    readonly disabled = new Property<boolean>(this,false);
    readonly childContent = new Property<any>(this, undefined);
    //endregion

    //region DOM nodes and others
    divInputContainer:Div
    inputLabel?:InputLabel
    helperDiv?:Div
    readonly onClick = new Signal<(ev:MouseEvent) => void>();
    //endregion

    constructor(props:InputControlProps) {
        super({...{element: document.createElement('div')}, ...props});

        //DOM nodes
        this.divInputContainer=new Div({parent:this,className:'mud-input-control-input-container'});

        //InputControl properties
        this.readProperties(props,true);

        //Events
        this.element!.onclick=(ev)=>this.onClick.emit(ev);

        //Let's write the properties into the DOM
        this.render(true);
    }

    public render(firstRender:boolean=false): void {
        super.render(firstRender);
        //todo verificar if(this.childContentChanged)this.clear();
        //this.childContentChanged=false;

        //Div
        let className='mud-input-control';
        if(this.required.value)className+=' mud-input-required';
        if(this.marginType.value!=Margin.None)className+=` mud-input-control-margin-${this.marginType}`;
        if(this.error.value)className+=' mud-input-error';
        this.setClassAndStyle(className,true);

        //InputContainer Div
        if(firstRender){
            //let input=this.inputContent.value as Input<string>;
            //this.divInputContainer.element!.appendChild(input.element!);//todo melhorar isso
            if(this.inputContent.value) this.divInputContainer.element!.appendChild(this.inputContent.value);//todo melhorar isso
        }

        //InputContainer Label
        this.buildInputLabel();

        //Helper Text (Error, HelperText or CounterText)
        this.buildHelperText();

        //ChildContent
        //this.appendChildIfNotPresent(this.childContent);
    }

    protected clear():void{
        this.element!.innerHTML='';
        this.divInputContainer.innerHTML='';
        this.inputLabel=this.inputLabel?.delete();
        this.helperDiv=this.helperDiv?.delete();
    }

    protected buildInputLabel():void{
        //console.log('(InputControl)buildInputLabel:',this.error.value)
        if(this.label.value){
            if(!this.inputLabel)this.inputLabel=new InputLabel({
                parent:this.divInputContainer,
                variant:this.variant,
                disabled:this.disabled,
                error:this.error,
                marginType:this.marginType,
            });
            this.inputLabel.className.value='mud-input-label-inputcontrol';
            this.inputLabel.label.value=this.label.value;
        }else this.inputLabel=this.inputLabel?.delete();
    }

    protected buildHelperText():void{
        //HelperContainer Div
        let helperContainerClass='mud-input-control-helper-container';
        if(this.variant.value==Variant.Filled)helperContainerClass+=' px-1';
        if(this.variant.value==Variant.Outlined)helperContainerClass+=' px-2';

        //Helper P
        let helperPClass='mud-input-helper-text';
        if(this.helperTextOnFocus.value)helperPClass+=' mud-input-helper-onfocus';
        if(this.error.value)helperPClass+=' mud-input-error';

        if(this.error.value || (!StringHelper.isNullOrEmpty(this.helperText.value)) ||  (!StringHelper.isNullOrEmpty(this.counterText.value))){
            if(!this.helperDiv)this.helperDiv=new Div({parent:this,className:helperContainerClass});
            this.helperDiv.removeChildComponents();
            let p=new P({parent:this.helperDiv,className:helperPClass});
            let innerDiv=new Div({ parent:p,className:'d-flex'});
            if(this.error.value){
                let errorDiv=new Div({parent:innerDiv, className:'mr-auto'});
                errorDiv.innerHTML=this.errorText.value??'';
            }else if(!StringHelper.isNullOrEmpty(this.helperText.value)){
                let div=new Div({parent:innerDiv,className:'mr-auto'});
                div.innerHTML=this.helperText.value!;
            }
            if(!StringHelper.isNullOrEmpty(this.counterText.value)){
                let div=new Div({parent:innerDiv,className:'ml-auto'});
                div.innerHTML=this.counterText.value!;
            }
        }else this.helperDiv=this.helperDiv?.delete();
    }
}

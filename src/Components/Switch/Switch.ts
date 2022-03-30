import {component, Property, Signal, Span} from "@lab1/core";
import {BooleanInput, Text, Color, Icon} from "../../MaterialExports";
import type { SwitchProps } from './SwitchProps';

@component
export class Switch<T=boolean> extends BooleanInput<T> implements SwitchProps<T>{

    //region properties
    readonly color = new Property<Color>(this, Color.Default);
    readonly text = new Property<string|undefined>(this, undefined);
    readonly thumbIcon = new Property<string|undefined>(this, undefined);
    readonly thumbIconColor = new Property<Color>(this, Color.Default);
    readonly disableRipple = new Property<boolean>(this, false);
    readonly childContent = new Property<any>(this, undefined);
    //endregion

    //region DOM nodes and others
    protected readonly firstSpan!:Span;
    protected readonly secondSpan!:Span;
    protected readonly thirdSpan!:Span;
    protected readonly fourthSpan!:Span;
    protected readonly fifthSpan!:Span;
    protected textItem?:Text;
    protected iconItem?:Icon;
    protected readonly inputNode=document.createElement('input') as HTMLInputElement;
    readonly onChange = new Signal<(checked:boolean) => void>();
    //endregion

    constructor(props:SwitchProps<T>) {
        super({...{element: document.createElement('mat-switch')}, ...props});

        //DOM nodes
        this.firstSpan=new Span({parent:this});
        this.secondSpan=new Span({parent:this.firstSpan});
        this.thirdSpan=new Span({ parent:this.secondSpan,});
        this.thirdSpan.element!.appendChild(this.inputNode);
        this.fourthSpan=new Span({parent:this.thirdSpan});
        this.fifthSpan=new Span({parent:this.firstSpan});

        //Switch properties
        this.readProperties(props,true);

        //Let's write the properties into the DOM
        this.render(true);

        //Events
        this.element!.onkeydown=(ev)=>this.handleKeyDown(ev)
        this.element!.onclick=(ev)=>this.handleClick(ev);
        //this.inputNode.onclick=(ev)=>{if(this.readOnly)ev.preventDefault()}
        this.inputNode.onchange=(ev:any)=>this.handleOnChange(ev.target.checked);
    }

    public render(firstRender:boolean=false): void {
        super.render(firstRender);

        //Label
        let labelClass='mud-switch';
        if(this.disabled.value)labelClass+=' mud-disabled';
        if(this.readOnly.value)labelClass+=' mud-readonly';
        this.setClassAndStyle(labelClass,false);

        //First Span
        this.firstSpan.element!.className='mud-switch-span mud-flip-x-rtl';

        //Second Span
        let spanClass='mud-button-root mud-icon-button mud-switch-base';
        if(!this.disableRipple && !this.disabled.value)spanClass+=' mud-ripple mud-ripple-switch';
        spanClass+=` mud-switch-${this.color}`;
        if(this.disabled.value)spanClass+=' mud-switch-disabled';
        if(this.readOnly.value)spanClass+=' mud-readonly';
        if(this.boolValue)spanClass+=' mud-checked';
        this.secondSpan.element!.style.position='absolute'
        this.secondSpan.element!.className=spanClass;
        this.secondSpan.element!.setAttribute('tabindex','0');

        //Third Span
        this.thirdSpan.element!.className='mud-switch-button';

        //Input
        if(this.userAttributes!=undefined)Object.assign(this.inputNode!.attributes, this.userAttributes);
        this.inputNode.ariaChecked=this.boolValue?'true':'false';
        this.inputNode.ariaReadOnly=this.disabled?'true':'false';
        this.inputNode.type='checkbox';
        this.inputNode.className='mud-switch-input';
        this.inputNode.checked=this.boolValue;
        this.inputNode.disabled=this.disabled.value;
        this.inputNode.tabIndex=-1;

        //Fourth Span
        this.fourthSpan.element!.className='mud-switch-thumb d-flex align-center justify-center';
        if(this.thumbIcon!=undefined){
            if(!this.iconItem)this.iconItem=new Icon({parent:this.fourthSpan, color:this.thumbIconColor, icon:this.thumbIcon});
            this.iconItem.style.value="height:16px; width:16px;";
        }else this.iconItem=this.iconItem?.delete();

        //Fifth Span
        this.fifthSpan.element!.className='mud-switch-track';

        //Text
        if(this.text.value){
            if(!this.textItem)this.textItem=new Text({parent:this, childContent:this.text.value??''})
            else this.textItem.childContent.value=this.text.value??'';
        }
    }

    protected handleKeyDown(ev:KeyboardEvent):void{
        if (this.disabled.value) return;
        switch(ev.keyCode){
            case 32://space
                this.checked.value=!this.checked.value;
                break;
        }
    }

    protected handleOnChange(checked:boolean):void{
        if(this.disabled.value || this.readOnly.value)return;
    }

    protected handleClick(ev: MouseEvent):void{
        if (this.disabled.value || this.readOnly.value) return;
        this.checked.value=!this.checked.value;
        this.onChange.emit(this.checked.value);
    }
}

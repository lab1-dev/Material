import {Component, component, Property, Signal, StringHelper} from "@lab1/core";
import type {InputAdornmentProps} from "./InputAdornmentProps";
import {Color, Edge, Size,Icon, IconButton, Text} from "../../MaterialExports";

@component
export class InputAdornment extends Component implements InputAdornmentProps{

    //region properties
    readonly text = new Property<string|undefined>(this,undefined);
    readonly icon = new Property<string|undefined>(this,undefined);
    readonly edge = new Property<Edge|undefined>(this,undefined);
    readonly size = new Property<Size>(this,Size.Medium);
    readonly color= new Property<Color>(this,Color.Default);
    readonly childContent = new Property<any>(this, undefined);
    //endregion

    //region DOM nodes and others
    readonly onAdornmentClick = new Signal<(ev: MouseEvent) => void>();
    txtItem?:Text
    iconButton?:IconButton
    iconItem?:Icon
    //endregion

    constructor(props: InputAdornmentProps) {
        super({...{element: document.createElement('div')}, ...props});

        //InputAdornment properties
        this.readProperties(props,true);

        //Let's write the properties into the DOM
        this.render(true);
    }

    render(firstRender: boolean = false): void {
        super.render(firstRender);

        if(this.className.value)this.element!.className=this.className.value;
        this.buildTxt();
        this.buildIconButton();
        this.buildIcon();
    }

    protected buildTxt():void{
        if(!StringHelper.isNullOrWhiteSpace(this.text.value)){
            if(!this.txtItem)this.txtItem=new Text({parent:this,holdRender:true,color:this.color});
            this.txtItem.tabIndex.value=-1;
            this.txtItem.childContent.value=this.text.value!;
            this.txtItem.render();
        }else this.txtItem=this.txtItem?.delete();
    }

    protected buildIconButton():void{
        if(!StringHelper.isNullOrWhiteSpace(this.icon.value)){
            if(this.onAdornmentClick.hasConnections()){
                if(!this.iconButton){
                    this.iconButton=new IconButton({parent:this,holdRender:true})
                    this.iconButton.onClick.connect((ev)=>{
                        this.onAdornmentClick.emit(ev);
                    });
                }
                this.iconButton.icon.value=this.icon.value;
                this.iconButton.edge.value=this.edge.value;
                this.iconButton.size.value=this.size.value;
                this.iconButton.color.value=this.color.value;
                this.iconButton.tabIndex.value=-1;
                this.iconButton.render();
            }else this.iconButton=this.iconButton?.delete();
        }
    }

    protected buildIcon():void{
        if(!StringHelper.isNullOrWhiteSpace(this.icon.value)) {
            if (!this.onAdornmentClick.hasConnections()) {
                if (!this.iconItem) this.iconItem = new Icon({parent: this, holdRender: true, icon: this.icon, size: this.size, color: this.color});
                this.iconItem.tabIndex.value = -1;
                this.iconItem.render();
            }else this.iconItem=this.iconItem?.delete();
        }
    }
}

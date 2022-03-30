import {Property, Signal, SignalHandler, TypescriptHelper} from "@lab1/core";
import {IActivatable} from "../../Interfaces/IActivatable";
import {ButtonType, BaseButtonProps, MaterialComponent} from "../../MaterialExports";

export abstract class BaseButton extends MaterialComponent implements BaseButtonProps{

    //region properties
    readonly disabled = new Property<boolean>(this,false);
    readonly disableRipple = new Property<boolean>(this,false);
    readonly disableElevation = new Property<boolean>(this,false);
    readonly ariaLabel = new Property<string|undefined>(this,undefined);
    //endregion

    //#region link
    protected _link?: string;
    get link(): string|undefined {
        return this._link;
    }
    set link(value: string|undefined) {
        this._link = value;
    }
    //#endregion
    //#region target
    protected _target: string='_blank';
    get target(): string {
        return this._target;
    }
    set target(value: string) {
        this._target = value;
    }
    //#endregion
    //#region buttonType
    protected _buttonType=ButtonType.Button;
    get buttonType(): ButtonType {
        return this._buttonType;
    }
    set buttonType(value: ButtonType) {
        if(this._buttonType===value)return;
        this._buttonType = value;
        this.render(false);
    }
    //#endregion

    //region Events and others
    protected activateable?: IActivatable;
    public command: any;//todo era ICommand;
    public commandParameter?: Object;
    readonly onClick = new Signal<(ev:MouseEvent) => void>();
    readonly onContextMenu = new Signal<(ev:MouseEvent) => void>();
    //endregion

    protected readBaseButtonProps(props:BaseButtonProps):void{
        //if(props.disabled!=undefined)this._disabled=props.disabled;
        if(props.link!=undefined)this._link=props.link;
        if(props.target!=undefined)this._target=props.target;
        if(props.buttonType!=undefined)this._buttonType=props.buttonType;
    }

    protected wireBaseButtonEvents():void{
        this.element!.onclick = ev => this.handleClick(ev);
        this.element!.oncontextmenu=(ev)=>this.onContextMenu.emit(ev);
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);
        if(!this.element)return;

        if(this.ariaLabel.value!=undefined)this.element.ariaLabel=this.ariaLabel.value;
    }

    private handleClick(ev:MouseEvent):void{
        if(this.link && !this.disabled.value) window.open(this.link,this.target);
        this.onClick.emit(ev);
    }
}

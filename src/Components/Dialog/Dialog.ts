import {Component, Div, ElementHelper,  component, Property, Signal} from "@lab1/core";
import {DialogPosition, MaxWidth, Typo, DialogService, DialogOptions, IconButton, Text, Overlay, Material, MaterialComponent} from "../../MaterialExports";
import type {DialogProps} from "./DialogProps";

//DialogInstance
@component
export class Dialog extends MaterialComponent implements DialogProps {

    //region properties
    readonly childContent = new Property<any>(this, undefined);
    //endregion

    //#region title
    private _title?: string
    get title(): string | undefined {
        return this._title;
    }
    set title(value: string | undefined) {
        if (this._title === value) return;
        this._title = value;
        this.render();
    }
    //#endregion
    //#region titleContent
    private _titleContent: any
    get titleContent(): any {
        return this._titleContent;
    }
    set titleContent(value: any) {
        if (this._titleContent === value) return;
        this._titleContent = value;
        this.render();
    }
    //#endregion
    //#region content
    private _content: any
    get content(): any {
        return this._content;
    }
    set content(value: any) {
        if (this._content === value) return;
        this._content = value;
        this.render();
    }
    //#endregion
    //#region closeIcon
    private _closeIcon = Material.Icons.Filled.Close
    get closeIcon(): string {
        return this._closeIcon;
    }
    set closeIcon(value: string) {
        if (this._closeIcon === value) return;
        this._closeIcon = value;
        this.render();
    }
    //#endregion
    //#region options
    private _options = new DialogOptions()
    get options(): DialogOptions {
        return this._options;
    }
    set options(value: DialogOptions) {
        if (this._options === value) return;
        this._options = value;
        this.configureInstance();
        this.render();
    }
    //#endregion
    //todo ver como passar o globaldialogoptions
    //#region globalDialogOptions
    private _globalDialogOptions = new DialogOptions()
    get globalDialogOptions(): DialogOptions {
        return this._globalDialogOptions;
    }
    set globalDialogOptions(value: DialogOptions) {
        if (this._globalDialogOptions === value) return;
        this._globalDialogOptions = value;
        this.render();
    }
    //#endregion

    //todo talvez remover visible e abrir dialog via service

    //region DOM nodes and others
    private overlayItem!: Overlay
    private innerDiv!:Div
    private titleDiv?:Div
    private titleTextItem?:Text
    private closeButtonIcon?:IconButton
    private position?: string
    private dialogMaxWidth?: string
    private disableBackdropClick?: boolean
    private closeOnEscapeKey?: boolean
    private noHeader?: boolean
    private closeButton?: boolean
    private fullScreen?: boolean
    private fullWidth?: boolean
    readonly onClose = new Signal<(result:any) => void>();
    //endregion


    constructor(props: DialogProps={}, protected dialogService:DialogService) {
        super({...{element: document.createElement('mat-dialog')}, ...props});

        this.readProperties(props,true);
        // console.log('vai criar simpleDialog');
        // let mySimpleDialog=<DialogProps>new TCreator(parameters);
        // props.content=mySimpleDialog.content;
        // props.title=mySimpleDialog.title;
        // console.log('(Dialog)content from MySimpleDialog:',mySimpleDialog.content)


    }

    public renderDialog(props:DialogProps){
        console.log('(Dialog)setContent')

        //DOM nodes
        this.overlayItem = new Overlay({parent: this, darkBackground:true,className:'mud-overlay-dialog',visible:true});
        this.overlayItem.onClick.connect((ev)=>this.handleBackgroundClick());
        this.innerDiv=new Div({parent:this.overlayItem});

        //Dialog properties
        if (props.title != undefined) this._title = props.title;
        if (props.titleContent != undefined) this._titleContent = props.titleContent;
        if (props.content != undefined) this._content = props.content;
        if (props.titleContent != undefined) this._titleContent = props.titleContent;
        if (props.content != undefined) this._content = props.content;
        if (props.closeIcon != undefined) this._closeIcon = props.closeIcon;
        if (props.options != undefined) this._options = props.options;

        this.configureInstance();

        //Let's write the properties into the DOM
        this.render();
    }

    public render(firstRender:boolean=false): void {
        this.innerDiv.innerHTML='';//todo improve this

        //Div
        let divClass = 'mud-dialog-container';
        this.setClassAndStyle(divClass, true);
        ElementHelper.toggleAttribute(this.element!,this.position!,true);

        //Inner Div
        let innerDivClass='mud-dialog';
        if(!this.fullScreen)innerDivClass+=' '+this.dialogMaxWidth;
        if(this.fullWidth && !this.fullScreen)innerDivClass+=' mud-dialog-width-full';
        if(this.fullScreen)innerDivClass+=' mud-dialog-fullscreen';
        //todo add rightToleft
        this.innerDiv.className.value=innerDivClass;
        if(this.style.value) this.innerDiv.style.value=this.style.value;
        this.innerDiv.element!.setAttribute('role','dialog');

        //Title Div
        if(this.noHeader) this.buildWithoutHeader();
        else this.titleDiv=this.titleDiv?.delete();

        console.log('(Dialog)content extends ComponentBase',this.content instanceof Component);

        if(this.content instanceof Component){
            //let's get it's element and append to this
            if(this.content.element) this.innerDiv.element!.appendChild(this.content.element)
        }else{
            console.log('addint non ComponentBase as dialog content')
            this.innerDiv.element!.append(this.content);
        }


    }

    protected buildWithoutHeader():void{
        if(!this.titleDiv)this.titleDiv=new Div({parent:this.innerDiv, className:'mud-dialog-title'});
        if(!this.titleContent){
            if(!this.titleTextItem)this.titleTextItem=new Text({parent:this.titleDiv, typo:Typo.h6});
            this.titleTextItem.childContent.value=this.title??'';
        }else{
            this.titleTextItem=this.titleTextItem?.delete();
            this.innerDiv.element?.append(this.titleContent);
        }
        if(this.closeButton) this.buildCloseButton();
        else this.closeButtonIcon=this.closeButtonIcon?.delete();
    }

    protected buildCloseButton():void{
        if(!this.closeButtonIcon){
            this.closeButtonIcon=new IconButton({parent:this.innerDiv});
            this.closeButtonIcon.onClick.connect((ev)=>this.handleCancel());
        }
        this.closeButtonIcon.icon.value=this.closeIcon;
        //this.closeButtonIcon.element!.ariaLabel='close';
    }

    protected configureInstance(): void {
        this.position=this.setPosition();
        this.dialogMaxWidth=this.setMaxWidth();
        //this.class=this.className//todo ver o classname
        this.noHeader=this.setHideHeader();
        this.closeButton=this.setCloseButton();
        this.fullWidth=this.setFullWidth();
        this.fullScreen=this.setFullScreen();
        this.disableBackdropClick=this.setDisableBackdropClick();
        this.closeOnEscapeKey=this.setCloseOnEscapeKey();
    }

    protected setPosition(): string {
        let position: DialogPosition;
        if (this.options.position) position = this.options.position;
        else if (this.globalDialogOptions.position) position = this.globalDialogOptions.position;
        else position = DialogPosition.Center;
        return `mud-dialog-${position}`;
    }

    protected setMaxWidth(): string {
        let maxWidth: MaxWidth;
        if (this.options.maxWidth) maxWidth = this.options.maxWidth;
        else if (this.globalDialogOptions.maxWidth) maxWidth = this.globalDialogOptions.maxWidth;
        else maxWidth = MaxWidth.Small;
        return `mud-dialog-width-${maxWidth}`;
    }

    protected setFullWidth(): boolean {
        if(this.options.fullWidth)return this.options.fullWidth;
        if(this.globalDialogOptions.fullWidth)return this.globalDialogOptions.fullWidth;
        return false;
    }

    protected setFullScreen(): boolean {
        if(this.options.fullScreen)return this.options.fullScreen;
        if(this.globalDialogOptions.fullScreen)return this.globalDialogOptions.fullScreen;
        return false;
    }

    protected setHideHeader(): boolean {
        if(this.options.noHeader)return this.options.noHeader;
        if(this.globalDialogOptions.noHeader)return this.globalDialogOptions.noHeader;
        return false;
    }

    protected setCloseButton(): boolean {
        if(this.options.closeButton)return this.options.closeButton;
        if(this.globalDialogOptions.closeButton)return this.globalDialogOptions.closeButton;
        return false;
    }

    protected setDisableBackdropClick(): boolean {
        if(this.options.disableBackdropClick)return this.options.disableBackdropClick;
        if(this.globalDialogOptions.disableBackdropClick)return this.globalDialogOptions.disableBackdropClick;
        return false;
    }

    protected setCloseOnEscapeKey(): boolean {
        if(this.options.closeOnEscapeKey)return this.options.closeOnEscapeKey;
        if(this.globalDialogOptions.closeOnEscapeKey)return this.globalDialogOptions.closeOnEscapeKey;
        return false;
    }

    protected handleBackgroundClick(): void {
        if (this.disableBackdropClick) return;
        //todo implementar
        console.log('(Dialog)handleBackgroundClick');
        //this.onClosed.emit('resultado');
        this.dialogService.close('myResult');
    }

    protected handleCancel():void{

    }

    public close(result:any):void{
        this.dialogService.close(result);
    }
}

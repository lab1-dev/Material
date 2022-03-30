import { component, Property, Signal} from "@lab1/core";
import type {TreeViewItemToggleButtonProps} from "./TreeViewItemToggleButtonProps";
import {IconButton, Color, Material, MaterialComponent} from "../../MaterialExports";

@component
export class TreeViewItemToggleButton extends MaterialComponent implements TreeViewItemToggleButtonProps{

    //region properties
    //readonly visible = new NewProperty<boolean>(this,false);
    readonly expanded = new Property<boolean>(this,false);
    readonly loading = new Property<boolean>(this,false);
    readonly loadingIcon = new Property<string>(this,Material.Icons.Filled.Loop);
    readonly loadingIconColor = new Property<Color>(this,Color.Default);
    readonly expandedIcon = new Property<string>(this,Material.Icons.Filled.ChevronRight);
    readonly expandedIconColor = new Property<Color>(this,Color.Default);
    //endregion

    //region DOM nodes, events and others
    iconButton?:IconButton
    readonly onExpandedChange = new Signal<(expanded:boolean) => void>();
    //endregion

    constructor(props: TreeViewItemToggleButtonProps) {
        super({...{element: document.createElement('div')}, ...props});
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);

        //Div
        this.setClassAndStyle('mud-treeview-component-arrow',false);

        //IconButton
        let iconButtonClass='';
        if(this.expanded.value && !this.loading.value)iconButtonClass+='mud-treeview-component-arrow-expand mud-transform';
        if(this.loading.value)iconButtonClass+=' mud-treeview-component-arrow-load';
        if(this.visible.value){
            if(!this.iconButton){
                this.iconButton=new IconButton({parent:this});
                this.iconButton.onClick.connect((ev)=>this.handleToggle());
            }
            if(this.loading.value){
                this.iconButton.icon.value=this.loadingIcon.value;
                this.iconButton.color.value=this.loadingIconColor.value;
            } else {
                this.iconButton.icon.value=this.expandedIcon.value;
                this.iconButton.color.value=this.expandedIconColor.value;
            }
            this.iconButton.className.value=iconButtonClass;
        }else this.iconButton=this.iconButton?.delete();
    }

    protected handleToggle():void{
        this.expanded.value=!this.expanded.value;
        this.onExpandedChange.emit(this.expanded.value);
    }
}

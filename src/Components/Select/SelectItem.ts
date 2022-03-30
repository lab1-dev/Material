import {Lab1, component, Property} from "@lab1/core";
import {BaseSelectItem, ListItem, Material, Select} from "../../MaterialExports";
import type {SelectItemProps} from "./SelectItemProps"
import {ISelect} from "./ISelect";

@component
export class SelectItem<T=string> extends BaseSelectItem implements SelectItemProps<T>{

    //region properties
    private readonly isSelected = new Property<boolean>(this, false);
    readonly value = new Property<T|undefined>(this, undefined);
    private readonly hideContent = new Property<boolean>(this, false);
    //endregion

    //region Events and others
    private _parentSelect?:ISelect
    private _shadownParent:any
    public itemID='_'+Lab1.newID()
    public listItem?:ListItem
    public mudSelect?:Select<T>
    //private _select: Select<T>
    get iMudSelect(): ISelect|undefined {
        return this._parentSelect
    }
    set iMudSelect(value:ISelect|undefined) {
        this._parentSelect=value;
        if(!this._parentSelect)return;
        this._parentSelect.checkGenericTypeMatch(this);
        if(!this.mudSelect)return;
        let isSelected=this.mudSelect.add(this);
        if(this._parentSelect.multiSelection){
            //todo
        }else{
            this.isSelected.value=isSelected;
        }
    }
    //endregion

    constructor(props:SelectItemProps<T>) {//todo ver para renderizar o ListItem ao invez do div abaixo
        super(props);
        this.readProperties(props,true);
        this.render(true);
    }

    public render(firstRender: boolean = false) :void{
        super.render(firstRender);

        //ListItem
        if(!this.hideContent.value){
            if(!this.listItem){
                this.listItem=new ListItem({
                    value:this.itemID,
                    id:this.itemID,
                    disabled:this.disabled,
                    className:this.className,
                    style:this.style,
                });
                this.listItem.onClick.connect((ev)=>this.handleClick(ev));
            }
            this.listItem.icon.value=this.checkBoxIcon;
            this.listItem.text.value=this.displayString//todo adicionar suporte para childcontent também.
        }else this.listItem=this.listItem?.delete();
    }

    protected onUpdateSelectionStateFromOutside(selection:T[]):void{
        if(!selection)return;
        let old_is_selected=this.isSelected.value;
        if(this.value.value) this.isSelected.value=selection.indexOf(this.value.value)>=0
    }

    protected get multiSelection():boolean{
        if(!this.mudSelect)return false;
        return this.mudSelect.multiSelection.value;
    }

    protected get checkBoxIcon():string|undefined{
        if(!this.multiSelection)return undefined;
        return this.isSelected.value?Material.Icons.Filled.CheckBox:Material.Icons.Filled.CheckBoxOutlineBlank
    }

    protected get displayString():string{
        //todo
        return this.value.value as any;
    }

    protected handleClick(ev: MouseEvent) {
        //super.handleClick(ev);
        if(this.multiSelection)this.isSelected.value=!this.isSelected.value;
        console.log('(SelectItem)handleClick',this.value.value);
        this.mudSelect?.selectOptionValue(this.value.value);
        //todo ver se precisa chamar render aqui
    }
}

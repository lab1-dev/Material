import type { RatingProps } from './RatingProps';
import {component, Component, Lab1, Property, Signal} from "@lab1/core";
import {Color, Material, MaterialComponent, RatingItem, Size} from "../../MaterialExports";

@component
export class Rating extends MaterialComponent implements RatingProps{

    //region properties
    readonly ratingItemsClass = new Property<string|undefined>(this, undefined);
    readonly ratingItemsStyle = new Property<string|undefined>(this, undefined);
    readonly name = new Property<string>(this, Lab1.newID());
    readonly maxValue = new Property<number>(this, 5);
    readonly fullIcon = new Property<string>(this, Material.Icons.Filled.Star);
    readonly emptyIcon = new Property<string>(this, Material.Icons.Filled.StarBorder);
    readonly color = new Property<Color>(this, Color.Default);
    readonly size = new Property<Size>(this, Size.Medium);
    readonly disableRipple = new Property<boolean>(this, false);
    readonly disabled = new Property<boolean>(this, false);
    readonly readOnly = new Property<boolean>(this, false);
    readonly selectedValue = new Property<number>(this, 0,{
        customGetter:()=>{
            return this._selectedValue;
        },
        customSetter:(value)=>{
            this._selectedValue=value;
            this.onSelectedValueChange.emit(this._selectedValue);
        }
    });
    //endregion

    //region Events and others
    get hoveredValue():number|undefined{
        return this._hoveredValue;
    }
    set hoveredValue(value:number|undefined){
        if(this._hoveredValue==value)return;
        this._hoveredValue=value;
        this.onHoveredValueChange.emit(value);
    }
    protected _selectedValue=0;
    protected _hoveredValue?:number;
    protected isRatingHover():boolean{
        return this.hoveredValue!=undefined
    }
    readonly onSelectedValueChange = new Signal<(value:number) => void>();
    readonly onHoveredValueChange = new Signal<(value:number|undefined) => void>();
    //endregion

    constructor(props:RatingProps) {
        super({...{element:document.createElement('span') }, ...props});
        this.readProperties(props,true);
        this.render(true);
        this.element!.onkeydown=(ev)=>this.handleKeyDown(ev);
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);
        this.removeChildComponents();

        //span css
        let className='mud-rating-root';
        this.setClassAndStyle(className,true);
        //tabIndex
        this.element!.tabIndex=this.disabled.value?-1:0
        //RatingItems
        for(let i=1;i<=this.maxValue.value;i++){
            this.buildRatingItem(i);
        }
    }

    protected buildRatingItem(i:number){
        new RatingItem({
            parent:this,
            className:this.ratingItemsClass,
            style:this.ratingItemsStyle,
            itemValue:i,
            disableRipple:this.disableRipple,
            disabled:this.disabled,
            readOnly:this.readOnly,
            color:this.color,
            size:this.size,
            onItemClick:(value)=>this.handleItemClick(value),
            onItemHover:(value)=>this.handleItemHover(value)
        });
    }

    //todo remover isso
    addChildComponent(ratingItem: Component) {
        super.addChildComponent(ratingItem);
        //when RatingItem is added as childContent, RatingItem has no parentComponent set
        if(ratingItem.parent==undefined){
            ratingItem._parent=this;
            (ratingItem as RatingItem).rating=this;
            ratingItem.render()
        }
    }

    protected handleItemClick(itemValue:number):void{
        this.selectedValue.value=itemValue;
        if(itemValue==0)this.hoveredValue=undefined;
        //console.log('(Rating)handleItemClick:',itemValue)
        this.render();
    }

    public handleItemHover(itemValue?:number):void{
        this.hoveredValue=itemValue;
        this.render();//todo nao chamar o render aqui. Deveria estar aumentando o tamanho do star corrente. Só deveria chamar o render do Star corrente
    }

    protected increaseValue(val:number):void{
        if((this.selectedValue.value==this.maxValue.value&& val>0)|| (this.selectedValue.value==0 && val<0)){

        }else this.selectedValue.value=this.selectedValue.value+ val;
    }

    protected handleKeyDown(obj:KeyboardEvent):void{
        if(this.disabled.value || this.readOnly.value)return;
        switch(obj.key.toLowerCase()){
            case 'arrowright':
                if(obj.shiftKey)this.increaseValue(this.maxValue.value-this.selectedValue.value);
                else this.increaseValue(1);
                break;
            case 'arrowleft':
                if(obj.shiftKey)this.increaseValue(this.selectedValue.value*-1);
                else this.increaseValue(-1);
                break;
        }
    }
}

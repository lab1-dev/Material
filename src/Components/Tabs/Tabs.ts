import {ArrayHelper, List, component, Property, Signal, NumberHelper} from "@lab1/core";
import {Color, Placement, Position, TabHeaderPosition, TabPanel, StyleBuilder, Material, MaterialComponent} from "../../MaterialExports";
import type {TabsProps} from './TabsProps';

@component
export class Tabs extends MaterialComponent implements TabsProps{

    //region properties
    readonly rightToLeft = new Property<boolean>(this, false);
    readonly keepPanelsAlive = new Property<boolean>(this, false);
    readonly rounded = new Property<boolean>(this, false);
    readonly border = new Property<boolean>(this, false);
    readonly outlined = new Property<boolean>(this, false);
    readonly centered = new Property<boolean>(this, false);
    readonly hideSlider = new Property<boolean>(this, false);
    readonly prevIcon = new Property<string>(this, Material.Icons.Filled.ChevronLeft);
    readonly nextIcon = new Property<string>(this, Material.Icons.Filled.ChevronRight);
    readonly alwaysShowScrollButtons = new Property<boolean>(this, false);
    //foi para o component readonly maxHeight = new Property<number|undefined>(this, undefined);
    readonly position = new Property<Position>(this, Position.Top);
    readonly color = new Property<Color>(this, Color.Default);
    readonly sliderColor = new Property<Color>(this, Color.Inherit);
    readonly iconColor = new Property<Color>(this, Color.Inherit);
    readonly scrollIconColor = new Property<Color>(this, Color.Inherit);
    readonly elevation = new Property<number>(this, 0);
    readonly applyEffectsToContainer = new Property<boolean>(this, false);
    readonly disableRipple = new Property<boolean>(this, false);
    readonly disableSliderAnimation = new Property<boolean>(this, false);
    readonly prePanelContent = new Property<TabPanel|undefined>(this, undefined);
    readonly tabPanelClass = new Property<string|undefined>(this, undefined);
    readonly panelClass = new Property<string|undefined>(this, undefined);
    readonly header = new Property<Tabs|undefined>(this, undefined);
    readonly headerPosition = new Property<TabHeaderPosition>(this, TabHeaderPosition.After);
    readonly tabPanelHeader = new Property<TabPanel|undefined>(this, undefined);
    readonly activePanelIndex = new Property<number>(this, 0,{
        customGetter:()=>{
            return this._activePanelIndex;
        },
        customSetter:(value)=>{
            if(this._activePanelIndex!=value){
                this._activePanelIndex=value;
                if(this._isRendered)this.activePanel=this._panels[this._activePanelIndex];
                this.onActivePanelIndexChange.emit(value);
                //todo ver se precisa fazer o render
            }
        }
    });
    //endregion

    //region DOM nodes, events and others
    protected _isDisposed=false
    protected _activePanelIndex=0
    protected _isRendered=false
    protected _prevButtonDisabled=false
    protected _nextButtonDisabled=false
    protected _showScrollButtons=false
    protected _disableSliderAnimation=false;
    protected _tabsContentSize:any
    protected _size=0
    protected _position=0
    protected _toolbarContentSize=0
    protected _allTabsSize=0
    protected _scrollPosition=0
    protected internalClassName=''
    protected _prevIcon?:string
    protected _nextIcon?:string
    protected _panels:TabPanel[]=[];
    //A readonly list of the current panels. Panels should be added or removed through the RenderTree use this collection to get informations about the current panels
    readonly panels:Readonly<TabPanel[]>;
    activePanel?:TabPanel
    _resizeObserver:any//todo
    readonly onActivePanelIndexChange = new Signal<(index:number) => void>();
    //endregion

    constructor(props:TabsProps) {
        super({...{element: document.createElement('div')}, ...props});

        //Tabs properties
        this.readProperties(props,true);

        //mud constructor
        this.panels=this._panels;
        //mud onparameterset
        this.reRender();

        //Let's write the properties into the DOM
        this.render(true);

        //mud onAfterRenderAsync
        let items=new List(this._panels).Select(x=>x.panelRef).ToArray()
        items.push(this._tabsContentSize);
        if(this._panels.length>0)this.activePanel=this._panels[this._activePanelIndex];
        this._resizeObserver.observe(items);
        //todo this._resizeObserver.onResized
        this.reRender();
        //todo stateHasChanged
        this._isRendered=true;
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);

        this.buildCSSClasses();
    }

    protected buildCSSClasses(){
        //Top Div
        let tabsClassNames='mud-tabs';
        if(this.applyEffectsToContainer.value && this.rounded.value)tabsClassNames+=' mud-tabs-rounded';
        if(this.applyEffectsToContainer.value && this.outlined.value)tabsClassNames+=' mud-paper-outlined';
        if(this.applyEffectsToContainer.value && this.elevation.value!=0)tabsClassNames+=` mud-elevation-${this.elevation}`
        if(this.position.value!=Position.Bottom)tabsClassNames+=' mud-tabs-reverse';
        if(this.isVerticalTabs())tabsClassNames+=' mud-tabs-vertical';
        if(this.position.value==Position.Right &&!this.rightToLeft.value|| (this.position.value==Position.Left) && this.rightToLeft.value || this.position.value==Position.End)
        tabsClassNames+=' mud-tabs-vertical-reverse';
        tabsClassNames+=' '+this.internalClassName
        this.setClassAndStyle(tabsClassNames,true);

        let toolBarClassNames='mud-tabs-toolbar';
        if(!this.applyEffectsToContainer.value && this.rounded.value)toolBarClassNames+=' mud-tabs-rounded';
        if(this.isVerticalTabs())toolBarClassNames+=' mud-tabs-vertical';
        if(this.color.value!=Color.Default)toolBarClassNames+=` mud-tabs-toolbar-${this.color}`;
        if(this.border.value)toolBarClassNames+=` mud-tabs-border-${this.convertPosition(this.position.value)}`;
        if(!this.applyEffectsToContainer.value&& this.outlined.value)toolBarClassNames+=' mud-paper-outlined';
        if(!this.applyEffectsToContainer.value&& this.elevation.value!=0)toolBarClassNames+=` mud-elevation-${this.elevation}`;
        //todo add the class

        let wrapperClassNames='mud-tabs-toolbar-wrapper';
        if(this.centered.value)wrapperClassNames+=' mud-tabs-centered';
        if(this.isVerticalTabs())wrapperClassNames+=' mud-tabs-vertical';

        let wrapperScrollStyle=new StyleBuilder()
            .addStyleWhen('transform', `translateX(${ (-1 * this._scrollPosition)}px)`,this.position.value==Position.Top || this.position.value==Position.Bottom)
            .addStyleWhen('transform',`translateY(${ (-1 * this._scrollPosition)}px)`,this.isVerticalTabs())
            .build();

        let panelsClassNames='mud-tabs-panels';
        if(this.isVerticalTabs())panelsClassNames+=' mud-tabs-vertical';
        if(this.panelClass.value)panelsClassNames+=' '+this.panelClass.value;

        let sliderClass='mud-tab-slider';
        if(this.sliderColor.value!=Color.Inherit)sliderClass+=` mud-${this.sliderColor}`;
        if(this.position.value==Position.Top|| this.position.value==Position.Bottom)sliderClass+=' mud-tab-slider-horizontal';
        if(this.isVerticalTabs())sliderClass+=' mud-tab-slider-vertical';
        if(this.position.value==Position.Bottom)sliderClass+=' mud-tab-slider-horizontal-reverse';
        if(this.position.value==Position.Right || this.position.value==Position.Start && this.rightToLeft.value|| (this.position.value==Position.End && !this.rightToLeft.value))
            sliderClass+=' mud-tab-slider-vertical-reverse';

        let maxHeightStyles=new StyleBuilder()
            .addStyleWhen('max-height',NumberHelper.toPixel(this.maxHeight.value),this.maxHeight.value!=undefined)
            .build();

        let sliderStyle='';
        if(this.rightToLeft.value){
            sliderStyle=new StyleBuilder()
                .addStyleWhen('width', NumberHelper.toPixel(this._size),this.position.value==Position.Top|| this.position.value==Position.Bottom)
                .addStyleWhen('right',NumberHelper.toPixel(this._position),this.position.value==Position.Top || this.position.value==Position.Bottom)
                .addStyleWhen('transition',this.disableSliderAnimation?'none':"right .3s cubic-bezier(.64,.09,.08,1);",this.position.value==Position.Top || this.position.value==Position.Bottom)
                .addStyleWhen('transition',this._disableSliderAnimation?'none':"top .3s cubic-bezier(.64,.09,.08,1);",this.isVerticalTabs())
                .addStyleWhen('height',NumberHelper.toPixel(this._size),this.isVerticalTabs())
                .addStyleWhen('top',NumberHelper.toPixel(this._position),this.isVerticalTabs())
                .build();
        }else{
            sliderStyle=new StyleBuilder()
                .addStyleWhen('width',NumberHelper.toPixel(this._size),this.position.value==Position.Top || this.position.value==Position.Bottom)
                .addStyleWhen('left',NumberHelper.toPixel(this._position),this.position.value==Position.Top || this.position.value==Position.Bottom)
                .addStyleWhen('transition',this._disableSliderAnimation?'none':"left .3s cubic-bezier(.64,.09,.08,1);",this.position.value==Position.Top || this.position.value==Position.Bottom)
                .addStyleWhen('transition',this._disableSliderAnimation?'none':"top .3s cubic-bezier(.64,.09,.08,1);",this.isVerticalTabs())
                .addStyleWhen('height',NumberHelper.toPixel(this._size),this.isVerticalTabs())
                .addStyleWhen('top',NumberHelper.toPixel(this._position),this.isVerticalTabs())
                .build();
        }
    }

    public disposeAsync():void{
        if(this._isDisposed)return;
        this._isDisposed=true;
        //todo this._resizeObserver.
        this._resizeObserver.disposeAsync();
    }

    public addPanel(tabPanel:TabPanel):void{
        this._panels.push(tabPanel);
        if(this._panels.length==1)this.activePanel=tabPanel;
        //todo statehaschanged
    }

    public setPanelRef(reference:TabPanel):void{
        if(this._isRendered && this._resizeObserver.isElementObserved(reference)==false){
            this._resizeObserver.observe(reference);
            this.reRender();
            //todo statehaschanged
        }
    }

    public removePanel(tabPanel:TabPanel):void{
        if(this._isDisposed)return;
        let index=this._panels.indexOf(tabPanel);
        let newIndex=index;
        if(this.activePanelIndex.value==index && index==this._panels.length-1){
            newIndex=index>0?index-1:0;
            if(this._panels.length==1){
                this.activePanel=undefined;
            }
        }else if(this._activePanelIndex>index){
            this._activePanelIndex--;
            this.onActivePanelIndexChange.emit(this._activePanelIndex);
        }
        if(index!=newIndex){
            this.activePanelIndex.value=newIndex;
        }
        this._panels= ArrayHelper.removeItem(this._panels,tabPanel);
        this._resizeObserver.unobserve(tabPanel.panelRef);
        this.reRender();
        //todo statehaschanged
    }

    public activatePanel(panel:TabPanel, ignoreDisabledState:boolean=false):void{
        this.activatePanelByMouse(panel,undefined,ignoreDisabledState);
    }

    //differnt name
    public activatePanelByIndex(index:number, ignoreDisabledState:boolean=false):void{
        let panel=this._panels[index];
        this.activatePanelByMouse(panel,undefined,ignoreDisabledState);
    }

    public ativatePanelByID(id:string, ignoreDisableSate:boolean=false):void{
        let panel=new List(this._panels).Where(p=> p?.id==id).FirstOrDefault();
        if(panel!=undefined)this.activatePanelByMouse(panel,undefined,ignoreDisableSate);
    }

    protected activatePanelByMouse(panel:TabPanel, ev:MouseEvent|undefined, ignoreDisabledState:boolean=false):void{
        if(!panel.disabled.value || ignoreDisabledState){
            this.activePanelIndex.value=this._panels.indexOf(panel);
            if(ev!=undefined)this.activePanel?.onClick.emit(ev);
            this.centerScrollPositionAroundSelectedItem();
            this.setSliderState();
            this.setScrollabilityStates();
            //todo stateHasChanged
        }
    }

    protected isVerticalTabs():boolean{
        return this.position.value==Position.Left
            || this.position.value==Position.Right
            || this.position.value==Position.Start
            || this.position.value==Position.End;
    }

    protected convertPosition(position:Position):Position{
        switch(position){
            case Position.Start:
                return this.rightToLeft.value?Position.Right:Position.Left;
            case Position.End:
                return this.rightToLeft.value?Position.Left:Position.Right;
        }
        return position;
    }

    protected getTabClass(panel:TabPanel):string{
        let tabClass='mud-tab';
        if(panel==this.activePanel)tabClass+=' mud-tab-active';
        if(panel.disabled.value)tabClass+=' mud-disabled';
        if(this.tabPanelClass.value)tabClass+=' '+this.tabPanelClass.value;
        if(panel.className.value)tabClass+=' '+panel.className.value;
        return tabClass;
    }

    protected getTooltipPlacement():Placement{
        if(this.position.value==Position.Right)return Placement.Left;
        else if(this.position.value==Position.Left)return Placement.Right;
        else if(this.position.value==Position.Bottom)return Placement.Top;
        else return Placement.Bottom;
    }

    getTabStyle(panel:TabPanel):string{
        return new StyleBuilder()
            .addStyleString(panel.style.value)
            .build();
    }

    protected reRender():void{
        this._nextIcon=this.rightToLeft.value?this.prevIcon.value:this.nextIcon.value;
        this._prevIcon=this.rightToLeft.value?this.nextIcon.value:this.prevIcon.value;
        this.getToolBarContentSize();
        this.getAllTabsSize();
        this.setScrollButtonVisibility();
        this.centerScrollPositionAroundSelectedItem();
        this.setSliderState();
        this.setScrollabilityStates();
    }

    protected onResized(changes:any):void{
        this.reRender();
        //todo statehaschanged
    }

    protected setSliderState():void{
        if(this.activePanel==undefined)return;
        this._position=this.getLengthOfPanelItems(this.activePanel);
        this._size=this.getRelevantSize(this.activePanel.panelRef)
    }

    protected getToolBarContentSize():void{
        this._toolbarContentSize=this.getRelevantSize(this._tabsContentSize);
    }

    protected getAllTabsSize():void{
        let totalTabsSize=0;
        for(let panel of this.panels){
            totalTabsSize+=this.getRelevantSize(panel.panelRef);
        }
        this._allTabsSize=totalTabsSize;
    }

    protected getRelevantSize(reference:any):number{
        switch(this.position.value){
            case Position.Top:
            case Position.Bottom:
                return this._resizeObserver.getWidth(reference);
            default:
                return this._resizeObserver.getHeight(reference)
        }
    }

    protected getLengthOfPanelItems(panel:TabPanel):number{
        let value=0;
        for(let component of this._panels){
            if(component==panel)break;
            value+=this.getRelevantSize(component.panelRef);
        }
        return value;
    }

    protected getPanelLength(panel:TabPanel| undefined):number{
        if(panel==undefined)return 0;
        else return this.getRelevantSize(panel.panelRef);
    }

    protected setScrollButtonVisibility():void{
        this._showScrollButtons=this.alwaysShowScrollButtons.value||this._allTabsSize>this._toolbarContentSize;
    }

    protected scrollPrev():void{
        let scrollValue=this.rightToLeft.value?this._scrollPosition+this._toolbarContentSize:this._scrollPosition-this._toolbarContentSize;
        if(this.rightToLeft.value&& scrollValue>0)scrollValue=0;
        if(!this.rightToLeft.value&& scrollValue<0)scrollValue=0;
        this._scrollPosition=scrollValue;
        this.setScrollabilityStates();
    }

    protected scrollNext():void{
        let scrollValue=this.rightToLeft.value?this._scrollPosition-this._toolbarContentSize:this._scrollPosition+this._toolbarContentSize;
        if(scrollValue>this._allTabsSize)scrollValue=this._allTabsSize-this._toolbarContentSize-96;
        this._scrollPosition=scrollValue;
        this.setScrollabilityStates();
    }

    protected scrollToItem(panel:TabPanel):void{
        let position=this.getLengthOfPanelItems(panel);
        this._scrollPosition=this.rightToLeft?(-position):position;
    }

    protected isAfterLastPanelIndex(index:number):boolean{
        return (index>=this._panels.length);
    }

    protected isBeforeFirstPanelIndex(index:number):boolean{
        return index<0;
    }

    protected centerScrollPositionAroundSelectedItem():void{
        if(!this.activePanel)return;
        let panelToStart=this.activePanel;
        let length=this.getPanelLength(panelToStart);
        if(length>=this._toolbarContentSize){
            this.scrollToItem(panelToStart);
            return;
        }
        let indexCorrection=1;
        while(true){
            let panelAfterIndex=this._activePanelIndex+indexCorrection;
            if(!this.isAfterLastPanelIndex(panelAfterIndex)){
                length+=this.getPanelLength(this._panels[panelAfterIndex]);
            }
            if(length>=this._toolbarContentSize){
                this.scrollToItem(panelToStart);
                break;
            }
            length=this._toolbarContentSize-length;
            let panelBeforeIndex=this._activePanelIndex-indexCorrection;
            if(!this.isBeforeFirstPanelIndex(panelBeforeIndex)){
                length-=this.getPanelLength(this._panels[panelBeforeIndex]);
            }else break;
            if(length<0){
                this.scrollToItem(panelToStart);
                break;
            }
            length=this._toolbarContentSize-length;
            panelToStart=this._panels[this._activePanelIndex-indexCorrection];
            indexCorrection++;
        }
        this.scrollToItem(panelToStart);
        this.setScrollabilityStates();
    }

    protected setScrollabilityStates():void{
        let isEnoughSpace=this._allTabsSize<=this._toolbarContentSize;
        if(isEnoughSpace){
            this._nextButtonDisabled=true;
            this._prevButtonDisabled=true;
        }else{
            this._nextButtonDisabled=this.rightToLeft?(this._scrollPosition-this._toolbarContentSize)<=-this._allTabsSize:(this._scrollPosition+this._toolbarContentSize)>=this._allTabsSize;
            this._prevButtonDisabled=this.rightToLeft?this._scrollPosition>=0:this._scrollPosition<=0;
        }
    }

}

import {CultureInfo, DateTime, DayOfWeek, Lab1, component, Property} from "@lab1/core";
import {PickerVariant, Typo, OpenTo, Picker, Material} from "../../MaterialExports";
import type {BaseDatePickerProps} from "./BaseDatePickerProps";

@component
export class BaseDatePicker extends Picker<DateTime|undefined> implements BaseDatePickerProps{

    //region properties
    readonly maxDate = new Property<DateTime|undefined>(this, undefined);
    readonly minDate = new Property<DateTime|undefined>(this, undefined);
    readonly openTo = new Property<OpenTo>(this, OpenTo.Date);
    readonly dateFormat = new Property<string|undefined>(this, undefined);
    readonly firstDayOfWeek = new Property<DayOfWeek|undefined>(this, undefined);
    readonly pickerMonth = new Property<DateTime|undefined>(this, undefined);
    readonly closingDelay = new Property<number>(this, 100);
    readonly displayMonths = new Property<number>(this, 1);
    readonly maxMonthColumns = new Property<number|undefined>(this, undefined);
    readonly startMonth = new Property<DateTime|undefined>(this, undefined);
    readonly showWeekNumbers = new Property<boolean>(this,false);
    readonly titleDateFormat = new Property<string>(this, 'ccc, dd MMM');
    readonly previousIcon = new Property<string>(this, Material.Icons.Filled.ChevronLeft);
    readonly nextIcon = new Property<string>(this, Material.Icons.Filled.ChevronRight);
    readonly fixYear = new Property<number|undefined>(this, undefined);
    readonly fixMonth = new Property<number|undefined>(this, undefined);
    readonly fixDay = new Property<number|undefined>(this, undefined);
    //endregion

    //region DOM nodes, events and others
    isDateDisabledFunc?: (date:DateTime) => boolean
    currentView?:OpenTo
    _scrollToYearAfterRender=false;//Is set to true to scroll to the actual year after the next render
    _picker_month?:DateTime
    _componentId=Lab1.newID();
    //endregion

    constructor(props:BaseDatePickerProps) {
        super(props);
        //super({...{element: document.createElement('mat-toolbar')}, ...props});

        if(!this.isInherited(BaseDatePicker)) {
            this.readProperties(props, true);
            this.onInitialized();
            this.render(true);
            this.onAfterRenderAsync(true);
        }
    }

    protected onInitialized() {
        super.onInitialized();
        this.currentView=this.openTo.value;
    }

    protected onAfterRenderAsync(firstRender:boolean){
        if(firstRender){
            this._picker_month??=this.getCalendarStartOfMonth();
        }
        if(firstRender && this.currentView==OpenTo.Year){
            this.scrollToYear();
        }
        super.onAfterRenderAsync(firstRender);
    }

    //Date format value change hook for descendants.
    protected dateFormatChanged(newFormat:string):void{
        return;
    }

    //todo adicionar setCulture method
    protected setCulture(value:CultureInfo):void{
        super.setCulture(value);
        //todo add converter
    }

    protected handlePickerOpen() :void{
        super.handlePickerOpen();
        if(this.openTo.value==OpenTo.Date && this.fixDay.value!=undefined){
            this.openTo.value=OpenTo.Month;
        }
        if(this.openTo.value==OpenTo.Date && this.fixDay.value!=undefined && this.fixMonth.value!=undefined){
            this.openTo.value=OpenTo.Year
        }
        this.currentView=this.openTo.value;
        if(this.currentView==OpenTo.Year)this._scrollToYearAfterRender=true;
    }

    //Get the first day of the month to display
    protected getMonthStart(month:number):DateTime{
        let monthStartDate=this._picker_month??DateTime.today;//todo adicionar StartOfMonth(Culture);
        // Return the min supported datetime of the calendar when this is year 1 and first month!
        if(this._picker_month!=undefined && this._picker_month.year==1 && this._picker_month.month==1){
            return DateTime.now//todo retornar minsupported
        }
        return DateTime.now
    }

    //Get the last of the month to display
    protected getMonthEnd(month:number):DateTime{
        let monthStartDate=this._picker_month??DateTime.today.startOfMonth;
        return monthStartDate.addMonths(month).endOfMonth;
    }

    protected getFirstDayOfWeek():DayOfWeek{
        if(this.firstDayOfWeek.value)return this.firstDayOfWeek.value;
        //todo ver classe culture
        return DayOfWeek.Monday;
    }

    //Gets the n-th week of the currently displayed month.
    protected getWeek(month:number,index:number):DateTime[]{
        if(index<0 || index>5)throw 'Index must be between 0 and 5';
        let month_first=this.getMonthStart(month);
        let week_first=month_first.addDays(index*7).startOfWeek;
        let result=[];
        for(let i=0;i<7;i++){
            result.push(week_first.addDays(i));
        }
        return result;
    }

    protected getWeekNumber(month:number, index:number):string{
        if(index<0 || index>5)throw 'Index must be between 0 and 5';
        let month_first=this.getMonthStart(month);
        let week_first=month_first.addDays(index*7).startOfWeek;
        //january 1st
        if(month_first.month==1 && index==0){
            week_first=month_first
        }
        if(week_first.month!=month_first.month && week_first.addDays(6).month!=month_first.month)return '';

        return week_first.weekOfYear.toString();
    }

    protected getNextView():OpenTo|undefined{
        let nextView=this.currentView;
        switch(nextView){
            case OpenTo.Year:
                if(!this.fixMonth.value)nextView=OpenTo.Month;
                else if(!this.fixDay.value)nextView=OpenTo.Date;
                else nextView=undefined;
                break;
            case OpenTo.Month:
                if(!this.fixDay.value)nextView=OpenTo.Date;
                else nextView=undefined;
                break;
        }
        return nextView;
    }

    protected submitAndClose():void{
        if(this.pickerActions.value==undefined){
            this.submit();
            if(this.pickerVariant.value!=PickerVariant.Static){
                //todo delay
                this.close(false);
            }
        }
    }

    protected getDayClasses(month:number,day:DateTime):string{
        //abstract
        return '';
    }

    //User clicked on a day
    protected handleDayClick(dateTime:DateTime):void{

    }

    //User clicked on a month
    protected handleMonthSelected(month:DateTime):void{
        this.pickerMonth.value=month;
        let nextView=this.getNextView();
        if(nextView!=undefined){
            this.currentView=nextView as OpenTo
        }
    }

    //User clicked on a year
    protected handleYearClicked(year:number):void{//tem o handleyearclick tambem
        let current=this.getMonthStart(0);
        this.pickerMonth.value=DateTime.local(year,current.month,1);
        let nextView=this.getNextView();
        if(nextView!=undefined){
            this.currentView=nextView as OpenTo;
        }
    }

    protected handleMonthClick(month:number):void{
        this.currentView=OpenTo.Month;
        this._picker_month=this._picker_month?.addMonths(month);
        //todo statehaschanged
    }

    //return Mo, Tu, We, Th, Fr, Sa, Su in the right culture
    protected getAbbreviatedDayNames():string[]{
        return DateTime.abbreviatedWeekDayNames;
    }

    protected static shift<T>(array:T[],positions:number):T[]{
        //todo
        return [];
    }

    protected getTitleDateString():string{
        //todo
        return '';
    }

    protected formatTitleDate(date?:DateTime):string{
        if(!date)return '';
        if(this.titleDateFormat.value) return date?.toFormat(this.titleDateFormat.value);
        else return date?.toFormat('DDD');
    }

    protected getFormattedYearString():string{
        return this.getMonthStart(0).year.toString();
    }

    protected handlePreviousMonthClick():void{
        // It is impossible to go further into the past after the first year and the first month!
        if(this.pickerMonth.value && this.pickerMonth.value?.year==1 && this.pickerMonth.value?.month==1){
            return;
        }
        this.pickerMonth.value=this.getMonthStart(0).addDays(-1).startOfMonth;
    }

    protected handleNextMonthClick():void{
        this.pickerMonth.value=this.getMonthEnd(0).addDays(1);
    }

    protected handlePreviousYearClick():void{
        this.pickerMonth.value=this.getMonthStart(0).addYears(-1);
    }

    protected handleNextYearClick():void{
        this.pickerMonth.value=this.getMonthStart(0).addYears(1);
    }

    protected handleYearClick():void{
        this.currentView=OpenTo.Year;
        //todo statehaschanged
        this._scrollToYearAfterRender=true;
    }

    public scrollToYear():void{
        this._scrollToYearAfterRender=false;
        let id=`${this._componentId}${this.getMonthStart(0).year}`;
    }

    protected getMinYear():number{
        if(this.minDate.value!=undefined)return this.minDate.value?.year;
        return DateTime.today.year-100;
    }

    protected getMaxYear():number{
        if(this.maxDate.value!=undefined)return this.maxDate.value?.year;
        return DateTime.today.year+100;
    }

    protected getYearClasses(year:number):string|undefined{
        if(year==this.getMonthStart(0).year)return `mud-picker-year-selected mud-${this.color}-text`;
        return undefined;
    }

    protected getCalendarHeaderClasses(month:number):string{
        let className='mud-picker-calendar-header';
        className+=` mud-picker-calendar-header-${month + 1}`;
        if(month==this.displayMonths.value-1)className+=' mud-picker-calendar-header-last';
        return className;
    }

    protected getYearTypo(year:number):Typo{
        if(year==this.getMonthStart(0).year)return Typo.h5;
        return Typo.subtitle1;
    }

    protected handleFormattedDateClick():void{

    }

    protected getAllMonths():DateTime[]{
        let current=this.getMonthStart(0);
        let calendarYear=current.year;
        let firstOfCalendarYear=DateTime.local(calendarYear,1,1,0,0,0,0)
        let result=[];
        for(let i=0;i<12;i++){
            result.push(firstOfCalendarYear.addMonths(i));
        }
        return result;
    }

    protected getAbbreviatedMonthName(dt:DateTime):string{
        return dt.monthNameShort;
    }

    protected getMonthName(dt:DateTime| number):string{
        if(typeof dt==='number')return this.getMonthStart(dt).monthNameLong;
        return dt.monthNameLong;
    }

    protected getMonthClasses(month:DateTime):string|undefined{
        if(this.getMonthStart(0)==month)
            return `mud-picker-month-selected mud-${this.color}-text`;
        return undefined;
    }

    protected getMonthTypo(month:DateTime):Typo{
        if(this.getMonthStart(0)==month)return Typo.h5;
        return Typo.subtitle1;
    }

    protected getCalendarStartOfMonth():DateTime{
        //todo
        return DateTime.now;
    }

    protected getCalendarDayOfMonth(date:DateTime):number{
        return date.month;
    }

    protected getCalendarYear(year:number):number{
        //todo
        return 0;
    }
}

import type {DatePickerProps} from './DatePickerProps';
import {Component, DateTime, Lab1, component, Property, Signal, IComponent} from "@lab1/core";
import {MaterialAlign, BaseDatePicker, Color, Material, OpenTo, PickerVariant, Typo, Variant} from "../../MaterialExports";

@component
export class DatePicker extends BaseDatePicker implements DatePickerProps {

    //region properties
    readonly autoClose = new Property<boolean>(this, false);
    readonly date = new Property<DateTime | undefined>(this, undefined, {
        customSetter: (value) => {
            this.setDateAsync(value, true);
        }
    });
    //endregion

    //region DOM nodes, events and others
    readonly onDateChange = new Signal<(dt: DateTime | undefined) => void>();
    _selectedDate?: DateTime
    dayID=0;//todo ver se pode ficar aqui
    //endregion

    constructor(props: DatePickerProps) {
        //super({...{element: document.createElement('mat-card')}, ...props});
        super(props);
        //DatePicker properties
        this.readProperties(props, true);
        //Mud compatibility
        super.onInitialized();
        //Let's write the properties into the DOM
        this.render(true);
        //Mud compatibility
        super.onAfterRenderAsync(true);
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);
        console.log('(DatePicker)render. OpenTo ',OpenTo[this.currentView!], '.Fixyear:',this.fixYear.value)

        let toolBar = Material.PickerToolBar({
            className: 'mud-picker-datepicker-toolbar',
            disableToolBar: this.disableToolBar,
            orientation: this.orientation,
            color: this.color,
            childContent: this.fixYear.value ? this.buildTopYearButton() : this.buildTopDateTextButton()
        });

        this.dayID=0;
        if(this._picker_month&& this._picker_month.year==1 && this._picker_month.month==1)this.dayID=-1;
        let items:IComponent[]=[];
        for(let displayMonth=0;displayMonth<this.displayMonths.value;++displayMonth){
            let tempMonth=displayMonth
            items.push(Lab1.Div({
                className:'mud-picker-calendar-container',
                key:displayMonth.toString(),
                childContent:[
                    (tempMonth==0&&this.currentView==OpenTo.Year)?this.buildYearDialog():
                    (tempMonth==0 && this.currentView==OpenTo.Month)?this.buildMonthDialog():
                    (tempMonth>0 || this.currentView==OpenTo.Date)?this.buildDaysDialog(tempMonth):null
                ]
            }))
        }

        let pickerContent = Material.PickerContent({
            childContent: Lab1.Div({
                    className: `mud-picker-calendar-content mud-picker-calendar-content-${this.maxMonthColumns.value ?? this.displayMonths.value}`,
                    childContent:items
                })
        });

        this.buildManaged(this.pickerContent! , [toolBar,pickerContent]);//nao era o popoverPaperDiv
        //todo recolocar this.buildManagedFragment(this.parentComponent! as Item, [toolBar, pickerContent]);
    }

    //left top button displaying the year
    protected buildTopYearButton(): IComponent {
        return Material.Button({
            variant: Variant.Text,
            color: Color.Inherit,
            className: 'mud-button-year',
            onClick: this.handleYearClick,
            text: this.getFormattedYearString()
        });
    }

    //top date text button
    protected buildTopDateTextButton(): IComponent {
        //Is shown even with fix day, button click does not change to that day -> if it would this would need to be changed
        return Material.Button({
            variant: Variant.Text,
            color: Color.Inherit,
            className: 'mud-button-date',
            onClick: ()=>this.handleFormattedDateClick(),
            text: this.getTitleDateString()
        });
    }

    //Displays only years in a vertical column
    protected buildYearDialog(): IComponent {
        let years = [];
        for (let i = this.getMinYear(); i <= this.getMaxYear(); i++) {
            let year = i;
            years.push(
                Lab1.Div({
                    className: 'mud-picker-year',
                    id: `${this._componentId + year}`,
                    onClick: (ev) => {
                        this.handleYearClicked(year);
                        ev.stopPropagation()
                    },
                    childContent: Material.MudText({
                        typo: this.getYearTypo(year),
                        className: this.getYearClasses(year),
                        childContent: this.getCalendarYear(year)
                    })
                }));
        }
        return Lab1.Div({
            id: 'pickerYears',
            className: 'mud-picker-year-container',
            childContent: years
        })
    }

    //Displays only months
    protected buildMonthDialog(): IComponent[] {
        let items = [];
        let calendarYear = this.getCalendarYear(this.pickerMonth.value?.year ?? DateTime.today.year);
        let prevLabel = `Go to previous year ${calendarYear - 1}`
        let nextLabel = `Go to next year ${calendarYear + 1}`;

        //Top bar-> go to previous year button, current year text, go to next year button
        items.push(Lab1.Div({
            className: 'mud-picker-calendar-header',
            childContent: Lab1.Div({
                className: 'mud-picker-calendar-header-switch',
                childContent: !this.fixYear.value ?
                    [
                        Material.IconButton({//go to previous year button
                            ariaLabel: prevLabel,
                            icon: this.previousIcon,
                            onClick: this.handlePreviousMonthClick,
                            className: 'mud-flip-x-rtl'
                        }),
                        Lab1.Button({
                            type: 'button',
                            className: 'mud-picker-slide-transition mud-picker-calendar-header-transition',
                            onClick: (ev) => {this.handleYearClick();ev.stopPropagation()},
                            childContent: [
                                Material.MudText({
                                    typo: Typo.body1,
                                    align: MaterialAlign.Center,
                                    childContent: calendarYear
                                })
                            ]
                        }),
                        Material.IconButton({//go to next year button
                            ariaLabel: nextLabel,
                            icon: this.nextIcon,
                            onClick: this.handleNextYearClick,
                            className: 'mud-flip-x-rtl'
                        })
                    ] : [
                        //With fixyear
                        Material.MudText({
                            className: 'mud-picker-calendar-header-transition',
                            typo: Typo.body1,
                            align: MaterialAlign.Center,
                            childContent: calendarYear
                        })
                    ]
            })
        }));
        //let's display the months
        let months: IComponent[] = []
        for (let month of this.getAllMonths()) {
            months.push(Lab1.Button({
                type: 'button',
                ariaLabel: this.getMonthName(month),
                className: 'mud-picker-month',
                onClick: (ev) => {
                    this.handleMonthSelected(month);
                    ev.stopPropagation()
                }
            }))
        }
        items.push(Lab1.Div({
            className: 'mud-picker-month-container',
            childContent: months
        }));

        return items;
    }

    //Displays a header and all days of current month
    protected buildDaysDialog(tempMonth: number): IComponent[] {
        return [
            this.buildDaysTopBar(tempMonth),
            this.buildDays(tempMonth)
        ];
    }

    //Top bar-> go to previous month button, current month/year text, go to next month button
    protected buildDaysTopBar(tempMonth:number):IComponent{
        let prevLabel = `Go to previous month ${this.getMonthName((tempMonth - 1) % 12)}`;
        let nextLabel = `Go to next month ${this.getMonthName((tempMonth + 1) % 12)}`;

        return Lab1.Div({
            className: this.getCalendarHeaderClasses(tempMonth),
            childContent: Lab1.Div({
                    className: 'mud-picker-calendar-header-switch',
                    childContent: !this.fixMonth.value ?
                        [
                            Material.IconButton({//go to previous month button
                                ariaLabel:prevLabel,
                                className:'mud-picker-nav-button-prev mud-flip-x-rtl',
                                icon:this.previousIcon,
                                onClick:(ev)=>this.handlePreviousMonthClick(),
                            }),
                            Lab1.Button({//month and year text
                                type:'button',
                                className:'mud-picker-slide-transition mud-picker-calendar-header-transition mud-button-month',
                                onClick:(ev)=>{this.handleMonthClick(tempMonth);ev.stopPropagation()},
                                childContent:Material.MudText({
                                    typo:Typo.body1,
                                    align:MaterialAlign.Center,
                                    childContent:this.getMonthName(tempMonth)
                                })
                            }),
                            Material.IconButton({//go to next month button
                                ariaLabel:nextLabel,
                                className:'mud-picker-nav-button-next mud-flip-x-rtl',
                                icon:this.nextIcon,
                                onClick:this.handleNextMonthClick
                            }),
                            this.buildDaysHeader()
                        ] ://with fixmonth
                        [
                            Material.MudText({
                                className:'mud-picker-calendar-header-transition',
                                typo:Typo.body1,
                                align:MaterialAlign.Center,
                                childContent:this.getMonthName(tempMonth)
                            }),
                            this.buildDaysHeader()
                        ]
                })
        });
    }

    //Displays the header -> mon, tue, wed, thu, fri...
    protected buildDaysHeader():IComponent{
        let headerContent:IComponent[]=[];
        if(this.showWeekNumbers.value){
            headerContent.push(Lab1.Div({
                className:'mud-picker-calendar-week',
                childContent:Material.MudText({
                    typo:Typo.caption,
                    className:'mud-picker-calendar-week-text'
                })
            }))
        }
        for(let dayName of this.getAbbreviatedDayNames()){
            headerContent.push(Material.MudText({
                typo:Typo.caption,
                className:'mud-day-label',
                childContent:dayName
            }));
        }
        return Lab1.Div({
            className:'mud-picker-calendar-header-day',
            childContent:headerContent
        });
    }

    protected buildDays(tempMonth:number):IComponent{
        let days=[]
        for(let week=0;week<6;week++){
            let tempWeek=week;
            //If showWeekNumbers=true, we display the number of the week in the year on the left side of each day row.
            if(this.showWeekNumbers.value)days.push(Lab1.Div({
                className:'mud-picker-calendar-week',
                key:tempMonth+':'+week,
                childContent:Material.MudText({
                    className:'mud-picker-calendar-week-text',
                    typo:Typo.caption,
                    childContent:this.getWeekNumber(tempMonth,tempWeek)
                })
            }));
            //let's get all days of the week
            days.push(this.buildDaysInAWeek(tempMonth,tempWeek));
        }
        return Lab1.Div({
            className:'mud-picker-calendar-transition mud-picker-slide-transition',
            childContent:Lab1.Div({
                className:'mud-picker-calendar',
                childContent:days
            })
        })
    }

    //Displays a row with all days of the week
    protected buildDaysInAWeek( tempMonth:number, tempWeek:number):IComponent[]{
        let firstMonthFirstYear = this._picker_month && this._picker_month.year == 1 && this._picker_month.month == 1;
        let items=[];
        for(let day of this.getWeek(tempMonth,tempWeek)){
            let tempID=++this.dayID;//todo ver se é melhor deixar o dayID fora
            if(tempID!=0 || !firstMonthFirstYear){
                let selectedDay=!firstMonthFirstYear?day:day.addDays(-1)
                items.push(Lab1.Button({
                    key:tempMonth+':'+tempWeek+':'+day, //todo era assim -> `${firstMonthFirstYear?selectedDay:tempID}`,
                    type:'button',
                    style:`--day-id: ${!firstMonthFirstYear?tempID:tempID+1}`,
                    className:`mud-button-root mud-icon-button mud-ripple mud-ripple-icon mud-picker-calendar-day ${!firstMonthFirstYear ||day.day==this._picker_month?.day? this.getDayClasses(tempMonth,day):this.getDayClasses(tempMonth,selectedDay)}`,
                    onClick:(ev)=>{let d=selectedDay;this.handleDayClick(d);ev.stopPropagation()},
                    //todo ver o onMouseOver
                    disabled:(selectedDay<this.minDate.value!)|| (selectedDay>this.maxDate.value!) || (this.isDateDisabledFunc&& this.isDateDisabledFunc(selectedDay)),
                    ariaLabel:`${selectedDay.toShortDateString()}`,//todo ver o format para dddd, dd MMMM yyyy
                    childContent:Lab1.P({
                        className:'mud-typography mud-typography-body2 mud-inherit-text',
                        childContent:this.getCalendarDayOfMonth(selectedDay)
                    })
                }));
            }else{
                items.push(Lab1.Button({
                    key:'0',
                    type:'button',
                    style:'--day-id:1;',
                    className:'mud-button-root mud-icon-button mud-ripple mud-ripple-icon mud-picker-calendar-day mud-day',
                    ariaLabel:'',
                    disabled:true,
                    childContent:Lab1.P({
                        className:'mud-typography mud-typography-body2 mud-inherit-text'
                    })
                }));
            }
        }
        return items;
    }

    //Logic below=============================================================================

    protected setDateAsync(date: DateTime | undefined, updateValue: boolean): void {
        if (this.value.value != date) {
            this.touched = true;
            if (date != undefined && this.isDateDisabledFunc != undefined && this.isDateDisabledFunc(date.date)) {
                return;
            }
        }
        this.value._value = date;
        if (updateValue) {
            this.setTextAsync(this.convertDateTimeToString(this.value.value), false);
        }
        this.onDateChange.emit(this.value.value);
        this.beginValidate();
    }

    protected dateFormatChanged(newFormat: string): void {
        this.touched = true;
        this.setTextAsync(this.convertDateTimeToString(this.value.value), false);
    }

    protected stringValueChanged(value: string): void {
        this.touched = true;
        // Update the date property (without updating back the Value property)
        return this.setDateAsync(this.convertStringToDateTime(value), false);
    }

    protected getDayClasses(month: number, day: DateTime): string {
        let b = 'mud-day';
        if (day < this.getMonthStart(month) || day > this.getMonthEnd(month)) {//todo comparacao nao pode ser assim no typescript
            b += ' mud-hidden';
            return b;
        }
        if ((this.date.value?.date == day && this._selectedDate == undefined || this._selectedDate?.date == day)) {
            b += ' mud-selected';
            b += ` mud-theme-${this.color}`;
            return b;
        }
        if (day == DateTime.today) {
            b += ' mud-current mud-button-outlined';
            b += ` mud-button-outlined-${this.color} mud-${this.color}-text`;
            return b;
        }
        return b;
    }

    protected handleDayClick(dateTime: DateTime): void {
        this._selectedDate = dateTime;
        if (this.pickerActions == undefined || this.autoClose) {
            this.submit();
            if (this.pickerVariant.value != PickerVariant.Static) {
                //todo task delay
                this.close(false);
            }
        }
    }

    //user clicked on a month
    protected handleMonthSelected(month: DateTime): void {
        this.pickerMonth.value = month;
        let nextView = this.getNextView();
        if (nextView == undefined) {
            if (this._selectedDate != undefined) this._selectedDate = DateTime.local(month.year, month.month, this._selectedDate.day, this._selectedDate.hour, this._selectedDate.minute, this._selectedDate.second, this._selectedDate.millisecond);
            else this._selectedDate = DateTime.local(month.year, month.month, 1);
        }
    }

    //user clicked on a year
    protected handleYearClicked(year: number): void {
        let current = this.getMonthStart(0);
        this.pickerMonth.value = DateTime.local(year, current.month, 1);
        let nextView = this.getNextView();
        if (nextView == undefined) {
            if (this._selectedDate != undefined) this._selectedDate =
                DateTime.local(this._selectedDate.year, this._selectedDate.month, this._selectedDate.day, this._selectedDate.hour, this._selectedDate.minute, this._selectedDate.second, this._selectedDate.millisecond)
            else this._selectedDate = DateTime.local(year, 1, 1);
            this.submitAndClose();
        } else {
            this.currentView = nextView as OpenTo;
        }
    }

    protected handleOpen(): void {
        this._selectedDate = undefined;
        super.handleOpen();
    }

    protected submit(): void {
        if (this.readOnly.value) return;
        if (this._selectedDate == undefined) return;
        if (this.fixYear.value || this.fixMonth.value || this.fixDay.value) {
            this._selectedDate = DateTime.local(this.fixYear.value ?? this._selectedDate.year,
                this.fixMonth.value ?? this._selectedDate.month,
                this.fixDay.value ?? this._selectedDate.day,
                this._selectedDate.hour,
                this._selectedDate.minute,
                this._selectedDate.second,
                this._selectedDate.millisecond);
        }
    }

    public clear(close: boolean = true): void {
        this.date.value = undefined;
        this._selectedDate = undefined;
        super.clear();
    }

    protected getTitleDateString(): string {
        return this.formatTitleDate(this._selectedDate ?? this.date.value);
    }

    protected getCalendarStartOfMonth(): DateTime {
        let date = this.startMonth.value ?? this.date.value ?? DateTime.today
        return date.startOfMonth;
    }

    protected getCalendarYear(year: number): number {
        let date = this.date.value ?? DateTime.today;
        let diff = date.year - year;
        //todo ver let calendarYear=
        return 0;
    }

    protected handleKeyDown(obj: KeyboardEvent): void {
        if (this.disabled.value || this.readOnly.value) return;
        super.handleKeyDown(obj);
        switch (obj.key.toLowerCase()) {
            case 'arrowright':
                if (this.isOpen.value) {
                }
                break;
            case 'arrowleft':
                if (this.isOpen.value) {
                }
                break;
            case 'arrowup':
                if (!this.isOpen.value && !this.editable.value) {
                    this.isOpen.value = true;
                } else if (obj.altKey) {
                    this.isOpen.value = false;
                }
                break;
            case 'arrowdown':
                if (!this.isOpen.value && !this.editable.value) {
                    this.isOpen.value = true;
                }
                break;
            case 'escape':
                this.returnDateBackUp();
                break;
            case 'enter':
                if (!this.isOpen.value) {
                    this.open();
                } else {
                    this.submit();
                    this.close();
                    this._inputReference?.setText(this.text.value);
                }
                break;
            case ' ':
                if (!this.editable.value) {
                    if (!this.isOpen.value) {
                        this.open();
                    } else {
                        this.submit();
                        this.close();
                        this._inputReference?.setText(this.text.value);
                    }
                }
                break;
        }
    }

    protected returnDateBackUp(): void {
        this.close();
    }

    protected convertDateTimeToString(dateTime: DateTime | undefined): string {
        if (dateTime == undefined) return '';
        //todo
        return '';
    }

    //todo ver a funcao onGet no mud
    protected convertStringToDateTime(txt: string | undefined): DateTime | undefined {
        return undefined;
    }
}

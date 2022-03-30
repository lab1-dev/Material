import type {TimePickerProps} from './TimePickerProps';
import {Component, DateTime, Lab1, component, Property, Signal, TimeSpan, IComponent} from "@lab1/core";
import {Color, OpenTo, Orientation, Picker, PickerVariant, TimeEditMode, Typo, Variant} from "../../MaterialExports";
import {Material} from "../../Codes/Material";

class SetTime {
    hour: number = 0;
    minute: number = 0;
}

@component
export class TimePicker<T> extends Picker<TimeSpan | undefined> implements TimePickerProps {

    //region properties
    readonly openTo = new Property<OpenTo>(this, OpenTo.Hours);
    readonly timeEditMode = new Property<TimeEditMode>(this, TimeEditMode.Normal);
    readonly closingDelay = new Property<number>(this, 200);
    readonly autoClose = new Property<boolean>(this, false);
    readonly amPM = new Property<boolean>(this, false, {
        customSetter: (value) => {
            this.amPM._value = value;
            //todo adicionar converter
            this.touched = true;
            this.setTextAsync(this.convertTimeToString(this.value.value), false)
        }
    });
    readonly timeFormat = new Property<string>(this, '', {
        customGetter: () => {
            return this._timeFormat;
        },
        customSetter: (value) => {
            this._timeFormat = value;
            //todo converter
            this.touched = true;
            this.setTextAsync(this.convertTimeToString(this.value.value), false);
        }
    });
    readonly time = new Property<TimeSpan | undefined>(this, undefined, {
        customGetter: () => {
            return this.value.value;
        },
        customSetter: (value) => {
            this.setTimeAsync(value, true);
        }
    });

    private readonly mouseDown = new Property<boolean>(this, false);
    //endregion

    //region DOM nodes, events and others
    format24Hours = 'HH:mm'
    format12Hours = 'hh:mm tt'
    _timeFormat = '';
    _currentView?: OpenTo
    _amPM = false;
    hoursButtonClass = '';
    minuteButtonClass = ''
    amButtonClass = ''
    pmButtonClass = ''
    hourDialClass = ''
    _initialHour?: number
    _initialMinute?: number

    minuteDialClass = ''
    get isAm(): boolean {
        return (this._timeSet.hour >= 0 && this._timeSet.hour < 12)// am is 00:00 to 11:59
    }
    get isPm(): boolean {
        return (this._timeSet.hour > 12 && this._timeSet.hour < 24)// pm is 12:00 to 23:59
    }
    _timeSet = new SetTime();
    private timeIntermediate?: TimeSpan
    readonly onTimeChange = new Signal<(time: TimeSpan | undefined) => void>();
    //endregion

    constructor(props: TimePickerProps) {
        super(props);
        //super({...{element: document.createElement('div')}, ...props});
        //TimePicker properties
        this.readProperties(props, true);
        //mud compatibility
        this.onInitialized();
        //Let's write the properties into the DOM
        this.render(true);
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);
        this.buildCssClasses();

        let toolBar = Material.PickerToolBar({
            className: this.toolBarClass,
            style: this.style,
            disableToolBar: this.disableToolBar,
            orientation: this.orientation,
            color: this.color,
            childContent: [
                Lab1.Div({
                    className: 'mud-timepicker-hourminute mud-ltr',
                    childContent: this.buildTopText()
                }),
                this.amPM.value ? this.buildAmPmButtons() : null
            ]
        });

        let pickerContent = Material.PickerContent({
            childContent: Lab1.Div({
                    className: 'mud-picker-time-container',
                    childContent: Lab1.Div({
                            className: 'mud-picker-time-clock',
                            childContent: Lab1.Div({
                                    role: 'menu',
                                    tabIndex: -1,
                                    className: 'mud-picker-time-clock-mask',
                                    onMouseDown: (ev)=>this.handleMouseDown(ev),
                                    onMouseUp: (ev)=>this.handleMouseUp(ev),
                                    childContent: [
                                        Lab1.Div({className: this.getClockPinColor()}),
                                        Lab1.Div({
                                            id:'divClockPointer',
                                            className: this.getClockPointerColor(),
                                            style: `height:${this.getPointerHeight()}; transform: ${this.getPointerRotation()}`,
                                            childContent: Lab1.Div({className: this.getClockPointerThumbColor()})
                                        }),
                                        Lab1.Div({
                                            className: this.hourDialClass,
                                            childContent: this.amPM ? this.buildAmPmHours() : this.build24hours()
                                        }),
                                        Lab1.Div({
                                            id:'divMinutes',
                                            className: this.minuteDialClass,
                                            childContent: this.buildMinutes()
                                        })
                                    ]
                                }),
                        })
                })
        });

        //console.log('popoverPaperDiv:')
        this.buildManaged(this.pickerContent! , [toolBar,pickerContent]);//nao era o popoverPaperDiv
        //todo mudar para fragment this.buildManagedFragment(this.parentComponent! as Item, [toolBar, pickerContent]);
    }

    //Hours from 1 to 12
    protected buildAmPmHours(): IComponent[] {
        let items = [];
        for (let i = 1; i <= 12; i++) {
            let angle = (6 - i) * 30;
            items.push(
                Material.MudText({
                    id:'labelAmPMHour-'+i.toString(),
                    className: this.getNumberColor(i),
                    style: this.getTransform(angle, 109, 0, 0),
                    key:i.toString(),
                    childContent:i.toString()//todo recolocar mudtext. É que o mudtext nao esta funcionando
                })
            )
        }
        for (let i = 1; i <= 12; i++) {
            items.push(
                Lab1.Div({
                    id:'divAmPmHour-'+i.toString(),
                    className: 'mud-picker-stick mud-hour',
                    key:i.toString(),
                    style: `transform: rotateZ(${i*30}deg); `,
                    onClick: (ev) => {
                        this.handleMouseClickHour(i);
                        ev.stopPropagation();
                    },
                    onMouseOver: (ev) => this.handleMouseOverHour(i)
                })
            )
        }
        return items;
    }

    protected build24hours(): IComponent[] {
        console.log('build24hours');
        let items = [];
        /*Hours from 13 to 24 (00)*/
        for (let i = 1; i <= 12; i++) {
            let angle = (6 - i) * 30;
            items.push(Material.MudText({
                className: this.getNumberColor((i + 12) % 24),
                style: this.getTransform(angle, 109, 0, 5),
                childContent:[((i + 12) % 24).toString()]//todo ver d2 format
            }))
        }
        /*Hours from 1 to 12*/
        for (let i = 1; i <= 12; i++) {
            let angle = (6 - i) * 30;
            items.push(Material.MudText({
                className: this.getNumberColor(i),
                typo: Typo.body2,
                style: this.getTransform(angle, 74, 0, 40),
                childContent: [i.toString()]
            }))
        }
        return items;
    }

    protected buildMinutes(): IComponent[] {
        let items = [];
        for (let i = 0; i <= 11; i++) {
            let angle = (6 - i) * 30;
            items.push(Material.MudText({//todo mudar para Material.MudText
                className: this.getNumberColor(i * 5),
                style: this.getTransform(angle, 109, 0, 5),
                childContent: (i * 5).toString()//todo ver o d2 format
            }))
        }
        for (let i = 0; i <= 59; i++) {
            items.push(Lab1.Div({
                className: 'mud-picker-stick mud-minute',
                style: `transform: rotateZ(${i * 6}deg);`,
                onClick: (ev) => {
                    this.handleMouseClickMinute(i);
                    ev.stopPropagation()
                },
                onMouseOver: (ev) => this.handleMouseOverMinute(i)
            }))
        }
        return items;
    }

    protected buildTopText(): IComponent[] {
        let items = []
        switch (this.timeEditMode.value) {
            case TimeEditMode.Normal:
                items.push(
                    Material.Button({
                        variant: Variant.Text,
                        color: Color.Inherit,
                        className: this.hoursButtonClass,
                        onClick: this.handleHourClick,
                        text: this.getHourString()
                    }),
                    Material.MudText({
                        typo: Typo.h2,
                        className: 'mud-timepicker-separator',
                    }),
                    Material.Button({
                        variant: Variant.Text,
                        color: Color.Inherit,
                        className: this.minuteButtonClass,
                        onClick: this.handleMinutesClick,
                        text: this.getMinuteString()
                    })
                );
                break;
            default:
                items.push(
                    Material.MudText({
                        typo: Typo.h2,
                        className: 'mud-timepicker-separator',
                        childContent: `${this.getHourString()}:${this.getMinuteString()}`
                    }));
                break;
        }
        return items;
    }

    //top right am/pm buttons
    protected buildAmPmButtons(): IComponent {
        return Lab1.Div({
            className: 'mud-timepicker-ampm',
            childContent: [
                Material.Button({
                    variant: Variant.Text,
                    color: Color.Inherit,
                    className: this.amButtonClass,
                    onClick: this.handleAmClicked,
                    text: 'AM'
                }),
                Material.Button({
                    variant: Variant.Text,
                    color: Color.Inherit,
                    className: this.pmButtonClass,
                    onClick: this.handlePmClicked
                })
            ]
        });
    }

    protected onInitialized() {//todo remover. mantendo compatibilidade com mud por enquanto
        super.onInitialized();
        this.updateTimeSetFromTime();
        this._currentView = this.openTo.value;
        this._initialHour = this._timeSet.hour;
        this._initialMinute = this._timeSet.minute;
    }

    protected buildCssClasses() {
        super.buildCssClasses();
        //toolbarClass
        this.toolBarClass.value = 'mud-picker-timepicker-toolbar';
        if (this.orientation.value == Orientation.Landscape && this.pickerVariant.value == PickerVariant.Static) this.toolBarClass.value += ' mud-picker-timepicker-toolbar-landscape';
        if (this.className.value && this.className.value.length > 0) this.toolBarClass.value += ' ' + this.className.value;

        //hoursButtonClass
        this.hourDialClass = 'mud-timepicker-button';
        if (this._currentView == OpenTo.Minutes) this.hourDialClass += ' mud-timepicker-toolbar-text';

        //minuteButtonClass
        this.minuteButtonClass = 'mud-timepicker-button';
        if (this._currentView == OpenTo.Hours) this.minuteButtonClass += ' mud-timepicker-toolbar-text';

        //amButtonClass
        this.amButtonClass = 'mud-timepicker-button';
        if (!this.isAm) this.amButtonClass += ' mud-timepicker-toolbar-text'

        //pmButtonClass
        this.pmButtonClass = 'mud-timepicker-button';
        if (!this.isPm) this.pmButtonClass += ' mud-timepicker-toolbar-text';

        //hourDialClass
        this.hourDialClass = 'mud-time-picker-hour';
        this.hourDialClass += ' mud-time-picker-dial';
        if (this._currentView != OpenTo.Hours) this.hourDialClass += ' mud-time-picker-dial-out';
        if (this._currentView != OpenTo.Hours) this.hourDialClass += ' mud-time-picker-dial-hidden';

        //minuteDialClass
        this.minuteDialClass = 'mud-time-picker-minute';
        this.minuteDialClass += ' mud-time-picker-dial';
        if (this._currentView != OpenTo.Minutes) this.minuteDialClass += ' mud-time-picker-dial-out';
        if (this._currentView != OpenTo.Minutes) this.minuteDialClass += ' mud-time-picker-dial-hidden';
    }

    protected setTimeAsync(time: TimeSpan | undefined, updateValue: boolean): void {
        if (this.value.value != time) {
            this.timeIntermediate = time;
            this.value._value = time;
            console.log('(TimePicker)setTimeAsync. Time:',time?.hours, time?.minutes, '.UpdateValue:',updateValue)
            if (updateValue) this.setTextAsync(this.value.value!.toString(), false)
            this.updateTimeSetFromTime();
            this.onTimeChange.emit(this.value.value)
            this.beginValidate();
        }
    }

    protected stringValueChanged(value: string): void {
        this.touched = true;
        // Update the time property (without updating back the Value property)
        this.setTimeAsync(this.convertStringToTime(value), false);
    }

    protected handlePickerOpen(): void {
        super.handlePickerOpen();
        switch (this.timeEditMode.value) {//todo ver se altera o timeeditmode tambem
            case TimeEditMode.Normal:
                this._currentView = this.openTo.value
                break;
            case TimeEditMode.OnlyHours:
                this._currentView = OpenTo.Hours;
                break;
            case TimeEditMode.OnlyMinutes:
                this._currentView = OpenTo.Minutes;
                break;
        }
    }

    protected submit(): void {
        if (this.readOnly.value) return;
        this.time.value = this.timeIntermediate;
        console.log('(TimePicker)submit. Time:',this.timeIntermediate?.hours, this.timeIntermediate?.minutes);
    }

    public clear(close: boolean = true): void {
        this.time.value = undefined;
        this.timeIntermediate = undefined;
        super.clear();
    }

    protected getHourString(): string {
        if (!this.timeIntermediate) return '--';
        let h = this.amPM.value ? this.toAmPmHour(this.timeIntermediate) : this.timeIntermediate.hours;
        return Math.min(23, Math.max(0, h)).toString();
    }

    protected getMinuteString(): string {
        if (!this.timeIntermediate) return '--';
        return `${Math.min(59, Math.max(0, this.timeIntermediate.minutes))}`;//todo adicionar D2
    }

    protected updateTime(): void {
        this.timeIntermediate = new TimeSpan(0, this._timeSet.hour, this._timeSet.minute,  0);
        if ((this.pickerVariant.value == PickerVariant.Static && !this.pickerActions.value) || (this.pickerActions.value != undefined && this.autoClose.value)) {
            console.log('(TimePicker)updateTime. timeIntermediate:',this.timeIntermediate.hours, this.timeIntermediate.minutes)
            this.submit();
        }
    }

    protected handleHourClick(): void {
        this._currentView = OpenTo.Hours;
        this.focusAsync();
    }

    protected handleMinutesClick(): void {
        this._currentView = OpenTo.Minutes;
        this.focusAsync();
    }

    protected handleAmClicked(): void {
        this._timeSet.hour %= 12;// "12:-- am" is "00:--" in 24h
        this.updateTime();
        this.focusAsync();
    }

    protected handlePmClicked(): void {
        if (this._timeSet.hour <= 12) this._timeSet.hour += 12;// "12:-- pm" is "12:--" in 24h
        this._timeSet.hour %= 24;
        this.updateTime();
        this.focusAsync();
    }

    protected getClockPinColor(): string {
        return `mud-picker-time-clock-pin mud-${this.color}`;
    }

    protected getClockPointerColor(): string {
        if (this.mouseDown.value) return `mud-picker-time-clock-pointer mud-${this.color}`;
        else return `mud-picker-time-clock-pointer mud-picker-time-clock-pointer-animation mud-${this.color}`;
    }

    protected getClockPointerThumbColor(): string {
        let deg = this.getDeg();
        if (deg % 30 == 0) return `mud-picker-time-clock-pointer-thumb mud-onclock-text mud-onclock-primary mud-${this.color}`;
        else return `mud-picker-time-clock-pointer-thumb mud-onclock-minute mud-${this.color}-text`;
    }

    protected getNumberColor(value: number): string {
        if (this._currentView == OpenTo.Hours) {
            let h = this._timeSet.hour;
            if (this.amPM) {
                h = this._timeSet.hour % 12;
                if (this._timeSet.hour % 12 == 0) h = 12;
            }
            if (h == value) return `mud-clock-number mud-theme-${this.color}`;
        } else if (this._currentView == OpenTo.Minutes && this._timeSet.minute == value) {
            return `mud-clock-number mud-theme-${this.color}`;
        }
        return `mud-clock-number`;
    }

    protected getDeg(): number {
        let deg = 0;
        if (this._currentView == OpenTo.Hours) deg = (this._timeSet.hour * 30) % 360;
        if (this._currentView == OpenTo.Minutes) deg = (this._timeSet.minute * 6) % 360;
        return deg;
    }

    protected getTransform(angle: number, radius: number, offsetX: number, offsetY: number): string {
        angle = angle / 180 * Math.PI;
        let x = (Math.sin(angle) * radius + offsetX).toString()//todo adicionar format
        let y = ((Math.cos(angle) + 1) * radius + offsetY).toString()//todo adicionar format
        return `transform: translate(${x}px, ${y}px);`;
    }

    protected getPointerRotation(): string {
        let deg = 0;
        if (this._currentView == OpenTo.Hours) deg = (this._timeSet.hour * 30) % 360;
        if (this._currentView == OpenTo.Minutes) deg = (this._timeSet.minute * 6) % 360;
        return `rotateZ(${deg}deg);`
    }

    protected getPointerHeight(): string {
        let height = 40;
        if (this._currentView == OpenTo.Minutes) height = 40;
        if (this._currentView == OpenTo.Hours) {
            if (!this.amPM && this._timeSet.hour > 0 && this._timeSet.hour < 13) height = 26
            else height = 40;
        }
        return `${height}%;`;
    }

    protected updateTimeSetFromTime(): void {
        if (this.timeIntermediate == undefined) {
            this._timeSet.hour = 0;
            this._timeSet.minute = 0;
            return;
        }
        this._timeSet.hour = this.timeIntermediate?.hours;
        this._timeSet.minute = this.timeIntermediate?.minutes;
    }

    //Sets Mouse Down bool to true if mouse is inside the clock mask.
    protected handleMouseDown(e: MouseEvent): void {
        this.mouseDown.value = true;
    }

    //Sets Mouse Down bool to false if mouse is inside the clock mask.
    protected handleMouseUp(e: MouseEvent): void {
        if (this.mouseDown.value && this._currentView == OpenTo.Minutes && this._timeSet.minute != this._initialMinute || this._currentView == OpenTo.Hours
            && this._timeSet.hour != this._initialHour && this.timeEditMode.value == TimeEditMode.OnlyHours) {
            this.mouseDown.value = true;
            this.submitAndClose();
        }
        this.mouseDown.value = false;//todo talvez nao precise usar setter
        if (this._currentView == OpenTo.Hours && this._timeSet.hour != this._initialHour && this.timeEditMode.value == TimeEditMode.Normal) {
            this._currentView = OpenTo.Minutes;
        }
    }

    //If MouseDown is true enables "dragging" effect on the clock pin/stick.
    protected handleMouseOverHour(value: number): void {
        if (this.mouseDown.value) {
            this._timeSet.hour = value;
            this.updateTime();
        }
    }

    //On click for the hour "sticks", sets the hour.
    protected handleMouseClickHour(value: number): void {
        let h = value;
        if (this.amPM.value) {
            if (this.amPM.value && value == 12) h = 0;
            else if (this.isPm && value < 12) h = value + 12;
        }
        this._timeSet.hour = h;
        this.updateTime();
        if (this.timeEditMode.value == TimeEditMode.Normal) {
            this._currentView = OpenTo.Minutes;
            this.render()//bruno fiz isso para mostrar os minutos
        }
        else if (this.timeEditMode.value == TimeEditMode.OnlyHours) this.submitAndClose();
    }

    //On mouse over for the minutes "sticks", sets the minute.
    protected handleMouseOverMinute(value: number): void {
        if (this.mouseDown.value) {
            this._timeSet.minute = value;
            this.updateTime();
        }
    }

    //On click for the minute "sticks", sets the minute.
    protected handleMouseClickMinute(value: number): void {
        this._timeSet.minute = value;
        console.log('(TimePicker)handleMouseClickMinute)',this._timeSet.hour, this._timeSet.minute);
        this.updateTime();
        this.submitAndClose();
    }

    protected submitAndClose(): void {
        if (this.pickerActions.value == undefined || this.autoClose.value) {
            console.log('(TimePicker)submitAndClose. Variant:',PickerVariant[this.pickerVariant.value])
            this.submit();
            if (this.pickerVariant.value != PickerVariant.Static) {
                //todo delay
                this.close(false);
            }
        }
    }

    protected handleKeyDown(ev: KeyboardEvent): void {
        if (this.disabled.value || this.readOnly.value) return;
        super.handleKeyDown(ev);
        switch (ev.key.toLowerCase()) {
            case 'arrowright':
                if (this.isOpen.value) {
                    if (ev.ctrlKey) {
                        this.changeHour(1);
                    } else if (ev.shiftKey) {
                        if (this._timeSet.minute > 55) {
                            this.changeHour(1);
                        }
                        this.changeMinute(5)
                    } else {
                        if (this._timeSet.minute == 59) {
                            this.changeHour(1);
                        }
                        this.changeMinute(1);
                    }
                }
                break;
            case 'arrowleft':
                if (this.isOpen.value) {
                    if (ev.ctrlKey) {
                        this.changeHour(-1);
                    } else if (ev.shiftKey) {
                        if (this._timeSet.minute < 5) {
                            this.changeHour(-1);
                        }
                        this.changeMinute(-5);
                    } else {
                        if (this._timeSet.minute == 0) {
                            this.changeHour(-1);
                        }
                        this.changeMinute(-1);
                    }
                }
                break;
            case 'arrowup':
                if (!this.isOpen.value && !this.editable.value) {
                    this.isOpen.value = true;
                } else if (ev.altKey) {
                    this.isOpen.value = false;
                } else if (ev.shiftKey) {
                    this.changeHour(5);
                } else {
                    this.changeHour(1);
                }
                break;
            case 'arrowdown':
                if (!this.isOpen.value && !this.editable.value) {
                    this.isOpen.value = true;
                } else if (ev.shiftKey) {
                    this.changeHour(-5)
                } else this.changeHour(-1)
                break;
            case 'escape':
                this.returnTimeBackUp();
                break;
            case 'enter':
            case 'numpadenter':
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

    protected changeMinute(val: number): void {
        this._currentView = OpenTo.Minutes;
        this._timeSet.minute = (this._timeSet.minute + val + 60) % 60;
        this.updateTime();
    }

    protected changeHour(val: number): void {
        this._currentView = OpenTo.Hours;
        this._timeSet.hour = (this._timeSet.hour + val + 24) % 24;
        this.updateTime();
    }

    protected returnTimeBackUp(): void {
        if (this.time.value == undefined) {
            this.timeIntermediate = undefined;
        } else {
            this._timeSet.hour = this.time.value?.hours;
            this._timeSet.minute = this.time.value?.minutes;
            this.updateTime();
        }
    }

    //todo ver a funcao OnSet no mud
    protected convertTimeToString(timespan: TimeSpan | undefined): string {
        if (timespan == undefined) return '';
        let time = DateTime.today.add(timespan);
        return time.toFormat('HH:mm')
    }

    //todo ver a funcao onGet no mud
    protected convertStringToTime(txt: string | undefined): TimeSpan | undefined {
        return undefined;
    }

    protected toAmPmHour(time?: TimeSpan): number {
        //todo
        return 0;
    }
}

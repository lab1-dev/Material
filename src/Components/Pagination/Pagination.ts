import {ArrayHelper, Component, Lab1, Li, component, Property, Signal} from "@lab1/core";
import {Color, Page, Size, Variant, Button, IconButton, Text, Material, MaterialComponent} from "../../MaterialExports";
import type {PaginationProps} from "./PaginationProps";

@component
export class Pagination extends MaterialComponent implements PaginationProps {

    //region properties
    readonly variant = new Property<Variant>(this, Variant.Text);
    readonly color = new Property<Color>(this, Color.Primary);
    readonly rectangular = new Property<boolean>(this, false);
    readonly size = new Property<Size>(this, Size.Medium);
    readonly disableElevation = new Property<boolean>(this, false);
    readonly disabled = new Property<boolean>(this, false);
    readonly showFirstButton = new Property<boolean>(this, false);
    readonly showLastButton = new Property<boolean>(this, false);
    readonly showPreviousButton = new Property<boolean>(this, true);
    readonly showNextButton = new Property<boolean>(this, true);
    readonly firstIcon = new Property<string>(this, Material.Icons.Filled.FirstPage);
    readonly beforeIcon = new Property<string>(this, Material.Icons.Filled.NavigateBefore);
    readonly nextIcon = new Property<string>(this, Material.Icons.Filled.NavigateNext);
    readonly lastIcon = new Property<string>(this, Material.Icons.Filled.LastPage);
    readonly childContent = new Property<any>(this, undefined);

    readonly count = new Property<number>(this, 1, {
        customSetter: (value => {
            this.count._value = Math.max(1, value);
            this.selected._value = Math.min(this.selected.value, this.count.value);
            if (!this.holdRender) this.render();
        })
    });

    readonly boundaryCount = new Property<number>(this, 2, {
        customSetter: (value => {
            this.boundaryCount._value = Math.max(1, value);
            if (!this.holdRender) this.render();
        })
    });

    readonly middleCount = new Property<number>(this, 3, {
        customSetter: (value => {
            this.middleCount._value = Math.max(1, value);
            if (!this.holdRender) this.render();
        })
    });

    readonly selected = new Property<number>(this, 1, {
        customSetter: (value => {
            //this is required because _selected will stay 1 when Count is not yet set
            if (!this.selectedFirstSet) {
                this.selected._value = value;
                this.selectedFirstSet = true;
            } else this.selected._value = Math.max(1, Math.min(value, this.count.value));
            if (!this.holdRender) this.render();
        })
    });
    //endregion

    //#region DOM nodes and others
    readonly onControlButtonClick = new Signal<(page: Page) => void>();
    protected selectedFirstSet = false;
    protected firstButtonLi?: Li
    protected previousButtonLi?: Li
    protected nextButtonLi?: Li
    protected lastButtonLi?: Li
    protected firstButtonIcon?: IconButton
    protected previousButtonIcon?: IconButton
    protected nextButtonIcon?: IconButton
    protected lastButtonIcon?: IconButton
    protected liClass = '';
    //#endregion

    constructor(props: PaginationProps) {
        super({...{element: document.createElement('ul')}, ...props});
        this.readProperties(props, true);
        this.render(true);
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);
        //UL
        let ulClass = 'mud-pagination';
        ulClass += ` mud-pagination-${this.variant}`;
        ulClass += ` mud-pagination-${this.size}`;
        if (this.disableElevation.value) ulClass += ' mud-pagination-disable-elevation';
        this.setClassAndStyle(ulClass, true);

        //LI
        this.liClass = 'mud-pagination-item';
        if (this.rectangular.value) this.liClass += ' mud-pagination-item-rectangular';

        this.buildFirstButton();
        this.buildPreviousButton();
        this.buildPagination();
        this.buildNextButton();
        this.buildLastButton();
    }

    protected buildFirstButton(): void {
        if (this.showFirstButton.value) {
            if (!this.firstButtonLi) {
                this.firstButtonLi = new Li({parent: this});
                this.firstButtonIcon = new IconButton({parent: this.firstButtonLi, variant: this.variant, size: this.size});
                this.firstButtonIcon!.onClick.connect(() => this.onClickControlButton(Page.First))
            }
            this.firstButtonLi.className.value = this.liClass;
            this.firstButtonIcon!.icon.value = this.firstIcon.value;
            this.firstButtonIcon!.disabled.value = this.disabled.value || this.selected.value == 1;
        } else this.firstButtonLi = this.firstButtonLi?.delete();
    }

    protected buildPreviousButton(): void {
        if (this.showPreviousButton.value) {
            if (!this.previousButtonLi) {
                this.previousButtonLi = new Li({parent: this})
                this.previousButtonIcon = new IconButton({parent: this.previousButtonLi, variant: this.variant, size: this.size});
                this.previousButtonIcon!.onClick.connect(() => this.onClickControlButton(Page.Previous))
            }
            this.previousButtonLi.className.value = this.liClass;
            this.previousButtonIcon!.icon.value = this.beforeIcon.value;
            this.previousButtonIcon!.disabled.value = this.disabled.value || this.selected.value == 1;
        } else this.previousButtonLi = this.previousButtonLi?.delete();
    }

    protected buildPagination(): void {
        this.destroyChildrenWithIDStartingWith('_pagination')
        let states = this.generatePagination();
        let items: Component[] = [];
        for (let state of states) {
            let currentPage = state;
            if (currentPage == -1) items.push(this.buildPaginationThreeDots());
            else if (currentPage == this.selected.value) items.push(this.buildPaginationSelected(currentPage));
            else items.push(this.buildPaginationUnselected(currentPage));
        }
        if (this.showPreviousButton.value) this.previousButtonLi!.insertAfter(items);
        else if (this.showFirstButton.value) this.firstButtonLi!.insertAfter(items);
        else this.appendChildren(items);
    }

    protected buildPaginationThreeDots(): Li {
        let dotsLi = new Li({});
        let txt = new Text({parent: dotsLi, disabled: this.disabled});
        dotsLi.className.value = this.liClass;
        txt.childContent.value = '...';
        return dotsLi;
    }

    protected buildPaginationSelected(currentPage: number): Li {
        let selectedLiClass = this.liClass + ' mud-pagination-item-selected';
        let selectedLi = new Li({id: `_pagination_selected_${Lab1.newID()}`});
        let btn = new Button({parent: selectedLi, size: this.size, disableRipple: true, color: this.color, disabled: this.disabled});
        selectedLi.className.value = selectedLiClass;
        btn.variant.value = this.variant.value == Variant.Outlined ? Variant.Outlined : Variant.Filled;
        btn.text.value = currentPage.toString();
        return selectedLi;
    }

    protected buildPaginationUnselected(currentPage: number): Li {
        let unselectedLi = new Li({id: `_pagination_unselected_${Lab1.newID()}`});
        let btn = new Button({parent: unselectedLi, variant: this.variant, size: this.size, disableRipple: true, disabled: this.disabled});
        unselectedLi.className.value = this.liClass;
        btn.text.value = currentPage.toString();
        btn.onClick.connect(() => this.selected.value = currentPage);
        return unselectedLi;
    }

    protected buildNextButton(): void {
        if (this.showNextButton.value) {
            if (!this.nextButtonLi) {
                this.nextButtonLi = new Li({parent: this});
                this.nextButtonIcon = new IconButton({parent: this.nextButtonLi, size: this.size, variant: this.variant});
                this.nextButtonIcon!.onClick.connect(() => this.onClickControlButton(Page.Next))
            }
            this.nextButtonLi.className.value = this.liClass;
            this.nextButtonIcon!.icon.value = this.nextIcon.value;
            this.nextButtonIcon!.disabled.value = this.selected.value == this.count.value || this.disabled.value;
        } else this.nextButtonLi = this.nextButtonLi?.delete();
    }

    protected buildLastButton(): void {
        if (this.showLastButton.value) {
            if (!this.lastButtonLi) {
                this.lastButtonLi = new Li({parent: this});
                this.lastButtonIcon = new IconButton({parent: this.lastButtonLi, size: this.size, variant: this.variant});
                this.lastButtonIcon!.onClick.connect(() => this.onClickControlButton(Page.Last))
            }
            this.lastButtonLi.className.value = this.liClass;
            this.lastButtonIcon!.icon.value = this.lastIcon.value;
            this.lastButtonIcon!.disabled.value = this.selected.value == this.count.value || this.disabled.value;
        } else this.lastButtonLi = this.lastButtonLi?.delete();
    }

    /**
     * generates an array representing the pagination numbers, e.g. for Count==11, MiddleCount==3, BoundaryCount==1,
     * Selected==6 the output will be the int array [1, 2, -1, 5, 6, 7, -1, 10, 11]
     * -1 is displayed as "..." in the ui
     */
    protected generatePagination(): number[] {
        //return array {1, ..., Count} if Count is small
        if (this.count.value <= 4 || this.count.value <= 2 * this.boundaryCount.value + this.middleCount.value + 2)
            return ArrayHelper.createNumberRange(1, this.count.value);
        let length = 2 * this.boundaryCount.value + this.middleCount.value + 2;
        let pages = new Array<number>(length);
        //set start boundary items, e.g. if BoundaryCount == 3 => [1, 2, 3, ...]
        for (let i = 0; i < this.boundaryCount.value; i++) {
            pages[<number>i] = i + 1;
        }
        //set end boundary items, e.g. if this.boundaryCount == 3 and this.count == 11 => [..., 9, 10, 11]
        for (let i = 0; i < this.boundaryCount.value; i++) {
            pages[length - i - 1] = this.count.value - i;
        }
        //calculate start value for middle items
        let startValue = 0;
        if (this.selected.value <= this.boundaryCount.value + this.middleCount.value / 2 + 1) startValue = this.boundaryCount.value + 2;
        else if (this.selected.value >= this.count.value - this.boundaryCount.value - this.middleCount.value / 2) startValue = this.count.value - this.boundaryCount.value - this.middleCount.value;
        else startValue = Math.ceil(this.selected.value - this.middleCount.value / 2);
        //set middle items, e.g. if this.middleCount == 3 and this.selected == 5 and this.count == 11 => [..., 4, 5, 6, ...]
        for (let i = 0; i < this.middleCount.value; i++) {
            pages[this.boundaryCount.value + 1 + i] = startValue + i;
        }
        //set start delimiter "..." when selected page is far enough to the end, dots are represented as -1
        pages[this.boundaryCount.value] = (this.boundaryCount.value + this.middleCount.value / 2 + 1 < this.selected.value) ? -1 : this.boundaryCount.value + 1;
        //set end delimiter "..." when selected page is far enough to the start, dots are represented as -1
        pages[length - this.boundaryCount.value - 1] = (this.count.value - this.boundaryCount.value - this.middleCount.value / 2 > this.selected.value) ? -1 : this.count.value - this.boundaryCount.value;
        //remove ellipsis if difference is small enough, e.g convert [..., 5 , -1 , 7, ...] to [..., 5, 6, 7, ...]
        for (let i = 0; i < length - 2; i++) {
            if (pages[<number>i] + 2 == pages[<number>i + 2]) pages[<number>i + 1] = pages[<number>i] + 1;
        }
        return pages;
    }

    protected onClickControlButton(page: Page): void {
        this.onControlButtonClick.emit(page);
        this.navigateTo(page);
    }

    public navigateTo(page: Page): void {
        switch (page) {
            case Page.First:
                this.selected.value = 1;
                break;
            case Page.Last:
                this.selected.value = Math.max(1, this.count.value);
                break;
            case Page.Next:
                this.selected.value = Math.min(this.selected.value + 1, this.count.value);
                break;
            case Page.Previous:
                this.selected.value = Math.max(1, this.selected.value - 1)
                break;
        }
    }
}

import type {SimpleTableProps} from './SimpleTableProps';
import {ArrayHelper, component, Property} from "@lab1/core";
import {MaterialComponent} from "../../MaterialExports";

@component
export class SimpleTable extends MaterialComponent implements SimpleTableProps {

    //region properties
    readonly elevation = new Property<number>(this, 1);
    readonly hover = new Property<boolean>(this, false);
    readonly square = new Property<boolean>(this, false);
    readonly dense = new Property<boolean>(this, false);
    readonly outlined = new Property<boolean>(this, false);
    readonly bordered = new Property<boolean>(this, false);
    readonly striped = new Property<boolean>(this, false);
    readonly fixedHeader = new Property<boolean>(this, false);
    headers: string[] = [];
    rows: string[][] = []
    //endregion

    constructor(props: SimpleTableProps) {
        super({...{element: document.createElement('div')}, ...props});
        this.readProperties(props, true);
        this.render(true);
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);
        this.removeChildComponents();

        let className = 'mud-table mud-simple-table';
        if (this.dense.value) className += ' mud-table-dense';
        if (this.hover.value) className += ' mud-table-hover';
        if (this.bordered.value) className += ' mud-table-bordered';
        if (this.outlined.value) className += ' mud-table-outlined';
        if (this.striped.value) className += ' mud-table-striped';
        if (this.square.value) className += ' mud-table-square';
        if (this.fixedHeader.value) className += ' mud-table-sticky-header';
        if (!this.outlined.value) className += ` mud-elevation-${this.elevation}`;
        this.setClassAndStyle(className, true);

        let html = "<div class='mud-table-container'><table>"

        //header
        let htmlHeader = '<thead><tr>'
        for (let header of this.headers) {
            htmlHeader += `<th>${header}</th>`;
        }
        htmlHeader += '</tr></thead>';

        //rows
        let htmlRows = '<tbody>'
        for (let r = 0; r < this.rows.length; r++) {
            let currentRow = this.rows[r];
            htmlRows += `<tr>`
            for (let column of currentRow) {
                htmlRows += `<td>${column}</td>`
            }
            htmlRows += '</tr>';
        }
        htmlRows += '<tbody>';

        html += htmlHeader + htmlRows + '</table></div>';
        this.element!.innerHTML = html
    }

    public insertRow(rowNumber: number, rowContent: any[]): void {
        this.rows = ArrayHelper.insertAtIndex(this.rows, rowNumber - 1, rowContent);
        this.render();
    }

    public addRow(rowContent: any[]): void {
        this.rows.push(rowContent);
        this.render();
    }

    //first row is 1
    public replaceRow(row: number, newRowContent: any[]): void {
        this.rows = ArrayHelper.replaceByIndex(this.rows, row - 1, newRowContent);
        this.render();
    }

    public removeFirstRow(): void {
        if (this.rows.length == 0) return;
        this.rows = ArrayHelper.removeFirst(this.rows);
        this.render();
    }

    public removeLastRow(): void {
        if (this.rows.length == 0) return;
        this.rows = ArrayHelper.removeLast(this.rows);
        this.render();
    }

    public removeRow(row: number): void {
        this.rows = ArrayHelper.removeByIndex(this.rows, row - 1);
        this.render();
    }
}
